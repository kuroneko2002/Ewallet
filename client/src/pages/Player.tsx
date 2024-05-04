import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Marquee from "react-fast-marquee";
import ReactCardFlip from "react-card-flip";
import { useEthersStore } from "@/store/ethers.store";
import { toast } from "react-toastify";
import {
  handleParticipant as e_handleParticipant,
  handleGetManager as e_handleGetManager,
  handleGetWinner as e_handleGetWinner,
} from "@/lib/ethers";

import WinnerCard from "@/components/WinnerCard";
import { contractAbi, contractAddress } from "@/constants";

const Player = () => {
  const [value, setValue] = useState<string>("");
  const [isFlipped, setIsFlipped] = useState<boolean>(true);

  const navigate = useNavigate();

  const provider = useEthersStore((state: any) => state.provider);
  const account = useEthersStore((state: any) => state.account);
  const contract = useEthersStore((state: any) => state.contract);
  const winner = useEthersStore((state: any) => state.winner);

  const setAccount = useEthersStore((state: any) => state.setAccount);
  const setContract = useEthersStore((state: any) => state.setContract);
  const setWinner = useEthersStore((state: any) => state.setWinner);

  const handlePlay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === "") {
      toast.error("Please type ETH to play!");
      return;
    }

    console.log(value);
    e_handleParticipant(contract, provider, account);
    toast.success("Play next turn successfully!");

    setValue("");
  };

  const handleAccountChange = async (...args: any) => {
    const accounts = args[0];
    const currentAccount: string = accounts[0];
    setAccount(currentAccount);

    const signer = provider.getSigner(account);
    const contractIns = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    const res = await e_handleGetManager(contractIns);
    console.log("ACCOUNT CHANNGED FROM PLAYER", currentAccount, res?.manager);

    if (currentAccount && res?.manager) {
      if (currentAccount?.toLowerCase() === res?.manager?.toLowerCase())
        navigate("/owner");
    }
  };

  useEffect(() => {
    const fetchData = async (contract: any) => {
      try {
        setWinner(await e_handleGetWinner(contract));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const metamaskAcc = JSON.parse(
      sessionStorage.getItem("metamaskAccount") || ""
    );
    if (account === "") {
      if (!metamaskAcc) {
        navigate("/");
        return;
      }
      setAccount(metamaskAcc);
      const signer = provider.getSigner(metamaskAcc);
      const contractIns = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      setContract(contractIns);
      fetchData(contractIns);
    } else {
      const signer = provider.getSigner(account);
      const contractIns = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      setContract(contractIns);
      fetchData(contractIns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipped(!isFlipped);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    window.ethereum?.on("accountsChanged", handleAccountChange);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
    };
  });

  return (
    <div className="bg-primary-purple">
      <div className="my-10 py-4 w-full bg-secondary-purple">
        <Marquee>
          <div className="flex items-center gap-3 text-xl font-bold">
            <h1 className="text-primary-yellow">Last winner:</h1>
            <h1>{winner}</h1>
          </div>
        </Marquee>
      </div>
      <section className="mx-auto max-w-screen-lg p-6">
        {winner.toLowerCase() === account && (
          <div className="my-10">
            <WinnerCard reward={5} />
          </div>
        )}
        <form
          className="bg-secondary-purple p-4 rounded-xl"
          onSubmit={(e) => {
            handlePlay(e);
          }}
        >
          <h1 className="text-[50px] font-bold text-center">
            The Next Turn Started
          </h1>
          <div className="mt-10 w-full flex gap-5 flex-wrap items-center justify-between">
            <div className="w-[100%] md:w-[48%] border border-gray-500 p-4 rounded-xl">
              <h1 className="text-xl font-bold">Wallet Address</h1>
              <p className="text-2xl mt-5 max-w-[500px] truncate">
                {account ? account : "Null"}
              </p>
            </div>
            <div className="w-[100%] md:w-[48%] border border-gray-500 p-4 rounded-xl">
              <h1 className="text-xl font-bold">Balance Type</h1>
              <p className="text-2xl mt-5 max-w-[500px] truncate">
                Ethereum (ETH)
              </p>
            </div>
          </div>
          <div className="relative mt-10 w-full flex">
            <input
              placeholder="Transfer ETH to play..."
              className="text-xl w-full px-4 py-2 bg-primary-purple border border-gray-500 rounded-md"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <div className="h-full absolute right-0 bg-gradient-to-b from-primary-yellow to-secondary-yellow py-3 px-4 rounded-r-md">
              ETH
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <ReactCardFlip
              isFlipped={isFlipped}
              infinite={true}
              flipDirection="horizontal"
            >
              <img
                className="w-[250px]"
                src="assets/head.png"
                alt="card-head"
              />
              <img
                className="w-[250px]"
                src="assets/tail.png"
                alt="card-tail"
              />
            </ReactCardFlip>
          </div>
          <button className="w-full mt-10 bg-gradient-to-b from-primary-yellow to-secondary-yellow px-4 py-2 rounded-md text-[30px] font-bold">
            Play Now
          </button>
        </form>
      </section>
    </div>
  );
};

export default Player;
