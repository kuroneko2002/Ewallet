import { ReactNode } from "react";
import { ethers } from "ethers";
import { useEthersStore } from "@/store/ethers.store";

interface PropType {
  children: ReactNode;
}

const EtherProvider = (props: PropType) => {
  const { children } = props;

  const setProvider = useEthersStore((state: any) => state.setProvider);
  const setAccount = useEthersStore((state: any) => state.setAccount);

  const provider: ethers.providers.JsonRpcProvider =
    new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  setProvider(provider);

  window.ethereum.on("accountsChanged", (accounts: string[]) => {
    console.log("ACCOUNT CHANGED:", accounts[0]);
    setAccount(accounts[0]);
  });

  return <div>{children}</div>;
};

export default EtherProvider;
