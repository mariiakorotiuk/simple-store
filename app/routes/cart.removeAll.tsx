import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { commitSession, getSession } from "~/services/session.server";
import { createCart } from "~/services/cart.server";

export const action = async ({ request }: ActionFunctionArgs ) => {
  const formData = await request.formData();
  const productId = formData.get("productId");
  invariant(typeof productId === "string", "Missing productId");

  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);

  cart.removeAll(productId);
  return redirect("/cart", { headers: { "Set-Cookie": await commitSession(session) } } );
}
