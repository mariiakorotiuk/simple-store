
import { Product } from "../../../../services/product.sever";
import { useFetcher } from "@remix-run/react";
import styles from "./styles.module.css";

interface AddToCartProps {
  product: Product;
  quantity: number;
}

const AddToCart: React.FC<AddToCartProps> = ({ product, quantity }) => {
  const fetcher = useFetcher();
  
  return (
    <fetcher.Form method="post" action={`products/${product.id}`}>
      <input name="productId" type="hidden" value={product.id} />
      <button className={styles.root}>
        {quantity ? "Add more" : "Add to Cart"}
      </button>
    </fetcher.Form>
  )
}

export default AddToCart;
