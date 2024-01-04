import { Product } from "../../services/product.sever.";
import ProductListItem from "./ProductListItem/ProductListItem";
import styles from "./styles.module.css";

interface ProductListProps {
  products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles.root}>
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  )
};

ProductList.displayName = "ProductList";

export default ProductList;