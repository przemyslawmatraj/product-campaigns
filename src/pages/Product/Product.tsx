import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import CampaignTile from "../../components/CampaignTile/CampaignTile";
import Modal from "../../components/Modal/Modal";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Product = () => {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState<false | number>(false);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className={styles.wrapper}
    >
      <AnimatePresence>
        <motion.header className={styles.header}>
          <h1 className={styles.title}>Campaigns</h1>
          <button className={styles.button} onClick={() => setModalOpen(true)}>
            +
          </button>
        </motion.header>
        <Modal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />

        {Array(2)
          .fill(0)
          .map((_, i) => (
            <CampaignTile
              i={i}
              expanded={expanded}
              setExpanded={setExpanded}
              key={i}
              active={i + 1 > 0 && i < 3 ? true : false}
            />
          ))}
      </AnimatePresence>
    </motion.section>
  );
};

export default Product;
