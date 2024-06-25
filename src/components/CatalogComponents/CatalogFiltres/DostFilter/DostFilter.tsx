"use client";
import cn from "clsx";
import { Cross, СhevronDownIcon } from "../../../../../public/Icons/Icons";
import { IFiltersBrand } from "@/types/filtersBrand";
import { useEffect, useState } from "react";
import Image from "next/image";

interface IDostFilterProps {
  filter: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  changeSelect: (value: string[]) => void;
  selectedFilters: string[];
  clearFilter: (name: string) => void;
}

const DostFilter = ({
  toggleFilter,
  visibleFilter,
  filter,
  changeSelect,
  selectedFilters,
  clearFilter,
}: IDostFilterProps) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const visibleDost = showAll
    ? filter.variant_day
    : filter.variant_day.slice(0, 7);
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
            {selectedFilters.length > 0 && (
              <span className="filterCount">{selectedFilters.length}</span>
            )}
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
                {visibleDost.map((item) => (
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
                      {selectedFilters.includes(item) ? (
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
                    <li className="nameAndKol">{item}</li>
                  </ul>
                ))}
              </div>
              <div className="containerButtons">
                {filter.variant_day.length > 7 && !showAll && (
                  <button onClick={handleShowAll} className="showAllButton">
                    Показать все
                  </button>
                )}
                <button
                  onClick={() => clearFilter("dost")}
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
      )}
    </>
  );
};

export default DostFilter;
