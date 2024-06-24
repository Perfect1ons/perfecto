import { Filter2, IFiltersBrand, N11 } from "@/types/filtersBrand";
import {
  CheckIconFilter,
  FilterIcon,
  XMark,
  СhevronDownIcon,
} from "../../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import cn from "clsx";
import { useState } from "react";
interface IEveryFilterProps {
  filter: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  selectedFilters: string[];
  changeSelect: (value: string[]) => void;
  clearFilter: (name: string) => void;
}

const EveryFilters = ({
  filter,
  toggleFilter,
  visibleFilter,
  selectedFilters,
  changeSelect,
  clearFilter,
}: IEveryFilterProps) => {
  const closeEveryFilter = () => {
    toggleFilter("every");
  };

  const handleSelectChange = (item: string) => {
    const filters = selectedFilters;
    const newFilters = filters.includes(item)
      ? filters.filter((f) => f !== item)
      : [...filters, item];

    if (changeSelect) {
      changeSelect(newFilters);
    }
  };
  const [visibleFilters, setVisibleFilters] = useState<string | null>(null); // State to manage which filter is visible
  const toggleFilters = (filterName: string) => {
    setVisibleFilters((prev) => (prev === filterName ? null : filterName));
  };
  const getFilterCount = (filters: Filter2, selectedFilters: string[]) => {
    return Object.values(filters).filter((filter) =>
      selectedFilters.includes(filter.id_filter.toString())
    ).length;
  };

  return (
    <>
      <div>
        <button
          className={cn("catalogFilterButton", "highlighted")}
          onClick={() => toggleFilter("every")}
        >
          Все фильтры
          <span className={cn("filterNavItemArrowIsActive")}>
            <FilterIcon />
          </span>
        </button>
        <div
          className={cn(styles.container, {
            [styles.containerActive]: visibleFilter === "every",
          })}
        >
          <button onClick={closeEveryFilter} className={styles.container_cross}>
            <XMark />
          </button>
          <div className="everyFilterContainer">
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
                          </button>
                          {getFilterCount(item.filter, selectedFilters) > 0 && (
                            <span className="catalogFilterSelected">
                              {getFilterCount(item.filter, selectedFilters)}
                            </span>
                          )}
                          <span
                            className={cn(
                              "filterNavItemArrowIsActive",
                              visibleFilters === item.type_name &&
                                "filterNavItemArrow"
                            )}
                          >
                            <СhevronDownIcon />
                          </span>
                        </div>
                        {visibleFilters === item.type_name && (
                          <ul className="additionalFilterActiveDropdown">
                            <div className="showCatalogFilterActiveChild">
                              {Object.values(item.filter).map((data: any) => (
                                <ul
                                  onClick={() =>
                                    handleSelectChange(
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
                                          selectedFilters.includes(
                                            data.id_filter.toString()
                                          ),
                                      }
                                    )}
                                  >
                                    {selectedFilters.includes(
                                      data.id_filter.toString()
                                    ) && <CheckIconFilter />}
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

            {/* {Object.values(filter.filter).map((item: N11) => (
                <div key={item.id_type} className="everyFilterContainerChild">
                  <button
                    className="catalogFilterButtonEvery"
                    onClick={() => toggleFilters(item.type_name)}
                  >
                    {item.type_name}
                    <span
                      className={cn(
                        "filterNavItemArrowIsActive",
                        visibleFilters === item.type_name &&
                          "filterNavItemArrow"
                      )}
                    >
                      <СhevronDownIcon />
                    </span>
                  </button>
                  {visibleFilters === item.type_name && (
                    <ul className="additionalFilterActiveDropdown">
                      <div className="showCatalogFilterActiveChild">
                        {Object.values(item.filter).map((data: any) => (
                          <ul
                            onClick={() => handleSelectChange(data.id_filter)}
                            key={data.id_filter}
                            className="showFiltersUlContainer"
                          >
                            <span
                              className={cn("showFiltersUlContainer__check", {
                                ["showFiltersUlContainer__checkActive"]:
                                  selectedFilters.includes(data.id_filter),
                              })}
                            >
                              {selectedFilters.includes(data.id_filter) && (
                                <CheckIcon />
                              )}
                            </span>
                            <li>{data.name}</li>
                          </ul>
                          // <div key={item}>{item}</div>
                        ))}
                      </div>
                    </ul>
                  )}
                </div>
              ))} */}
          </div>
          <div className={styles.container_btnControl}>
            <button
              onClick={() => clearFilter("additional_filter")}
              disabled={selectedFilters.length <= 0}
              className={cn(
                styles.container_btnControl_reset,
                selectedFilters.length > 0 &&
                  styles.container_btnControl_reset_active
              )}
            >
              Сбросить
            </button>
            <button
              onClick={closeEveryFilter}
              disabled={selectedFilters.length <= 0}
              className={cn(
                styles.container_btnControl_apply,
                selectedFilters.length > 0 &&
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
