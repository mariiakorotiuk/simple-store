import { Category } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";

export const getCategories = async (): Promise<Category[]> => {
  return prisma.category.findMany();
}

export const createCategories = async (categories: string[]): Promise<Category[]> => {
  const promises = categories.map((category) =>  new Promise ((resolve, reject) => {
    prisma.category.create({
      data: {
        name: category,
      },
    })
    .then((createdCategory) => resolve(createdCategory))
    .catch(() => reject(category));
  }));

  const results = await Promise.allSettled(promises);

  return (results
    .filter(result => result.status === "fulfilled") as PromiseFulfilledResult<any>[])
    .map(result => result.value);
}
