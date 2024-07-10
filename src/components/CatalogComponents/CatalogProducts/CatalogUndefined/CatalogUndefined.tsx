import Image from "next/image";
import styles from "./../style.module.scss";

const CatalogUndefined = () => {
  return (
    <div className={styles.containerUndefined}>
      <Image
        src="/img/undefinedPage.png"
        alt="undefinedPage"
        width={180}
        height={180}
      />
      <p className={styles.containerUndefined__parap}>
        По данному запросу товаров не найдено
      </p>
    </div>
  );
};

export default CatalogUndefined;
