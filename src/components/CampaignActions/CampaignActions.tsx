import styles from "./CampaignActions.module.scss";
import Modal from "../Modal/Modal";
import { useState, useId } from "react";

const CampaignActions = ({ campaignId }: { campaignId?: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.label}>Actions</span>
        <button className={styles.button}>Delete</button>
        <button className={styles.button} onClick={() => setModalOpen(true)}>
          Edit
        </button>
      </div>
      <Modal
        type="edit"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        campaignId={campaignId}
      />
    </>
  );
};

export default CampaignActions;
