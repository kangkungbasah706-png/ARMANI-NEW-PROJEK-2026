export interface Product {
  id: number;
  label: string;
  name: string;
  price: number;
  commission: number;
  profit: number;
  imageUrl: string;
  statusText: string;
  isVisible?: boolean;
  totalIncome?: number;
  isExclusive?: boolean;
}