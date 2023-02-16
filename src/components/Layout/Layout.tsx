import { Outlet, useParams, useLocation, Link } from "react-router-dom";
import styles from "./Layout.module.scss";
import Amount from "../../components/Amount/Amount";
import { BiArrowBack, BiHomeAlt } from "react-icons/bi";
import { useQuery } from "react-query";
import { getProductById } from "../../api/api";

const Layout = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const isProductPage = pathname.includes("product");

  return (
    <main className={styles.container}>
      <nav className={styles.navbar}>
        {isProductPage ? (
          <ProductNavbar id={id as string} />
        ) : (
          <>
            <BiHomeAlt
              style={{
                fontSize: "1.5rem",
                color: "white",
                marginRight: "1rem",
              }}
            />

            <h1 className={styles.title}>My Products</h1>
            <Amount />
          </>
        )}
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </main>
  );
};

const ProductNavbar = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useQuery(["products", id], async () =>
    getProductById(id)
  );

  if (isLoading || isError) return <div>...</div>;
  if (!data) return <div>Not found</div>;

  return (
    <>
      <Link to="/">
        <BiArrowBack
          style={{
            fontSize: "1.5rem",
            color: "white",
            cursor: "pointer",
            marginRight: "1rem",
            verticalAlign: "middle",
          }}
        />
      </Link>
      <h1 className={styles.title}>{data.name}</h1>
      <Amount />
    </>
  );
};

export default Layout;
