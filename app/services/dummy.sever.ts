export type DummyProduct = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: string;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export type ProductsResponse = {
  limits: number;
  skip: number;
  total: number;
  page: number;
  products: DummyProduct[];
}

export const getDummyProducts = async (): Promise<ProductsResponse> => {
  return fetch(`https://dummyjson.com/products`).then(response => response.json());
}

export const getProduct = async (productId: string): Promise<DummyProduct> => {
  return fetch(`https://dummyjson.com/products/${productId}`).then(response => response.json());
}

export const getDummyCategories = async (): Promise<string[]> => {
  return fetch('https://dummyjson.com/products/categories').then(res => res.json());
}