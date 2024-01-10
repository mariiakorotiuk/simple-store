import { Form } from "@remix-run/react";
import { CartProduct } from "~/routes/cart";
import styles from "./srtyles.module.css";

interface ChangeQuantityProps {
  product: CartProduct;
  buttonText: string;
  action: string;
}

const ChangeQuantity: React.FC<ChangeQuantityProps> = ({ product, buttonText, action }) => {
  return (
    <Form method="post" action={action}>
      <input name="productId" type="hidden" value={product.id} />
      <button className={styles.root}>{buttonText}</button>
    </Form>
  )
};

export default ChangeQuantity;