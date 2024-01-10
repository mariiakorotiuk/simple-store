import { Product } from "../../services/product.sever.";
import CategoryList from "./CategoryList/CategoryList";
import Pagination from "./Pagination/Pagination";
import ProductListItem from "./ProductListItem/ProductListItem";
import Sorting from "./Sorting/Sorting";
import styles from "./styles.module.css";

interface ProductListProps {
  products: Product[];
  categories: string[];
  limits: number;
  currentPage: number;
  total: number;
}

const ProductList: React.FC<ProductListProps> = ({ products, categories, limits, currentPage, total }) => {
  return (
    <div className={styles.root}>
      <CategoryList categories={categories} />
      <div className={styles.productList}>
        <Sorting />
        <div className={styles.productListItems}>
          {products.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
        <Pagination limits={limits} currentPage={currentPage} total={total} />
      </div>
    </div>
  )
};

ProductList.displayName = "ProductList";

export default ProductList;