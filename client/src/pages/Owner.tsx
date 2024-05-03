import { ethers } from "ethers";
import { useState,useEffect } from "react";
import { contractAbi, contractAddress } from "@/constants";
import { useEthersStore } from "@/store/ethers.store";
import {
  handleGetPlayers as e_handleGetPlayers,
  handlePickWinner as e_handlePickWinner,
  handleGetWinner as e_handleGetWinner,
  handleGetBalance as e_handleGetBalance,
  handleReopen as e_handeReopen,
} from "@/lib/ethers";

import Dice from "react-dice-roll";
import PickWinnerCard from "@/components/PickWinnerCard";

const Owner = () => {
  const provider = useEthersStore((state: any) => state.provider);
  const account = useEthersStore((state: any) => state.account);
  const signer = provider.getSigner(account);
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
  const players = useEthersStore((state: any) => state.players);
  const balance = useEthersStore((state: any) => state.balance);

  const setPlayers = useEthersStore((state: any) => state.setPlayers);
  const setWinner = useEthersStore((state: any) => state.setWinner);
  const setBalance = useEthersStore((state: any) => state.setBalance);

  const [diceValue, setDiceValue] = useState<number>(0);

  const handleGetPlayers = async () => {
    const listPlayer = await e_handleGetPlayers(contract);
    setPlayers(listPlayer);
  };
  const handleGetBalance = async () => {
    const balance = await e_handleGetBalance(contract);
    setBalance(balance);
  }

  const handlePickWinner = (value: number) => {
    e_handlePickWinner(contract, provider, account);
    setWinner(e_handleGetWinner(contract));
    setBalance(e_handleGetBalance(contract));
    setDiceValue(value);
  };

  const handleReopen = async() => {
    await e_handeReopen(contract, provider, account);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleGetPlayers();
        await handleGetBalance();
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[]);

  return (
    <div className="bg-primary-purple">
      <section className="mx-auto max-w-screen-lg p-6">
        <div className="bg-secondary-purple p-4 rounded-xl">
          <h1 className="text-[50px] font-bold text-center">
            Contract Control
          </h1>
          <div className="mt-10 w-full flex gap-5 flex-wrap items-center justify-between">
            <div className="w-[100%] md:w-[48%] border border-gray-500 p-4 rounded-xl">
              <h1 className="text-xl font-bold">Contract Address</h1>
              <p className="text-2xl mt-5 max-w-[500px] truncate">
                Contract Address
              </p>
            </div>
            <div className="w-[100%] md:w-[48%] border border-gray-500 p-4 rounded-xl">
              <h1 className="text-xl font-bold">Current Balance</h1>
              <p className="text-2xl mt-5 max-w-[500px] truncate">
                Balance
              </p>
            </div>
          </div>
          <div className="my-10 flex flex-col gap-8">
            <div className="flex items-center gap-5">
              <h1 className="text-3xl font-bold">Player List</h1>
              <button
                className="bg-gradient-to-b from-primary-yellow to-secondary-yellow px-4 py-2 rounded-md text-xl font-bold"
                onClick={() => {
                  handleGetPlayers();
                }}
              >
                Click to get
              </button>
            </div>
            <div className="border border-gray-500 p-4 rounded-xl flex flex-col gap-3">
              {players?.map((player: string, index: number) => {
                return (
                  <p key={index} className="text-2xl max-w-[500px] truncate">
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
                // add handleReopen to this winner card "Click to start new run" 
                <PickWinnerCard
                  diceValue={diceValue}
                  setDiceValue={setDiceValue}
                />
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
    </div>
  );
};

export default Owner;
