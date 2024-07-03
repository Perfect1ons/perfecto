import { IFiltersBrand } from "@/types/filtersBrand";
import { Cross, СhevronDownIcon } from "../../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import cn from "clsx";
interface IProps {
  options: {
    label: string;
    value: "rating" | "cheap" | "expensive";
  }[];
  value: string;
  onChange: (value: "rating" | "cheap" | "expensive") => void;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
  filter: IFiltersBrand;
}

const DefaultFilter = ({
  onChange,
  options,
  toggleFilter,
  value,
  visibleFilter,
  filter
}: IProps) => {
  return (
    <div className="positionContainer">
      <button
        className="catalogFilterButton"
        onClick={() => toggleFilter("default")}
      >
        {options.find((option) => option.value === value)?.label ||
          "По рейтингу"}
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
            {options.map((option, index) => (
              <div
                key={index}
                className={cn(styles.option, {
                  [styles.selected]: value === option.value,
                })}
                onClick={() => {
                  onChange(option.value);
                }}
              >
                <span className={styles.option__cyrcle}></span>
                {option.label}
              </div>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default DefaultFilter;
