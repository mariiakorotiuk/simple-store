import { useRouteLoaderData } from "@remix-run/react";
import { CartProduct, loader } from "~/routes/cart";
import CartProductItem from "./CartItem/CartProductItem";
import styles from "./styles.module.css";

interface CartProps {
  cartProducts: CartProduct[]
}

const Cart: React.FC<CartProps> = ({ cartProducts }) => {
  const data = useRouteLoaderData<typeof loader>("routes/cart");
  const total = (data.products as CartProduct[]).reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Total: {total}$</h1>
      <div className={styles.list}>
        {cartProducts.map(cartProduct => (
          <CartProductItem key={cartProduct.id} product={cartProduct} />
        ))}
      </div>
    </div>
  )
}

export default Cart;
