"use client";
import styles from "./style.module.scss";
import { ICatalogsChild } from "@/types/Catalog/catalogsChild";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps {
  catalog: ICatalogsChild;
}

const Catalogs = ({ catalog }: IProps) => {
  const router = useRouter();
  return (
    // <h1>dasdasd</h1>
    <div className={styles.container}>
      <ol className={styles.breadcrumb}>
        <li className={styles.links}>
          <Link href="/" className={styles.link}>
            Главная
          </Link>
          <Link href="/" className={styles.link}>
            {catalog.parent.name}
          </Link>
        </li>
      </ol>
      <div className={styles.contain}>
        <h1 className={styles.container__h1}>{catalog.parent.name}</h1>
        <div className={styles.row}>
          <ul className={styles.wrapps}>
            {catalog.child.map((item) => {
              return (
                <h3 key={item.id} className={styles.catalog__lih3}>
                  {item.name}
                </h3>
              );
            })}
          </ul>

          <ul className={styles.row__9}>
            {catalog.child.map((item) => {
              return (
                <li
                  key={item.id}
                  className={styles.row__9li}
                  onClick={() => router.push(`products/${item?.id}`)}
                >
                  <Image
                    src={
                      item.icon
                        ? `https://max.kg/${item.icon}`
                        : "https://max.kg/images/discount/empty-image.png"
                    }
                    alt={item.name}
                    width={60}
                    height={60}
                  />
                  <h3 key={item.id} className={styles.name__h3}>
                    {item.name}
                  </h3>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Catalogs;
