import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();

  // Jika tidak login, tendang ke halaman home (atau login)
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Jika login, tampilkan konten anak (Outlet)
  return <Outlet />;
};
