"use client";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CatalogProductsCard from "./CatalogProductsCard/CatalogProductsCard";
import { IFiltersBrand } from "@/types/filtersBrand";
import cn from "clsx";
import {
  ChevronRightIcon,
  chevronDownIcon,
} from "../../../../public/Icons/Icons";
// import styles from "../CatalogProducts/CatalogProductsCard/style.module.scss";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

interface ICatalogProductsProps {
  catalog: ICatalogsProducts;
  filter: IFiltersBrand;
}

export default function CatalogProducts({
  catalog,
  filter,
}: ICatalogProductsProps) {
  const [filtersIsShow, setFiltersIsShow] = useState(false);
  const [brandIsShow, setBrandsIsShow] = useState(false);
  const [buttonResetShow, setButtonResetShow] = useState(false);
  const showButtonReset = () => {
    setButtonResetShow(true);
  };
  const isShowButtonReset = () => {
    setButtonResetShow(false);
  };
  const brandShowAll = () => {
    setBrandsIsShow(true); // Устанавливаем состояние для показа всех элементов
  };
  const showFilters = () => {
    setFiltersIsShow(!filtersIsShow);
  };
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const perPage = 20;
  const maxPagesToShowMore = 3; // Maximum number of times "Show more" button can be clicked
  const router = useRouter();
  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (nextPage >= maxPagesToShowMore) {
      setShowAll(true);
    }
  };
  const handleClick = (path: string) => {
    const fullPath = path.startsWith("/catalog/") ? path : `/catalog/${path}`;
    router.push(fullPath);
    close();
  };
  return (
    <div className="goods">
      <div className="container">
        <div className="cardContainer">
          <ol className={styles.breadcrumb}>
            <li className={styles.links}>
              <Link href="/" className={styles.link}>
                Главная
              </Link>
              <Link href="/" className={styles.link}>
                {catalog.category.parent}
              </Link>
              <Link
                onClick={() => handleClick(catalog.category.full_slug)}
                href={catalog.category.full_slug}
                className={styles.link}
              >
                {catalog.category.name}
              </Link>
            </li>
          </ol>
          <h1 className={styles.titleProducth1}>{catalog.category.name}</h1>
          <div className={styles.filtersContainer}>
            <div className={styles.brandContainer}>
              <button onClick={showFilters} className={styles.buttonBrand}>
                Бренд
                <span
                  className={cn(
                    styles.footerNavItemArrowIsActive,
                    filtersIsShow && styles.footerNavItemArrow
                  )}
                >
                  {chevronDownIcon()}
                </span>
              </button>
              <ul
                className={cn(styles.showFiltersUl, {
                  [styles.showFiltersActive]: filtersIsShow,
                })}
              >
                {filter.brand.map((item, index) => {
                  if (!brandIsShow && index >= 7) {
                    return null;
                  }
                  return (
                    <div key={item} className={styles.showFiltersUlContainer}>
                      <span
                        onClick={showButtonReset}
                        className={styles.showFiltersUlContainer__check}
                      ></span>
                      <li className={styles.showFiltersUl__li}>{item}</li>
                    </div>
                  );
                })}
                {!brandIsShow && filter.brand.length > 7 && (
                  <button
                    onClick={brandShowAll}
                    className={styles.buttonShowBrand}
                  >
                    Показать все
                  </button>
                )}
                {/* Показываем кнопки только если showAll равен true */}
                <div className={styles.buttonsContainer}>
                  {/* <button>Сбросить</button> */}
                  {buttonResetShow && ( // Показываем кнопку "Сбросить" если buttonResetShow равно true
                    <button
                      className={styles.buttonsContainer__button}
                      onClick={isShowButtonReset}
                    >
                      Сбросить
                    </button>
                  )}
                  <button className={styles.buttonsContainer__button}>
                    Готово
                  </button>
                </div>
              </ul>
            </div>
            <div className={styles.brandContainer}>
              <button onClick={showFilters} className={styles.buttonBrand}>
                Срок доставки
                <span
                  className={cn(
                    styles.footerNavItemArrowIsActive,
                    filtersIsShow && styles.footerNavItemArrow
                  )}
                >
                  {chevronDownIcon()}
                </span>
              </button>
              <ul
                className={cn(styles.showFiltersUl, {
                  [styles.showFiltersActive]: filtersIsShow,
                })}
              >
                {filter.variant_day.map((item, index) => {
                  if (!brandIsShow && index >= 7) {
                    return null;
                  }
                  return (
                    <div key={item} className={styles.showFiltersUlContainer}>
                      <span
                        onClick={showButtonReset}
                        className={styles.showFiltersUlContainer__check}
                      ></span>
                      <li className={styles.showFiltersUl__li}>{item}</li>
                    </div>
                  );
                })}
                {!brandIsShow && filter.brand.length > 7 && (
                  <button
                    onClick={brandShowAll}
                    className={styles.buttonShowBrand}
                  >
                    Показать все
                  </button>
                )}
                {/* Показываем кнопки только если showAll равен true */}
                <div className={styles.buttonsContainer}>
                  {/* <button>Сбросить</button> */}
                  {buttonResetShow && ( // Показываем кнопку "Сбросить" если buttonResetShow равно true
                    <button
                      className={styles.buttonsContainer__button}
                      onClick={isShowButtonReset}
                    >
                      Сбросить
                    </button>
                  )}
                  <button className={styles.buttonsContainer__button}>
                    Готово
                  </button>
                </div>
              </ul>
            </div>
            <div className={styles.brandContainer}>
              <button onClick={showFilters} className={styles.buttonBrand}>
                Цена
                <span
                  className={cn(
                    styles.footerNavItemArrowIsActive,
                    filtersIsShow && styles.footerNavItemArrow
                  )}
                >
                  {chevronDownIcon()}
                </span>
              </button>
              <ul
                className={cn(styles.showFiltersUl, {
                  [styles.showFiltersActive]: filtersIsShow,
                })}
              >
                <div className={styles.showFiltersUlContainer}>
                  <input type="text" className={styles.inputPrice} />
                  <input type="text" className={styles.inputPrice} />
                </div>
                {!brandIsShow && filter.brand.length > 7 && (
                  <button
                    onClick={brandShowAll}
                    className={styles.buttonShowBrand}
                  >
                    Показать все
                  </button>
                )}
                {/* Показываем кнопки только если showAll равен true */}
                <div className={styles.buttonsContainer}>
                  {/* <button>Сбросить</button> */}
                  {buttonResetShow && ( // Показываем кнопку "Сбросить" если buttonResetShow равно true
                    <button
                      className={styles.buttonsContainer__button}
                      onClick={isShowButtonReset}
                    >
                      Сбросить
                    </button>
                  )}
                  <button className={styles.buttonsContainer__button}>
                    Готово
                  </button>
                </div>
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
