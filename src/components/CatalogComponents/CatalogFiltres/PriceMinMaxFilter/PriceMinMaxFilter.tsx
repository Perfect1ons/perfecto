"use client";
import styles from "./style.module.scss";
import { Cross, СhevronDownIcon } from "../../../../../public/Icons/Icons";
import Slider from "react-slider";
import cn from "clsx";
import { useEffect, useRef } from "react";

interface IPriceMinMaxFilterProps {
  toggleFilter: (filterName: string) => void;
  visibleFilter: string | null;
  handlePriceRangeChange: (min: number, max: number) => void;
  clearFilterPrice: () => void;
  applyFilterPrice: () => void;
  tempPrice: {
    tempMin: number;
    tempMax: number;
  };
}

const PriceMinMaxFilter = ({
  toggleFilter,
  visibleFilter,
  handlePriceRangeChange,
  clearFilterPrice,
  applyFilterPrice,
  tempPrice,
}: IPriceMinMaxFilterProps) => {
  //input min price changer
  const handleMinChange = (min: number) => {
    if (min < 0) {
      min = 0;
    }
    handlePriceRangeChange(min, tempPrice.tempMax);
  };
  //input max price changer
  const handleMaxChange = (max: number) => {
    if (max < 0) {
      max = 0;
    }
    handlePriceRangeChange(tempPrice.tempMin, max);
  };
  //input add separation
  const addSeparators = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  //key down function for input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "ArrowUp" &&
      event.key !== "ArrowDown" &&
      event.key !== "Tab"
    ) {
      event.preventDefault();
    }
  };
  //hook useRef for min price input
  const minPriceInputRef = useRef<HTMLInputElement>(null);
  //focus for input if visible filter === price
  useEffect(() => {
    minPriceInputRef?.current?.focus();
  }, [visibleFilter]);
  //hook for enter key down
  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        applyFilterPrice();
        toggleFilter("");
      }
    };

    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempPrice.tempMin, tempPrice.tempMax]);

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
              {/* slider input type range library */}
              <Slider
                className={styles.sliderRange}
                thumbClassName={styles.thumbClassName}
                trackClassName={cn(styles.trackClassName)}
                value={[tempPrice.tempMin, tempPrice.tempMax]}
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
                  ref={minPriceInputRef}
                  onKeyDown={handleKeyDown}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  type="text"
                  className={styles.inputPrice}
                  value={
                    tempPrice.tempMin === 0
                      ? ""
                      : addSeparators(tempPrice.tempMin.toString())
                  }
                  onChange={(e) =>
                    handleMinChange(Number(e.target.value.replace(/\s/g, "")))
                  }
                  placeholder={`от 0`}
                />
                <input
                  onKeyDown={handleKeyDown}
                  type="text"
                  className={styles.inputPrice}
                  value={
                    tempPrice.tempMax === 0
                      ? ""
                      : addSeparators(tempPrice.tempMax.toString())
                  }
                  onChange={(e) =>
                    handleMaxChange(Number(e.target.value.replace(/\s/g, "")))
                  }
                  placeholder={`до 0`}
                />
              </div>
            </div>
            <div className="containerButtons">
              <button
                onClick={() => {
                  applyFilterPrice();
                  toggleFilter("");
                }}
                className={cn(
                  "applyBtn",
                  (tempPrice.tempMin > 0 || tempPrice.tempMax > 0) &&
                    "applyBtn__active"
                )}
              >
                Применить
              </button>
              {tempPrice.tempMin > 0 && (
                <button
                  onClick={clearFilterPrice}
                  disabled={tempPrice.tempMin <= 0 && tempPrice.tempMax <= 0}
                  className={cn(
                    "resetButton",
                    (tempPrice.tempMin > 0 || tempPrice.tempMax > 0) &&
                      "resetButton__active"
                  )}
                >
                  Сбросить
                </button>
              )}
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

export default PriceMinMaxFilter;
