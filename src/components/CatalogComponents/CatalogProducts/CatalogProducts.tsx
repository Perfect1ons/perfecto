"use client";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CatalogProductsCard from "./CatalogProductsCard/CatalogProductsCard";
import { IFiltersBrand } from "@/types/filtersBrand";
import cn from "clsx";
import { chevronDownIcon } from "../../../../public/Icons/Icons";
import styles from "../CatalogProducts/CatalogProductsCard/style.module.scss";

interface ICatalogProductsProps {
  catalog: ICatalogsProducts;
  filter: IFiltersBrand;
}

export default function CatalogProducts({
  catalog,
  filter,
}: ICatalogProductsProps) {
  const [filtersIsShow, setFiltersIsShow] = useState(false);
  const showFilters = () => {
    setFiltersIsShow(!filtersIsShow);
  };
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const perPage = 10;
  const maxPagesToShowMore = 3; // Maximum number of times "Show more" button can be clicked
  const router = useRouter();
  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (nextPage >= maxPagesToShowMore) {
      setShowAll(true);
    }
  };
  return (
    <div className="goods">
      <div className="container">
        <div className="cardContainer">
          <div className={styles.filtersContainer}>
            <div onClick={showFilters} className={styles.brandContainer}>
              Бренд
              {chevronDownIcon()}
              <ul
                className={cn(styles.showFiltersUl, {
                  [styles.showFiltersActive]: filtersIsShow,
                })}
              >
                {filter.brand.map((item) => {
                  return (
                    <div key={item} className={styles.showFiltersUlContainer}>
                      <span
                        className={styles.showFiltersUlContainer__check}
                      ></span>
                      <li className={styles.showFiltersUl__li}>{item}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="main__news_cards">
            {catalog.model.slice(0, page * perPage).map((item, index) => (
              <CatalogProductsCard catalog={item} key={index} filter={filter} />
            ))}
          </div>

          {/* {!showAll && page < maxPagesToShowMore && (
            <div className="showMoreBtn">
              <button
                className="default__buttons_showMore"
                onClick={handleShowMore}
              >
                Показать еще
              </button>
            </div>
          )}

          {showAll && (
            <div className="showMoreBtn">
              <button
                className="default__buttons_showMore"
                onClick={() => router.push("/all-popular-goods")}
              >
                Показать все
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
