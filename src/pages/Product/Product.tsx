import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import CampaignTile from "../../components/CampaignTile/CampaignTile";

const Product = () => {
  const { id } = useParams();

  const [expanded, setExpanded] = useState<false | number>(false);

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Campaigns</h1>
        <button
          className={styles.button}
          onClick={() => {
            console.log("clicked");
          }}
        >
          New
        </button>
      </header>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <CampaignTile
            i={i}
            expanded={expanded}
            setExpanded={setExpanded}
            key={i}
            active={i === 0}
          />
        ))}
    </section>
  );
};

export default Product;
