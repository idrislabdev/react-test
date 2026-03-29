import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { IconClockFilled } from "@tabler/icons-react";
import { Loader2, Phone } from "lucide-react";
import type { Dispatch, FC, SetStateAction } from "react";

interface ModalDetailHistoryProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: any;
}

const ModalDetailHistory: FC<ModalDetailHistoryProps> = ({
  open,
  setOpen,
  data,
}) => {
  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("Nomor VA berhasil disalin!");
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50 backdrop-blur-sm">
          <DialogContent className="p-6 outline-none sm:max-w-98 overflow-hidden">
            {!data ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="h-10 w-10 text-blue-700 animate-spin" />
                <p className="text-sm font-medium text-neutral-500">
                  Memproses...
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {data.status === "PENDING" && (
                  <div className="flex flex-col justify-center items-center gap-2 pb-2">
                    <IconClockFilled
                      className="text-orange-500 animate-pulse"
                      size={40}
                    />
                    <label className="font-bold text-neutral-800">
                      Menunggu Pembayaran
                    </label>
                  </div>
                )}

                <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                      {data.provider}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${data.status === "SUCCESS" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                    >
                      {data.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-neutral-900">
                    {data.productName}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1 text-neutral-500 text-sm">
                    <Phone size={12} />
                    <span>{data.phoneNumber}</span>
                  </div>
                </div>

                {data.status === "PENDING" ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between px-1">
                        <h5 className="text-[10px] text-neutral-400 uppercase font-bold">
                          Batas Waktu
                        </h5>
                        <span className="text-orange-600 font-bold text-sm font-mono">
                          23:59:59
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 border-t border-dashed pt-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-10 h-10 rounded bg-neutral-100 flex items-center justify-center font-bold text-blue-700">
                          {data.paymentMethod}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-neutral-400">
                            Metode Pembayaran
                          </span>
                          <span className="font-bold">{data.paymentLabel}</span>
                        </div>
                      </div>

                      <div className="flex items-end justify-between bg-neutral-900 p-4 rounded-xl">
                        <div className="flex flex-col">
                          <label className="text-[10px] font-bold text-neutral-400 mb-1 uppercase">
                            Nomor Virtual Account
                          </label>
                          <span className="font-mono text-lg font-bold tracking-widest text-white">
                            {data.vaNumber}
                          </span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(data.vaNumber)}
                          className="text-blue-400 font-bold text-xs hover:text-blue-300"
                        >
                          Salin
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-4 text-center border-t border-dashed">
                    <p className="text-sm text-neutral-500">
                      Transaksi ini telah selesai diproses.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between py-3 border-t border-b border-neutral-100">
                  <span className="font-bold text-neutral-800">Total</span>
                  <span className="text-xl font-black text-blue-700">
                    Rp{data.totalAmount?.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="flex-1 py-2.5 border rounded-xl text-sm font-bold text-neutral-500 cursor-pointer hover:bg-blue-600 hover:text-white"
                  >
                    Tutup
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

export default ModalDetailHistory;
