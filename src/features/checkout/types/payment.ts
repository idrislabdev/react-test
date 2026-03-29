export interface IPaymentMethod {
  id: string;
  name: string;
  label: string;
  adminFee: number;
  type: "VA" | "E-Wallet" | "Debit";
}

export const PAYMENT_METHODS: IPaymentMethod[] = [
  {
    id: "bca",
    name: "BCA",
    label: "Virtual Account BCA",
    adminFee: 1500,
    type: "VA",
  },
  {
    id: "mandiri",
    name: "Mandiri",
    label: "Virtual Account Mandiri",
    adminFee: 1500,
    type: "VA",
  },
  {
    id: "bni",
    name: "BNI",
    label: "Virtual Account BNI",
    adminFee: 1500,
    type: "VA",
  },
  {
    id: "bri",
    name: "BRI",
    label: "Virtual Account BRI",
    adminFee: 1500,
    type: "VA",
  },
  {
    id: "bsi",
    name: "BSI",
    label: "Virtual Account BSI",
    adminFee: 1500,
    type: "VA",
  },
];
