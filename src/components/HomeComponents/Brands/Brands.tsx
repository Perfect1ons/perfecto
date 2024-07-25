"use client";
import { memo, useState } from "react";
import styles from "./style.module.scss";
import cn from "clsx";
import Link from "next/link";
import { IBrandItem } from "@/types/HomeTypes/brands";

interface IBrandsProps {
  brands: IBrandItem[];
}

const Brands = memo(({ brands }: IBrandsProps) => {
  const initialPageSize = 12;
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handleShowMore = () => {
    const newPageSize = pageSize + 12 > 36 ? 24 : pageSize + 12;
    setPageSize(newPageSize);
  };

  return (
    <section className="brands">
      <div className={cn(styles.brands__container, "container")}>
        <h1 className="sections__title">Бренды</h1>
        <div className={styles.brandsContainer}>
          {brands.slice(0, pageSize).map((item) => {
            return (
              <Link
                href={`/brands/${item.name}-${item.id}`}
                className={styles.brandsItem}
                key={item.id}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="showMore__buttons">
          {pageSize < 36 ? (
            <button className="showMore__button" onClick={handleShowMore}>
              Показать еще
            </button>
          ) : (
            <Link href={"/brands"}>
              <button className="showMore__button">Показать все</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
});

Brands.displayName = "Brands";

export default Brands;
