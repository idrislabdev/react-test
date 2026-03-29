import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import {
  Receipt,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  History,
} from "lucide-react";
import {
  transactionService,
  type ITransaction,
} from "@/features/histories/services/transactionService";
import ModalDetailHistory from "@/features/histories/components/modal-detail";
import { SkeletonCard } from "@/features/histories/components/sekeleton";

const HistoryPage = () => {
  const { user } = useAuthStore();

  // State Data
  const [histories, setHistories] = useState<ITransaction[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);

  // State Modal
  const [openModal, setOpenModal] = useState(false);
  const [dataDetail, setDetaDetail] = useState<ITransaction>(
    {} as ITransaction,
  );

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      setIsLoading(true);
      const startTime = Date.now(); // Catat waktu mulai fetch

      try {
        const res = await transactionService.getTransactionHistory(
          Number(user.id),
          page,
        );

        // ARTIFICIAL DELAY: Minimal skeleton muncul selama 800ms
        const elapsedTime = Date.now() - startTime;
        const remainingDelay = Math.max(0, 800 - elapsedTime);

        setTimeout(() => {
          setHistories((prev) =>
            page === 1 ? res.data : [...prev, ...res.data],
          );
          setTotalData(res.total);
          setIsLoading(false);
        }, remainingDelay);
      } catch (error) {
        console.error("Gagal memuat riwayat:", error);
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [page, user?.id]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const hasMore = histories.length < totalData;

  const getStatusBadge = (status: string) => {
    const s = status?.toUpperCase();
    if (s === "PENDING")
      return (
        <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded text-[10px] font-bold border border-amber-100 uppercase">
          <Clock size={12} /> Pending
        </span>
      );
    if (s === "SUCCESS")
      return (
        <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[10px] font-bold border border-emerald-100 uppercase">
          <CheckCircle2 size={12} /> Berhasil
        </span>
      );
    return (
      <span className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-1 rounded text-[10px] font-bold border border-rose-100 uppercase">
        <XCircle size={12} /> Gagal
      </span>
    );
  };

  if (!user)
    return (
      <div className="p-20 text-center text-neutral-500">Silakan login.</div>
    );

  return (
    <>
      <div className="flex flex-col gap-4 py-20 px-10 mx-auto max-w-310 min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-700 rounded-md shadow-lg shadow-blue-100">
            <History className="text-white" size={20} />
          </div>
          <div>
            <h5 className="font-black text-neutral-900 text-lg">
              Riwayat Transaksi
            </h5>
            <p className="text-xs text-neutral-500">
              Lacak semua pembelian Anda
            </p>
          </div>
        </div>

        {/* List & Skeleton Logic */}
        <div className="flex flex-col gap-4">
          {/* Skeleton Load Awal */}
          {isLoading && page === 1 && (
            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Render Data jika TIDAK SEDANG LOADING (Halaman 1) atau memang sudah ada datanya */}
          {histories.length > 0 &&
            (!isLoading || page > 1) &&
            histories.map((trx) => (
              <div
                key={trx.id}
                className="group bg-white border border-neutral-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer relative"
                onClick={() => {
                  setDetaDetail(trx);
                  setOpenModal(true);
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-neutral-400 font-bold tracking-widest uppercase">
                      {trx.id}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {new Date(trx.createdAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  {getStatusBadge(trx.status)}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center font-black text-blue-700 text-[10px]">
                      {trx.provider.substring(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 group-hover:text-blue-700">
                        {trx.productName}
                      </h3>
                      <p className="text-xs text-neutral-400 font-medium">
                        {trx.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[9px] text-neutral-400 font-black uppercase">
                        Total
                      </p>
                      <p className="font-black text-neutral-900">
                        Rp{trx.totalAmount.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-neutral-300 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}

          {/* Skeleton Load More */}
          {isLoading && page > 1 && (
            <div className="flex flex-col gap-4">
              {[...Array(2)].map((_, i) => (
                <SkeletonCard key={`more-${i}`} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && histories.length === 0 && (
            <div className="text-center py-20 bg-white border-2 border-dashed rounded-3xl border-neutral-100">
              <Receipt size={48} className="mx-auto text-neutral-200 mb-3" />
              <p className="text-neutral-400 text-sm">Belum ada transaksi</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && !isLoading && (
          <div className="mt-8 text-center w-full flex flex-col justify-center items-center">
            <button
              onClick={handleLoadMore}
              className="cursor-pointer group flex items-center gap-3 px-12 py-4 bg-white border-2 border-neutral-100 text-neutral-700 rounded-3xl font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95 shadow-sm hover:shadow-blue-100"
            >
              Muat Transaksi Lainnya
            </button>
          </div>
        )}
      </div>

      <ModalDetailHistory
        open={openModal}
        setOpen={setOpenModal}
        data={dataDetail}
      />
    </>
  );
};

export default HistoryPage;
