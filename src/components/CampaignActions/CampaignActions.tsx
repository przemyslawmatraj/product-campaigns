import styles from "./CampaignActions.module.scss";

const CampaignActions = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Actions</span>
      <button className={styles.button}>Delete</button>
      <button className={styles.button}>Edit</button>
    </div>
  );
};

export default CampaignActions;
