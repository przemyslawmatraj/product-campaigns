import { Outlet, useParams, useLocation, Link } from "react-router-dom";
import styles from "./Layout.module.scss";
import Amount from "../../components/Amount/Amount";
import { BiArrowBack } from "react-icons/bi";

const Layout = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const isProductPage = pathname.includes("product");

  return (
    <main className={styles.container}>
      <nav className={styles.navbar}>
        {isProductPage && (
          <Link to="/">
            <BiArrowBack
              style={{
                fontSize: "1.5rem",
                color: "white",
                cursor: "pointer",
                marginRight: "1rem",
              }}
            />
          </Link>
        )}
        <h1 className={styles.title}>{isProductPage ? id : "My Products"}</h1>
        <Amount />
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
