import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import EtherProvider from "./providers/EtherProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <EtherProvider>
      <ToastContainer position="bottom-left" theme="colored" />
      <RouterProvider router={router} />
    </EtherProvider>
  );
};

export default App;
