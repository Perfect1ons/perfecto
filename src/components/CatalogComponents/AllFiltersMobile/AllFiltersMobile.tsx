"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import {
  Cross,
  FilterIcon,
  СhevronDownIcon,
} from "../../../../public/Icons/Icons";
import cn from "clsx";
import { IFiltersBrandByAbdulaziz } from "@/components/temporary/data";
import { ISelectedFilterProps } from "../CatalogFiltres/CatalogFiltres";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import FiltersCrumbs from "../CatalogProducts/FiltersCrumbs/FiltersCrumbs";
import { IFiltersBrand } from "@/types/filtersBrand";
import DefaultFilter from "../CatalogFiltres/DefaultFilter/DefaultFilter";
import { getFiltersBrandByAClient } from "@/api/clientRequest";

interface IPropsMobileFilter {
  categoryid: number;
  filter: IFiltersBrandByAbdulaziz;
  isColumnView: boolean;
  toggleView: (view: boolean) => void;
  setSelected: (filters: Partial<ISelectedFilterProps>) => void;
  filters: IFiltersBrand;
  selectedSort: { sortName: string; sortTitle: string };
  setSelectedSort: React.Dispatch<
    React.SetStateAction<{ sortName: string; sortTitle: string }>
  >;
  handleSortChange: (option: { sortName: string; sortTitle: string }) => void;
}

const AllFiltersMobile = ({
  categoryid,
  filter,
  isColumnView,
  toggleView,
  setSelected,
  filters,
  selectedSort,
  setSelectedSort,
  handleSortChange,
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
  const [showAllBrands, setShowAllBrands] = useState(false);

  const toggleFilter = (filterName: string) => {
    setVisibleFilter((prev) => (prev === filterName ? null : filterName));
  };

  const [clientFilter, setClientFilter] = useState(filter);

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
    window.history.replaceState({ path: newUrl }, "", newUrl);
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
  const [isLoading, setIsLoading] = useState(false);
  const clearURLFilters = () => {
    const queryParams = new URLSearchParams(window.location.search);

    // Удаляем параметры фильтров из URL
    queryParams.delete("brand");
    queryParams.delete("priceMin");
    queryParams.delete("priceMax");
    queryParams.delete("dost");
    queryParams.delete("additional_filter");

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);
  };

  const resetFilters = () => {
    setSelectedBrand([]);
    setSelectedDost([]);
    setPriceMin(null);
    setPriceMax(null);
    setSelectedAdditionalFilters([]);
    clearURLFilters();
  };

  const filterData = Object.entries(clientFilter.filter).map(
    ([key, value]) => ({
      key,
      value,
    })
  );

  useEffect(() => {
    fetchFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAdditionalFilters]);

  const fetchFilters = async () => {
    setIsLoading(true);
    try {
      const clientFilter = await getFiltersBrandByAClient(
        categoryid,
        selectedAdditionalFilters.join(",")
      );

      if (clientFilter) {
        setClientFilter(clientFilter);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilterCrumb = (
    filterKey: keyof ISelectedFilterProps,
    value: string | number
  ) => {
    switch (filterKey) {
      case "brand":
        setSelectedBrand((prev) => prev.filter((brand) => brand !== value));
        break;
      case "dost":
        setSelectedDost((prev) => prev.filter((dost) => dost !== value));
        break;
      case "additional_filter":
        setSelectedAdditionalFilters((prev) =>
          prev.filter((filter) => filter !== value)
        );
        break;
      case "priceMin":
        setPriceMin(null);
        break;
      case "priceMax":
        setPriceMax(null);
        break;
      default:
        break;
    }
    updateURLWithFilters();
  };

  const clearAllCrumbs = () => {
    setSelectedBrand([]);
    setSelectedDost([]);
    setPriceMin(null);
    setPriceMax(null);
    setSelectedAdditionalFilters([]);
    clearURLFilters();
    setSelected({
      brand: [],
      priceMin: 0,
      priceMax: 0,
      dost: [],
      additional_filter: [],
    });
  };
  // Эффект для управления стилями тела страницы
  useEffect(() => {
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (visibleFilter === "modal") {
      // Устанавливаем стили, чтобы скрыть прокрутку и фиксировать позицию
      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
      body.style.top = `-${window.scrollY}px`; // Запоминаем текущую позицию скролла
    } else {
      // Восстанавливаем нормальные стили для прокрутки
      const scrollY = body.style.top;
      body.style.paddingRight = "";
      body.style.overflow = "auto";
      window.scrollTo(0, parseInt(scrollY || "0") * -1); // Возвращаемся на прежнюю позицию скролла
      body.style.top = "";
    }
  }, [visibleFilter]);
  return (
    <>
      <div className={cn("container", styles.filterSticky)}>
        <div className="sort__buttons">
          <div className={styles.buttonModalContainer}>
            <DefaultFilter
              visibleFilter={visibleFilter}
              toggleFilter={toggleFilter}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              handleSortChange={handleSortChange}
            />
            <button
              onClick={() => toggleFilter("modal")}
              className={cn("catalogFilterButton", styles.gap)}
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
              <span
                style={{ color: "#212529" }}
                className={cn("filterNavItemArrowIsActive")}
              >
                <FilterIcon />
              </span>
            </button>
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

        <FiltersCrumbs
          filter={filters}
          selectedFilters={{
            brand: selectedBrand,
            priceMin: priceMin ?? 0,
            priceMax: priceMax ?? 0,
            dost: selectedDost,
            additional_filter: selectedAdditionalFilters,
          }}
          clearFilterCrumbs={clearFilterCrumb}
          clearAllCrumbs={clearAllCrumbs}
        />
      </div>
      {visibleFilter === "modal" && (
        <div className={styles.containerAllFiltersMobile}>
          <div className={styles.filterHeader}>
            <div className={styles.filterHeader__filters}>
              <h3 className={styles.filterHeader__title}>Фильтры</h3>
              {selectedBrand.length > 0 ||
              selectedAdditionalFilters.length > 0 ||
              selectedDost.length > 0 ? (
                <button
                  className={styles.filterHeader__reset}
                  onClick={resetFilters}
                >
                  Сбросить все
                </button>
              ) : null}
            </div>
            <button
              aria-label="close mobile filters modal"
              className={styles.filterHeader__close}
              onClick={() => toggleFilter("modal")}
            >
              <Cross />
            </button>
          </div>
          {isLoading ? (
            <h1>loading</h1>
          ) : (
            <>
              <div className={styles.filterAll}>
                {/* Мобильная фильтрация цены */}
                <div className={styles.filterPrice}>
                  <h4 className={styles.filterPrice__value}>Цена, сом</h4>
                  <div className={styles.filterPrice__inputs}>
                    <input
                      className={styles.filterPrice__inputs__enter}
                      type="number"
                      placeholder="от 0"
                      value={priceMin ?? ""}
                      onChange={(e) =>
                        setPriceMin(
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                    />
                    <input
                      className={styles.filterPrice__inputs__enter}
                      type="number"
                      placeholder="до 0"
                      value={priceMax ?? ""}
                      onChange={(e) =>
                        setPriceMax(
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                    />
                  </div>
                </div>
                {/* Мобильная фильтрация бренды */}
                <div className={styles.filterPrice}>
                  <h4 className={styles.filterPrice__value}>Бренды</h4>
                  <div className={styles.filterPrice__brands}>
                    {showAllBrands
                      ? filter.brand.map((item: any) => (
                          <label
                            onClick={() =>
                              setSelectedBrand((prev) =>
                                prev.includes(item)
                                  ? prev.filter((brand) => brand !== item)
                                  : [...prev, item]
                              )
                            }
                            className={clsx(
                              styles.filterLabel,
                              selectedBrand.includes(item) &&
                                styles.filterLabel__checked
                            )}
                            key={item}
                          >
                            <span className={styles.filterLabel__icon}>
                              {selectedBrand.includes(item) ? (
                                <Image
                                  src="/img/checkIconWhite.svg"
                                  width={15}
                                  height={15}
                                  alt="check"
                                />
                              ) : (
                                <div className={styles.filterLabel__empty}>
                                  e
                                </div>
                              )}
                            </span>
                            <span className={styles.filterLabel__title}>
                              {item}
                            </span>
                          </label>
                        ))
                      : filter.brand.slice(0, 6).map((item: any) => (
                          <label
                            onClick={() =>
                              setSelectedBrand((prev) =>
                                prev.includes(item)
                                  ? prev.filter((brand) => brand !== item)
                                  : [...prev, item]
                              )
                            }
                            className={clsx(
                              styles.filterLabel,
                              selectedBrand.includes(item) &&
                                styles.filterLabel__checked
                            )}
                            key={item}
                          >
                            <span className={styles.filterLabel__icon}>
                              {selectedBrand.includes(item) ? (
                                <Image
                                  src="/img/checkIconWhite.svg"
                                  width={15}
                                  height={15}
                                  alt="check"
                                />
                              ) : (
                                <div className={styles.filterLabel__empty}>
                                  e
                                </div>
                              )}
                            </span>
                            <span className={styles.filterLabel__title}>
                              {item}
                            </span>
                          </label>
                        ))}
                  </div>
                  {filter.brand.length > 6 && (
                    <div className={styles.showAll}>
                      <button
                        className={styles.showAllBrandsButton}
                        onClick={() => setShowAllBrands(!showAllBrands)}
                      >
                        {showAllBrands ? "Скрыть" : "Показать все"}
                      </button>
                    </div>
                  )}
                </div>
                <div className={styles.filterPrice}>
                  <h3 className={styles.filterPrice__value}>Сроки доставки</h3>
                  <div className={styles.filterPrice__brands}>
                    {filter.variant_day.map((item: any) => {
                      return (
                        <label
                          onClick={() => {
                            setSelectedDost((prev) =>
                              prev.includes(item)
                                ? prev.filter((dost) => dost !== item)
                                : [...prev, item]
                            );
                          }}
                          className={clsx(
                            styles.filterLabel,
                            selectedDost.includes(item) &&
                              styles.filterLabel__checked
                          )}
                          key={item}
                        >
                          <span className={styles.filterLabel__icon}>
                            {selectedDost.includes(item) ? (
                              <Image
                                src="/img/checkIconWhite.svg"
                                width={15}
                                height={15}
                                alt="check"
                              />
                            ) : (
                              <div className={styles.filterLabel__empty}>e</div>
                            )}
                          </span>
                          <span className={styles.filterLabel__title}>
                            {item}{" "}
                            {item === 1
                              ? " Дней"
                              : item >= 1 && item <= 2
                              ? " День"
                              : " Дня"}
                          </span>
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
                          sub.value.kol !== 0 ? (
                            <label
                              key={subIndex}
                              className={clsx(
                                styles.filterLabel,
                                selectedAdditionalFilters.includes(
                                  sub.value.id_filter.toString()
                                ) && styles.filterLabel__checked
                              )}
                              onClick={() => {
                                const id = sub.value.id_filter.toString();
                                setSelectedAdditionalFilters((prev) =>
                                  prev.includes(id)
                                    ? prev.filter((filter) => filter !== id)
                                    : [...prev, id]
                                );
                              }}
                            >
                              <span className={styles.filterLabel__icon}>
                                {selectedAdditionalFilters.includes(
                                  sub.value.id_filter.toString()
                                ) ? (
                                  <Image
                                    src="/img/checkIconWhite.svg"
                                    width={15}
                                    height={15}
                                    alt="check"
                                  />
                                ) : (
                                  <div className={styles.filterLabel__empty}>
                                    e
                                  </div>
                                )}
                              </span>
                              <span className={styles.filterLabel__title}>
                                {sub.value.name}
                                <span
                                  className={styles.filterLabel__title__kol}
                                >
                                  {sub.value.kol}
                                </span>
                              </span>
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
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AllFiltersMobile;
