import { MainHeader } from "@/components/layout/header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="w-full h-full">
      <MainHeader withFilter={false} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
