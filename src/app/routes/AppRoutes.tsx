import { MainLayout } from "@/app/layout";
import { HomeLayout } from "@/app/layout/home-layout";
import { ProtectedRoute } from "@/app/routes/ProtectedRoute";
import { CheckOutPage } from "@/features/checkout/page";
import HistoryPage from "@/features/histories/page";
import { HomePage } from "@/features/home/pages";
import DetailProductPage from "@/features/home/pages/detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Home */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Rute Umum & Protected */}
        <Route element={<MainLayout />}>
          <Route path="/detail" element={<DetailProductPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
