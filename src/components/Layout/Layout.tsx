import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <main className={styles.container}>
      <nav className={styles.navbar}>
        <h1>My Products</h1>
        <div className={styles.amount}>$ 15 000</div>
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
