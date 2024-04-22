import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="w-full h-screen bg-primary-purple text-white">
      <Outlet />
    </div>
  );
}
