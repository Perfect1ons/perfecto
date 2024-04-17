import { ICatalogFirst } from "@/types/catalogFirst";
import styles from "./style.module.scss";

interface ICatalogProps {
  catalog: ICatalogFirst[];
}
const CatalogFirst = ({ catalog }: ICatalogProps) => {
  return (
    <div>
      {catalog.map((item) => {
        return (
          <h1 key={item.id} className={styles.catalog__h1}>
            {item.name}
          </h1>
        );
      })}
    </div>
  );
};

export default CatalogFirst;
