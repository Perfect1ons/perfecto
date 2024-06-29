"use client";
import { useState } from "react";
import { IBrandItem } from "@/types/brands";
import styles from "./style.module.scss";
import cn from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IBrandsProps {
  brands: IBrandItem[];
}

const Brands = ({ brands }: IBrandsProps) => {
  const initialPageSize = 12;
  const [pageSize, setPageSize] = useState(initialPageSize);
  const router = useRouter();

  const handleShowMore = () => {
    const newPageSize = pageSize + 12 > 24 ? 24 : pageSize + 12;
    setPageSize(newPageSize);
  };

  return (
    <section className="brands">
      <div className={cn(styles.brands__container, "container")}>
        <h1 className="sections__title">Бренды</h1>
        <div className={styles.brandsContainer}>
          <div className={styles.promotion__card}>
            <Skeleton className={styles.promotion__card_skeleton} />
          </div>
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
        <div className="default__buttons">
          {pageSize < 24 ? (
            <button
              className="default__buttons_showMore"
              onClick={handleShowMore}
            >
              Показать еще
            </button>
          ) : (
            <button
              onClick={() => router.push("/brands")}
              className="default__buttons_showMore"
            >
              Показать все
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Brands;
