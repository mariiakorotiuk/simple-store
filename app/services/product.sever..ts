export type Product = {
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
  products: Product[];
}

export const getProducts = async (): Promise<ProductsResponse> => {
  return fetch('https://dummyjson.com/products').then(response => response.json());
}

export const getProduct = async (productId: string): Promise<ProductsResponse> => {
  return fetch(`https://dummyjson.com/products/${productId}`).then(response => response.json());
}

export const getCartProducts = async (idList: number[]): Promise<ProductsResponse> => {
  return fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => ({
      ...data,
      products: data.products.filter((product: Product) => idList.includes(product.id))
    }));
}
