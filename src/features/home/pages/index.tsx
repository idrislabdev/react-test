import { useEffect, useState } from "react";
import { IconFlameFilled, IconPackage } from "@tabler/icons-react";
import { productService } from "@/features/home/services/productService";
import type { IProduct } from "@/features/home/types";

import { CardMain } from "@/features/home/components/card-main";
import CardPotrait from "@/features/home/components/card-potrait";
import { useSearchParams } from "react-router-dom";

const SkeletonBestDeal = () => (
  <div className="w-1/4 h-[340px] bg-white border border-neutral-100 rounded-[2rem] p-5 animate-pulse flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-neutral-200 rounded-lg" />
      <div className="h-3 w-16 bg-neutral-100 rounded" />
    </div>
    <div className="flex flex-col gap-2">
      <div className="h-10 w-20 bg-neutral-200 rounded-xl" />
      <div className="h-3 w-32 bg-neutral-50 rounded" />
    </div>
    <div className="mt-auto space-y-3">
      <div className="h-5 w-24 bg-neutral-100 rounded-md" />
      <div className="h-12 w-full bg-neutral-200 rounded-2xl" />
    </div>
  </div>
);

const SkeletonCardMain = () => (
  <div className="flex items-center justify-between bg-white border border-neutral-100 rounded-3xl p-5 animate-pulse">
    <div className="flex items-center gap-5 flex-1">
      <div className="w-14 h-14 bg-neutral-200 rounded-2xl" />
      <div className="space-y-3">
        <div className="h-3 w-24 bg-neutral-100 rounded" />
        <div className="h-6 w-40 bg-neutral-200 rounded" />
      </div>
    </div>
    <div className="h-10 w-32 bg-neutral-200 rounded-xl" />
  </div>
);

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [bestDeals, setBestDeals] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalData, setTotalData] = useState(0);

  const [loading, setLoading] = useState(false);
  const [loadingDeals, setLoadingDeals] = useState(true);

  const currentProvider = searchParams.get("provider") || "";
  const currentPrice = searchParams.get("price") || "";
  const currentQuota = searchParams.get("quota") || "";
  const currentSearch = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const setPage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  useEffect(() => {
    const fetchBestDeals = async () => {
      try {
        const res = await productService.getBestDeals();
        setTimeout(() => {
          setBestDeals(res);
          setLoadingDeals(false);
        }, 800);
      } catch (error) {
        setLoadingDeals(false);
      }
    };
    fetchBestDeals();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getAllProducts({
          page,
          provider: currentProvider,
          maxPrice: currentPrice,
          minQuota: currentQuota,
          search: currentSearch,
        });

        setTimeout(() => {
          setProducts((prev) =>
            page === 1 ? res.data : [...prev, ...res.data],
          );
          setTotalData(res.total);
          setLoading(false);
        }, 800);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, currentProvider, currentPrice, currentQuota, currentSearch]);

  return (
    <div className="min-h-screen bg-neutral-50/50 pb-20">
      <div className="flex flex-col gap-12 py-38 px-10 mx-auto max-w-310">
        {/* SECTION: BEST DEALS */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-2xl">
              <IconFlameFilled size={28} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-neutral-900 text-2xl font-black tracking-tight">
                Best Deals
              </h2>
              <p className="text-sm text-neutral-500 font-medium">
                Promo paling hemat hari ini
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            {loadingDeals ? (
              <>
                <SkeletonBestDeal /> <SkeletonBestDeal />
                <SkeletonBestDeal /> <SkeletonBestDeal />
              </>
            ) : (
              bestDeals.map((item) => (
                <div
                  key={item.id}
                  className="w-1/4 transition-transform hover:scale-[1.02]"
                >
                  <CardPotrait product={item} />
                </div>
              ))
            )}
          </div>
        </section>

        {/* SECTION: SEMUA PAKET */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-2xl">
              <IconPackage size={28} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-neutral-900 text-2xl font-black tracking-tight">
                Semua Paket
              </h2>
              <p className="text-sm text-neutral-500 font-medium">
                Pilihan kuota lengkap sesuai kebutuhan
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Data List */}
            {products.map((item) => (
              <CardMain key={item.id} product={item} />
            ))}

            {/* Skeleton saat Load More atau Loading Awal */}
            {loading && (
              <div className="flex flex-col gap-4">
                {[...Array(page === 1 ? 5 : 2)].map((_, i) => (
                  <SkeletonCardMain key={i} />
                ))}
              </div>
            )}
          </div>

          {/* Load More Button */}
          {!loading && products.length < totalData && (
            <div className="flex justify-center">
              <button
                onClick={() => setPage(page + 1)}
                className="cursor-pointer group flex items-center gap-3 px-12 py-4 bg-white border-2 border-neutral-100 text-neutral-700 rounded-3xl font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95 shadow-sm hover:shadow-blue-100"
              >
                Lihat Lebih Banyak Paket
              </button>
            </div>
          )}

          {/* End of List Info */}
          {!loading && products.length >= totalData && products.length > 0 && (
            <p className="text-center text-neutral-400 text-xs font-bold uppercase tracking-widest mt-10">
              — Anda telah melihat semua paket —
            </p>
          )}
        </section>
      </div>
    </div>
  );
};
