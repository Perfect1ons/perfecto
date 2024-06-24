"use client";
import styles from "./style.module.scss";
import { Cross, СhevronDownIcon } from "../../../../../public/Icons/Icons";
import Slider from "react-slider";
import cn from "clsx";
import { ISelectedFilterProps } from "../CatalogFiltres";

interface IPriceMinMaxFilterProps {
  price: ISelectedFilterProps;
  changeSelect: (value: { min: number; max: number }) => void;
  toggleFilter: (filterName: string) => void;
  visibleFilter: string | null;
  handlePriceRangeChange: (min: number, max: number) => void;
  clearFilterCena: () => void;
}

const PriceMinMaxFilter = ({
  toggleFilter,
  visibleFilter,
  price,
  handlePriceRangeChange,
  clearFilterCena,
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
                value={[price.priceMin, price.priceMax]}
                onChange={([min, max]) => handlePriceRangeChange(min, max)}
                min={1}
                max={1000000}
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
                  value={price.priceMin === 0 ? "" : price.priceMin}
                  onChange={(e) =>
                    handlePriceRangeChange(
                      Number(e.target.value),
                      price.priceMax
                    )
                  }
                  placeholder={`от 0`}
                />
                <input
                  type="number"
                  className={styles.inputPrice}
                  value={price.priceMin === 0 ? "" : price.priceMax}
                  onChange={(e) =>
                    handlePriceRangeChange(
                      price.priceMin,
                      Number(e.target.value)
                    )
                  }
                  placeholder={`до 0`}
                />
              </div>
            </div>
            <div className="containerButtons">
              <button
                className={cn(
                  "applyBtn",
                  price.priceMax && price.priceMax > 0 && "applyBtn__active"
                )}
              >
                Применить
              </button>
              <button
                onClick={clearFilterCena}
                disabled={price.priceMin <= 0 || price.priceMax <= 0}
                className={cn(
                  "resetButton",
                  price.priceMin && price.priceMax > 0 && "resetButton__active"
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
