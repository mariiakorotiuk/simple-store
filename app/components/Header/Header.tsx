import shoppingCartImage from "../../assets/images/shopping-cart.png";
import { Link, useRouteLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { loader } from "~/root";
import styles from "./styles.module.css";
import SearchForm from "./SearchForm/SearchForm";

const Header: React.FC = () => {
  const data = useRouteLoaderData<typeof loader>("root");
  invariant(data, "data is required");
  
  const quantity = data.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.root}>
      <h2>
        <Link to="/">Simple Store</Link>
      </h2>
      <SearchForm />
      <div className={styles.cart}>
        <p className={styles.quantity}>{quantity}</p>
        <Link to="cart">
          <img src={shoppingCartImage} alt="shopping cart" />
        </Link>
      </div>
    </div>
  )
}

export default Header;
