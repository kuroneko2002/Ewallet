import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../constants";

const Dashboard2 = () => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [manager, setManager] = useState("");
  const [contract, setContract] = useState(null);
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [winner, setWinner] = useState("");

  window.ethereum.on("accountsChanged", (accounts) => {
    setSelectedAccount(accounts[0]);
    console.log("ACCOUNT CHANGED:", accounts[0]);
  });

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setSelectedAccount(accounts[0]);

        const signer = provider.getSigner();
        const contractIns = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        setContract(contractIns);

        console.log("CONNECTED METAMASK");
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask extension not detected!");
    }
  };

  const handleGetManager = async () => {
    try {
      const manager = await contract.getManager();
      console.log("Contract manager:", manager);
      setManager(manager);
    } catch (error) {
      console.error("Error calling getManager():", error);
    }
  };

  const handleParticipant = async () => {
    if (contract && selectedAccount) {
      try {
        const signer = provider.getSigner(selectedAccount);
        const contractWithSigner = contract.connect(signer);
        console.log(await contract.getManager());
  
        const amountToSend = ethers.utils.parseEther("1");
        const tx = await contractWithSigner.participate({ value: amountToSend });
        await tx.wait();

        await handleGetPlayers();
        await handleGetBalance();
  
        console.log("Participation successful!");
      } catch (error) {
        console.error("Error participating:", error);
      }
    } else {
      console.error("Contract instance or selected account not available.");
    }
  };

  const handlePickWinner = async () => {
    if (contract) {
      try {
        const signer = provider.getSigner(selectedAccount);
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.pickWinner();
        await tx.wait();

        setWinner(await contract.getWinner());

        await handleGetPlayers();
        await handleGetBalance();

        console.log("Winner picked and lottery closed!");
      } catch (error) {
        console.error("Error picking winner:", error);
      }
    }
  };

  const handleWithdrawFunds = async () => {
    if (contract) {
      try {
        const signer = provider.getSigner(selectedAccount);
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.withdrawFunds();
        await tx.wait();

        await handleGetPlayers();
        await handleGetBalance();

        console.log("Funds withdrawn from the contract!");
      } catch (error) {
        console.error("Error withdrawing funds:", error);
      }
    }
  };

  const handleGetPlayers = async () => {
    if (contract) {
      try {
        const players = await contract.getPlayers();
        console.log("Players:", players);
        setPlayers(players);
      } catch (error) {
        console.error("Error calling getPlayers():", error);
      }
    }
  };

  const handleGetBalance = async () => {
    if (contract) {
      try {
        const balance = await contract.getBalance();
        console.log("Contract balance:", ethers.utils.formatEther(balance));
        setBalance(balance);
      } catch (error) {
        console.error("Error calling getBalance():", error);
      }
    }
  };

  useEffect(() => {
    connectToMetaMask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Contract manager: {manager}</h3>
      <h3>
        Selected Account:{" "}
        {selectedAccount === "0x8937d614697202e261fc084f431c80ae33645f53"
          ? "Not selected"
          : selectedAccount}
      </h3>
      <button onClick={handleGetManager}>Get Manager</button>
      <button onClick={handleParticipant}>Participant</button>
      <button onClick={handlePickWinner}>Pick Winner & Close Lottery</button>
      <button onClick={handleWithdrawFunds}>Withdraw Funds</button>
      <button onClick={handleGetPlayers}>Get Players</button>
      <button onClick={handleGetBalance}>Get Balance</button>

      <h3>Players:</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>

      <h3>Contract Balance: {ethers.utils.formatEther(balance)} ETH</h3>
      <h3>Last Winner: {winner}</h3>
    </div>
  );
};

export default Dashboard2;
