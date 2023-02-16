import styles from "./Form.module.scss";
import { useForm } from "react-hook-form";
import KeywordsField from "./KeywordsField";
import TownField from "./TownField";
import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const campaignSchema = z.object({
  name: z.string().min(1),
  keywords: z.array(z.string()).min(1),
  bidAmount: z.number().min(100),
  campaignFund: z.number(),
  town: z.string(),
  radius: z.number().optional(),
});

interface FormProps {
  type: "add" | "edit";
  setModalOpen: (modalOpen: boolean) => void;
  campaignId?: any;
}

const Form = ({ type, setModalOpen, campaignId }: FormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: "all",
    resolver: zodResolver(campaignSchema),
  });
  const [formStep, setFormStep] = useState(0);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <AnimatePresence>
      <motion.form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.formTitle}>
          {type === "add" ? "Add" : "Update"} Campaign
        </h1>

        {formStep === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="name"
              className={formStep === 0 ? styles.active : styles.inactive}
            >
              Name
              {errors.name && (
                <p className={styles.error}>
                  {errors.name.message?.toString()}
                </p>
              )}
              <input
                type="text"
                id="name"
                className={styles.input}
                {...register("name")}
              />
            </label>
            <label
              htmlFor="keywords"
              className={formStep === 0 ? styles.active : styles.inactive}
            >
              Keywords
              {errors.keywords && (
                <p className={styles.error}>
                  {errors.keywords.message?.toString()}
                </p>
              )}
              <KeywordsField control={control} />
            </label>
            <label
              htmlFor="bidAmount"
              className={formStep === 0 ? styles.active : styles.inactive}
            >
              Bid Amount
              {errors.bidAmount && (
                <p className={styles.error}>
                  {errors.bidAmount.message?.toString()}
                </p>
              )}
              <input
                type="number"
                id="bidAmount"
                className={styles.input}
                {...register("bidAmount", {
                  setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
                })}
              />
            </label>
            <label
              htmlFor="campaignFund"
              className={formStep === 0 ? styles.active : styles.inactive}
            >
              Campaign Fund
              {errors.campaignFund && (
                <p className={styles.error}>
                  {errors.campaignFund.message?.toString()}
                </p>
              )}
              <input
                type="number"
                id="campaignFund"
                className={styles.input}
                {...register("campaignFund", {
                  setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
                })}
              />
              <label htmlFor="town" className={styles.visuallyHidden}>
                Town
                {errors.town && (
                  <p className={styles.error}>
                    {errors.town.message?.toString()}
                  </p>
                )}
                <TownField control={control} />
              </label>
            </label>
          </motion.div>
        )}

        {formStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="town" className={styles.active}>
              Town
              {errors.town && (
                <p className={styles.error}>
                  {errors.town.message?.toString()}
                </p>
              )}
              <TownField control={control} />
            </label>
            <label
              htmlFor="radius"
              className={formStep === 1 ? styles.active : styles.inactive}
            >
              Radius (in km)
              {errors.radius && (
                <p className={styles.error}>
                  {errors.radius.message?.toString()}
                </p>
              )}
              <input
                type="text"
                id="radius"
                className={styles.input}
                {...register("radious", {
                  setValueAs: (v) =>
                    isNaN(v) || v === "" ? 0 : parseInt(v, 10),
                })}
              />
            </label>
          </motion.div>
        )}

        <div className={styles.buttonContainer}>
          {formStep === 0 ? (
            <button
              onClick={() => setFormStep(formStep + 1)}
              type="button"
              className={clsx(styles.button, styles.nextButton, {
                [styles.disabled]: !isValid,
              })}
            >
              Next
            </button>
          ) : formStep === 1 ? (
            <>
              <button
                onClick={() => setModalOpen(false)}
                type="submit"
                className={clsx(styles.button, styles.submitButton, {
                  [styles.disabled]: !isValid,
                })}
              >
                Save
              </button>
              <button
                onClick={() => setFormStep(formStep - 1)}
                type="button"
                className={clsx(styles.button, styles.backButton)}
              >
                Back
              </button>
            </>
          ) : null}
          <button
            onClick={() => setModalOpen(false)}
            type="button"
            className={clsx(styles.button, styles.cancelButton)}
          >
            Cancel
          </button>
          {/* {JSON.stringify(watch(), null, 2)} */}
        </div>
      </motion.form>
    </AnimatePresence>
  );
};

export default Form;
