import { LoaderFunction, LoaderFunctionArgs, MetaFunction, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import ProductList from "../components/ProductList/ProductList";
import { ProductListFilter, getProducts } from "../services/product.sever";
import { getCategories } from "~/services/category.server";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs)  => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const productListFilter: ProductListFilter = {
    categories: url.searchParams.getAll("category"),
    search: url.searchParams.get("search") || "",
    sorting: url.searchParams.get("sorting") || "asc",
    page,
  }
  
  const products = await getProducts(productListFilter);
  if (!products) {
    throw new Response("Not Found", { status: 404 });
  }

  if (products.page !== page) {
    url.searchParams.set("page", products.page.toString());
    return redirect(`/?${url.searchParams.toString()}`);
  }

  const categories = await getCategories();

  return json({
    products,
    categories
  });
}

export const meta: MetaFunction = () => {
  return [
    {
      title: "Simple Strore"
    }
  ]
}

export default function Home() {  
  const data = useLoaderData<typeof loader>();

  console.log(data)

  return (
    <ProductList
      products={data.products.products}
      categories={data.categories}
      limits={data.products.limits}
      currentPage={data.products.page}
      total={data.products.total}
    />
  )
}