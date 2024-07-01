"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Cross, СhevronDownIcon } from "../../../../public/Icons/Icons";
import cn from "clsx";
import { IFiltersBrandByAbdulaziz } from "@/components/temporary/data";
import { ISelectedFilterProps } from "../CatalogFiltres/CatalogFiltres";
import { useSearchParams } from "next/navigation";

interface IPropsMobileFilter {
  filter: IFiltersBrandByAbdulaziz;
  isColumnView: boolean;
  toggleView: (view: boolean) => void;
  options: {
    label: string;
    value: "cheap" | "expensive" | "rating";
  }[];
  value: string;
  onChange: (value: "cheap" | "expensive" | "rating") => void;
  setSelected: (filters: Partial<ISelectedFilterProps>) => void;
}

const AllFiltersMobile = ({
  filter,
  isColumnView,
  toggleView,
  onChange,
  options,
  value,
  setSelected,
}: IPropsMobileFilter) => {
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get("brand")?.split(",") || [];
  const initialPriceMin =
    parseInt(searchParams.get("priceMin") || "", 10) || null;
  const initialPriceMax =
    parseInt(searchParams.get("priceMax") || "", 10) || null;
  const initialDost = searchParams.get("dost")?.split(",") || [];
  const initialAdditionalFilter =
    searchParams.get("additional_filter")?.split(",") || [];

  const [visibleFilter, setVisibleFilter] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string[]>(initialBrand);
  const [selectedDost, setSelectedDost] = useState<string[]>(initialDost);
  const [priceMin, setPriceMin] = useState<number | null>(initialPriceMin);
  const [priceMax, setPriceMax] = useState<number | null>(initialPriceMax);
  const [selectedAdditionalFilters, setSelectedAdditionalFilters] = useState<
    string[]
  >(initialAdditionalFilter);

  const toggleFilter = (filterName: string) => {
    setVisibleFilter((prev) => (prev === filterName ? null : filterName));
  };

  const updateURLWithFilters = () => {
    const queryParams = new URLSearchParams();
    if (selectedBrand.length > 0)
      queryParams.set("brand", selectedBrand.join(","));
    if (priceMin !== null) queryParams.set("priceMin", priceMin.toString());
    if (priceMax !== null) queryParams.set("priceMax", priceMax.toString());
    if (selectedDost.length > 0)
      queryParams.set("dost", selectedDost.join(","));
    if (selectedAdditionalFilters.length > 0)
      queryParams.set("additional_filter", selectedAdditionalFilters.join(","));

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const applyFilters = () => {
    setSelected({
      brand: selectedBrand,
      dost: selectedDost,
      priceMin: priceMin !== null ? priceMin : undefined,
      priceMax: priceMax !== null ? priceMax : undefined,
      additional_filter: selectedAdditionalFilters,
    });
    updateURLWithFilters();
    toggleFilter("modal");
  };

  const resetFilters = () => {
    setSelectedBrand([]);
    setSelectedDost([]);
    setPriceMin(null);
    setPriceMax(null);
    setSelectedAdditionalFilters([]);
    updateURLWithFilters(); // Ensure URL is reset too
  };

  const filterData = Object.entries(filter.filter).map(([key, value]) => ({
    key,
    value,
  }));

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
              {selectedBrand.length > 0 ||
              selectedAdditionalFilters.length > 0 ||
              selectedDost.length > 0 ? (
                <span className="catalogFilterButton__count">
                  {selectedBrand.length +
                    selectedAdditionalFilters.length +
                    selectedDost.length}
                </span>
              ) : null}
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
        <div className={styles.containerAllFiltersMobile}>
          <div className={styles.filterHeader}>
            <div className={styles.filterHeader__filters}>
              <h3 className={styles.filterHeader__title}>Фильтры</h3>
              <button
                className={styles.filterHeader__reset}
                onClick={resetFilters}
              >
                Сбросить все
              </button>
            </div>
            <button
              aria-label="close mobile filters modal"
              className={styles.filterHeader__close}
              onClick={() => toggleFilter("modal")}
            >
              <Cross />
            </button>
          </div>
          <div className={styles.filterAll}>
            <div className={styles.filterPrice}>
              <h4 className={styles.filterPrice__value}>Цена, сом</h4>
              <div className={styles.filterPrice__inputs}>
                <input
                  className={styles.filterPrice__inputs__enter}
                  type="number"
                  placeholder="от 0"
                  value={priceMin ?? ""}
                  onChange={(e) =>
                    setPriceMin(e.target.value ? Number(e.target.value) : null)
                  }
                />
                <input
                  className={styles.filterPrice__inputs__enter}
                  type="number"
                  placeholder="до 0"
                  value={priceMax ?? ""}
                  onChange={(e) =>
                    setPriceMax(e.target.value ? Number(e.target.value) : null)
                  }
                />
              </div>
            </div>
            <div className={styles.filterPrice}>
              <h4 className={styles.filterPrice__value}>Бренды</h4>
              <div className={styles.filterPrice__brands}>
                {filter.brand.map((item: any) => {
                  return (
                    <label htmlFor={item} key={item}>
                      <input
                        key={item}
                        type="checkbox"
                        name=""
                        id={item}
                        checked={selectedBrand.includes(item)}
                        onChange={() => {
                          setSelectedBrand((prev) =>
                            prev.includes(item)
                              ? prev.filter((brand) => brand !== item)
                              : [...prev, item]
                          );
                        }}
                      />
                      {item}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className={styles.filterPrice}>
              <h3 className={styles.filterPrice__value}>Сроки доставки</h3>
              <div className={styles.filterPrice__brands}>
                {filter.variant_day.map((item: any) => {
                  return (
                    <label htmlFor={item} key={item}>
                      <input
                        key={item}
                        type="checkbox"
                        name=""
                        id={item}
                        checked={selectedDost.includes(item)}
                        onChange={() => {
                          setSelectedDost((prev) =>
                            prev.includes(item)
                              ? prev.filter((dost) => dost !== item)
                              : [...prev, item]
                          );
                        }}
                      />
                      {item}
                    </label>
                  );
                })}
              </div>
            </div>
            {filterData.map((item, index) => {
              const subData = Object.entries(item.value.filter).map(
                ([key, value]) => ({
                  key,
                  value,
                })
              );
              return (
                <div key={index} className={styles.filterPrice}>
                  <h4 className={styles.filterPrice__value}>
                    {item.value.type_name}
                  </h4>
                  <div className={styles.filterPrice__brands}>
                    {subData.map((sub, subIndex) =>
                      sub.value.name !== "Отсустствует" ? (
                        <label
                          htmlFor={sub.value.id_filter.toString()}
                          key={subIndex}
                        >
                          <input
                            type="checkbox"
                            name=""
                            id={sub.value.id_filter.toString()}
                            checked={selectedAdditionalFilters.includes(
                              sub.value.id_filter.toString()
                            )}
                            onChange={() => {
                              setSelectedAdditionalFilters((prev) =>
                                prev.includes(sub.value.id_filter.toString())
                                  ? prev.filter(
                                      (filter) =>
                                        filter !==
                                        sub.value.id_filter.toString()
                                    )
                                  : [...prev, sub.value.id_filter.toString()]
                              );
                            }}
                          />
                          {sub.value.name}
                        </label>
                      ) : null
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.filterFooter}>
            <button
              className={styles.filterFooter__apply}
              onClick={applyFilters}
            >
              Применить
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AllFiltersMobile;
