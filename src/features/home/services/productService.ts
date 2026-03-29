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
        _per_page: limit,
      };

      if (search) {
        queryParams.name = search;
      }

      if (provider && provider !== "all") {
        queryParams.provider = provider;
      }

      if (maxPrice && maxPrice !== "all") {
        queryParams.price_lte = Number(maxPrice);
      }

      if (minQuota && minQuota !== "all") {
        queryParams.quota_gte = Number(minQuota);
      }

      const response = await axiosInstance.get<any>("products", {
        params: queryParams,
      });

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
      const { data } = await axiosInstance.get<any>("products", {
        params: {
          is_best_deal: true,
        },
      });
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
