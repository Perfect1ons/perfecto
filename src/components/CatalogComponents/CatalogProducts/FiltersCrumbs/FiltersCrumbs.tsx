import React from "react";
import styles from "./styles.module.scss";
import { XMark } from "../../../../../public/Icons/Icons";
import { FilterKey } from "../CatalogProducts";
import { IFiltersBrand, N11, N43 } from "@/types/filtersBrand";

type FiltersCrumbsProps = {
  filter: IFiltersBrand;
  selectedFilters: {
    brand: string[];
    priceMin: number;
    priceMax: number;
    dost: string[];
    additional_filter: string[];
  };
  clearFilterCrumbs: (filterKey: FilterKey, value: string | number) => void;
  clearAllCrumbs: () => void;
};

const FiltersCrumbs: React.FC<FiltersCrumbsProps> = ({
  selectedFilters,
  clearFilterCrumbs,
  clearAllCrumbs,
  filter,
}) => {
  const { brand, priceMin, priceMax, dost, additional_filter } =
    selectedFilters;

  const renderFilterCrumb = (filterKey: FilterKey, value: string) => (
    <div
      key={value}
      onClick={() => clearFilterCrumbs(filterKey, value)}
      className={styles.container_filter}
    >
      <span className={styles.container_filter__value}>{value}</span>
      <button className={styles.container_filter__cross}>
        <XMark />
      </button>
    </div>
  );

  const show =
    brand.length > 0 ||
    dost.length > 0 ||
    additional_filter.length > 0 ||
    priceMin > 0 ||
    priceMax > 0;

  return (
    <>
      {show && (
        <div className={styles.container}>
          {brand.map((value) => renderFilterCrumb("brand", value))}
          {dost.map((value) => renderFilterCrumb("dost", value))}
          {additional_filter.map((value) => {
            const filterItem = Object.values(filter.filter).find((item: N11) =>
              Object.values(item.filter).some(
                (data: N43) => data.id_filter === parseInt(value)
              )
            );
            if (filterItem) {
              const filterData: any = Object.values(filterItem.filter).find(
                (data: any) => data.id_filter === parseInt(value)
              );
              if (filterData) {
                return renderFilterCrumb("additional_filter", value);
              }
            }
            return null; // Обязательно возвращайте что-то из map, даже если ничего не нужно отображать
          })}
          {priceMin > 0 &&
            renderFilterCrumb("priceMin", `от ${priceMin.toLocaleString()} c`)}
          {priceMax > 0 &&
            renderFilterCrumb("priceMax", `до ${priceMax.toLocaleString()} c`)}
          {show && (
            <button
              className={styles.container__clear_all}
              onClick={clearAllCrumbs}
            >
              Сбросить все
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FiltersCrumbs;
