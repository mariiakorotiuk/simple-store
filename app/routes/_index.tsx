import { LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { Link, useLoaderData, useMatches } from "@remix-run/react";
import ProductList from "../components/ProductList/ProductList";
import { getProducts } from "../services/product.sever.";

export const loader: LoaderFunction = async ()  => {
  const products = await getProducts();
  if (!products) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ products });
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
  
  return (    
    <ProductList products={data.products.products} />
  )
}