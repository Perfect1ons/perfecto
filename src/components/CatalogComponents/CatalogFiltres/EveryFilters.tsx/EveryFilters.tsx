import { IFiltersBrand, N11 } from "@/types/filtersBrand";
import { CheckIcon, СhevronDownIcon } from "../../../../../public/Icons/Icons";
import cn from "clsx";
import Modal from "@/components/UI/ModalHeaders/Modal/Modal";
import styles from "./style.module.scss";
import { useState } from "react";
interface IEveryFilterProps {
  filter: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  selectedFilters: string[];
  changeSelect: (value: string[]) => void;
}

const EveryFilters = ({
  filter,
  toggleFilter,
  visibleFilter,
  selectedFilters,
  changeSelect,
}: IEveryFilterProps) => {
  const filtersArray = Object.values(filter.filter);
  const half = Math.ceil(filtersArray.length / 2);
  const firstHalf = filtersArray.slice(0, half);
  const secondHalf = filtersArray.slice(half);
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
  return (
    <>
      <div>
        <button
          className="catalogFilterButton"
          onClick={() => toggleFilter("every")}
        >
          Все фильтры
          <span
            className={cn(
              "filterNavItemArrowIsActive",
              visibleFilter === "every" && "filterNavItemArrow"
            )}
          ></span>
        </button>
        <Modal close={closeEveryFilter} isVisible={visibleFilter === "every"}>
          <div className={styles.container}>
            <div className="everyFilterContainer">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="filterColumn">
                  {Object.values(filter.filter).map(
                    (item: N11, idx: number) => {
                      if (idx % 2 === index) {
                        return (
                          <div
                            key={item.id_type}
                            className="everyFilterContainerChild"
                          >
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
                                  {Object.values(item.filter).map(
                                    (data: any) => (
                                      <ul
                                        onClick={() =>
                                          handleSelectChange(data.id_filter)
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
                                                  data.id_filter
                                                ),
                                            }
                                          )}
                                        >
                                          {selectedFilters.includes(
                                            data.id_filter
                                          ) && <CheckIcon />}
                                        </span>
                                        <li>{data.name}</li>
                                      </ul>
                                    )
                                  )}
                                </div>
                              </ul>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }
                  )}
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
          </div>
        </Modal>
      </div>
    </>
  );
};

export default EveryFilters;
