import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/json",
  },
});

export interface ITransaction {
  id: string;
  userId: number;
  productId: number;
  productName: string;
  provider: string;
  phoneNumber: string;
  price: number;
  adminFee: number;
  totalAmount: number;
  paymentMethod: string;
  paymentLabel: string;
  status: string;
  vaNumber: string;
  createdAt: string;
}

export const transactionService = {
  createTransaction: async (data: ITransaction) => {
    const response = await axiosInstance.post("/transactions", data);
    return response.data;
  },

  getTransactionHistory: async (
    userId: number,
    page: number = 1,
  ): Promise<any> => {
    try {
      const queryParams: any = {
        userId: userId,
        _page: page,
        _per_page: 5,
        _sort: "-createdAt",
      };

      const response = await axiosInstance.get<any>("transactions", {
        params: queryParams,
      });

      return {
        data: response.data.data || response.data,
        total:
          response.data.items ||
          parseInt(response.headers["x-total-count"] || "0"),
      };
    } catch (error) {
      console.error("Error fetching history:", error);
      throw error;
    }
  },
};
