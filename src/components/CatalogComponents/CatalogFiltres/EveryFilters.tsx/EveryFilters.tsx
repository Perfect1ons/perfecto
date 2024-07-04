import { Filter2, IFiltersBrand, N11 } from "@/types/filtersBrand";
import {
  FilterIcon,
  XMark,
  СhevronDownIcon,
} from "../../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import cn from "clsx";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slider";
import { ISelectedFilterProps } from "../CatalogFiltres";

interface IEveryFilterProps {
  filter: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  selectedFilters: ISelectedFilterProps;
  changeSelect: (name: string, value: any) => void;
  clearFilter: (name: string) => void;
  handlePriceRangeChange: (min: number, max: number) => void;
  clearFilterPrice: () => void;
  applyFilterPrice: () => void;
  tempPrice: {
    tempMin: number;
    tempMax: number;
  };
  clearAllCrumbs: () => void;
  resetCategoryFilters: (categoryFilters: Filter2) => void;
}

const EveryFilters = ({
  filter,
  toggleFilter,
  visibleFilter,
  selectedFilters,
  changeSelect,
  clearFilter,
  applyFilterPrice,
  clearFilterPrice,
  handlePriceRangeChange,
  tempPrice,
  clearAllCrumbs,
  resetCategoryFilters,
}: IEveryFilterProps) => {
  const closeEveryFilter = () => {
    toggleFilter("every");
  };
  function isKeyOfISelectedFilterProps(
    key: any
  ): key is keyof ISelectedFilterProps {
    return ["dost", "brand", "additional_filter"].includes(key);
  }

  const handleSelectChange = (
    filterType: keyof ISelectedFilterProps,
    item: string
  ) => {
    if (isKeyOfISelectedFilterProps(filterType)) {
      const filters = selectedFilters[filterType];
      const newFilters = filters.includes(item)
        ? filters.filter((f: any) => f !== item)
        : [...filters, item];

      changeSelect(filterType, newFilters);
    }
  };

  const [visibleFilters, setVisibleFilters] = useState<string | null>(null); // State to manage which filter is visible

  // Toggle filters visibility
  const toggleFilters = (filterName: string) => {
    setVisibleFilters((prev) => (prev === filterName ? null : filterName));
  };

  // Function to get count of selected filters
  const getFilterCount = (
    filters: Filter2,
    selectedFilters: string[] | undefined
  ) => {
    if (!selectedFilters || !Array.isArray(selectedFilters)) {
      return 0; // or handle the case where selectedFilters is not defined or not an array
    }

    return Object.values(filters).filter((filter) =>
      selectedFilters.includes(filter.id_filter.toString())
    ).length;
  };

  // Get count of selected filters
  function getSelectedFiltersCount(): number {
    let count = 0;

    // Count brand filters
    if (selectedFilters.brand && Array.isArray(selectedFilters.brand)) {
      count += selectedFilters.brand.length;
    }

    if (
      selectedFilters.additional_filter &&
      Array.isArray(selectedFilters.additional_filter)
    ) {
      count += selectedFilters.additional_filter.length;
    }

    // Iterate through the filters and count selected items
    Object.values(filter.filter).forEach((item: N11) => {
      const filterType = item.id_type.toString();
      if (isKeyOfISelectedFilterProps(filterType)) {
        count += getFilterCount(
          item.filter,
          selectedFilters[filterType as keyof ISelectedFilterProps]
        );
      }
    });

    return count;
  }

  // Effect to handle body styles for modal
  useEffect(() => {
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (visibleFilter === "every") {
      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
      body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = body.style.top;
      body.style.paddingRight = "";
      body.style.overflow = "auto";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      body.style.top = "";
    }
  }, [visibleFilter]);
  //input min price changer
  const handleMinChange = (min: number) => {
    if (min < 0) {
      min = 0;
    }
    handlePriceRangeChange(min, tempPrice.tempMax);
  };
  //input max price changer
  const handleMaxChange = (max: number) => {
    if (max < 0) {
      max = 0;
    }
    handlePriceRangeChange(tempPrice.tempMin, max);
  };
  //input add separation
  const addSeparators = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  //key down function for input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "ArrowUp" &&
      event.key !== "ArrowDown" &&
      event.key !== "Tab"
    ) {
      event.preventDefault();
    }
  };
  //hook useRef for min price input
  const minPriceInputRef = useRef<HTMLInputElement>(null);
  //focus for input if visible filter === price
  useEffect(() => {
    minPriceInputRef?.current?.focus();
  }, [visibleFilter]);
  //hook for enter key down
  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        applyFilterPrice();
        toggleFilter("");
      }
    };

    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempPrice.tempMin, tempPrice.tempMax]);

  return (
    <>
      <div>
        <button
          className={cn("catalogFilterButton", "highlighted")}
          onClick={() => toggleFilter("every")}
        >
          Все фильтры
          <span className={styles.filterIcon}>
            <FilterIcon />
          </span>
          {getSelectedFiltersCount() > 0 && (
            <span className="filterCount">{getSelectedFiltersCount()}</span>
          )}
        </button>
        <div
          className={cn(styles.container, {
            [styles.containerActive]: visibleFilter === "every",
          })}
        >
          <div className={styles.headerTitleCross}>
            <h3 className={styles.headerTitleCross__title}>Все фильтры</h3>
            <button
              onClick={closeEveryFilter}
              className={styles.headerTitleCross__cross}
            >
              <XMark />
            </button>
          </div>
          <div className="everyFilterContainer">
            {[...Array(1)].map((_, index) => (
              <div key={index} className="filterColumn">
                <div className="everyFilterContainerChild">
                  <div
                    onClick={() => toggleFilters("price")}
                    className="catalogFilterContainerButtonEvery"
                  >
                    <button className="catalogFilterButtonEvery">Цена</button>
                    <span
                      className={cn(
                        "filterNavItemArrowIsActive",
                        visibleFilters === "price" && "filterNavItemArrow"
                      )}
                    >
                      <СhevronDownIcon />
                    </span>
                  </div>
                  {visibleFilters === "price" && (
                    <ul className="additionalFilterActiveDropdown">
                      <div className="showCatalogFilterActiveChild">
                        <div className={styles.priceContainerRange}>
                          {/* slider input type range library */}
                          <Slider
                            className={styles.sliderRange}
                            thumbClassName={styles.thumbClassName}
                            trackClassName={cn(styles.trackClassName)}
                            value={[tempPrice.tempMin, tempPrice.tempMax]}
                            // defaultValue={[0, 1000000]}
                            max={1000000}
                            min={0}
                            step={1}
                            withTracks={true}
                            onChange={([min, max]) =>
                              handlePriceRangeChange(min, max)
                            }
                            renderTrack={(props, state) => (
                              <div
                                {...props}
                                key={state.index}
                                className={cn(styles.trackClassName, {
                                  [styles.trackBetween]: state.index === 1,
                                  [styles.trackOutside]: state.index === 1,
                                })}
                              />
                            )}
                          />
                          <div className={styles.containerPriceInputs}>
                            <input
                              ref={minPriceInputRef}
                              onKeyDown={handleKeyDown}
                              inputMode="numeric"
                              pattern="[0-9]*"
                              type="text"
                              className={styles.inputPrice}
                              value={
                                tempPrice.tempMin === 0
                                  ? ""
                                  : addSeparators(tempPrice.tempMin.toString())
                              }
                              onChange={(e) =>
                                handleMinChange(
                                  Number(e.target.value.replace(/\s/g, ""))
                                )
                              }
                              placeholder={`от 0`}
                            />
                            <input
                              onKeyDown={handleKeyDown}
                              type="text"
                              className={styles.inputPrice}
                              value={
                                tempPrice.tempMax === 0
                                  ? ""
                                  : addSeparators(tempPrice.tempMax.toString())
                              }
                              onChange={(e) =>
                                handleMaxChange(
                                  Number(e.target.value.replace(/\s/g, ""))
                                )
                              }
                              placeholder={`до 0`}
                            />
                          </div>
                        </div>
                      </div>
                    </ul>
                  )}
                </div>
                <div className="everyFilterContainerChild">
                  <div
                    onClick={() => toggleFilters("delivery")}
                    className="catalogFilterContainerButtonEvery"
                  >
                    <button className="catalogFilterButtonEvery">
                      Сроки доставки
                      {selectedFilters.dost.length > 0 && (
                        <span>({selectedFilters.dost.length})</span>
                      )}
                    </button>

                    <span
                      className={cn(
                        "filterNavItemArrowIsActive",
                        visibleFilters === "delivery" && "filterNavItemArrow"
                      )}
                    >
                      <СhevronDownIcon />
                    </span>
                    {selectedFilters.dost.length > 0 && (
                      <button
                        onClick={() => clearFilter("dost")}
                        disabled={selectedFilters.dost.length <= 0}
                        className={cn(
                          "resetBtnEvery",
                          selectedFilters.dost.length > 0 &&
                            "resetBtnEvery__active"
                        )}
                      >
                        Сбросить
                      </button>
                    )}
                  </div>
                  {visibleFilters === "delivery" && (
                    <ul className="additionalFilterActiveDropdown">
                      <div className="showCatalogFilterActiveChild">
                        {filter.variant_day.map((data) => {
                          return (
                            <ul
                              onClick={() => handleSelectChange("dost", data)}
                              key={index}
                              className="showFiltersUlContainer"
                            >
                              <span
                                className={cn("showFiltersUlContainer__check", {
                                  ["showFiltersUlContainer__checkActive"]:
                                    selectedFilters.dost.includes(
                                      data.toString()
                                    ),
                                })}
                              >
                                {selectedFilters.dost.includes(
                                  data.toString()
                                ) ? (
                                  <Image
                                    src="/img/checkIconWhite.svg"
                                    width={15}
                                    height={15}
                                    alt="check"
                                  />
                                ) : (
                                  <Image
                                    src="/img/checkIconWhite.svg"
                                    width={15}
                                    height={15}
                                    alt="check"
                                  />
                                )}
                              </span>
                              <li>{data}</li>
                            </ul>
                          );
                        })}
                      </div>
                    </ul>
                  )}
                </div>
                <div className="everyFilterContainerChild">
                  <div
                    onClick={() => toggleFilters("brand")}
                    className="catalogFilterContainerButtonEvery"
                  >
                    <button className="catalogFilterButtonEvery">
                      Бренд
                      {selectedFilters.brand.length > 0 && (
                        <span>({selectedFilters.brand.length})</span>
                      )}
                    </button>

                    <span
                      className={cn(
                        "filterNavItemArrowIsActive",
                        visibleFilters === "brand" && "filterNavItemArrow"
                      )}
                    >
                      <СhevronDownIcon />
                    </span>
                    {selectedFilters.brand.length > 0 && (
                      <button
                        onClick={() => clearFilter("brand")}
                        disabled={selectedFilters.brand.length <= 0}
                        className={cn(
                          "resetBtnEvery",
                          selectedFilters.brand.length > 0 &&
                            "resetBtnEvery__active"
                        )}
                      >
                        Сбросить
                      </button>
                    )}
                  </div>
                  {visibleFilters === "brand" && (
                    <ul className="additionalFilterActiveDropdown">
                      <div className="showCatalogFilterActiveChild">
                        {filter.brand.map((data) => {
                          return (
                            <ul
                              onClick={() => handleSelectChange("brand", data)}
                              key={data}
                              className="showFiltersUlContainer"
                            >
                              <span
                                className={cn("showFiltersUlContainer__check", {
                                  ["showFiltersUlContainer__checkActive"]:
                                    selectedFilters.brand.includes(data),
                                })}
                              >
                                {selectedFilters.brand.includes(data) ? (
                                  <Image
                                    src="/img/checkIconWhite.svg"
                                    width={15}
                                    height={15}
                                    alt="check"
                                  />
                                ) : (
                                  <Image
                                    src="/img/checkIconWhite.svg"
                                    width={15}
                                    height={15}
                                    alt="check"
                                  />
                                )}
                              </span>
                              <li>{data}</li>
                            </ul>
                          );
                        })}
                      </div>
                    </ul>
                  )}
                </div>
              </div>
            ))}
            {[...Array(2)].map((_, index) => (
              <div key={index} className="filterColumn">
                {Object.values(filter.filter).map((item: N11, idx: number) => {
                  if (idx % 2 === index) {
                    return (
                      <div
                        key={item.id_type}
                        className="everyFilterContainerChild"
                      >
                        <div
                          onClick={() => toggleFilters(item.type_name)}
                          className="catalogFilterContainerButtonEvery"
                        >
                          <button className="catalogFilterButtonEvery">
                            {item.type_name}
                            {getFilterCount(
                              item.filter,
                              selectedFilters.additional_filter
                            ) > 0 && (
                              <span>
                                (
                                {getFilterCount(
                                  item.filter,
                                  selectedFilters.additional_filter
                                )}
                                )
                              </span>
                            )}
                          </button>

                          <span
                            className={cn(
                              "filterNavItemArrowIsActive",
                              visibleFilters === item.type_name &&
                                "filterNavItemArrow"
                            )}
                          >
                            <СhevronDownIcon />
                          </span>
                          <button
                            onClick={() => resetCategoryFilters(item.filter)}
                            // disabled={selectedFilters.length <= 0}
                            disabled={
                              getFilterCount(
                                item.filter,
                                selectedFilters.additional_filter
                              ) <= 0
                            }
                            className={cn(
                              "resetBtnEvery",
                              getFilterCount(
                                item.filter,
                                selectedFilters.additional_filter
                              ) > 0 && "resetBtnEvery__active"
                            )}
                            style={{ marginLeft: "auto" }}
                          >
                            Сбросить
                          </button>
                        </div>
                        {visibleFilters === item.type_name && (
                          <ul className="additionalFilterActiveDropdown">
                            <div className="showCatalogFilterActiveChild">
                              {Object.values(item.filter).map((data: any) => (
                                <ul
                                  onClick={() =>
                                    handleSelectChange(
                                      "additional_filter",
                                      data.id_filter.toString()
                                    )
                                  }
                                  key={data.id_filter}
                                  className="showFiltersUlContainer"
                                >
                                  <span
                                    className={cn(
                                      "showFiltersUlContainer__check",
                                      {
                                        ["showFiltersUlContainer__checkActive"]:
                                          selectedFilters.additional_filter.includes(
                                            data.id_filter.toString()
                                          ),
                                      }
                                    )}
                                  >
                                    {selectedFilters.additional_filter.includes(
                                      data.id_filter.toString()
                                    ) ? (
                                      <Image
                                        src="/img/checkIconWhite.svg"
                                        width={15}
                                        height={15}
                                        alt="check"
                                      />
                                    ) : (
                                      <Image
                                        src="/img/checkIconWhite.svg"
                                        width={15}
                                        height={15}
                                        alt="check"
                                      />
                                    )}
                                  </span>
                                  <li>{data.name}</li>
                                </ul>
                              ))}
                            </div>
                          </ul>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
          <div className={styles.container_btnControl}>
            <button
              onClick={clearAllCrumbs}
              disabled={selectedFilters.additional_filter.length <= 0}
              className={cn(
                styles.container_btnControl_reset,
                (selectedFilters.brand.length > 0 ||
                  selectedFilters.additional_filter.length > 0 ||
                  selectedFilters.dost.length > 0) &&
                  styles.container_btnControl_reset_active
              )}
            >
              Сбросить
            </button>
            <button
              onClick={closeEveryFilter}
              disabled={selectedFilters.additional_filter.length <= 0}
              className={cn(
                styles.container_btnControl_apply,
                (selectedFilters.brand.length > 0 ||
                  selectedFilters.additional_filter.length > 0 ||
                  selectedFilters.dost.length > 0) &&
                  styles.container_btnControl_apply_active
              )}
            >
              Применить
            </button>
          </div>
        </div>
        {visibleFilter === "every" && (
          <div onClick={closeEveryFilter} className="filterBackdrop"></div>
        )}
      </div>
    </>
  );
};

export default EveryFilters;
