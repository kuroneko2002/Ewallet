import { create } from "zustand";
import { ethers } from "ethers";

export const useEthersStore = create((set) => ({
  provider: 0,
  account: "",
  contract: null,
  isOpen: true,
  players: [],
  setProvider: (value: ethers.providers.JsonRpcProvider) =>
    set({ provider: value }),
  setAccount: (value: string) => set({ account: value }),
  setContract: (value: any) => set({ contract: value }),
  setIsOpen: (value: boolean) => set({ isOpen: value }),
  setPlayers: (value: string[]) => set({ players: value })
}));
