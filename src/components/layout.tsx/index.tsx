import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Navbar />
      <>
        <Outlet />
      </>
    </div>
  );
};
