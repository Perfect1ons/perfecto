"use client"
import { useState } from "react";
import { IBrandItem } from "@/types/brands";
import styles from "./style.module.scss";
import cn from "clsx";
import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";


interface IBrandsProps {
  brands: IBrandItem[];
}

const Brands = ({ brands }: IBrandsProps) => {
  const isMobile = useMediaQuery("(max-width: 778px)");
  const initialPageSize = 12;
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handleShowMore = () => {
    const newPageSize = pageSize + 12 > 24 ? 24 : pageSize + 12;
    setPageSize(newPageSize);
  };

  return (
    <section className="brands">
      <div className={cn(styles.brands__container, "container")}>
        <h4 className="sections__title">Бренды</h4>
        <div className={styles.brandsContainer}>
          {brands.slice(0, pageSize).map((item) => {
            return (
              <Link
                href={`/brand/${item.name.toLowerCase()}-${item.id}`}
                className={styles.brandsItem}
                key={item.id}
              >
                <p className={styles.brandsItemName}>{item.name}</p>
              </Link>
            );
          })}
        </div>
        {pageSize < 24 ? (
          <button
            className={cn(styles.brandsButton, "news__buttons_showMore")}
            onClick={handleShowMore}
          >
            Показать еще
          </button>
        ) : (
          <Link
            className={cn(styles.brandsButton, "news__buttons_showMore")}
            href="/brand"
          >
            Показать все
          </Link>
        )}
      </div>
    </section>
  );
};

export default Brands;