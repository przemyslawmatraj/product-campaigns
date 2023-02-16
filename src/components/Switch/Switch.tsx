import { motion } from "framer-motion";
import styles from "./Switch.module.scss";
import clsx from "clsx";
import { useState } from "react";

const Switch = ({ active, ...props }: { active: boolean }) => {
  const [isOn, setIsOn] = useState(active);
  return (
    <div className={styles.wrapper}>
      <motion.div
        animate={{
          backgroundColor: isOn ? "var(--clr-primary)" : "var(--clr-bg-100)",
          borderWidth: isOn ? "0px" : "1px",
        }}
        className={styles.switch}
        onClick={() => setIsOn(!isOn)}
        {...props}
      >
        <motion.div
          animate={{
            marginLeft: isOn ? "22px" : "0px",
          }}
        />
      </motion.div>
      <motion.div
        animate={{
          color: isOn ? "var(--clr-primary)" : "var(--clr-text-300)",
        }}
        className={styles.label}
      >
        {isOn ? "On" : "Off"}
      </motion.div>
    </div>
  );
};

export default Switch;
