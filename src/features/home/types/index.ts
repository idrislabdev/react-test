export interface IProduct {
  id: number;
  name: string;
  provider: string;
  duration: number;
  quota: number;
  price: number;
  stock: number;
  description: string;
  is_best_deal: boolean;
}

export interface IProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  provider?: string;
  maxPrice?: string;
  minQuota?: string;
  quotaRange?: string;
}

export interface IProductResponse {
  data: IProduct[];
  total: number;
}
