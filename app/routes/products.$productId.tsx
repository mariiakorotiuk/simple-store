import { ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import { Link, UIMatch, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Product, getProduct } from "../services/product.sever";
import ProductData from "../components/ProductData/ProductData";
import { commitSession, getSession } from "../services/session.server";
import { CartItem, createCart } from "../services/cart.server";
import type { loader as rootLoader } from "../root"; 

interface MatchData {
  product: Product;
}

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs)  => {
  invariant(params.productId, "Missing productId param");
  const product = await getProduct(params.productId);
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ product });
}

export const action = async ({ request }: ActionFunctionArgs ) => {
  const formData = await request.formData();
  const productId = formData.get("productId");
  invariant(typeof productId === "string", "Missing productId");

  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);

  cart.add(productId);

  return json({ success: true }, { headers: { "Set-Cookie": await commitSession(session) } });
}

export const meta:MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `Simple Store | ${data.product.title}`
    }
  ]
}

export const handle = {
  breadcrumb: (match: UIMatch) => <Link to={`products/${match.params.productId}`}>{(match.data as MatchData).product.title}</Link>
}

export default function ProductPage() {
  const data = useLoaderData<typeof loader>();
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  invariant(rootData, "rootData is required");

  const quantity = rootData.cart.find((item: CartItem) => Number(item.productId) === data.product.id)?.quantity || 0;

  return (
    <ProductData product={data.product} quantity={quantity} />
  )
}