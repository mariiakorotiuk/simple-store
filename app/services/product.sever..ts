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
  page: number;
  products: Product[];
}

export type ProductListFilter = {
  categories: string[];
  search: string;
  sorting: string;
  page: number;
}

export const getProducts = async (productListFilter: ProductListFilter): Promise<ProductsResponse> => {
  const limits = 8;
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();

  const sortedAndFilteredProducts = data.products
    .sort((product1: Product, product2: Product) =>
      productListFilter.sorting === "asc" ? product1.title.localeCompare(product2.title) : product2.title.localeCompare(product1.title)
    )
    .filter((product: Product) => {
      if (productListFilter.categories.length > 0 && !productListFilter.categories.includes(product.category)) {
        return false;
      }
      if (productListFilter.search && !product.title.toLowerCase().includes(productListFilter.search.toLowerCase())) {
        return false;
      }
      return true;
    });

  const total = sortedAndFilteredProducts.length;
  const currentPage = productListFilter.page > Math.ceil(total / limits) ? 1 : productListFilter.page;

  const start = (currentPage - 1) * limits;
  let end = start + limits;
  
  if (end > total) {
    end = total;
  }
  
  const slicedProducts = sortedAndFilteredProducts.slice(start, end);
  
  return {
    total,
    skip: start,
    limits,
    page: currentPage,
    products: slicedProducts,
  };
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

export const getCategories = async (): Promise<string[]> => {
  return fetch('https://dummyjson.com/products/categories').then(res => res.json());
}