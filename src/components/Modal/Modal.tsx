import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Modal.module.scss";
import FormLogicComponent from "../Form/FormLogicComponent";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  createCampaign,
  updateCampaign,
  deductEmeralds,
  getEmeralds,
} from "../../api/api";
import { useMutation, useQueryClient } from "react-query";
import uuid from "react-uuid";
import type { Campaign } from "../../api/api";

interface ModalProps {
  type: "add" | "edit";
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  campaignId?: string;
}

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

const Modal = ({ type, modalOpen, setModalOpen, campaignId }: ModalProps) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: currentEmeralds, isLoading } = useQuery(["amount"], () =>
    getEmeralds()
  );

  const { mutate: editCampaign } = useMutation(
    (values: any) => updateCampaign(values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["campaigns", id]);
      },
    }
  );
  const { mutate: addCampaign } = useMutation(
    (values: any) => createCampaign(values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["campaigns", id]);
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

  const onFormSubmit = (values: any) => {
    if (type === "add") {
      addCampaign(
        {
          id: uuid(),
          productId: id,
          status: false,
          ...values,
        },
        {
          onSuccess: () => {
            setModalOpen(false);
          },
        }
      );
      emeraldsMutate(currentEmeralds.amount - values.campaignFund);
    } else {
      editCampaign(
        {
          id: campaignId,
          productId: id,
          ...values,
        },
        {
          onSuccess: () => {
            setModalOpen(false);
          },
        }
      );
      emeraldsMutate(
        currentEmeralds.amount +
          (queryClient.getQueryData(["campaigns", id, campaignId]) as Campaign)
            .campaignFund -
          values.campaignFund
      );
    }
  };

  return createPortal(
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <FormLogicComponent
              type={type}
              setModalOpen={setModalOpen}
              campaignId={campaignId}
              onFormSubmit={onFormSubmit}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal") as Element
  );
};

export default Modal;
