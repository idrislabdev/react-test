import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FilterX } from "lucide-react"; // Database icon untuk kuota
import { useSearchParams } from "react-router-dom";

const HomeHeaderFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const currentProvider = searchParams.get("provider") || "Semua Provider";
  const currentPrice = searchParams.get("price")
    ? `Up to Rp${parseInt(searchParams.get("price")!).toLocaleString("id-ID")}`
    : "Semua Harga";
  const currentQuota = searchParams.get("quota")
    ? `${searchParams.get("quota")} GB+`
    : "Semua Kuota";

  return (
    <div className="flex items-center w-full mx-auto max-w-310 px-10 gap-3 py-4 bg-white border-b border-neutral-100 shadow-sm transition-all">
      {/* Filter Provider */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 cursor-pointer bg-neutral-50 hover:bg-white hover:border-blue-400 text-neutral-700 border border-neutral-200 outline-0 rounded-xl px-4 py-2 text-sm font-bold transition-all">
            <span className="text-neutral-400 font-medium">Provider:</span>{" "}
            {currentProvider}
            <ChevronDown size={16} className="text-neutral-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white border border-neutral-200 p-1 shadow-xl rounded-xl z-[60]">
          <DropdownMenuItem
            onClick={() => updateFilter("provider", "all")}
            className="font-bold cursor-pointer"
          >
            Semua Provider
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("provider", "Telkomsel")}
            className="cursor-pointer"
          >
            Telkomsel
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("provider", "Indosat")}
            className="cursor-pointer"
          >
            Indosat
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("provider", "XL Axiata")}
            className="cursor-pointer"
          >
            XL Axiata
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("provider", "Three")}
            className="cursor-pointer"
          >
            Three
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filter Kuota (BARU) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 cursor-pointer bg-neutral-50 hover:bg-white hover:border-blue-400 text-neutral-700 border border-neutral-200 outline-0 rounded-xl px-4 py-2 text-sm font-bold transition-all">
            <span className="text-neutral-400 font-medium">Kuota:</span>{" "}
            {currentQuota}
            <ChevronDown size={16} className="text-neutral-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white border border-neutral-200 p-1 shadow-xl rounded-xl z-[60]">
          <DropdownMenuItem
            onClick={() => updateFilter("quota", "all")}
            className="font-bold cursor-pointer"
          >
            Semua Kuota
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("quota", "5")}
            className="cursor-pointer"
          >
            Di atas 5 GB
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("quota", "15")}
            className="cursor-pointer"
          >
            Di atas 15 GB
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("quota", "50")}
            className="cursor-pointer"
          >
            Di atas 50 GB
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("quota", "100")}
            className="cursor-pointer"
          >
            Unlimited / 100GB+
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filter Harga */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 cursor-pointer bg-neutral-50 hover:bg-white hover:border-blue-400 text-neutral-700 border border-neutral-200 outline-0 rounded-xl px-4 py-2 text-sm font-bold transition-all">
            <span className="text-neutral-400 font-medium">Harga:</span>{" "}
            {currentPrice}
            <ChevronDown size={16} className="text-neutral-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white border border-neutral-200 p-1 shadow-xl rounded-xl z-[60]">
          <DropdownMenuItem
            onClick={() => updateFilter("price", "all")}
            className="font-bold cursor-pointer"
          >
            Semua Harga
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("price", "25000")}
            className="cursor-pointer"
          >
            Di bawah Rp25.000
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("price", "50000")}
            className="cursor-pointer"
          >
            Di bawah Rp50.000
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("price", "100000")}
            className="cursor-pointer"
          >
            Di bawah Rp100.000
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilter("price", "200000")}
            className="cursor-pointer"
          >
            Di bawah Rp200.000
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Button */}
      {(searchParams.get("provider") ||
        searchParams.get("price") ||
        searchParams.get("quota") ||
        searchParams.get("search")) && (
        <button
          onClick={() => setSearchParams({})}
          className="ml-auto text-xs font-black text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-transparent hover:border-red-100"
        >
          <FilterX size={14} /> RESET
        </button>
      )}
    </div>
  );
};

export default HomeHeaderFilter;
