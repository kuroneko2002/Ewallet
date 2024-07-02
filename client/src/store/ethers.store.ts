import { create } from "zustand";
import { ethers } from "ethers";

export const useEthersStore = create((set) => ({
  provider: 0,
  account: "",
  contract: null,
  isOpen: true,
  players: [],
  winner: "",
  balance: "0 ETH",
  amountWon: 0,
  transactions:{},
  randomNumber: 0,
  setProvider: (value: ethers.providers.JsonRpcProvider) =>
    set({ provider: value }),
  setAccount: (value: string) => set({ account: value }),
  setContract: (value: any) => set({ contract: value }),
  setIsOpen: (value: boolean) => set({ isOpen: value }),
  setPlayers: (value: string[]) => set({ players: value }),
  setWinner: (value: string) => set({ winner: value }),
  setBalance: (value: string) => set({ balance: value }),
  setAmountWon: (value: any) => set({ amountWon: value }),
  setTransactions: (value: any) => set({ transactions: value }),
  setRandomNumber: (value: any) => set({ randomNumber: value }),
}));
