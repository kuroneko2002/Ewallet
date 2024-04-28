import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useEthersStore } from "@/store/ethers.store";
import { handleGetManager } from "@/lib/ethers";

interface PropType {
  children: ReactNode;
}

const EtherProvider = (props: PropType) => {
  const { children } = props;

  const navigate = useNavigate();

  const setProvider = useEthersStore((state: any) => state.setProvider);
  const setAccount = useEthersStore((state: any) => state.setAccount);
  const contract = useEthersStore((state: any) => state.contract);

  const provider: ethers.providers.JsonRpcProvider =
    new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  setProvider(provider);

  window.ethereum.on("accountsChanged", async (accounts: string[]) => {
    console.log("ACCOUNT CHANGED:", accounts[0]);
    setAccount(accounts[0]);

    // Save data to session storage
    sessionStorage.setItem("metamaskAccount", JSON.stringify(accounts[0]));

    // Check routing
    const manager = await handleGetManager(contract);
    console.log(manager, manager);

    if (manager?.manager === accounts[0]) navigate("/owner");
    else navigate("/player");
  });

  return <div>{children}</div>;
};

export default EtherProvider;
