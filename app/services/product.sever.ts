import { Product } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";

export type ProductData = {
  brand: string;
  categoryId: number;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
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
  const limits = 10;
  const total = await prisma.product.count({
    where: {
      title: {
        contains: productListFilter.search
      },
      ...(productListFilter.categories.length > 0 && {
        category: {
          name: {
            in: productListFilter.categories,
          },
        },
      }),
    }
  });

  const currentPage = productListFilter.page > Math.ceil(total / limits) ? 1 : productListFilter.page;
  const skip = (currentPage - 1) * limits;

  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: productListFilter.search
      },
      ...(productListFilter.categories.length > 0 && {
        category: {
          name: {
            in: productListFilter.categories,
          },
        },
      }),
    },
    orderBy: {
      title: productListFilter.sorting === "desc" ? "desc" : "asc"
    },
    skip,
    take: limits,
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  
  return {
    total,
    skip,
    limits,
    page: currentPage,
    products,
  };
}

export const getProduct = async (productId: number): Promise<Product | null> => {
  return await prisma.product.findFirst({ 
    where: {
      id: productId
    }
  });
}

export const getCartProducts = async (idList: number[]): Promise<Product[]> => {
  return prisma.product.findMany({
    where: {
      id: {
        in: idList
      }
    }
  })
}

export const createProduct = async (product: ProductData): Promise<Product> => {
  return prisma.product.create({
    data: product,
  });
}

export const createProducts = async (products: ProductData[]): Promise<Product[]> => {
  const promises = products.map((product) =>  new Promise ((resolve, reject) => {
    prisma.product.create({
      data: product,
    })
    .then((createdProduct) => resolve(createdProduct))
    .catch(() => reject(product));
  }));

  const results = await Promise.allSettled(promises);

  return (results
    .filter(result => result.status === "fulfilled") as PromiseFulfilledResult<any>[])
    .map(result => result.value);
}