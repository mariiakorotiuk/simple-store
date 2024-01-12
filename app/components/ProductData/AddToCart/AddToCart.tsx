
import { Form } from "@remix-run/react";
import { Product } from "../../../services/product.sever";
import styles from "./styles.module.css";

interface AddToCartProps {
  product: Product;
  quantity: number;
}

const AddToCart: React.FC<AddToCartProps> = ({ product, quantity }) => {
  return (
    <Form method="post">
      <input name="productId" type="hidden" value={product.id} />
      <button className={styles.root}>
        {quantity ? "Add more" : "Add to Cart"}
      </button>
    </Form>
  )
}

export default AddToCart;
