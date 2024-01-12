import { createCategories, getCategories } from "./category.server";
import { getDummyCategories, getDummyProducts } from "./dummy.sever"
import { ProductData, createProducts } from "./product.sever";

export const importCategories = async () => {
  const dummyCategories = await getDummyCategories();
  const dummyProducts = await getDummyProducts();

  const createdCategories = await createCategories(dummyCategories);

  const categories = await getCategories();

  const productDataList: ProductData[] = [];
  dummyProducts.products.forEach(product => {
    const {category, ...productData} = product;
    const categoryId = categories.find(item => item.name === category)?.id;
    if (categoryId) {
      productDataList.push({
        ...productData,
        categoryId,
        price: Number(productData.price)
      })
    }
  });

  const createdProducts = await createProducts(productDataList);

  return {
    createdCategories,
    createdProducts
  };
}