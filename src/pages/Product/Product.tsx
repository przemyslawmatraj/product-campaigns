import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import CampaignTile from "../../components/CampaignTile/CampaignTile";
import Modal from "../../components/Modal/Modal";

const Product = () => {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState<false | number>(false);

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Campaigns</h1>
        <button className={styles.button} onClick={() => setModalOpen(true)}>
          +
        </button>
      </header>
      <Modal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {Array(5)
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
    </section>
  );
};

export default Product;
