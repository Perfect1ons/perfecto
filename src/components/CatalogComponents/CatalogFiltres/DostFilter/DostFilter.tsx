"use client";
import cn from "clsx";
import {
  CheckIcon,
  Cross,
  СhevronDownIcon,
} from "../../../../../public/Icons/Icons";
import { IFiltersBrand } from "@/types/filtersBrand";

interface IDostFilterProps {
  filter: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  changeSelect: (value: string[]) => void;
  selectedFilters: string[];
}

const DostFilter = ({
  toggleFilter,
  visibleFilter,
  filter,
  changeSelect,
  selectedFilters,
}: IDostFilterProps) => {
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
      {filter.variant_day.length > 0 && (
        <div className="positionContainer">
          <button
            className="catalogFilterButton"
            onClick={() => toggleFilter("dost")}
          >
            Сроки доставки
            <span
              className={cn(
                "filterNavItemArrowIsActive",
                visibleFilter === "dost" && "filterNavItemArrow"
              )}
            >
              <СhevronDownIcon />
            </span>
          </button>
          {visibleFilter === "dost" && (
            <ul className="showCatalogFilterActive">
              <div className="showCatalogFilterActiveChild">
                <button
                  className="closeFilterUl"
                  onClick={() => toggleFilter("dost")}
                >
                  <Cross />
                </button>
                {filter.variant_day.map((item) => (
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

export default DostFilter;
