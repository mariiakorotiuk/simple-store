import { Product } from "../../services/product.sever.";
import AddToCart from "./AddToCart/AddToCart";
import styles from "./styles.module.css";

interface ProductDataProps {
  product: Product;
  quantity: number;
}

const ProductData: React.FC<ProductDataProps> = ({ product, quantity }) => {
  const primaryPrice = Math.round(Number(product.price) * 100 / (100 - product.discountPercentage));

  return (
    <div className={styles.root}>
      <div className={styles.imageColumn}>
        <div className={styles.image}>
          <img src={product.thumbnail} alt={product.title}/>
        </div>
      </div>
      <div className={styles.infoColumn}>
        <h1 className={styles.name}>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.priceDiscount}>{product.price}$</p>
        <p className={styles.priceOriginal}>Was {primaryPrice}$</p>
        <AddToCart product={product} quantity={quantity} />
      </div>
    </div>
  )
};

export default ProductData;