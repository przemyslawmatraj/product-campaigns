import styles from "./CampaignActions.module.scss";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import type { Campaign } from "../../api/api";
import { deleteCampaign, deductEmeralds, getEmeralds } from "../../api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const CampaignActions = ({
  campaignId,
  data,
}: {
  campaignId: string;
  data: Campaign;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: currentEmeralds, isLoading } = useQuery(["emeralds"], () =>
    getEmeralds()
  );

  const { mutate: removeCampaign } = useMutation(
    (values: any) => deleteCampaign(values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["campaigns", id]);
        toast.success("Campaign deleted successfully");
      },
    }
  );
  const { mutate: emeraldsMutate } = useMutation(
    (amount: number) => deductEmeralds(amount),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["amount"]);
      },
    }
  );

  if (isLoading) return null;
  if (!currentEmeralds) return <div>Something went wrong</div>;

  const onDelete = () => {
    removeCampaign(data);
    emeraldsMutate(currentEmeralds.amount + data.campaignFund);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.label}>Actions</span>
        <button className={styles.button} onClick={() => onDelete()}>
          Delete
        </button>
        <button className={styles.button} onClick={() => setModalOpen(true)}>
          Edit
        </button>
      </div>
      {modalOpen && (
        <Modal
          type="edit"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          campaignId={campaignId}
        />
      )}
    </>
  );
};

export default CampaignActions;
