import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Carousel.module.scss";
import useMobile from "../../hooks/useMobile";
import { useQuery } from "react-query";
import { getAllProducts } from "../../api/api";

import CarouselItem from "../CarouselItem/CarouselItem";

const Carousel = () => {
  const [widthOfCarousel, setWidthOfCarousel] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  const { isLoading, error, data } = useQuery(["products"], getAllProducts);

  useEffect(() => {
    if (carouselRef.current) {
      setWidthOfCarousel(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, [carouselRef.current, data]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  if (error) return <div>Error:</div>;

  return (
    <motion.div ref={carouselRef} className={styles.wrapper}>
      <motion.ul
        className={styles.carousel}
        drag="x"
        dragConstraints={{
          right: 0,
          left: -widthOfCarousel,
        }}
      >
        {data.map(({ id, name, campaigns }, index) => (
          <CarouselItem
            key={id}
            isMobile={isMobile}
            id={id}
            name={name}
            image={`https://thisrentaldoesnotexist.com/img-new/img1.jpg`}
            campaignsCount={campaigns.length}
          />
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default Carousel;
