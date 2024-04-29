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

export const handleParticipant = async (
  contract: any,
  provider: ethers.providers.JsonRpcProvider,
  selectedAccount: any
) => {
  if (contract && selectedAccount) {
    try {
      const signer = provider.getSigner(selectedAccount);
      const contractWithSigner = contract.connect(signer);
      console.log(await contract.getManager());

      const amountToSend = ethers.utils.parseEther("1");
      const tx = await contractWithSigner.participate({ value: amountToSend });
      await tx.wait();

      //await handleGetPlayers();
      //await handleGetBalance();

      console.log("Participation successful!");
    } catch (error) {
      console.error("Error participating:", error);
    }
  } else {
    console.error("Contract instance or selected account not available.");
  }
};

export const handlePickWinner = async (
  contract: any,
  provider: ethers.providers.JsonRpcProvider,
  selectedAccount: any
) => {
  if (contract) {
    try {
      const signer = provider.getSigner(selectedAccount);
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.pickWinner();
      await tx.wait();

      //setWinner(await contract.getWinner());
      //setIsOpen(await contract.getIsOpen());
      //await handleGetPlayers();
      //await handleGetBalance();

      console.log("Winner picked and lottery closed!");
    } catch (error) {
      console.error("Error picking winner:", error);
    }
  }
};

export const handleWithdrawFunds = async (
  contract: any,
  provider: ethers.providers.JsonRpcProvider,
  selectedAccount: any
) => {
  if (contract) {
    try {
      const signer = provider.getSigner(selectedAccount);
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.withdrawFunds();
      await tx.wait();

      //await handleGetPlayers();
      //await handleGetBalance();

      console.log("Funds withdrawn from the contract!");
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
  }
};

export const handleGetPlayers = async (contract: any) => {
  if (contract) {
    try {
      const players = await contract.getPlayers();
      console.log("Players:", players);

      return players;
    } catch (error) {
      console.error("Error calling getPlayers():", error);
    }
  }
};

export const handleGetBalance = async (contract: any) => {
  if (contract) {
    try {
      const balance = await contract.getBalance();
      console.log("Contract balance:", ethers.utils.formatEther(balance));
      //setBalance(balance);
    } catch (error) {
      console.error("Error calling getBalance():", error);
    }
  }
};

export const handleReopen = async (
  contract: any,
  provider: ethers.providers.JsonRpcProvider,
  selectedAccount: any
) => {
  if (contract) {
    try {
      const signer = provider.getSigner(selectedAccount);
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.reopenLottery();
      await tx.wait();
      console.log(await contract.getIsOpen());
      //setIsOpen(await contract.getIsOpen());
    } catch (error) {
      console.error("Error calling getBalance():", error);
    }
  }
};
