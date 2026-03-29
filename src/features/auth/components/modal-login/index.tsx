import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { login } from "@/features/auth/services/authService";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState, type FC } from "react";

interface ModalLoginProps {
  open: boolean;
  onCancel: () => void;
  onSwitchToRegister: () => void;
}

const ModalLogin: FC<ModalLoginProps> = ({
  open,
  onCancel,
  onSwitchToRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await login(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        resetForm();
        onCancel();
      } else {
        setError(result.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40 backdrop-blur-sm" />
        <DialogContent
          className="max-w-[400px] rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="bg-white p-8">
            <div className="flex flex-col gap-2 mb-8 text-center">
              <DialogTitle className="text-3xl font-black text-neutral-900">
                Selamat Datang
              </DialogTitle>
              <DialogDescription className="text-neutral-500 font-medium">
                Silakan login untuk melanjutkan transaksi Anda
              </DialogDescription>
            </div>

            <div className="flex flex-col gap-5">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm py-3 px-4 rounded-xl flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-3.5 text-neutral-400 group-focus-within:text-blue-600 transition-colors"
                    size={18}
                  />
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl h-12 pl-12 pr-4 outline-0 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-3.5 text-neutral-400 group-focus-within:text-blue-600 transition-colors"
                    size={18}
                  />
                  <input
                    type={hidePassword ? "password" : "text"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl h-12 pl-12 pr-12 outline-0 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-3 text-neutral-400 hover:text-neutral-700 transition-colors"
                    onClick={() => setHidePassword(!hidePassword)}
                  >
                    {hidePassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button
                  className="bg-blue-700 text-white h-12 rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-800 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                  disabled={email === "" || password === "" || isLoading}
                  onClick={handleLogin}
                >
                  {isLoading ? "Memproses..." : "Masuk Sekarang"}
                </button>
                <button
                  className="text-neutral-500 text-sm font-bold hover:text-neutral-800 transition-colors py-2"
                  onClick={handleClose}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 p-4 text-center border-t border-neutral-100">
            <p className="text-xs text-neutral-400 font-medium">
              Belum punya akun?{" "}
              <a
                className="text-blue-600 font-bold cursor-pointer"
                onClick={onSwitchToRegister}
              >
                Daftar Sekarang
              </a>
            </p>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ModalLogin;
