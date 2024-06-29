import { ICategoryModel } from "@/types/Catalog/catalogFilters";
import styles from "./style.module.scss";
import FiltersByAbdulaziz from "./FiltersByAbdulaziz";
import { IFiltersBrandByAbdulaziz } from "../data";

interface IFilteredProps {
  filtered: ICategoryModel[];
  filters: IFiltersBrandByAbdulaziz;
}

const CatalogFilterByAbdulaziz = ({ filtered, filters }: IFilteredProps) => {
  return (
    <section>
      <div className="container">
        <h1 className={styles.myTitle}>ЭТО МОЯ СТРАНИЦА ЭТО МОЙ ПРОЕКТ</h1>
        <h1 className={styles.myTitle_by}>By Abdul{`'`}Aziz</h1>
        <FiltersByAbdulaziz filters={filters} />
      </div>
    </section>
  );
};

export default CatalogFilterByAbdulaziz;
