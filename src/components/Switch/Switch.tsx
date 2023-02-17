import { motion } from "framer-motion";
import styles from "./Switch.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { changeStatus } from "../../api/api";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import type { Campaign } from "../../api/api";
import { toast } from "react-hot-toast";

const Switch = ({ active, data }: { active: boolean; data: Campaign }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutate: changeStatusMutation } = useMutation(
    (values: any) => changeStatus(values.data, values.status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["campaigns", id]);
        toast.success("Status changed successfully");
      },
    }
  );

  const onClick = () => {
    changeStatusMutation({
      data,
      status: !active,
    });
  };

  return (
    <div className={styles.wrapper}>
      <motion.div
        animate={{
          backgroundColor: active ? "var(--clr-primary)" : "var(--clr-bg-100)",
          borderWidth: active ? "0px" : "1px",
        }}
        className={styles.switch}
        onClick={() => onClick()}
      >
        <motion.div
          animate={{
            marginLeft: active ? "22px" : "0px",
          }}
        />
      </motion.div>
      <motion.div
        animate={{
          color: active ? "var(--clr-primary)" : "var(--clr-text-300)",
        }}
        className={styles.label}
      >
        {active ? "On" : "Off"}
      </motion.div>
    </div>
  );
};

export default Switch;
