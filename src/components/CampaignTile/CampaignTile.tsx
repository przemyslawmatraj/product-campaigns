import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import styles from "./CampaignTile.module.scss";
import { GrFormLocation } from "react-icons/gr";
import Switch from "../Switch/Switch";
import CampaignContent from "../CampaignContent/CampaignContent";
import CampaignActions from "../CampaignActions/CampaignActions";

interface CampaignTileProps {
  i: number;
  expanded: false | number;
  setExpanded: (i: false | number) => void;
  active: boolean;
}

const CampaignTile = ({
  i,
  expanded,
  setExpanded,
  active,
}: // data,
CampaignTileProps) => {
  const isOpen = i === expanded;
  return (
    <article className={styles.wrapper}>
      <Header isOpen={isOpen} setExpanded={setExpanded} i={i} active={active}>
        <div>
          <h3 className={styles.title}>Campaign {i + 1}</h3>
          <p className={styles.subtitle}>
            <span>Kraków</span>
            <GrFormLocation
              style={{
                fontSize: "1.2rem",
              }}
            />
            <span>20km+</span>
          </p>
        </div>
        <CheveronIcon isOpen={isOpen} />
        <Switch active={active} />
      </Header>
      <Content isOpen={isOpen}>
        <CampaignContent />
        <CampaignActions />
      </Content>
    </article>
  );
};

const CheveronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className={styles.icon}>
    <motion.svg
      width="1.2em"
      height="1.2em"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <motion.path
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { rotate: -90 },
          closed: { rotate: 90 },
        }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      ></motion.path>
    </motion.svg>
  </div>
);

const Content = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => (
  <AnimatePresence initial={false}>
    {isOpen && (
      <motion.div
        key="content"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { opacity: 1, height: "auto" },
          collapsed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        className={styles.content}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const Header = ({
  isOpen,
  setExpanded,
  i,
  active,
  children,
}: {
  isOpen: boolean;
  setExpanded: (i: false | number) => void;
  i: number;
  active: boolean;
  children: React.ReactNode;
}) => (
  <motion.header
    initial={false}
    animate={
      active
        ? {
            backgroundColor: isOpen ? "var(--clr-bg-300)" : "var(--clr-bg-200)",
          }
        : {
            backgroundColor: isOpen ? "var(--clr-bg-200)" : "transparent",
          }
    }
    onClick={() => setExpanded(isOpen ? false : i)}
    className={clsx(styles.header, {
      [styles.inactive]: !active,
      [styles.active]: active,
    })}
  >
    {children}
  </motion.header>
);

export default CampaignTile;
