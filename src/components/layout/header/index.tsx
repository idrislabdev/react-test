import HomeHeaderFilter from "@/components/layout/header/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalLogin from "@/features/auth/components/modal-login";
import ModalRegister from "@/features/auth/components/modal-register";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";

import {
  ChevronDown,
  History,
  LogOut,
  Search,
  UserCircle,
  WholeWord,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export const MainHeader = (props: { withFilter: boolean }) => {
  const { withFilter } = props;
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoggedIn, logOut } = useAuthStore();

  // State local untuk input agar terasa responsif
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );

  // Sinkronisasi input jika search params berubah (misal tombol back)
  useEffect(() => {
    setInputValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Encode value untuk URL
    const query = inputValue.trim();

    if (query) {
      // Arahkan ke home dengan query param search
      navigate(`/?search=${encodeURIComponent(query)}`);
    } else {
      // Jika kosong, balikkan ke home tanpa filter search
      navigate(`/`);
    }
  };

  const goHistory = () => {
    navigate("/history");
  };

  return (
    <>
      <header className="w-full top-0 left-0 right-0 fixed bg-white z-50">
        <div className="flex flex-col  border-b border-neutral-100">
          <div className="flex items-center justify-between py-3 gap-4 w-full mx-auto max-w-310 px-10">
            <div className="flex items-center gap-3 flex-1">
              <Link to={"/"} className="flex items-center gap-1">
                <span className="flex flex-col justify-center items-center w-7 h-7 bg-blue-500 rounded">
                  <WholeWord size={24} className="text-white" />
                </span>
                <h5 className="text-blue-500 hidden md:block">
                  Paket<span className="font-bold">Data</span>
                </h5>
              </Link>

              {/* FORM PENCARIAN */}
              <form onSubmit={handleSearch} className="relative w-full">
                <Search
                  size={18}
                  className="text-neutral-500 absolute top-3 left-3"
                />
                <input
                  className="w-full border border-gray-300 pl-10 pr-4 py-1.5 rounded-xl text-neutral-700 outline-0 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="Cari paket data..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </form>
            </div>

            <div className="flex items-center gap-3">
              {!isLoggedIn && (
                <div className="flex items-center gap-2">
                  <button
                    className="cursor-pointer border border-blue-500 text-blue-500 py-1.5 px-4 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors"
                    onClick={() => setOpenModalRegister(true)}
                  >
                    Daftar
                  </button>
                  <button
                    className=" bg-blue-500 text-white py-1.5 px-4 rounded-xl text-sm font-medium cursor-pointer hover:bg-blue-600 transition-colors"
                    onClick={() => setOpenModalLogin(true)}
                  >
                    Login
                  </button>
                </div>
              )}

              {isLoggedIn && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <div className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-neutral-50">
                      <UserCircle size={24} className="text-blue-500" />
                      <span className="text-sm font-medium text-neutral-700 hidden sm:block">
                        {user?.name}
                      </span>
                      <ChevronDown size={14} className="text-neutral-400" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 mt-1 rounded-xl p-2 shadow-xl border-neutral-200"
                  >
                    <DropdownMenuLabel className="px-2 pb-2">
                      <p className="text-sm font-bold text-neutral-800">
                        {user?.name}
                      </p>
                      <p className="text-xs text-neutral-400 font-normal truncate">
                        {user?.email}
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => goHistory()}
                      className="flex gap-2 py-2 px-2 text-neutral-600 focus:bg-blue-50 focus:text-blue-600 rounded-lg cursor-pointer"
                    >
                      <History size={16} /> History Transaksi
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => logOut()}
                      className="flex gap-2 py-2 px-2 text-red-600 focus:bg-red-50 focus:text-red-600 rounded-lg cursor-pointer mt-1"
                    >
                      <LogOut size={16} /> Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
        {withFilter && <HomeHeaderFilter />}
      </header>

      <ModalLogin
        open={openModalLogin}
        onCancel={() => setOpenModalLogin(false)}
        onSwitchToRegister={() => {
          setOpenModalLogin(false);
          setOpenModalRegister(true);
        }}
      />
      <ModalRegister
        open={openModalRegister}
        onCancel={() => setOpenModalRegister(true)}
        onSwitchToLogin={() => {
          setOpenModalRegister(false);
          setOpenModalLogin(true);
        }}
      />
    </>
  );
};
