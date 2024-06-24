"use client";
import cn from "clsx";
import { Filter2, IFiltersBrand, N11, N43 } from "@/types/filtersBrand";
import {
  CheckIconFilter,
  Cross,
  СhevronDownIcon,
} from "../../../../../public/Icons/Icons";
import { useEffect, useState } from "react";

interface IAdditionalFiltersProps {
  filter: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  changeSelect: (value: string[]) => void;
  selectedFilters: string[];
  clearFilterByID: (filters: Filter2, selectedFilters: string[]) => void;
}

const AdditionalFilters = ({
  toggleFilter,
  visibleFilter,
  filter,
  changeSelect,
  selectedFilters,
  clearFilterByID,
}: IAdditionalFiltersProps) => {
  const [showAll, setShowAll] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const getVisibleItems = () => {
    if (windowWidth <= 996) return 0;
    if (windowWidth <= 1200) return 1;
    if (windowWidth <= 1400) return 2;
    return 3;
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleSelectChange = (item: string) => {
    const newFilters = selectedFilters.includes(item)
      ? selectedFilters.filter((f) => f !== item)
      : [...selectedFilters, item];

    changeSelect(newFilters);
  };

  const getFilterCount = (filters: Filter2, selectedFilters: string[]) => {
    return Object.values(filters).filter((filter) =>
      selectedFilters.includes(filter.id_filter.toString())
    ).length;
  };

  return (
    <>
      {Object.values(filter.filter)
        .slice(0, getVisibleItems())
        .map((item: N11) => (
          <div key={item.id_type} className="positionContainer">
            <button
              className="catalogFilterButton"
              onClick={() => toggleFilter(item.type_name)}
            >
              {item.type_name}
              <span
                className={cn(
                  "filterNavItemArrowIsActive",
                  visibleFilter === item.type_name && "filterNavItemArrow"
                )}
              >
                <СhevronDownIcon />
              </span>
              {getFilterCount(item.filter, selectedFilters) > 0 && (
                <span className="filterCount">
                  {getFilterCount(item.filter, selectedFilters)}
                </span>
              )}
            </button>
            {visibleFilter === item.type_name && (
              <ul className="showCatalogFilterActive">
                <div className="showCatalogFilterActiveChild">
                  <button
                    className="closeFilterUl"
                    onClick={() => toggleFilter(item.type_name)}
                  >
                    <Cross />
                  </button>
                  {Object.values(item.filter).map((data: N43) => (
                    <ul
                      onClick={() =>
                        handleSelectChange(data.id_filter.toString())
                      }
                      key={data.id_filter}
                      className="showFiltersUlContainer"
                    >
                      <span
                        className={cn("showFiltersUlContainer__check", {
                          ["showFiltersUlContainer__checkActive"]:
                            selectedFilters.includes(data.id_filter.toString()),
                        })}
                      >
                        {selectedFilters.includes(
                          data.id_filter.toString()
                        ) && <CheckIconFilter />}
                      </span>
                      <li className="nameAndKol">
                        {data.name}{" "}
                        <span className="quantity">({data.kol})</span>
                      </li>
                    </ul>
                  ))}
                </div>
                <div className="containerButtons">
                  {Object.values(item.filter).length > 7 && !showAll && (
                    <button onClick={handleShowAll} className="showAllButton">
                      Показать все
                    </button>
                  )}
                  <button
                    onClick={() =>
                      clearFilterByID(item.filter, selectedFilters)
                    }
                    disabled={selectedFilters.length <= 0}
                    className={cn(
                      "resetButton",
                      selectedFilters.length > 0 && "resetButton__active"
                    )}
                    style={{ marginLeft: "auto" }}
                  >
                    Сбросить
                  </button>
                </div>
              </ul>
            )}
          </div>
        ))}
    </>
  );
};

export default AdditionalFilters;
