import { ethers } from "ethers";

export const connectToMetaMask = async (
  provider: ethers.providers.JsonRpcProvider,
  contractAddress: any,
  contractAbi: any
) => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const signer = provider.getSigner();
      const contractIns = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const isOpen = await contractIns.getIsOpen();
      console.log("CONNECTED METAMASK");

      return {
        account: accounts[0],
        contractIns: contractIns,
        isOpen: isOpen,
      };
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    console.error("MetaMask extension not detected!");
  }
};

export const handleGetManager = async (contract: any) => {
  try {
    const manager = await contract.getManager();
    console.log("Contract manager:", manager);

    return {
      manager: manager,
    };
  } catch (error) {
    console.error("Error calling getManager():", error);
  }
};
