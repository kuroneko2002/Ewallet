import { useState } from "react";
import Dice from "react-dice-roll";

import PickWinnerCard from "@/components/PickWinnerCard";

const Owner = () => {
  const players: string[] = [
    "0xAbc123456mnq",
    "0xAbc123457mnq",
    "0xAbc123458mnq",
  ];

  // const [players, setPlayers] = useState<string[]>([
  //   "0xAbc123456mnq",
  //   "0xAbc123457mnq",
  //   "0xAbc123458mnq",
  // ]);
  // const [winner, setWinner] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<number>(0);

  const handleGetPlayers = () => {
    console.log("Get players...");
  };

  const handlePickWinner = (value: number) => {
    console.log("Pick winner...");

    setDiceValue(value);
  };

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
                0xAbczyx123456
              </p>
            </div>
            <div className="w-[100%] md:w-[48%] border border-gray-500 p-4 rounded-xl">
              <h1 className="text-xl font-bold">Current Balance</h1>
              <p className="text-2xl mt-5 max-w-[500px] truncate">5 ETH</p>
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
              {players?.map((player: string) => {
                return (
                  <p key={player} className="text-2xl max-w-[500px] truncate">
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
