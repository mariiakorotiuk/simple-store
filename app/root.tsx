import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import appStylesHref from "./app.css";
import { getSession } from "./services/session.server";
import { createCart } from "./services/cart.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref },
      { rel: "stylesheet", href: appStylesHref }]
    : [])
]

export const loader = async({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);

  return json({ cart: cart.items() });
}


export const handle = {
  breadcrumb: () => <Link to="/">Products</Link>
}

export default function App() {
  const navigation = useNavigation();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Breadcrumb />
        {navigation.state === "loading" ?
          <Loader /> :
          <Outlet />}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
