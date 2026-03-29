import type { IProduct } from "@/features/home/types";
import * as Icons from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const CardMain = ({ product }: { product: IProduct }) => {
  const getProviderIcon = (name: string) => {
    const firstLetter = name.charAt(0).toUpperCase();
    const IconComponent = (Icons as any)[
      `IconHexagonLetter${firstLetter}Filled` || `IconHexagonFilled`
    ];

    return IconComponent ? (
      <IconComponent size={28} />
    ) : (
      <Icons.IconHexagonFilled size={28} />
    );
  };

  return (
    <div className="group flex items-center justify-between bg-white border border-neutral-200 rounded-3xl p-5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300">
      <div className="flex items-center gap-5">
        {/* Provider Icon Container */}
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          {getProviderIcon(product.provider)}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">
            <span>{product.provider}</span>
            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
            <span>{product.duration} Hari</span>
          </div>
          <h3 className="text-xl font-black text-neutral-900 group-hover:text-blue-700 transition-colors">
            {product.quota}GB{" "}
            <span className="text-sm font-medium text-neutral-500">
              Kuota Utama
            </span>
          </h3>
          <p className="text-sm text-neutral-400 font-medium leading-tight">
            {product.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-1">
            Harga Paket
          </p>
          <p className="text-xl font-black text-orange-500">
            Rp{product.price.toLocaleString("id-ID")}
          </p>
        </div>

        <Link
          to={`/detail?id=${product.id}`}
          className="flex items-center justify-center bg-blue-700 text-white font-bold text-sm py-3 px-6 rounded-2xl hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
        >
          Detail
        </Link>
      </div>
    </div>
  );
};
