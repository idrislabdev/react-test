import { MainHeader } from "@/components/layout/header";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div className="w-full h-full">
      <MainHeader withFilter={true} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
