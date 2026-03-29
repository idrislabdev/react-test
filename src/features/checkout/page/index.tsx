import ModalConfirmCheckout from "@/features/checkout/components/modal-confirm";
import {
  Receipt,
  CreditCard,
  Wallet,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCheckoutStore } from "@/features/checkout/stores/useCheckoutStore";
import { PAYMENT_METHODS } from "@/features/checkout/types/payment";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { transactionService } from "@/features/histories/services/transactionService";

// --- KOMPONEN SKELETON ---
// --- KOMPONEN SKELETON (Identik dengan Layout Utama) ---
const SkeletonCheckout = () => (
  <div className="min-h-screen bg-neutral-50/50 pb-20">
    <div className="flex gap-8 py-20 px-10 mx-auto max-w-310 items-start animate-pulse">
      {/* KIRI: METODE PEMBAYARAN SKELETON */}
      <div className="flex flex-col bg-white border border-neutral-100 rounded-[2.5rem] flex-1 shadow-sm overflow-hidden">
        <div className="p-7 border-b border-neutral-50 bg-neutral-50/30">
          <div className="h-7 w-64 bg-neutral-200 rounded-lg" />
        </div>

        <div className="p-8 flex flex-col gap-8">
          {/* VA Section Skeleton */}
          <div className="flex flex-col gap-4">
            <div className="h-3 w-40 bg-neutral-100 rounded" />
            <div className="flex flex-wrap items-center gap-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-neutral-100 rounded-md border border-neutral-50"
                />
              ))}
            </div>
          </div>

          {/* E-Wallet Section Skeleton */}
          <div className="grid grid-cols-2 gap-6">
            <div className="h-28 bg-neutral-50 border-2 border-dashed border-neutral-100 rounded-3xl" />
            <div className="h-28 bg-neutral-50 border-2 border-dashed border-neutral-100 rounded-3xl" />
          </div>
        </div>
      </div>

      {/* KANAN: RINGKASAN SKELETON */}
      <div className="w-96 flex flex-col gap-4">
        <div className="bg-white border border-neutral-200 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-neutral-100 bg-neutral-50/30 flex gap-3 items-center">
            <div className="w-10 h-10 bg-neutral-200 rounded-xl" />
            <div className="h-6 w-32 bg-neutral-200 rounded" />
          </div>

          <div className="p-8 flex flex-col gap-6">
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-20 bg-neutral-100 rounded" />
                  <div className="h-4 w-32 bg-neutral-100 rounded" />
                </div>
              ))}
            </div>

            <div className="py-4 border-t border-dashed border-neutral-100">
              <div className="flex justify-between items-end">
                <div className="h-3 w-12 bg-neutral-100 rounded" />
                <div className="h-8 w-40 bg-neutral-200 rounded" />
              </div>
            </div>

            <div className="h-14 w-full bg-neutral-200 rounded-2xl" />
          </div>
        </div>

        <div className="px-6 flex gap-3">
          <div className="w-6 h-6 bg-neutral-200 rounded-full flex-shrink-0" />
          <div className="h-10 w-full bg-neutral-100 rounded" />
        </div>
      </div>
    </div>
  </div>
);

export const CheckOutPage = () => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const { product, phoneNumber, selectedPayment, setPaymentMethod } =
    useCheckoutStore();
  const { user } = useAuthStore();

  const [transactionDetail, setTransactionDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const adminFee = selectedPayment?.adminFee || 0;
  const totalPrice = (product?.price || 0) + adminFee;

  // Artificial Delay untuk Skeleton
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const onProcessPayment = async () => {
    if (!product || !selectedPayment || !user) {
      alert("Silahkan pilih metode pembayaran terlebih dahulu!");
      return;
    }

    setIsLoading(true);
    setOpenModalConfirm(true);

    try {
      const payload = {
        id: `INV-${Date.now()}`,
        userId: Number(user.id),
        productId: product.id,
        productName: product.name,
        provider: product.provider,
        phoneNumber: phoneNumber,
        price: product.price,
        adminFee: selectedPayment.adminFee,
        totalAmount: product.price + selectedPayment.adminFee,
        paymentMethod: selectedPayment.name,
        paymentLabel: selectedPayment.label,
        status: "PENDING",
        vaNumber: "8804" + Math.floor(Math.random() * 1000000000000),
        createdAt: new Date().toISOString(),
      };

      const res = await transactionService.createTransaction(payload);
      setTransactionDetail(res);
    } catch (error) {
      console.error(error);
      alert("Gagal memproses transaksi.");
      setOpenModalConfirm(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (pageLoading) return <SkeletonCheckout />;

  return (
    <div className="min-h-screen bg-neutral-50/50 pb-20">
      <div className="flex gap-8 py-20 px-10 mx-auto max-w-310 items-start">
        {/* KIRI: METODE PEMBAYARAN */}
        <div className="flex flex-col bg-white border border-neutral-200 rounded-[2.5rem] flex-1 shadow-sm overflow-hidden">
          <div className="p-7 border-b border-neutral-100 bg-neutral-50/30">
            <h2 className="text-xl font-black text-neutral-900 flex items-center gap-3 mb-0!">
              <CreditCard className="text-blue-600" /> Pilih Metode Pembayaran
            </h2>
          </div>

          <div className="p-8 flex flex-col gap-8">
            {/* Virtual Account Section */}
            <div className="flex flex-col gap-4">
              <label className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <Landmark size={14} /> Virtual Account (Verifikasi Otomatis)
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {PAYMENT_METHODS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPaymentMethod(item)}
                    className={`cursor-pointer w-20 h-20 relative flex flex-col gap-3 justify-center items-center p-6 rounded-md border-2 transition-all duration-300 group
                      ${
                        selectedPayment?.id === item.id
                          ? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-50"
                          : "border-neutral-100 hover:border-blue-200 bg-white"
                      }`}
                  >
                    <span
                      className={`text-sm font-black ${selectedPayment?.id === item.id ? "text-blue-700" : "text-neutral-500"}`}
                    >
                      {item.name}
                    </span>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold text-neutral-400 leading-0">
                        Admin:
                      </label>
                      <span className="text-[10px] font-bold text-neutral-400">
                        Rp{item.adminFee}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* E-Wallet & Lainnya */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl border-2 border-dashed border-neutral-100 flex flex-col gap-2 opacity-50">
                <label className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <Wallet size={14} /> E-Wallet
                </label>
                <p className="text-sm font-bold text-neutral-300 italic">
                  Coming Soon
                </p>
              </div>
              <div className="p-6 rounded-3xl border-2 border-dashed border-neutral-100 flex flex-col gap-2 opacity-50">
                <label className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <CreditCard size={14} /> Debit Instant
                </label>
                <p className="text-sm font-bold text-neutral-300 italic">
                  Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KANAN: RINGKASAN */}
        <div className="w-96 flex flex-col gap-4">
          <div className="bg-white border border-neutral-200 rounded-[2.5rem] shadow-xl shadow-blue-900/5 overflow-hidden">
            <div className="p-6 border-b border-neutral-100 flex gap-3 items-center bg-blue-50/30">
              <div className="p-2 bg-blue-700 rounded-xl text-white">
                <Receipt size={20} />
              </div>
              <h3 className="font-black text-neutral-900">Ringkasan</h3>
            </div>

            <div className="p-8 flex flex-col gap-5">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400 font-medium">Produk</span>
                  <span className="text-neutral-900 font-bold">
                    {product?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400 font-medium">
                    No. Tujuan
                  </span>
                  <span className="text-neutral-900 font-bold">
                    {phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-neutral-50">
                  <span className="text-neutral-400 font-medium">Harga</span>
                  <span className="text-neutral-900 font-bold">
                    Rp{product?.price.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400 font-medium">
                    Biaya Admin
                  </span>
                  <span className="text-neutral-900 font-bold">
                    Rp{adminFee.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="py-4 border-t-2 border-dashed border-neutral-100 mt-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black text-neutral-400 uppercase">
                    Total
                  </span>
                  <span className="text-2xl font-black text-orange-500">
                    Rp{totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <button
                disabled={!selectedPayment || isLoading}
                className="w-full bg-blue-700 h-14 rounded-2xl text-white font-black text-sm shadow-lg shadow-blue-200 hover:bg-blue-800 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100 cursor-pointer"
                onClick={onProcessPayment}
              >
                {isLoading ? "Memproses..." : "Bayar Sekarang"}
              </button>
            </div>
          </div>

          <div className="px-6 flex items-start gap-3 opacity-60">
            <ShieldCheck size={24} className="text-blue-600 flex-shrink-0" />
            <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">
              Pembayaran Anda dilindungi dengan enkripsi SSL. Pastikan nominal
              yang ditransfer sesuai dengan tagihan.
            </p>
          </div>
        </div>
      </div>

      <ModalConfirmCheckout open={openModalConfirm} data={transactionDetail} />
    </div>
  );
};
