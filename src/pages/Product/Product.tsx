import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import CampaignTile from "../../components/CampaignTile/CampaignTile";
import Modal from "../../components/Modal/Modal";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { getCampaignsByProductId } from "../../api/api";

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

const campaignsQuery = (id: string) => ({
  queryKey: ["campaigns", id],
  queryFn: async () => getCampaignsByProductId(id),
});

export const loader =
  (queryClient: any) =>
  async ({ params }: any) => {
    const query = campaignsQuery(params.id);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const Product = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState<false | number>(false);
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(campaignsQuery(id as string));

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className={styles.wrapper}
    >
      <motion.header className={styles.header}>
        <h1 className={styles.title}>Campaigns</h1>
        <button className={styles.button} onClick={() => setModalOpen(true)}>
          +
        </button>
      </motion.header>
      <Modal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <AnimatePresence>
        {data?.map((campaign, index) => (
          <CampaignTile
            i={index}
            expanded={expanded}
            setExpanded={setExpanded}
            key={campaign.id}
            data={campaign}
          />
        ))}
        {data?.length === 0 && (
          <p>No campaigns yet. Click the + button to add one.</p>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Product;
