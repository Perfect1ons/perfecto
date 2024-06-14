"use client";
import styles from "./style.module.scss";
import { Cross, СhevronDownIcon } from "../../../../public/Icons/Icons";
import cn from "clsx";
import { IFiltersBrand } from "@/types/filtersBrand";
import { useState } from "react";
interface IPropsMobileFilter {
  filter: IFiltersBrand;
  isColumnView: boolean;
  toggleView: (view: boolean) => void;
  options: {
    label: string;
    value: "default" | "cheap" | "expensive" | "rating";
  }[];
  value: string;
  onChange: (value: "default" | "cheap" | "expensive" | "rating") => void;
}
const AllFiltersMobile = ({
  filter,
  isColumnView,
  toggleView,
  onChange,
  options,
  value,
}: IPropsMobileFilter) => {
  const [visibleFilter, setVisibleFilter] = useState<string | null>(null); // State to manage which filter is visible
  const toggleFilter = (filterName: string) => {
    setVisibleFilter((prev) => (prev === filterName ? null : filterName));
  };

  const allFilters =
    filter && filter.filter ? Object.values(filter.filter) : [];

  // Определяем количество частей
  const numberOfChunks = 2;

  // Разбиваем массив фильтров на части
  const chunkSize = Math.ceil(allFilters.length / numberOfChunks);
  const filterChunks = Array.from({ length: numberOfChunks }, (_, index) =>
    allFilters.slice(index * chunkSize, (index + 1) * chunkSize)
  );
  return (
    <>
      <div className="container">
        <div className="sort__buttons">
          <div className={styles.buttonModalContainer}>
            <button
              onClick={() => toggleFilter("modal")}
              className="catalogFilterButton"
            >
              Фильтры
              <span className={cn("filterNavItemArrowIsActive")}>
                <СhevronDownIcon />
              </span>
            </button>
            <div className="positionContainer">
              <button
                className="catalogFilterButton"
                onClick={() => toggleFilter("default")}
              >
                {options.find((option) => option.value === value)?.label ||
                  "По умолчанию"}
                <span
                  className={cn(
                    "filterNavItemArrowIsActive",
                    visibleFilter === "default" && "filterNavItemArrow"
                  )}
                >
                  <СhevronDownIcon />
                </span>
              </button>
              {visibleFilter === "default" && (
                <ul className="showCatalogFilterActive">
                  <div className="showCatalogFilterActiveChild">
                    <button
                      className="closeFilterUl"
                      onClick={() => toggleFilter("default")}
                    >
                      <Cross />
                    </button>
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className={cn(styles.option, {
                          [styles.selected]: value === option.value,
                        })}
                        onClick={() => {
                          onChange(option.value);
                        }}
                      >
                        <span className={styles.option__cyrcle}></span>
                        {option.label}
                      </div>
                    ))}
                  </div>
                </ul>
              )}
            </div>
          </div>
          <div className="default__sort_style">
            {!isColumnView ? (
              <button
                className="default__sort_icons_column"
                onClick={() => toggleView(true)}
              >
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className={`default__sort_icon_column ${
                      isColumnView ? "sort__button_icons_active" : ""
                    }`}
                  ></div>
                ))}
              </button>
            ) : (
              <button
                className="default__sort_icons"
                onClick={() => toggleView(false)}
              >
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className={`default__sort_icon ${
                      !isColumnView ? "sort__button_icons_active" : ""
                    }`}
                  ></div>
                ))}
              </button>
            )}
          </div>
        </div>
      </div>
      {visibleFilter === "modal" && (
        <div className={styles.containerMobileFilters}>
          <div className={styles.containerAllFiltersMobile}>
            <div className={styles.filterHeader}>
              <h3 className={styles.filterHeader__title}>Фильтры</h3>
              <button
                className={styles.filterHeader__close}
                onClick={() => toggleFilter("modal")}
              >
                <Cross />
              </button>
            </div>
            <div className={styles.filterAll}>
              <div className={styles.filterPrice}>
                <h3 className={styles.filterPrice__value}>Цена, сом</h3>
                <div className={styles.filterPrice__inputs}>
                  <input
                    className={styles.filterPrice__inputs__enter}
                    type="number"
                    placeholder="от 0"
                  />
                  <input
                    className={styles.filterPrice__inputs__enter}
                    type="number"
                    placeholder="до 0"
                  />
                </div>
              </div>
              <div className={styles.filterPrice}>
                <h3 className={styles.filterPrice__value}>Бренды</h3>
                <div className={styles.filterPrice__brands}>
                  {filter.brand.map((item: any) => {
                    return (
                      <button
                        // onClick={() => onBrandToggle("brand", item)}
                        // className={cn(styles.filterPrice__brands__btn, {
                        //   [styles.filterPrice__brands__btnActive]:
                        //     selectedBrands.brand?.[item],
                        // })}
                        key={item}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={styles.filterPrice}>
                <h3 className={styles.filterPrice__value}>Сроки доставки</h3>
                <div className={styles.filterPrice__brands}>
                  {filter.variant_day.map((item: any) => {
                    return (
                      <button
                        // onClick={() => onBrandToggle("day", item)}
                        // className={cn(styles.filterPrice__brands__btn, {
                        //   [styles.filterPrice__brands__btnActive]:
                        //     selectedBrands.day?.[item],
                        // })}
                        key={item}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.filterFooter}>
              <button className={styles.filterFooter__apply} onClick={close}>
                Применить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllFiltersMobile;
