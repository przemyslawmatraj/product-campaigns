import styles from "./Amount.module.scss";
import { useState } from "react";

const Amount = () => {
  const [amount, setAmount] = useState(15000);

  const separateWithSpaces = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return <div className={styles.amount}>${separateWithSpaces(amount)}</div>;
};

export default Amount;
