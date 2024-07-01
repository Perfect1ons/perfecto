import React from "react";
import styles from "./styles.module.scss";
import { XMark } from "../../../../../public/Icons/Icons";
import { FilterKey } from "../CatalogProducts";

type FiltersCrumbsProps = {
  selectedFilters: {
    brand: string[];
    priceMin: number;
    priceMax: number;
    dost: string[];
    additional_filter: string[];
  };
  clearFilterCrumbs: (filterKey: FilterKey, value: string | number) => void;
};

const FiltersCrumbs: React.FC<FiltersCrumbsProps> = ({
  selectedFilters,
  clearFilterCrumbs,
}) => {
  const { brand, priceMin, priceMax, dost, additional_filter } =
    selectedFilters;

  const renderFilterCrumb = (filterKey: FilterKey, value: string) => (
    <div
      onClick={() => clearFilterCrumbs(filterKey, value)}
      className={styles.container_filter}
    >
      <span className={styles.container_filter__value}>{value}</span>
      <button className={styles.container_filter__cross}>
        <XMark />
      </button>
    </div>
  );

  return (
    <div className={styles.container}>
      {brand.map((value) => renderFilterCrumb("brand", value))}
      {dost.map((value) => renderFilterCrumb("dost", value))}
      {additional_filter.map((value) =>
        renderFilterCrumb("additional_filter", value)
      )}
      {priceMin > 0 &&
        renderFilterCrumb("priceMin", `от ${priceMin.toLocaleString()} c`)}
      {priceMax > 0 &&
        renderFilterCrumb("priceMax", `до ${priceMax.toLocaleString()} c`)}
    </div>
  );
};

export default FiltersCrumbs;
