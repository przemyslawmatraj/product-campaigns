import Carousel from "../../components/Carousel/Carousel";

import styles from "./Products.module.scss";

const Products = () => {
  return (
    <section className={styles.wrapper}>
      <Carousel />
    </section>
  );
};

export default Products;
