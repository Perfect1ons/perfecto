"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { IFiltersBrandByAbdulaziz } from "../data";
import clsx from "clsx";
import { Cross, СhevronDownIcon } from "../../../../public/Icons/Icons";
import Image from "next/image";

interface IFilterProps {
  filters: IFiltersBrandByAbdulaziz;
}

interface ISelectedFilterProps {
  id: number;
  page: number;
  brand: string[];
  dost: string[];
  additional_filter: { [key: string]: string[] };
  priceMin: number;
  priceMax: number;
}

const FiltersByAbdulaziz: React.FC<IFilterProps> = ({ filters }) => {
  //! State для хранение данных которые User запросил и для запроса фильтрованных данных
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilterProps>({
    id: 28631,
    page: 1,
    brand: [],
    priceMin: 0,
    priceMax: 0,
    dost: [],
    additional_filter: {},
  });
  console.log(selectedFilters);
  
  //! State  для хранения текущего открытого выпадающего меню.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  //! State для задержки между запросами
  const [processing, setProcessing] = useState(false);
  //! Закрытие выпадающего меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown &&
        !(event.target as HTMLElement).closest(`.${styles.dropdown}`)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  //! Преобразование объекта фильтров в массив для удобства работы.
  const data = Object.entries(filters.filter).map(([key, value]) => ({
    key,
    value,
  })).slice(0,4);

  //! Обработчики выбора и снятия фильтров
  // Функция handleFilterToggle добавляет или удаляет фильтры в зависимости от текущего состояния.
const handleFilterToggle = (filterType: "brand" | "dost", value: string) => {
  if (processing) return;

  setProcessing(true);

  setSelectedFilters((prevFilters) => {
    const isSelected = prevFilters[filterType].includes(value);
    if (isSelected) {
      console.log(`Filter removed: ${value}`);
      return {
        ...prevFilters,
        [filterType]: prevFilters[filterType].filter((item) => item !== value),
      };
    } else {
      console.log(`Filter added: ${value}`);
      return {
        ...prevFilters,
        [filterType]: [...prevFilters[filterType], value],
      };
    }
  });

  setTimeout(() => {
    setProcessing(false);
  }, 100); // Время задержки, после которого элемент вновь становится активным
};

  //  Функция handleAdditionalFilterToggle аналогичная функция для дополнительных фильтров.
  const handleAdditionalFilterToggle = (filterType: string, value: string) => {
    setSelectedFilters((prevFilters) => {
      const selected = prevFilters.additional_filter[filterType] || [];
      const isSelected = selected.includes(value);
      if (isSelected) {
        console.log(`Additional filter removed: ${value}`);
        return {
          ...prevFilters,
          additional_filter: {
            ...prevFilters.additional_filter,
            [filterType]: selected.filter((item) => item !== value),
          },
        };
      } else {
        console.log(`Additional filter added: ${value}`);
        return {
          ...prevFilters,
          additional_filter: {
            ...prevFilters.additional_filter,
            [filterType]: [...selected, value],
          },
        };
      }
    });
  };



  //! Очистка фильтров
  // Функция handleClearFilters очищает выбранные фильтры для заданного типа.
  const handleClearFilters = (filterType: "brand" | "dost" | string) => {
    if (filterType === "brand" || filterType === "dost") {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: [],
      }));
    } else {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        additional_filter: {
          ...prevFilters.additional_filter,
          [filterType]: [],
        },
      }));
    }
  };

  const handleRemoveSelectedFilter = (
    filterType: "brand" | "dost" | string,
    value: string
  ) => {
    if (filterType === "brand" || filterType === "dost") {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: prevFilters[filterType].filter((item) => item !== value),
      }));
    } else {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        additional_filter: {
          ...prevFilters.additional_filter,
          [filterType]: prevFilters.additional_filter[filterType].filter(
            (item) => item !== value
          ),
        },
      }));
    }
  };

  //! Очистка всех фильтров - Функция handleClearAllSelectedFilters сбрасывает все выбранные фильтры.
  const handleClearAllSelectedFilters = () => {
    setSelectedFilters({
      id: 28631,
      page: 1,
      brand: [],
      priceMin: 0,
      priceMax: 0,
      dost: [],
      additional_filter: {},
    });
  };

  const hasSelectedFilters =
    selectedFilters.brand.length > 0 ||
    selectedFilters.dost.length > 0 ||
    Object.keys(selectedFilters.additional_filter).some(
      (key) => selectedFilters.additional_filter[key].length > 0
    );

  return (
    <>
      <div className={styles.filters}>
        {/* ФИЛЬТР ПО СРОКАМ ДОСТАВКИ */}
        <div className={`${styles.filters__sections} ${styles.dropdown}`}>
          <h1
            className={styles.filters__title}
            onClick={() =>
              setOpenDropdown(openDropdown === "dost" ? null : "dost")
            }
          >
            Сроки доставки
            <span
              className={clsx(
                "filterNavItemArrowIsActive",
                openDropdown === "dost" && "filterNavItemArrow"
              )}
            >
              <СhevronDownIcon />
            </span>
            {selectedFilters.dost.length >= 1 ? (
              <span className={styles.filters__title_count}>
                {selectedFilters.dost.length}
              </span>
            ) : null}
          </h1>
          {openDropdown === "dost" && (
            <div className={styles.dropdownContent}>
              <button
                className={styles.closeButton}
                onClick={() => setOpenDropdown(null)}
              >
                <Cross />
              </button>
              {filters.variant_day.length > 0 &&
                filters.variant_day.map((days, index) => (
                  <label
                    onClick={() => handleFilterToggle("dost", days)}
                    className={styles.filterLabel}
                    key={index}
                  >
                    <span
                      className={clsx("showFiltersUlContainer__check", {
                        ["showFiltersUlContainer__checkActive"]:
                          selectedFilters.dost.includes(days),
                      })}
                    >
                      {selectedFilters.dost.includes(days) ? (
                        <Image
                          src="/img/checkIconWhite.svg"
                          width={15}
                          height={15}
                          alt="check"
                        />
                      ) : (
                        <div className={styles.empty}>e</div>
                      )}
                    </span>
                    {days}
                  </label>
                ))}
              <button
                className={styles.clearButton}
                disabled={selectedFilters.dost.length <= 0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearFilters("dost");
                }}
              >
                <span
                  className={clsx(
                    styles.clearButton__reset,
                    selectedFilters.dost.length > 0
                      ? styles.clearButtonActive
                      : null
                  )}
                >
                  Сбросить
                </span>
              </button>
            </div>
          )}
        </div>
        {/* ФИЛЬТР БРЕНДАМ */}
        <div className={`${styles.filters__sections} ${styles.dropdown}`}>
          <h1
            className={styles.filters__title}
            onClick={() =>
              setOpenDropdown(openDropdown === "brand" ? null : "brand")
            }
          >
            Бренд
            <span
              className={clsx(
                "filterNavItemArrowIsActive",
                openDropdown === "brand" && "filterNavItemArrow"
              )}
            >
              <СhevronDownIcon />
            </span>
            {selectedFilters.brand.length >= 1 ? (
              <span className={styles.filters__title_count}>
                {selectedFilters.brand.length}
              </span>
            ) : null}
          </h1>
          {openDropdown === "brand" && (
            <div className={styles.dropdownContent}>
              <button
                className={styles.closeButton}
                onClick={() => setOpenDropdown(null)}
              >
                <Cross />
              </button>
              {filters.brand.length > 0 &&
                filters.brand.map((brand, index) => (
                  <label
                    onClick={() => handleFilterToggle("brand", brand)}
                    className={styles.filterLabel}
                    key={index}
                  >
                    <span
                      className={clsx("showFiltersUlContainer__check", {
                        ["showFiltersUlContainer__checkActive"]:
                          selectedFilters.brand.includes(brand),
                      })}
                    >
                      {selectedFilters.brand.includes(brand) ? (
                        <Image
                          src="/img/checkIconWhite.svg"
                          width={15}
                          height={15}
                          alt="check"
                        />
                      ) : (
                        <div className={styles.empty}>e</div>
                      )}
                    </span>
                    {brand}
                  </label>
                ))}
              <button
                className={styles.clearButton}
                disabled={selectedFilters.brand.length <= 0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearFilters("brand");
                }}
              >
                <span
                  className={clsx(
                    styles.clearButton__reset,
                    selectedFilters.brand.length > 0
                      ? styles.clearButtonActive
                      : null
                  )}
                >
                  Сбросить
                </span>
              </button>
            </div>
          )}
        </div>
        {/* ФИЛЬТР ПО ДОП ФИЛЬТРАМ */}
        {data.map((item, index) => {
          const subData = Object.entries(item.value.filter).map(
            ([key, value]) => ({
              key,
              value,
            })
          );
          return (
            <div
              className={`${styles.filters__sections} ${styles.dropdown}`}
              key={index}
            >
              <h1
                className={styles.filters__title}
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === item.value.type_name
                      ? null
                      : item.value.type_name
                  )
                }
              >
                {item.value.type_name}
                <span
                  className={clsx(
                    "filterNavItemArrowIsActive",
                    openDropdown === item.value.type_name &&
                      "filterNavItemArrow"
                  )}
                >
                  <СhevronDownIcon />
                </span>
                {Object.keys(
                  selectedFilters.additional_filter[item.value.type_name] || {}
                ).length >= 1 ? (
                  <span className={styles.filters__title_count}>
                    {
                      Object.keys(
                        selectedFilters.additional_filter[
                          item.value.type_name
                        ] || {}
                      ).length
                    }
                  </span>
                ) : null}
              </h1>
              {openDropdown === item.value.type_name && (
                <div className={styles.dropdownContent}>
                  <button
                    className={styles.closeButton}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <Cross />
                  </button>
                  {subData.map((sub, subIndex) =>
                    sub.value.name !== "Отсустствует" ? (
                      <label
                        onClick={() =>
                          handleAdditionalFilterToggle(
                            item.value.type_name,
                            String(sub.value.id_filter)
                          )
                        }
                        className={styles.filterLabel}
                        key={subIndex}
                      >
                        <span
                          className={clsx("showFiltersUlContainer__check", {
                            ["showFiltersUlContainer__checkActive"]:
                              selectedFilters.additional_filter[
                                item.value.type_name
                              ]?.includes(String(sub.value.id_filter)),
                          })}
                        >
                          {selectedFilters.additional_filter[
                            item.value.type_name
                          ]?.includes(String(sub.value.id_filter)) ? (
                            <Image
                              src="/img/checkIconWhite.svg"
                              width={15}
                              height={15}
                              alt="check"
                            />
                          ) : (
                            <div className={styles.empty}>e</div>
                          )}
                        </span>
                        {sub.value.name}
                      </label>
                    ) : null
                  )}

                  <button
                    className={styles.clearButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearFilters(item.value.type_name);
                    }}
                  >
                    Сбросить
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* ФИЛЬТРОВАННЫЕ КРОШКИ */}

      <div className={styles.selected__filters}>
        {/* <h1>{selectedFilters.priceMin}</h1> */}
        {/* <h1>{selectedFilters.priceMax}</h1> */}
        {selectedFilters.brand.map((brand, index) => (
          <span
            onClick={() => handleRemoveSelectedFilter("brand", brand)}
            className={styles.selected}
            key={index}
          >
            {brand}
            <button className={styles.deleteButton}>
              <Cross />
            </button>
          </span>
        ))}
        {selectedFilters.dost.map((dost, index) => (
          <span
            onClick={() => handleRemoveSelectedFilter("dost", dost)}
            className={styles.selected}
            key={index}
          >
            {dost}
            <button className={styles.deleteButton}>
              <Cross />
            </button>
          </span>
        ))}
        {/* {Object.entries(selectedFilters.additional_filter).map(
          ([key, value]) => (
            <span className={styles.selected} key={key}>
              {key}:
              {value.map((v, i) => (
                <span key={i}>
                  {v}
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleRemoveSelectedFilter(key, v)}
                  >
                    <Cross />
                  </button>
                </span>
              ))}
            </span>
          )
        )} */}
        {hasSelectedFilters && (
          <button
            className={styles.clearAllButton}
            onClick={handleClearAllSelectedFilters}
          >
            Сбросить все
          </button>
        )}
      </div>
    </>
  );
};

export default FiltersByAbdulaziz;
