import clsx from "clsx";
import styles from "./../style.module.scss";

interface ICatalogDescProps {
  title: string;
  desc: string;
  keywords: string;
}

const CatalogDesc = ({ title, desc, keywords }: ICatalogDescProps) => {
  return (
    <div className={clsx(styles.descriptionContainer, "container")}>
      <h3 className={styles.descriptionContainer__categoryTitle}>{title}</h3>
      <div className={styles.parapContainer}>
        <h3 className={styles.parapContainer__keywords}>{desc}</h3>
        <h3 className={styles.parapContainer__keywords}>{keywords}</h3>
      </div>
    </div>
  );
};

export default CatalogDesc;
