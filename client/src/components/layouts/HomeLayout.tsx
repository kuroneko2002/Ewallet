import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function HomeLayout() {
  return (
    <div className="w-full h-screen bg-primary-purple text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
