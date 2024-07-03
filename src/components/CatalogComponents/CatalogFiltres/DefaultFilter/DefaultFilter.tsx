"use client";
import styles from "./style.module.scss";
import { IFiltersBrand } from "@/types/filtersBrand";
import cn from "clsx";
import { Cross, СhevronDownIcon } from "../../../../../public/Icons/Icons";
import { useState } from "react";

interface IDefautlFilterProps {
  filter: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  selectedSort: { sortName: string; sortTitle: string };
  setSelectedSort: React.Dispatch<
    React.SetStateAction<{ sortName: string; sortTitle: string }>
  >;
}

const DefaultFilter = ({
  filter,
  visibleFilter,
  toggleFilter,
  selectedSort,
  setSelectedSort,
}: IDefautlFilterProps) => {
  const [defaultFilters, setDefaultFilters] = useState([
    {
      sortName: "id",
      sortTitle: "По новинкам",
    },
    {
      sortName: "ocenka",
      sortTitle: "По рейтингу",
    },
    {
      sortName: "-cenaok",
      sortTitle: "По возрастанию цены",
    },
    {
      sortName: "cenaok",
      sortTitle: "По убыванию цены",
    },
  ]);
  return (
    <div className="positionContainer" onClick={() => toggleFilter("default")}>
      <button className="catalogFilterButton">
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
        <ul className="showCatalogFilterActive">
          <div className="showCatalogFilterActiveChild">
            <button
              className="closeFilterUl"
              onClick={() => toggleFilter("default")}
            >
              <Cross />
            </button>
            {defaultFilters.map((option, index) => (
              <ul
                onClick={() =>
                  setSelectedSort({
                    sortName: option.sortName,
                    sortTitle: option.sortTitle,
                  })
                }
                key={index}
                className={cn(styles.option, {
                  [styles.selected]:
                    selectedSort.sortTitle === option.sortTitle,
                })}
              >
                <span className={styles.option__cyrcle}></span>
                {option.sortTitle}
              </ul>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default DefaultFilter;
