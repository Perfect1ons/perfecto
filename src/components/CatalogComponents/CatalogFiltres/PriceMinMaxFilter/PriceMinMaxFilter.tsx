"use client";
import styles from "./style.module.scss";
import { Cross, СhevronDownIcon } from "../../../../../public/Icons/Icons";
import Slider from "react-slider";
import cn from "clsx";
import { ISelectedFilterProps } from "../CatalogFiltres";

interface IPriceMinMaxFilterProps {
  changeSelect: (value: { min: number; max: number }) => void;
  toggleFilter: (filterName: string) => void;
  visibleFilter: string | null;
  handlePriceRangeChange: (min: number, max: number) => void;
  clearFilterCena: () => void;
  applyFilterCena: () => void;
  tempPrice: {
    tempMin: number;
    tempMax: number;
  };
}

const PriceMinMaxFilter = ({
  toggleFilter,
  visibleFilter,
  handlePriceRangeChange,
  clearFilterCena,
  applyFilterCena,
  tempPrice,
}: IPriceMinMaxFilterProps) => {
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
                className={styles.sliderRange}
                thumbClassName={styles.thumbClassName}
                trackClassName={cn(styles.trackClassName)}
                value={[tempPrice.tempMin, tempPrice.tempMax]}
                onChange={([min, max]) => handlePriceRangeChange(min, max)}
                min={1}
                max={500000}
                step={1}
                withTracks={true}
                renderTrack={(props, state) => (
                  <div
                    {...props}
                    key={state.index}
                    className={cn(styles.trackClassName, {
                      [styles.trackBetween]: state.index === 1,
                      [styles.trackOutside]: state.index === 1,
                    })}
                  />
                )}
              />
              <div className={styles.containerPriceInputs}>
                <input
                  type="number"
                  className={styles.inputPrice}
                  value={tempPrice.tempMin === 0 ? "" : tempPrice.tempMin}
                  onChange={(e) =>
                    handlePriceRangeChange(
                      Number(e.target.value),
                      tempPrice.tempMin
                    )
                  }
                  placeholder={`от 0`}
                />
                <input
                  type="number"
                  className={styles.inputPrice}
                  value={tempPrice.tempMax === 0 ? "" : tempPrice.tempMax}
                  onChange={(e) =>
                    handlePriceRangeChange(
                      tempPrice.tempMax,
                      Number(e.target.value)
                    )
                  }
                  placeholder={`до 0`}
                />
              </div>
            </div>
            <div className="containerButtons">
              <button
                onClick={() => {
                  applyFilterCena();
                  toggleFilter("");
                }}
                className={cn(
                  "applyBtn",
                  tempPrice.tempMax &&
                    tempPrice.tempMax > 0 &&
                    "applyBtn__active"
                )}
              >
                Применить
              </button>
              <button
                onClick={clearFilterCena}
                disabled={tempPrice.tempMin <= 0 || tempPrice.tempMax <= 0}
                className={cn(
                  "resetButton",
                  tempPrice.tempMin &&
                    tempPrice.tempMax > 0 &&
                    "resetButton__active"
                )}
              >
                Сбросить
              </button>
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

export default PriceMinMaxFilter;
