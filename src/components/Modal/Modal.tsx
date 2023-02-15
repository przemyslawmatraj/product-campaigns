import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Modal.module.scss";
import Form from "../Form/Form";

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
            <Form
              type={type}
              setModalOpen={setModalOpen}
              campaignId={campaignId}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
