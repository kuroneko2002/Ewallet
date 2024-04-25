import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-left" theme="colored" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
