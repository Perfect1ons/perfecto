import { subCatalog } from "@/types/subCatalog";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  catalog: subCatalog;
}

const Catalogs = ({ catalog }: IProps) => {
  return (
    <div className={styles.container}>
      <ol className={styles.breadcrumb}>
        <li>
          <Link href="/" className={styles.link}>
            Главная
          </Link>
          <Link href="/" className={styles.link}>
            {catalog.category.name}
          </Link>
        </li>
      </ol>
      <div>
        <h1 className={styles.container__h1}>{catalog.category.name}</h1>
        <div className={styles.row}>
          <ul>
            {catalog.category &&
              Object.values(catalog.category).map((category, index) => {
                return (
                  <li key={index}>
                    <h3 className={styles.catalog__lih3}>{category?.name}</h3>
                  </li>
                );
              })}
          </ul>
          <ul className={styles.row__9}>
            {catalog.category &&
              Object.values(catalog.category).map((category, index) => {
                if (category?.name) {
                  return (
                    <li key={index} className={styles.row__9li}>
                      <Image
                        src={
                          category.icon
                            ? `https://max.kg/${category.icon}`
                            : "https://max.kg/images/discount/empty-image.png"
                        }
                        alt={category.name}
                        width={60}
                        height={60}
                      />
                      {/* <Image
                      src={`https://max.kg/${category.icon}`}
                      alt={category?.name}
                      width={100}
                      height={100}
                    /> */}
                      <h3 className={styles.name__h3}>{category?.name}</h3>
                    </li>
                  );
                }
                return null; // Если имя категории отсутствует, вернем null
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Catalogs;
