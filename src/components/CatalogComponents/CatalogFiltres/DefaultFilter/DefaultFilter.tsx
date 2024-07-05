"use client";
import styles from "./style.module.scss";
import { IFiltersBrand } from "@/types/filtersBrand";
import cn from "clsx";
import {
  ArrowsUpDown,
  Cross,
  СhevronDownIcon,
} from "../../../../../public/Icons/Icons";
import { useEffect, useState } from "react";
interface IDefautlFilterProps {
  filter?: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  selectedSort: { sortName: string; sortTitle: string };
  setSelectedSort: React.Dispatch<
    React.SetStateAction<{ sortName: string; sortTitle: string }>
  >;
  handleSortChange: (option: { sortName: string; sortTitle: string }) => void;
}

const DefaultFilter = ({
  filter,
  visibleFilter,
  toggleFilter,
  selectedSort,
  setSelectedSort,
  handleSortChange,
}: IDefautlFilterProps) => {
  const [defaultFilters] = useState([
    { sortName: "id", sortTitle: "По популярности" },
    { sortName: "ocenka", sortTitle: "По рейтингу" },
    { sortName: "-cenaok", sortTitle: "По возрастанию цены" },
    { sortName: "cenaok", sortTitle: "По убыванию цены" },
  ]);
  useEffect(() => {
    const sortParam = new URLSearchParams(window.location.search).get("sort");
    if (sortParam) {
      setSelectedSort({
        sortName: sortParam,
        sortTitle:
          defaultFilters.find((filter) => filter.sortName === sortParam)
            ?.sortTitle || "",
      });
    }
  }, [selectedSort, setSelectedSort]);

  return (
    <div className="positionContainer">
      <button
        onClick={() => toggleFilter("default")}
        className={cn("catalogFilterButton", styles.gap)}
      >
        <ArrowsUpDown />
        {selectedSort.sortTitle}
        <span
          className={cn(
            "filterNavItemArrowIsActive",
            visibleFilter === "default" && "filterNavItemArrow"
          )}
        >
          <СhevronDownIcon />
        </span>
      </button>
      {visibleFilter === "default" && (
        <ul className={cn("showCatalogFilterActive", styles.forMobile)}>
          <div className="showCatalogFilterActiveChild">
            <button
              onClick={() => toggleFilter("default")}
              className="closeFilterUl"
            >
              <Cross />
            </button>
            {defaultFilters.map((option, index) => (
              <ul
                // onClick={() => handleSortChange(option)}
                onClick={() => handleSortChange(option)}
                key={index}
                className={cn(styles.option, {
                  [styles.selected]:
                    selectedSort.sortTitle === option.sortTitle,
                })}
              >
                <span className={styles.option__cyrcle}></span>
                <p className={styles.option__name}>{option.sortTitle}</p>
              </ul>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default DefaultFilter;
