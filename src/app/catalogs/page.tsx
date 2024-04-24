"use client";
import { subCatalog } from "@/types/subCatalog";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps {
  catalog: subCatalog;
}

const Catalogs = ({ catalog }: IProps) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <ol className={styles.breadcrumb}>
        <li className={styles.links}>
          <Link href="/" className={styles.link}>
            Главная
          </Link>
          <Link href="/" className={styles.link}>
            {catalog.category.name}
          </Link>
        </li>
      </ol>
      <div className={styles.contain}>
        <h1 className={styles.container__h1}>{catalog.category.name}</h1>
        <div className={styles.row}>
          <ul className={styles.wrapps}>
            {/* {catalog.category &&
              Object.values(catalog.category).map((category, index) => {
                return (
                  <h3 key={index} className={styles.catalog__lih3}>
                    {category?.name}
                  </h3>
                );
              })} */}
            {catalog.category && Object.values(catalog.category).length > 0 && (
              <>
                {Object.values(catalog.category).map((category, index) => (
                  <h3 key={index} className={styles.catalog__lih3}>
                    {category?.name}
                  </h3>
                ))}
              </>
            )}
          </ul>

          <ul className={styles.row__9}>
            {catalog.category &&
              Object.values(catalog.category).map((category, index) => {
                if (category?.name) {
                  return (
                    <li
                      key={index}
                      className={styles.row__9li}
                      onClick={() => router.push(`products/${category?.id}`)}
                      // onClick={() => {
                      //   console.log(category.id); // Выводим id в консоль
                      //   router.push(`products/${category?.id}`);
                      // }}
                    >
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
                      <h3 className={styles.name__h3}>{category?.name}</h3>
                    </li>
                  );
                }
                return null;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Catalogs;
