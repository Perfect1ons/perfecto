import styles from "./style.module.scss";
import { IPropsAllFilters } from "./AllFilters";

const AllFiltersMobile = ({ close }: IPropsAllFilters) => {
  return (
    <div className={styles.containerMobileFilters}>
      <div className={styles.backDropdiv} onClick={close}></div>
      <div className={styles.containerAllFiltersMobile}>AllFiltersMobile</div>
    </div>
  );
};

export default AllFiltersMobile;
