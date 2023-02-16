import { motion, AnimatePresence } from "framer-motion";
import styles from "./CarouselItem.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CarouselItemProps {
  id: string;
  name: string;
  image?: string;
  campaignsCount: number;
  isMobile?: boolean;
}

const buttonVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: 100,
  },
};

const MobileVersion = ({
  id,
  name,
  image = "https://via.placeholder.com/300",
  campaignsCount,
}: CarouselItemProps) => {
  return (
    <Link to={`/product/${id}`}>
      <motion.li className={styles.item}>
        <img src={image} alt={name} className={styles.image} />
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.description}>
          {campaignsCount > 1 || campaignsCount === 0
            ? `${campaignsCount} campaigns`
            : `${campaignsCount} campaign`}
        </p>
      </motion.li>
    </Link>
  );
};

const DesktopVersion = ({
  id,
  name,
  image = "https://via.placeholder.com/300",
  campaignsCount,
}: CarouselItemProps) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.li
      className={styles.item}
      onHoverStart={() => setIsClicked(true)}
      onHoverEnd={() => setIsClicked(false)}
      whileHover={{
        scale: 1.05,
        filter: "brightness(1.2)",
      }}
    >
      <img src={image} alt={name} className={styles.image} />
      <AnimatePresence>
        {isClicked && (
          <Link to={`/product/${id}`} className={styles.link}>
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25 }}
              className={styles.button}
            >
              Check
            </motion.button>
          </Link>
        )}
      </AnimatePresence>
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.description}>
        {campaignsCount > 1 || campaignsCount === 0
          ? `${campaignsCount} campaigns`
          : `${campaignsCount} campaign`}
      </p>
    </motion.li>
  );
};

const CarouselItem = (props: CarouselItemProps) => {
  if (props.isMobile) return <MobileVersion {...props} />;

  return <DesktopVersion {...props} />;
};

export default CarouselItem;
