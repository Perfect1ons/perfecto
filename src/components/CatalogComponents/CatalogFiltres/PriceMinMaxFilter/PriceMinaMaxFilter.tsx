"use client";
import styles from "./style.module.scss";
import { Cross, СhevronDownIcon } from "../../../../../public/Icons/Icons";
import Slider from "react-slider";
import cn from "clsx";
import { IFiltersBrand } from "@/types/filtersBrand";

interface IPriceMinMaxFilterProps {
  selectedFilters: { min: number; max: number };
  changeSelect: (value: { min: number; max: number }) => void;
  toggleFilter: (filterName: string) => void;
  visibleFilter: string | null;
  filter: IFiltersBrand;
}

const PriceMinMaxFilter = ({
  toggleFilter,
  visibleFilter,
  filter,
  selectedFilters,
  changeSelect,
}: IPriceMinMaxFilterProps) => {
  const handleSliderChange = ([min, max]: [number, number]) => {
    changeSelect({ min, max });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value, 10);
    changeSelect({ ...selectedFilters, min: newMin });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value, 10);
    changeSelect({ ...selectedFilters, max: newMax });
  };

  return (
    <div className="positionContainer">
      <button
        className="catalogFilterButton"
        onClick={() => toggleFilter("price")}
      >
        Цена
        <span
          className={cn(
            "filterNavItemArrowIsActive",
            visibleFilter === "price" && "filterNavItemArrow"
          )}
        >
          <СhevronDownIcon />
        </span>
      </button>
      {visibleFilter === "price" && (
        <ul className="showCatalogFilterActive">
          <div className="showCatalogFilterActiveChild">
            <button
              className="closeFilterUl"
              onClick={() => toggleFilter("price")}
            >
              <Cross />
            </button>
            <div className={styles.priceContainerRange}>
              <Slider
                defaultValue={[selectedFilters.min, selectedFilters.max]}
                className={styles.sliderRange}
                thumbClassName={styles.thumbClassName}
                trackClassName={cn(styles.trackClassName)}
                value={[selectedFilters.min, selectedFilters.max]}
                onChange={handleSliderChange}
                min={1}
                max={99999}
                step={1}
                withTracks={true}
                renderTrack={(props, state) => (
                  <div
                    {...props}
                    key={state.index}
                    className={cn(styles.trackClassName, {
                      [styles.trackBetween]: state.index === 1,
                      [styles.trackOutside]: state.index !== 1,
                    })}
                  />
                )}
              />
              <div className={styles.containerPriceInputs}>
                <input
                  type="number"
                  className={styles.inputPrice}
                  value={selectedFilters.min}
                  onChange={handleMinPriceChange}
                  placeholder={`от 0`}
                />
                <input
                  type="number"
                  className={styles.inputPrice}
                  value={selectedFilters.max}
                  onChange={handleMaxPriceChange}
                  placeholder={`до 0`}
                />
              </div>
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

export default PriceMinMaxFilter;
