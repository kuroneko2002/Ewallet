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
      return (ethers.utils.formatEther(balance)).toString();
    } catch (error) {
      console.error("Error calling getBalance():", error);
    }
  }
};

export const handleGetWinner = async (contract: any) => {
  if (contract) {
    try {
      const winner = await contract.getWinner();
      return winner;
    } catch (error) {
      console.error("Error calling handleGetWinner():", error);
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
    } catch (error) {
      console.error("Error calling handleReopen():", error);
    }
  }
};

export const handleGetIsOpen = async (contract: any) => {
  if (contract) {
    try {
      const isOpen = await contract.getIsOpen();
      return isOpen;
    } catch (error) {
      console.error("Error calling getIsOpen():", error);
    }
  }
};

export const handleGetAmountWon = async (contract: any) => {
  if (contract) {
    try {
      const amountWon = await contract.getAmountWon();
      return ethers.utils.formatEther(amountWon);
    } catch (error) {
      console.error("Error calling getAmountWon():", error);
    }
  }
};

export const handleGetTransactions = async (contract: any) => {
  if (contract) {
    try {
      const { senders, receivers, amounts, timestamps } = await contract.getTransactions();
      const dateArray = timestamps.map((timestamp: any) => new Date(parseInt(timestamp._hex, 16) * 1000));
      const fixedAmounts = amounts.map((amount: any) => ethers.utils.formatEther(amount));
      return {
        senders: senders,
        receivers: receivers,
        amounts: fixedAmounts,
        timestamps: dateArray,
      };
    } catch (error) {
      console.error("Error calling getTransactions():", error);
    }
  }
};