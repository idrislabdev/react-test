import {
  type IProduct,
  type IProductQueryParams,
  type IProductResponse,
} from "@/features/home/types";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/json",
  },
});

export const productService = {
  getAllProducts: async (
    params: IProductQueryParams,
  ): Promise<IProductResponse> => {
    try {
      // Destructure parameter sesuai yang dikirim dari HomePage
      const {
        page = 1,
        limit = 10,
        search,
        provider,
        maxPrice,
        minQuota,
      } = params;

      const queryParams: any = {
        _page: page,
        _per_page: limit, // json-server v1+
      };

      // 1. Filter Pencarian (Nama Produk)
      if (search) {
        // Menggunakan q (full-text search) atau name_like tergantung versi json-server
        queryParams.name = search;
      }

      // 2. Filter Provider
      if (provider && provider !== "all") {
        queryParams.provider = provider;
      }

      // 3. Filter Harga (Max Price)
      if (maxPrice && maxPrice !== "all") {
        // Menggunakan _lte (Less Than or Equal) untuk mencari harga di bawah nominal
        queryParams.price_lte = Number(maxPrice);
      }

      // 4. Filter Kuota (Min Quota)
      if (minQuota && minQuota !== "all") {
        // Menggunakan _gte (Greater Than or Equal) untuk mencari kuota di atas nominal
        queryParams.quota_gte = Number(minQuota);
      }

      const response = await axiosInstance.get<any>("products", {
        params: queryParams,
      });

      // Mapping response agar kompatibel dengan json-server v1 (yang mengembalikan { data, items, pages })
      // atau json-server v0 (yang mengembalikan array langsung)
      const isV1 = response.data.data !== undefined;

      return {
        data: isV1 ? response.data.data : response.data,
        total: isV1
          ? response.data.items
          : parseInt(response.headers["x-total-count"] || "0"),
      };
    } catch (error) {
      console.error("error fetching product:", error);
      throw error;
    }
  },

  getBestDeals: async (): Promise<IProduct[]> => {
    try {
      // Kita ambil data best deals tanpa pagination agar tampil semua di slider/grid atas
      const { data } = await axiosInstance.get<any>("products", {
        params: {
          is_best_deal: true,
        },
      });
      // Handle jika response berformat json-server v1
      return data.data || data;
    } catch (error) {
      console.error("Error fetching best deals", error);
      return [];
    }
  },

  getProductById: async (id: number | string) => {
    try {
      const { data } = await axiosInstance.get<IProduct>(`products/${id}`);
      return data;
    } catch (error) {
      console.error("Error fetching product by id", error);
      throw error;
    }
  },
};
