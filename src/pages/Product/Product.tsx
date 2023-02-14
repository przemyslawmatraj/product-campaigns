import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";

const Product = () => {
  const { id } = useParams();

  return <div className={styles.wrapper}>{id}</div>;
};

export default Product;
