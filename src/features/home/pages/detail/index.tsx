import { useCheckoutStore } from "@/features/checkout/stores/useCheckoutStore";
import { productService } from "@/features/home/services/productService";
import type { IProduct } from "@/features/home/types";
import ModalLogin from "@/features/auth/components/modal-login";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import {
  ChevronRight,
  Home,
  ShoppingCart,
  TriangleAlert,
  Smartphone,
  ShieldCheck,
  Zap,
  Info,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ModalRegister from "@/features/auth/components/modal-register";

const SkeletonDetail = () => (
  <div className="min-h-screen bg-neutral-50/50 pb-20">
    <div className="flex flex-col px-10 mx-auto max-w-310 py-20 gap-6 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-48 bg-neutral-200 rounded-md" />

      <div className="flex gap-8 items-start">
        {/* Kiri: Detail Produk Skeleton */}
        <div className="flex flex-col bg-white border border-neutral-200 rounded-[2.5rem] flex-1 overflow-hidden">
          <div className="p-8 border-b border-neutral-100 flex gap-8">
            {/* Logo Box */}
            <div className="w-20 h-20 rounded-xl bg-neutral-200" />
            <div className="flex flex-col gap-4 flex-1 justify-center">
              <div className="h-5 w-24 bg-neutral-200 rounded-2xl" />
              <div className="h-8 w-64 bg-neutral-200 rounded-lg" />
              <div className="flex gap-4 mt-2">
                <div className="h-4 w-20 bg-neutral-100 rounded" />
                <div className="h-4 w-20 bg-neutral-100 rounded" />
              </div>
            </div>
          </div>

          {/* Deskripsi Section Skeleton */}
          <div className="p-8 bg-neutral-50/50 space-y-4">
            <div className="h-4 w-32 bg-neutral-200 rounded" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-neutral-100 rounded" />
              <div className="h-3 w-full bg-neutral-100 rounded" />
              <div className="h-3 w-2/3 bg-neutral-100 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="h-16 bg-white border border-neutral-100 rounded-2xl" />
              <div className="h-16 bg-white border border-neutral-100 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Kanan: Card Beli Skeleton */}
        <div className="w-96 flex flex-col gap-6">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-200 rounded-xl" />
              <div className="h-5 w-32 bg-neutral-200 rounded" />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-3 w-24 bg-neutral-100 rounded" />
                <div className="h-14 w-full bg-neutral-100 rounded-2xl" />
              </div>
              <div className="pt-4 border-t border-dashed border-neutral-200 flex justify-between">
                <div className="h-4 w-24 bg-neutral-100 rounded" />
                <div className="h-8 w-32 bg-neutral-200 rounded" />
              </div>
              <div className="h-14 w-full bg-neutral-200 rounded-2xl" />
            </div>
          </div>
          <div className="flex gap-3 px-6">
            <div className="w-6 h-6 bg-neutral-200 rounded-full" />
            <div className="h-10 flex-1 bg-neutral-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DetailProductPage = () => {
  const setInitialCheckout = useCheckoutStore(
    (state) => state.setInitialCheckout,
  );
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      const startTime = Date.now();

      try {
        const data = await productService.getProductById(Number(id));

        const elapsedTime = Date.now() - startTime;
        const waitTime = Math.max(0, 800 - elapsedTime);

        setTimeout(() => {
          if (Array.isArray(data) && data.length === 0) {
            setProduct(null);
          } else {
            setProduct(data as IProduct);
          }
          setLoading(false);
        }, waitTime);
      } catch (error) {
        console.error("Gagal mengambil data product", error);
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleBeli = () => {
    if (phoneNumber.length < 10)
      return alert("Masukkan nomor HP yang valid (min. 10 digit)");

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (product) {
      setInitialCheckout(product, phoneNumber);
      navigate("/checkout");
    }
  };

  if (loading) return <SkeletonDetail />;

  return (
    <>
      <div className="min-h-screen bg-neutral-50/50 pb-20">
        {!product ? (
          <div className="flex py-20 px-10 mx-auto max-w-310 flex-col justify-center items-center text-center">
            <div className="flex justify-center items-center rounded-[3rem] bg-red-50 w-40 h-40 mb-6">
              <TriangleAlert size={80} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900 mb-2">
              Produk Tidak Ditemukan
            </h2>
            <p className="text-neutral-500 max-w-md mb-8">
              Maaf, paket data yang Anda cari tidak tersedia atau telah dihapus
              dari sistem kami.
            </p>
            <Link
              to="/"
              className="px-8 py-3 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 transition-all"
            >
              Kembali ke Beranda
            </Link>
          </div>
        ) : (
          <div className="flex flex-col px-10 mx-auto max-w-310 py-20 gap-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
              <Link to="/" className="hover:text-blue-700 transition-colors">
                <Home size={16} />
              </Link>
              <ChevronRight size={14} />
              <span className="text-neutral-400">Produk</span>
              <ChevronRight size={14} />
              <span className="text-blue-700 font-bold">{product.name}</span>
            </nav>

            <div className="flex gap-8 items-start">
              {/* Kiri: Detail Produk */}
              <div className="flex flex-col bg-white border border-neutral-200 rounded-[2.5rem] flex-1 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-neutral-100 flex gap-8">
                  {/* Provider Logo Mockup */}
                  <div className="w-20 h-20 rounded-xl bg-blue-50 flex flex-col items-center justify-center text-blue-700 font-black text-xl shadow-inner border border-blue-100">
                    {product.provider.substring(0, 3).toUpperCase()}
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-2xl w-fit border border-emerald-100">
                      Stok {product.stock > 0 ? "Tersedia" : "Habis"}
                    </span>
                    <h5 className="text-2xl font-medium">{product.name}</h5>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-neutral-500 text-sm">
                        <Zap size={16} className="text-amber-500" />
                        <span className="font-bold text-neutral-700">
                          {product.quota}GB
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-500 text-sm">
                        <ShieldCheck size={16} className="text-blue-500" />
                        <span className="font-bold text-neutral-700">
                          {product.duration} Hari
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deskripsi Section */}
                <div className="p-8 bg-neutral-50/30">
                  <div className="flex items-center gap-2 mb-2 text-neutral-900">
                    <Info size={18} className="text-blue-600" />
                    <h2 className="font-black uppercase text-xs tracking-widest">
                      Informasi Paket
                    </h2>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-sm whitespace-pre-line">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="p-4 bg-white border border-neutral-100 rounded-2xl">
                      <p className="text-[10px] text-neutral-400 font-bold uppercase mb-1">
                        Provider
                      </p>
                      <p className="font-bold text-neutral-900">
                        {product.provider}
                      </p>
                    </div>
                    <div className="p-4 bg-white border border-neutral-100 rounded-2xl">
                      <p className="text-[10px] text-neutral-400 font-bold uppercase mb-1">
                        Masa Aktif
                      </p>
                      <p className="font-bold text-neutral-900">
                        {product.duration} Hari
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kanan: Card Beli */}
              <div className="sticky top-32 w-96 flex flex-col gap-4">
                <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-blue-700 rounded-xl text-white">
                      <ShoppingCart size={20} />
                    </div>
                    <h3 className="font-black text-neutral-900">
                      Beli Sekarang
                    </h3>
                  </div>

                  <div className="flex flex-col gap-6">
                    {/* Input Nomor HP */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                        <Smartphone size={14} /> Nomor Handphone
                      </label>
                      <input
                        type="number"
                        placeholder="Contoh: 0812xxxx"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl h-14 px-5 outline-0 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-neutral-900"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>

                    {/* Ringkasan Harga */}
                    <div className="pt-4 border-t border-dashed border-neutral-200">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-medium text-neutral-500">
                          Total Pembayaran
                        </span>
                        <span className="text-2xl font-black text-orange-500">
                          Rp{product.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>

                    <button
                      disabled={product.stock <= 0}
                      className="cursor-pointer w-full bg-blue-700 h-14 rounded-2xl text-white font-black text-sm shadow-lg shadow-blue-200 hover:bg-blue-800 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                      onClick={handleBeli}
                    >
                      {product.stock > 0
                        ? "Lanjutkan Pembayaran"
                        : "Stok Habis"}
                    </button>
                  </div>
                </div>

                {/* Info Tambahan */}
                <div className="px-6 flex items-start gap-3 opacity-60">
                  <ShieldCheck
                    size={24}
                    className="text-blue-600 flex-shrink-0"
                  />
                  <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">
                    Transaksi aman & terpercaya. Paket data akan langsung aktif
                    setelah pembayaran berhasil diverifikasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalLogin
        open={showLoginModal}
        onCancel={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setOpenModalRegister(true);
        }}
      />
      <ModalRegister
        open={openModalRegister}
        onCancel={() => setOpenModalRegister(true)}
        onSwitchToLogin={() => {
          setOpenModalRegister(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};

export default DetailProductPage;
