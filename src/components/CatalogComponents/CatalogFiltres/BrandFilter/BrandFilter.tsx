"use client";
import cn from "clsx";
import {
  CheckIcon,
  Cross,
  СhevronDownIcon,
} from "../../../../../public/Icons/Icons";
import { IFiltersBrand } from "@/types/filtersBrand";
import { useState } from "react";

interface IBrandFilterProps {
  filter: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  changeSelect: (value: string[]) => void;
  selectedFilters: string[];
  clearFilter: (name: string) => void;
}

const BrandFilter = ({
  toggleFilter,
  visibleFilter,
  filter,
  selectedFilters,
  changeSelect,
  clearFilter,
}: IBrandFilterProps) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const visibleBrands = showAll ? filter.brand : filter.brand.slice(0, 7);
  const handleSelectChange = (item: string) => {
    const filters = selectedFilters;
    const newFilters = filters.includes(item)
      ? filters.filter((f) => f !== item)
      : [...filters, item];

    if (changeSelect) {
      changeSelect(newFilters);
    }
  };
  return (
    <>
      {filter.brand.length > 0 && (
        <div className="positionContainer">
          <button
            className="catalogFilterButton"
            onClick={() => toggleFilter("brand")}
          >
            Бренд
            <span
              className={cn(
                "filterNavItemArrowIsActive",
                visibleFilter === "brand" && "filterNavItemArrow"
              )}
            >
              <СhevronDownIcon />
            </span>
          </button>
          {visibleFilter === "brand" && (
            <ul className="showCatalogFilterActive">
              <div className="showCatalogFilterActiveChild">
                <button
                  className="closeFilterUl"
                  onClick={() => toggleFilter("brand")}
                >
                  <Cross />
                </button>
                {visibleBrands.map((item) => (
                  <ul
                    onClick={() => handleSelectChange(item)}
                    key={item}
                    className="showFiltersUlContainer"
                  >
                    <span
                      className={cn("showFiltersUlContainer__check", {
                        ["showFiltersUlContainer__checkActive"]:
                          selectedFilters.includes(item),
                      })}
                    >
                      {selectedFilters.includes(item) && <CheckIcon />}
                    </span>
                    <li>{item}</li>
                  </ul>
                ))}
              </div>
              <div className="containerButtons">
                {filter.brand.length > 7 && !showAll && (
                  <button onClick={handleShowAll} className="showAllButton">
                    Показать все
                  </button>
                )}
                <button
                  onClick={() => clearFilter("brand")}
                  disabled={selectedFilters.length <= 0}
                  className={cn(
                    "resetButton",
                    selectedFilters.length > 0 && "resetButton__active"
                  )}
                >
                  Сбросить
                </button>
              </div>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default BrandFilter;
