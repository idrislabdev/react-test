import { create } from "zustand";
import type { IProduct } from "@/features/home/types";
import type { IPaymentMethod } from "@/features/checkout/types/payment";
import { persist, createJSONStorage } from "zustand/middleware";

interface CheckoutState {
  product: IProduct | null;
  phoneNumber: string;
  selectedPayment: IPaymentMethod | null;

  // Actions
  setInitialCheckout: (product: IProduct, phone: string) => void;
  setPaymentMethod: (method: IPaymentMethod) => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      product: null,
      phoneNumber: "",
      selectedPayment: null,

      setInitialCheckout: (product, phone) =>
        set({ product, phoneNumber: phone, selectedPayment: null }),

      setPaymentMethod: (method) => set({ selectedPayment: method }),

      resetCheckout: () =>
        set({ product: null, phoneNumber: "", selectedPayment: null }),
    }),
    {
      name: "checkout_storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
