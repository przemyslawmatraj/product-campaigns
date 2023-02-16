import styles from "./Amount.module.scss";
import { useQuery } from "react-query";
import { getEmeralds, getAllCampaigns } from "../../api/api";
import type { Campaign } from "../../api/api";

const Amount = () => {
  const { data, isLoading, isError } = useQuery("amount", getEmeralds);

  if (isLoading) return <div className={styles.amount}>Loading...</div>;
  if (isError) return <div className={styles.amount}>Error</div>;
  if (!data) return <div className={styles.amount}>No data</div>;

  const separateWithSpaces = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className={styles.amount}>${separateWithSpaces(data.amount)}</div>
  );
};

export default Amount;
