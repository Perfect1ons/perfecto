"use client";
import cn from "clsx";
import { Filter, Filter2, IFiltersBrand, N11, N43 } from "@/types/filtersBrand";
import {
  CheckIcon,
  CheckIconFilter,
  Cross,
  СhevronDownIcon,
} from "../../../../../public/Icons/Icons";
import { useState } from "react";

interface IAdditionalFiltersProps {
  filter: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  changeSelect: (value: string[]) => void;
  selectedFilters: string[];
}

const AdditionalFilters = ({
  toggleFilter,
  visibleFilter,
  filter,
  changeSelect,
  selectedFilters,
}: IAdditionalFiltersProps) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
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

  return (
    <>
      <>
        {Object.values(filter.filter)
          .slice(0, 3)
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
                {/* {Object.keys(item.filter).map((key: string) => {
                  const id_filter = parseInt(key);
                  const count = selectedFilters.filter(
                    (filter) => filter === id_filter
                  ).length;
                  return (
                    <span key={key} className="filterCount">
                      {count}
                    </span>
                  );
                })} */}
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
                            <CheckIconFilter />
                          )}
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
                      // onClick={() => clearFilter(item.type_name)}
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
      {/* {Object.values(filter.filter)
        .slice(0, 3)
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
                      <li className="nameAndKol">
                        {data.name}{" "}
                        <span className="quantity">({data.kol})</span>
                      </li>
                    </ul>
                    // <div key={item}>{item}</div>
                  ))}
                </div>
              </ul>
            )}
          </div>
        ))} */}
    </>
  );
};

export default AdditionalFilters;
