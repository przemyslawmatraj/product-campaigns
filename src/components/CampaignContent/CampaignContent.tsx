import styles from "./CampaignContent.module.scss";
import clsx from "clsx";
const CampaignContent = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.fieldGroup}>
        <div className={clsx(styles.field, styles.fieldName)}>
          <div className={styles.label}>Name</div>
          <div className={styles.value}>Campaign 1</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Bid Amount</div>
          <div className={styles.value}>$15,000</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Campaign Fund</div>
          <div className={styles.value}>$15,000</div>
        </div>
      </div>
      <div className={clsx(styles.field, styles.fieldBig)}>
        <div className={styles.label}>Keywords</div>
        <div className={styles.keywords}>
          <span className={styles.keyword}>Chair</span>
          <span className={styles.keyword}>Table</span>
          <span className={styles.keyword}>Lamp</span>
          <span className={styles.keyword}>Banana</span>
          <span className={styles.keyword}>Cat</span>
          <span className={styles.keyword}>Dog</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignContent;
