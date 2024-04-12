export const connectToMetaMask = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setSelectedAccount(accounts[0]);

      const web3Instance = new Web3("ws:///127.0.0.1:8545");
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

export const handleGetManager = async () => {
  try {
    const manager = await contract.methods.getManager().call();
    console.log("Contract manager:", manager);
    setManager(manager);
  } catch (error) {
    console.error("Error calling getManager():", error);
  }
};

export const handleParticipant = async () => {
  if (contract) {
    try {
      await contract.methods.participate().send({
        from: selectedAccount,
        value: web3.utils.toWei("1", "ether"),
      });

      console.log("Participation successful!");
    } catch (error) {
      console.error("Error participating:", error);
    }
  }
};

export const getPlayers = async () => {
  try {
    const players = await contract.methods.getPlayers().call();
    console.log("Players:", players);
    // Handle the retrieved players array as needed
  } catch (error) {
    console.error("Error calling getPlayers():", error);
  }
};
