import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEthersStore } from "@/store/ethers.store";
import { handleGetManager } from "@/lib/ethers";

interface PropType {
  children: ReactNode;
}

const RouterProvider = (props: PropType) => {
  const { children } = props;

  const navigate = useNavigate();

  const account = useEthersStore((state: any) => state.account);
  const setAccount = useEthersStore((state: any) => state.setAccount);
  const contract = useEthersStore((state: any) => state.contract);

  const handleCheckAccount = async () => {
    const getAccountAddr = sessionStorage.getItem("metamaskAccount");

    if (getAccountAddr === null) {
      navigate("/");
      return;
    }

    const parseAccount = JSON.parse(getAccountAddr);
    setAccount(parseAccount);

    // Check routing
    const manager = await handleGetManager(contract);
    console.log(manager, parseAccount);

    if (manager?.manager === account) navigate("/owner");
    else navigate("/player");
  };

  useEffect(() => {
    handleCheckAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{children}</div>;
};

export default RouterProvider;
