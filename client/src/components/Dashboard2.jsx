import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../constants";

const Dashboard2 = () => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [manager, setManager] = useState("");
  const [contract, setContract] = useState(null);

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
    if (contract) {
      try {
        const amountToSend = ethers.utils.parseEther("1");
        const tx = await contract.participate({ value: amountToSend });
        await tx.wait();

        console.log("Participation successful!");
      } catch (error) {
        console.error("Error participating:", error);
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
    </div>
  );
};

export default Dashboard2;
