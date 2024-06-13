"use client";
import cn from "clsx";
import { IFiltersBrand, N11 } from "@/types/filtersBrand";
import {
  CheckIcon,
  Cross,
  СhevronDownIcon,
} from "../../../../../public/Icons/Icons";

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
                      <li>{data.name}</li>
                    </ul>
                    // <div key={item}>{item}</div>
                  ))}
                </div>
              </ul>
            )}
          </div>
        ))}
    </>
  );
};

export default AdditionalFilters;
