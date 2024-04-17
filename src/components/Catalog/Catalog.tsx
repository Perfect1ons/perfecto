import { getCatalog } from "@/api/requests";
import CatalogFirst from "./CatalogFirst";
import CatalogSecond from "./CatalogSecond";
import styles from "./style.module.scss";

const Catalog = async () => {
  const catalog = await getCatalog();
  return (
    <div className={styles.catalog}>
      <CatalogFirst catalog={catalog} />
      <CatalogSecond />
    </div>
  );
};

export default Catalog;
