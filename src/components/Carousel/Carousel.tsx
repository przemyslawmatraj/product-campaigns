import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Carousel.module.scss";
import useMobile from "../../hooks/useMobile";
import clsx from "clsx";

import CarouselItem from "../CarouselItem/CarouselItem";

const Carousel = () => {
  const [widthOfCarousel, setWidthOfCarousel] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    if (carouselRef.current) {
      setWidthOfCarousel(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, []);

  return (
    <motion.div
      ref={carouselRef}
      className={clsx(styles.wrapper, {
        [styles.wrapperMobile]: isMobile,
      })}
    >
      <motion.ul
        className={styles.carousel}
        drag="x"
        dragConstraints={{
          right: 0,
          left: -widthOfCarousel,
        }}
      >
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <CarouselItem
              key={index}
              isMobile={isMobile}
              id={index.toString()}
              name={`Product ${index}`}
              image={`https://thispersondoesnotexist.com/image?r=${index}`}
              campaignsCount={index}
            />
          ))}
      </motion.ul>
    </motion.div>
  );
};

export default Carousel;
