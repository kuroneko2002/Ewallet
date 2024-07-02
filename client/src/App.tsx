import { ethers } from "ethers";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useEthersStore } from "./store/ethers.store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const setProvider = useEthersStore((state: any) => state.setProvider);

  const provider: ethers.providers.JsonRpcProvider =
    new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  console.log("INIT ETHER PROVIDER:", provider);
  setProvider(provider);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-left" theme="colored" />
    </>
  );
};

export default App;
