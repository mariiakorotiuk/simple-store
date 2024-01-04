import { Link, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Product } from "../../../services/product.sever.";
import AddToCart from "./AddToCart/AddToCart";
import invariant from "tiny-invariant";
import { CartItem } from "~/services/cart.server";
import type { loader as rootLoader } from "~/root";
import styles from "./styles.module.css";

interface ProductListItemProps {
  product: Product
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  invariant(rootData, "rootData is required");

  const quantity = rootData.cart.find((item: CartItem) => Number(item.productId) === product.id)?.quantity || 0;
  
  return (
    <div className={styles.root}>
    <img src={product.thumbnail} alt={product.title} />
    <div className={styles.info}>
      <Link to={`products/${product.id}`}>
        <h2 className={styles.name}>{product.title}</h2>
      </Link>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>{product.price}$</p>
      <AddToCart product={product} quantity={quantity} />
    </div>
  </div>
  )
};

ProductListItem.displayName = "ProductListItem";

export default ProductListItem;