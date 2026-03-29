import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCheckoutStore } from "@/features/checkout/stores/useCheckoutStore";
import { IconClockFilled } from "@tabler/icons-react";
import { InfoIcon, Loader2 } from "lucide-react"; // Tambah Loader2
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ModalConfirmCheckoutProps {
  open: boolean;
  data: any;
}

const ModalConfirmCheckout: FC<ModalConfirmCheckoutProps> = ({
  open,
  data,
}) => {
  const navigate = useNavigate();
  const resetCheckout = useCheckoutStore((state) => state.resetCheckout);

  const goTransaksi = () => {
    resetCheckout();
    navigate("/history");
  };

  const handleBackToHome = () => {
    resetCheckout();
    navigate("/");
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("Nomor VA berhasil disalin!");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && data) {
          // Jika ingin mengizinkan tutup manual setelah data ada
          // setOpenModalConfirm(false)
        }
      }}
    >
      <DialogPortal>
        <DialogOverlay className="bg-black/50 backdrop-blur-sm">
          <DialogTitle className="sr-only">Konfirmasi Pembayaran</DialogTitle>
          <DialogDescription className="sr-only">
            Detail instruksi pembayaran virtual account
          </DialogDescription>

          <DialogContent
            className="p-6 outline-none sm:max-w-[425px]"
            onPointerDownOutside={(e) => {
              if (!data) e.preventDefault();
            }}
            onEscapeKeyDown={(e) => {
              if (!data) e.preventDefault();
            }}
          >
            {/* TAMPILAN LOADING JIKA DATA BELUM ADA */}
            {!data ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="h-10 w-10 text-blue-700 animate-spin" />
                <p className="text-sm font-medium text-neutral-500">
                  Sedang memproses transaksi...
                </p>
              </div>
            ) : (
              /* TAMPILAN KONTEN ASLI JIKA DATA SUDAH ADA */
              <div className="flex flex-col gap-5">
                {/* Header Status */}
                <div className="flex flex-col justify-center items-center gap-2">
                  <h5 className="text-center text-2xl font-bold text-neutral-900">
                    Pembayaran
                  </h5>
                  <IconClockFilled
                    className="text-orange-500 animate-pulse"
                    size={45}
                  />
                  <label className="font-semibold text-neutral-700">
                    Menunggu Pembayaran
                  </label>
                </div>

                {/* Timer Section */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                    <h5 className="text-sm text-neutral-600">
                      Selesaikan Pembayaran dalam
                    </h5>
                    <span className="text-orange-600 font-bold text-lg font-mono">
                      23:59:59
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-md p-3">
                    <InfoIcon size={16} className="text-blue-600" />
                    <p className="text-[12px] text-blue-700 leading-tight">
                      Selesaikan pembayaran sebelum waktu habis untuk
                      menghindari pembatalan otomatis.
                    </p>
                  </div>
                </div>

                {/* VA Detail Section */}
                <div className="flex flex-col gap-4 border-t pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-md border border-neutral-200 flex flex-col justify-center items-center bg-white shadow-sm font-bold text-blue-700 uppercase">
                      {data.paymentMethod}
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs text-neutral-500">
                        Metode Pembayaran
                      </label>
                      <span className="font-bold text-neutral-900">
                        {data.paymentLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                    <div className="flex flex-col">
                      <label className="text-xs text-neutral-500 mb-1">
                        Nomor Virtual Account
                      </label>
                      <span className="font-mono text-lg font-bold tracking-wider text-neutral-800">
                        {data.vaNumber}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(data.vaNumber)}
                      className="text-blue-600 font-bold text-sm hover:underline"
                    >
                      Salin
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col w-2/3">
                      <label className="font-bold text-neutral-900">
                        Total Pembayaran
                      </label>
                      <span className="text-[11px] text-neutral-500 leading-tight">
                        Sudah termasuk biaya admin {data.paymentMethod} sebesar
                        Rp
                        {data.adminFee?.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <label className="text-xl font-bold text-blue-700">
                      Rp{data.totalAmount?.toLocaleString("id-ID")}
                    </label>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBackToHome}
                    className="cursor-pointer w-full text-center text-blue-700 border border-blue-700 hover:bg-blue-800 hover:text-white py-2 rounded-xl font-bold transition-colors shadow-lg shadow-blue-100"
                  >
                    Belanja Lagi
                  </button>
                  <button
                    onClick={goTransaksi}
                    className="cursor-pointer w-full text-center text-white bg-blue-700 hover:bg-blue-800 py-2 rounded-xl font-bold transition-colors shadow-lg shadow-blue-100"
                  >
                    Lihat Transaksi
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};

export default ModalConfirmCheckout;
