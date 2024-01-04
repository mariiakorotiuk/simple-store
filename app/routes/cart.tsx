import { Product, getCartProducts, getProducts } from "~/services/product.sever.";
import Cart from "../components/Cart/Cart";
import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
import { Link, UIMatch, useLoaderData } from "@remix-run/react";
import { createCart } from "~/services/cart.server";
import { getSession } from "~/services/session.server";

export interface CartProduct extends Product {
  quantity: number
}

export const loader: LoaderFunction = async ({ request })  => {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);
  const cartItems = cart.items();

  const idList = cartItems.map(item => Number(item.productId));
  const cartProducts = await getCartProducts(idList);
  if (!cartProducts) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ 
    ...cartProducts,
    products: cartProducts.products.map((product: Product): CartProduct => ({
        ...product,
        quantity: cartItems.find(item => Number(item.productId) === product.id)?.quantity || 0
      }))
  });
}

export const meta:MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: "Simple Store | Cart"
    }
  ]
}

export const handle = {
  breadcrumb: (match: UIMatch) => <Link to="cart">Cart</Link>
}

export default function CartPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <Cart cartProducts={data.products} />
  )
}