"use client";
import cn from "clsx";
import {
  CheckIcon,
  Cross,
  СhevronDownIcon,
} from "../../../../../public/Icons/Icons";
import { IFiltersBrand } from "@/types/filtersBrand";

interface IBrandFilterProps {
  filter: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  changeSelect: (value: string[]) => void;
  selectedFilters: string[];
}

const BrandFilter = ({
  toggleFilter,
  visibleFilter,
  filter,
  selectedFilters,
  changeSelect,
}: IBrandFilterProps) => {
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
                {filter.brand.map((item) => (
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
                  // <div key={item}>{item}</div>
                ))}
              </div>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default BrandFilter;
