import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { contractAbi, contractAddress } from "@/constants";
import { useEthersStore } from "@/store/ethers.store";
import {
  handleGetManager as e_handleGetManager,
  handleGetPlayers as e_handleGetPlayers,
  handlePickWinner as e_handlePickWinner,
  handleGetWinner as e_handleGetWinner,
  handleGetBalance as e_handleGetBalance,
  handleReopen as e_handleReopen,
  handleWithdrawFunds as e_handleWithdrawFunds,
} from "@/lib/ethers";

import Dice from "react-dice-roll";
import PickWinnerCard from "@/components/PickWinnerCard";

const Owner = () => {
  const provider = useEthersStore((state: any) => state.provider);

  const [isOwner, setIsOwner] = useState<boolean>(false);

  const account = useEthersStore((state: any) => state.account);
  const contract = useEthersStore((state: any) => state.contract);
  const players: any[] = useEthersStore((state: any) => state.players);
  const balance = useEthersStore((state: any) => state.balance);

  const setPlayers = useEthersStore((state: any) => state.setPlayers);
  const setWinner = useEthersStore((state: any) => state.setWinner);
  const setBalance = useEthersStore((state: any) => state.setBalance);
  const setAccount = useEthersStore((state: any) => state.setAccount);
  const setContract = useEthersStore((state: any) => state.setContract);

  const [diceValue, setDiceValue] = useState<number>(0);

  console.log(account);

  const navigate = useNavigate();

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
    console.log("ACCOUNT CHANNGED FROM OWNER", currentAccount, res?.manager);

    if (currentAccount && res?.manager) {
      if (currentAccount?.toLowerCase() !== res?.manager?.toLowerCase())
        navigate("/player");
    }
  };

  const handleGetPlayers = async (contract: any) => {
    const listPlayer = await e_handleGetPlayers(contract);
    setPlayers(listPlayer);
  };
  const handleGetBalance = async (contract: any) => {
    const balance = await e_handleGetBalance(contract);
    setBalance(balance);
  };

  const handlePickWinner = async (value: number) => {
    await e_handlePickWinner(contract, provider, account);
    setWinner(await e_handleGetWinner(contract));
    setBalance(await e_handleGetBalance(contract));
    setDiceValue(value);
  };

  const handleReopen = async () => {
    await e_handleWithdrawFunds(contract, provider, account);
    setPlayers(await e_handleGetPlayers(contract));
    setBalance(await e_handleGetBalance(contract));
    await e_handleReopen(contract, provider, account);
  };

  const handleCheckIsManager = async () => {
    const signer = provider.getSigner(account);
    const contractIns = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    const res = await e_handleGetManager(contractIns);
    if (account && res?.manager) {
      if (account?.toLowerCase() === res?.manager?.toLowerCase())
        setIsOwner(true);
      else setIsOwner(false);
    }
  };

  useEffect(() => {
    const fetchData = async (contract: any) => {
      try {
        await handleGetPlayers(contract);
        await handleGetBalance(contract);
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
    handleCheckIsManager();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.ethereum?.on("accountsChanged", handleAccountChange);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
    };
  });

  return (
    <div className="bg-primary-purple">
      {!isOwner ? (
        <section className="mx-auto min-h-[90vh] max-w-screen-lg p-6">
          <h1 className="mt-[50px] text-3xl font-bold text-center">
            You're not a contract owner
          </h1>
        </section>
      ) : (
        <section className="mx-auto max-w-screen-lg p-6">
          <div className="bg-secondary-purple p-4 rounded-xl">
            <h1 className="text-[50px] font-bold text-center">
              Contract Control
            </h1>
            <div className="mt-10 w-full flex gap-5 flex-wrap items-center justify-between">
              <div className="w-[100%] md:w-[48%] border border-gray-500 p-4 rounded-xl">
                <h1 className="text-xl font-bold">Contract Address</h1>
                <p className="text-2xl mt-5 max-w-[500px] truncate">
                  {contractAddress ? contractAddress : ""}
                </p>
              </div>
              <div className="w-[100%] md:w-[48%] border border-gray-500 p-4 rounded-xl">
                <h1 className="text-xl font-bold">Current Balance</h1>
                <p className="text-2xl mt-5 max-w-[500px] truncate">
                  {balance ? balance : "0"} ETH
                </p>
              </div>
            </div>
            <div className="my-10 flex flex-col gap-8">
              <div className="flex items-center gap-5">
                <h1 className="text-3xl font-bold">Player List</h1>
                <button
                  className="bg-gradient-to-b from-primary-yellow to-secondary-yellow px-4 py-2 rounded-md text-xl font-bold"
                  onClick={() => {
                    handleGetPlayers(contract);
                  }}
                >
                  Click to get
                </button>
              </div>
              <div className="border border-gray-500 p-4 rounded-xl flex flex-col gap-3">
                {players?.length === 0 && (
                  <div className="flex items-center justify-center">
                    <h1 className="text-3xl font-bold">No player</h1>
                  </div>
                )}
                {players?.map((player: string, index: number) => {
                  return (
                    <p key={index} className="text-2xl max-w-[90%] truncate">
                      {player}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="my-10 flex flex-col gap-8">
              <div className="flex items-center gap-5">
                <h1 className="text-3xl font-bold">Pick Winner</h1>
              </div>
              <div className="flex justify-center">
                {diceValue !== 0 ? (
                  <div
                    className="w-full"
                    onClick={() => {
                      handleReopen();
                    }}
                  >
                    <PickWinnerCard
                      balance={balance}
                      setDiceValue={setDiceValue}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-12">
                    <Dice
                      size={150}
                      onRoll={(value) => handlePickWinner(value)}
                    />
                    <p className="text-gray-400">Click dice to pick winner</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Owner;
