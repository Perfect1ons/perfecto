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

  const renderFilterCrumb = (
    filterKey: FilterKey,
    value: string | number,
    name?: string
  ) => (
    <div
      key={`${filterKey}-${value}`}
      onClick={() => clearFilterCrumbs(filterKey, value.toString())}
      className={styles.container_filter}
    >
      <span className={styles.container_filter__value}>{name ?? value}</span>
      <button className={styles.container_filter__cross}>
        <XMark />
      </button>
    </div>
  );

  const getDayLabel = (value: number) => {
    if (value % 10 === 1 && value % 100 !== 11) {
      return "день";
    } else if (
      [2, 3, 4].includes(value % 10) &&
      ![12, 13, 14].includes(value % 100)
    ) {
      return "дня";
    } else {
      return "дней";
    }
  };

  const getDaysRangeLabel = (range: string) => {
    const [start, end] = range.split("-").map(Number);
    const startLabel = getDayLabel(start);
    const endLabel = getDayLabel(end);
    return `${start} ${startLabel} - ${end} ${endLabel}`;
  };

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
          {dost.map((value) => {
            const daysLabel =
              typeof value === "string" && value.includes("-")
                ? getDaysRangeLabel(value)
                : `${value} ${getDayLabel(Number(value))}`;
            return renderFilterCrumb("dost", value, daysLabel);
          })}
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
                return renderFilterCrumb(
                  "additional_filter",
                  filterData.id_filter.toString(),
                  filterData.name // Передача имени для отображения
                );
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
