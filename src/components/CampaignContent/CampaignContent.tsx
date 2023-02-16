import styles from "./CampaignContent.module.scss";
import clsx from "clsx";

interface CampaignContentProps {
  bidAmount: number;
  campaignFund: number;
  keywords: string[];
  name: string;
}

const CampaignContent = ({
  bidAmount,
  campaignFund,
  keywords,
  name,
}: CampaignContentProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.fieldGroup}>
        <div className={clsx(styles.field, styles.fieldName)}>
          <div className={styles.label}>Name</div>
          <div className={styles.value}>{name}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Bid Amount</div>
          <div className={styles.value}>{bidAmount}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Campaign Fund</div>
          <div className={styles.value}>{campaignFund}</div>
        </div>
      </div>
      <div className={clsx(styles.field, styles.fieldBig)}>
        <div className={styles.label}>Keywords</div>
        <div className={styles.keywords}>
          {keywords.map((keyword) => (
            <div className={styles.keyword} key={keyword}>
              {keyword}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignContent;
