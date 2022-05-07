export interface ProductDetailEntity {
  id: string;
  name: string;
  stock: number;
  images: string[];
  price: number;
  description: string;
  sku: string;
  categories: string[];
}