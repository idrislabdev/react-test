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
  userId: number; // Ubah ke number agar konsisten dengan payload di CheckOutPage
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
  // Simpan transaksi baru
  createTransaction: async (data: ITransaction) => {
    // data.userId di sini sudah dipastikan Number dari CheckOutPage
    const response = await axiosInstance.post("/transactions", data);
    return response.data;
  },

  // Ambil history dengan pagination ala json-server v1
  getTransactionHistory: async (
    userId: number,
    page: number = 1,
  ): Promise<any> => {
    try {
      const queryParams: any = {
        userId: userId, // userId sudah number dari parameter
        _page: page,
        _per_page: 5,
        _sort: "-createdAt", // Tanda minus (-) berarti Descending di v1
      };

      const response = await axiosInstance.get<any>("transactions", {
        params: queryParams,
      });

      return {
        // json-server v1 membungkus array di dalam properti 'data' jika pakai pagination
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
