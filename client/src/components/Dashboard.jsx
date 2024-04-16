import { useState, useEffect } from "react";
import { Web3 } from "web3";
import { contractAddress, contractAbi } from "../constants";

const Dashboard = () => {
  const [web3, setWeb3] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [manager, setManager] = useState("");
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState(null);

  window.ethereum.on("accountsChanged", (accounts) => {
    setSelectedAccount(accounts[0]);
    console.log("ACCOUNT CHANGED:", accounts[0]);
  });

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setSelectedAccount(accounts[0]);

        const web3Instance = new Web3(
          import.meta.env.VITE_NETWORK_URL
            ? import.meta.env.VITE_NETWORK_URL
            : "ws:///127.0.0.1:8545"
        );
        const contractInstance = new web3Instance.eth.Contract(
          contractAbi,
          contractAddress
        );

        setWeb3(web3Instance);
        setContract(contractInstance);

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
      const manager = await contract.methods.getManager().call();
      console.log("Contract manager:", manager);
      setManager(manager);
    } catch (error) {
      console.error("Error calling getManager():", error);
    }
  };

  const handleGetBalance = async () => {
    try {
      const balance = await contract.methods.getBalance().call();
      console.log("Contract balance:", balance);
      setBalance((balance / 1000000000000000000n).toString() + " ETH");
    } catch (error) {
      console.error("Error calling getBalance():", error);
    }
  };

  const handleParticipant = async () => {
    if (contract) {
      try {
        await contract.methods.participate().send({
          from: selectedAccount,
          value: web3.utils.toWei("1", "ether"),
        });

        console.log("Participation successful!");

        const balance = await contract.methods.getBalance().call();
        console.log("Contract balance:", balance);
        setBalance((balance / 1000000000000000000n).toString() + " ETH");
      } catch (error) {
        console.error("Error participating:", error);
      }
    }
  };

  const getPlayers = async () => {
    try {
      const players = await contract.methods.getPlayers().call();
      console.log("Players:", players);
      setPlayers(players);
    } catch (error) {
      console.error("Error calling getPlayers():", error);
    }
  };

  const pickWinner = async () => {
    try {
      const manager = await contract.methods.getManager().call();
      const playersCount = await contract.methods.getPlayers().call();

      if (manager.toLowerCase() !== selectedAccount.toLowerCase()) {
        console.error("You are not the manager");
        return;
      }

      if (playersCount.length < 3) {
        console.error("Players are less than 3");
        return;
      }

      const winner = await contract.methods
        .pickWinner()
        .call({ from: manager });

      console.log("Winner:", winner);
      setWinner(winner);
      const players = await contract.methods.getPlayers().call();
      setPlayers(players);

      const balance = await contract.methods.getBalance().call();
      console.log("Contract balance:", balance);
      setBalance((balance / 1000000000000000000n).toString() + " ETH");
    } catch (error) {
      console.error("Error calling pickWinner():", error);
    }
  };

  const withdrawFunds = async () => {
    try {
      const manager = await contract.methods.getManager().call();

      if (manager.toLowerCase() !== selectedAccount.toLowerCase()) {
        console.error("You are not the manager");
        return;
      }

      const withdraw = await contract.methods
        .withdrawFunds()
        .call({ from: manager });

      const balance = await contract.methods.getBalance().call();
      console.log("Contract balance:", balance);
      setBalance((balance / 1000000000000000000n).toString() + " ETH");
    } catch (error) {
      console.error("Error calling pickWinner():", error);
    }
  };

  useEffect(() => {
    connectToMetaMask();
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
      <button onClick={handleGetBalance}>Get Balance</button>
      <button onClick={handleParticipant}>Participant</button>
      <button onClick={getPlayers}>Get players</button>
      <button onClick={pickWinner}>Pick winner</button>
      <button onClick={withdrawFunds}>Withdraw Fund</button>
      <div>
        <h2>Balance: {balance}</h2>
        <h2>Winner: {winner}</h2>
      </div>
      <div>
        <h2>Players</h2>
        {players?.map((player, index) => {
          return <p key={index}>{player}</p>;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
