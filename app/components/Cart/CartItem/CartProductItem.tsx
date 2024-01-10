import { Link } from "@remix-run/react";
import { CartProduct } from "~/routes/cart";
import ChangeQuantity from "./ChangeQuantity/ChangeQuantity";
import styles from "./styles.module.css";

interface CartProductItemProps {
  product: CartProduct;
}

const CartProductItem: React.FC<CartProductItemProps> = ({ product }) => {
  return (
    <div className={styles.root}>
      <img src={product.thumbnail} alt={product.title} />
      <div className={styles.info}>
        <Link to={`/products/${product.id}`}>
          <h2 className={styles.name}>{product.title}</h2>
        </Link>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>{Number(product.price) * product.quantity}$</p>
        <div className={styles.buttons}>
          <ChangeQuantity 
            product={product}
            buttonText="-"
            action="remove"
          />
          <p className={styles.quantity}>{product.quantity}</p>
          <ChangeQuantity 
            product={product}
            buttonText="+"
            action="add"
          />
          <ChangeQuantity 
            product={product}
            buttonText="Remove"
            action="removeAll"
          />
        </div>
      </div>
    </div>
  )
};

CartProductItem.displayName = "CartProductItem";

export default CartProductItem;