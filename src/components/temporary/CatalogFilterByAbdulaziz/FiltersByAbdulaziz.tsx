"use client"
import { IFiltersBrand } from "@/types/filtersBrand";
import React, { useState } from "react";
import styles from "./style.module.scss";

interface IFilterProps {
  filters: IFiltersBrand;
}

interface ISelectedFilterProps {
  id: number;
  page: number;
  brand: string[];
  dost: string[];
  additional_filter: any[];
  priceMin: number;
  priceMax: number;
}

const FiltersByAbdulaziz: React.FC<IFilterProps> = ({ filters }) => {
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilterProps>({
    id: 28631,
    page: 1,
    brand: [],
    priceMin: 0,
    priceMax: 0,
    dost: [],
    additional_filter: [],
  });
  console.log(selectedFilters);
  

  // Функция для обновления выбранных фильтров по клику
  const handleFilterToggle = (filterType: "brand" | "dost", value: string) => {
    setSelectedFilters((prevFilters) => {
      const isSelected = prevFilters[filterType].includes(value);
      if (isSelected) {
        // Если значение уже выбрано, удаляем его
        return {
          ...prevFilters,
          [filterType]: prevFilters[filterType].filter(
            (item) => item !== value
          ),
        };
      } else {
        // Если значение не выбрано, добавляем его
        return {
          ...prevFilters,
          [filterType]: [...prevFilters[filterType], value],
        };
      }
    });
  };

  return (
    <div className={styles.filters}>
      {/* ФИЛЬТР ПО СРОКАМ ДОСТАВКИ */}
      <div className={styles.filters__sections}>
        <h1 className="section__title">Delivery Days</h1>
        <div className={styles.filterbtn__container}>
          {filters.variant_day.length > 0 &&
            filters.variant_day.map((days, index) => (
              <label
                onChange={() => handleFilterToggle("dost", days)}
                className={styles.filterLabel}
                key={index}
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.dost.includes(days)}
                />
                {days}
              </label>
            ))}
        </div>
      </div>
      {/* ФИЛЬТР БРЕНДАМ */}
      <div className={styles.filters__sections}>
        <h1 className="section__title">Brands</h1>
        <div className={styles.filterbtn__container}>
          {filters.brand.length > 0 &&
            filters.brand.map((brand, index) => (
              <label
                onChange={() => handleFilterToggle("brand", brand)}
                className={styles.filterLabel}
                key={index}
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.brand.includes(brand)}
                />
                {brand}
              </label>
            ))}
        </div>
      </div>
      {/* ФИЛЬТР ПО ДОП ФИЛЬТРАМ */}
      <div className={styles.filters__sections}>
        <h1 className="section__title">Additional Filters</h1>
        <div className={styles.filterbtn__container}>
          {/* Здесь добавьте чекбоксы для дополнительных фильтров */}
        </div>
      </div>
    </div>
  );
};

export default FiltersByAbdulaziz;
