import type { IProduct } from "@/features/home/types";
import * as Icons from "@tabler/icons-react";
import { Link } from "react-router-dom";

const CardPotrait = ({ product }: { product: IProduct }) => {
  const getProviderIcon = (name: string) => {
    const firstLetter = name.charAt(0).toUpperCase();
    const IconComponent = (Icons as any)[
      `IconHexagonLetter${firstLetter}Filled` || `IconHexagonFilled`
    ];

    return IconComponent ? (
      <IconComponent size={24} />
    ) : (
      <Icons.IconHexagonFilled size={24} />
    );
  };

  return (
    <div className="flex flex-col bg-white border border-neutral-200 rounded-[2rem] p-5 gap-4 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 relative overflow-hidden group h-[340px]">
      {/* Header: Provider */}
      <div className="flex items-center gap-2 relative z-10">
        <span className="text-blue-700 p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-700 group-hover:text-white transition-colors">
          {getProviderIcon(product.provider)}
        </span>
        <h5 className="text-neutral-400 font-bold text-[10px] uppercase tracking-widest leading-none">
          {product.provider}
        </h5>
      </div>

      {/* Body: Konten Utama */}
      <div className="flex flex-col relative z-10">
        <div className="flex items-baseline gap-1">
          <label className="text-neutral-900 text-4xl font-black tracking-tighter">
            {product.quota}
          </label>
          <span className="text-lg font-black text-neutral-900">GB</span>
        </div>
        <p className="text-[11px] text-neutral-400 font-bold uppercase mt-0.5">
          Aktif {product.duration} Hari
        </p>

        {/* Deskripsi: Dibatasi agar tidak membuat kartu memanjang */}
        <p className="text-[11px] text-neutral-500 mt-3 line-clamp-2 leading-relaxed opacity-80">
          {product.description ||
            "Internet cepat tanpa batas untuk aktivitas harianmu."}
        </p>
      </div>

      {/* Footer: Harga & Button (Ditarik ke bawah) */}
      <div className="flex flex-col gap-3 mt-auto relative z-10">
        <div className="flex flex-col">
          <span className="text-[9px] text-neutral-400 font-black uppercase tracking-tighter">
            Mulai Dari
          </span>
          <label className="text-xl font-black text-orange-500 leading-none">
            Rp{product.price.toLocaleString("id-ID")}
          </label>
        </div>

        <Link
          to={`/detail?id=${product.id}`}
          className="flex items-center justify-center bg-blue-700 text-white font-bold text-xs py-3.5 rounded-xl hover:bg-blue-800 shadow-md hover:shadow-blue-100 transition-all active:scale-95"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
};

export default CardPotrait;
