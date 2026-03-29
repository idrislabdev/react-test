import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, Mail, Lock, AlertCircle } from "lucide-react";
import { useState, type FC } from "react";
import { register } from "@/features/auth/services/authService";

interface ModalRegisterProps {
  open: boolean;
  onCancel: () => void;
  onSwitchToLogin: () => void;
}

const ModalRegister: FC<ModalRegisterProps> = ({
  open,
  onCancel,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    // Validasi sederhana
    if (!formData.name || !formData.email || !formData.password) {
      return setError("Semua field harus diisi!");
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "customer",
      });

      if (result.success) {
        alert("Registrasi Berhasil! Silakan Login.");
        onSwitchToLogin(); // Pindah ke modal login
      } else {
        setError(result.message || "Gagal mendaftarkan akun");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", password: "" });
    setError("");
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
                Daftar Akun
              </DialogTitle>
              <DialogDescription className="text-neutral-500 font-medium">
                Mulai hemat beli paket data sekarang
              </DialogDescription>
            </div>

            <div className="flex flex-col gap-5">
              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm py-3 px-4 rounded-xl flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">
                  Nama Lengkap
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-3.5 text-neutral-400 group-focus-within:text-blue-600 transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl h-12 pl-12 pr-4 outline-0 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Email Input */}
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl h-12 pl-12 pr-4 outline-0 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
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
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl h-12 pl-12 pr-4 outline-0 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button
                  className="cursor-pointer bg-blue-700 text-white h-12 rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-800 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                  disabled={isLoading}
                  onClick={handleRegister}
                >
                  {isLoading ? "Mendaftarkan..." : "Daftar Sekarang"}
                </button>
                <button
                  className="cursor-pointer text-neutral-500 text-sm font-bold hover:text-neutral-800 transition-colors py-2"
                  onClick={handleClose}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 p-4 text-center border-t border-neutral-100">
            <p className="text-xs text-neutral-400 font-medium">
              Sudah punya akun?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline transition-all"
                onClick={onSwitchToLogin}
              >
                Login di sini
              </span>
            </p>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ModalRegister;
