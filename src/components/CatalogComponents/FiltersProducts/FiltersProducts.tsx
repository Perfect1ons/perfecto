"use client";
import cn from "clsx";
import { IFiltersBrand } from "@/types/filtersBrand";
import styles from "./style.module.scss";
import React, { useState } from "react";
import {
  Cross,
  CheckIcon,
  chevronDownIcon,
  filterIcon,
} from "../../../../public/Icons/Icons";
import { useRouter } from "next/navigation";
import Modal from "@/components/UI/ModalHeaders/Modal/Modal";
import AllFilters from "./AllFilters";
import useMediaQuery from "@/hooks/useMediaQuery";
import AllFiltersMobile from "../AllFiltersMobile/AllFiltersMobile";
import { IFiltersProps } from "../CatalogProducts/CatalogProducts";
import Slider from "react-slider";

type FilterType = "brand" | "price" | "delivery" | "allfilters" | "default";

interface IProps {
  filter: IFiltersBrand;
  options: {
    label: string;
    value: "default" | "cheap" | "expensive" | "rating";
  }[];
  value: string;
  onChange: (value: "default" | "cheap" | "expensive" | "rating") => void;
  onBrandToggle: (mainKey: string, subKey: string) => void;
  selectedBrands: {
    [key: string]: {
      [subKey: string]: boolean;
    };
  };
  onReset: (mainKey: string) => void; // Add this prop
  resetSelectionAll: () => void;
  addBrand: (brand: string) => void;
  addDay: (day: string) => void;
  addFilter: (filter: number) => void;
  fetchProductsByMinMax: (min: number | null, max: number | null) => void;
}

const FiltersProducts = ({
  filter,
  options,
  value,
  onChange,
  onBrandToggle,
  selectedBrands,
  onReset,
  resetSelectionAll,
  addBrand,
  addDay,
  addFilter,
  fetchProductsByMinMax,
}: IProps) => {
  const router = useRouter();
  const [brandIsShow, setBrandIsShow] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [filtersIsShow, setFiltersIsShow] = useState({
    brand: false,
    price: false,
    delivery: false,
    allfilters: false,
    default: false,
  });
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(99999);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setMaxPrice(value);
    }
  };

  const handleDoneClick = () => {
    const queryParams = new URLSearchParams(window.location.search);

    if (minPrice !== null && maxPrice !== null) {
      if (minPrice <= maxPrice) {
        queryParams.set("min", minPrice.toString());
        queryParams.set("max", maxPrice.toString());
        fetchProductsByMinMax(minPrice, maxPrice);
      }
    } else {
      queryParams.delete("min");
      queryParams.delete("max");
      setMinPrice(null);
      setMaxPrice(null);
      fetchProductsByMinMax(null, null);
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );

    closeFilters(); // Закрыть модальное окно фильтров
  };

  const toggleFilters = (filterType: FilterType) => {
    setFiltersIsShow((prevState) => ({
      ...prevState,
      [filterType]: !prevState[filterType],
    }));

    // Закрываем другие фильтры при открытии текущего
    if (!filtersIsShow[filterType]) {
      setFiltersIsShow({
        brand: filterType === "brand",
        price: filterType === "price",
        delivery: filterType === "delivery",
        allfilters: filterType === "allfilters",
        default: filterType === "default",
      });
    }
  };

  const open = () => {
    setFiltersIsShow((prevState) => ({
      ...prevState,
      allfilters: false,
    }));
  };

  const closeAllFilters = () => {
    setFiltersIsShow((prevState) => ({
      ...prevState,
      allfilters: false,
    }));
  };

  const handleShowAllBrands = () => {
    setBrandIsShow(true);
  };

  const anyBrandSelected = Object.values(selectedBrands).some((value) =>
    Object.values(value).some((isSelected) => isSelected)
  );

  const countSelected = (...selectedArrays: any[]) => {
    let totalCount = 0;
    selectedArrays.forEach((selected: any) => {
      if (selected) {
        Object.values(selected).forEach((isSelected: any) => {
          if (isSelected) {
            totalCount++;
          }
        });
      }
    });
    return totalCount;
  };

  const countSelectedBrands = (): number => {
    let totalCount = 0;
    Object.values(selectedBrands).forEach((subSelections) => {
      Object.values(subSelections).forEach((isSelected) => {
        if (isSelected) {
          totalCount++;
        }
      });
    });
    return totalCount;
  };

  const closeFilters = () => {
    setFiltersIsShow({
      brand: false,
      price: false,
      delivery: false,
      allfilters: false,
      default: false,
    });
  };
  const handlePriceChange = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
    fetchProductsByMinMax(values[0], values[1]);
  };

  return (
    <>
      <div className={styles.filtersContainer}>
        <span className={styles.select_header_sort}>Сортировка: </span>
        <div className={styles.brandContainer}>
          <button
            onClick={() => toggleFilters("default")}
            className={styles.buttonBrand}
          >
            <li className={styles.showFiltersUlContainer__li}>
              {options.find((option) => option.value === value)?.label ||
                "По умолчанию"}
            </li>
            <span
              className={cn(
                styles.footerNavItemArrowIsActive,
                filtersIsShow.default && styles.footerNavItemArrow
              )}
            >
              {chevronDownIcon()}
            </span>
          </button>
          <ul
            className={cn(styles.showFiltersUl, {
              [styles.showFiltersActive]: filtersIsShow.default,
            })}
          >
            <div className={styles.showFiltersUl__div}>
              <button className={styles.closeFilterUl} onClick={closeFilters}>
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
                    closeFilters();
                  }}
                >
                  <span className={styles.option__cyrcle}></span>
                  {option.label}
                </div>
              ))}
            </div>
          </ul>
        </div>
        <div className={styles.brandContainer}>
          <button
            onClick={() => toggleFilters("delivery")}
            className={styles.buttonBrand}
          >
            Сроки доставки
            {countSelected(selectedBrands.dost) > 0 && (
              <span className={styles.selectedCount}>
                {countSelected(selectedBrands.dost)}
              </span>
            )}
            <span
              className={cn(
                styles.footerNavItemArrowIsActive,
                filtersIsShow.delivery && styles.footerNavItemArrow
              )}
            >
              {chevronDownIcon()}
            </span>
          </button>
          <ul
            className={cn(styles.showFiltersUl, {
              [styles.showFiltersActive]: filtersIsShow.delivery,
            })}
          >
            <div className={styles.showFiltersUl__div}>
              <button className={styles.closeFilterUl} onClick={closeFilters}>
                <Cross />
              </button>
              {filter.variant_day.length === 0 && <p>Нет доступных дней</p>}
              {filter.variant_day.map((item, index) => {
                if (!brandIsShow && index >= 7) {
                  return null;
                }
                return (
                  <ul
                    key={item}
                    className={styles.showFiltersUlContainer}
                    onClick={() => {
                      addDay(item);
                      onBrandToggle("dost", item);
                    }}
                  >
                    <span
                      className={cn(styles.showFiltersUlContainer__check, {
                        [styles.showFiltersUlContainer__checkActive]:
                          selectedBrands.dost?.[item],
                      })}
                    >
                      {selectedBrands.dost?.[item] && <CheckIcon />}
                    </span>
                    <li className={styles.showFiltersUlContainer__li}>
                      {item === "1"
                        ? `${item} день`
                        : item === "1-2"
                        ? `${item} дня`
                        : item === "10-20" ||
                          (parseInt(item) >= 10 && parseInt(item) <= 20)
                        ? `${item} дней`
                        : `${item} дней`}
                    </li>
                  </ul>
                );
              })}
            </div>
            {!brandIsShow && filter.variant_day.length > 7 && (
              <button
                onClick={handleShowAllBrands}
                className={styles.buttonShowBrand}
              >
                Показать все
              </button>
            )}
            <button
              disabled={!anyBrandSelected}
              className={cn(styles.buttonsContainer__button, {
                [styles.buttonsContainer__buttonDisabled]: !anyBrandSelected,
              })}
              onClick={() => onReset("dost")}
            >
              Сбросить
            </button>
          </ul>
        </div>
        <div className={styles.brandContainer}>
          <button
            className={styles.buttonBrand}
            onClick={() => toggleFilters("price")}
          >
            Цена
            <span
              className={cn(
                styles.footerNavItemArrowIsActive,
                filtersIsShow.price && styles.footerNavItemArrow
              )}
            >
              {chevronDownIcon()}
            </span>
          </button>
          <ul
            className={cn(styles.showFiltersUl, {
              [styles.showFiltersActive]: filtersIsShow.price,
            })}
          >
            <div className={styles.showFiltersUlContainer}>
              <button className={styles.closeFilterUl} onClick={closeFilters}>
                <Cross />
              </button>
              <div className={styles.priceContainerRange}>
                <Slider
                  defaultValue={[1, 99999] as [number, number]} // Явно указываем тип
                  className={styles.sliderRange}
                  thumbClassName={styles.thumbClassName}
                  trackClassName={cn(styles.trackClassName)}
                  value={[minPrice, maxPrice]}
                  onChange={handlePriceChange}
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
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    placeholder={`от 0`}
                  />
                  <input
                    type="number"
                    className={styles.inputPrice}
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    placeholder={`до 0`}
                  />
                </div>
              </div>
            </div>
            <div className={styles.buttonsContainer}>
              <button
                onClick={handleDoneClick}
                className={styles.buttonsContainer__button}
              >
                Применить
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.brandContainer}>
          <button
            onClick={() => toggleFilters("brand")}
            className={styles.buttonBrand}
          >
            Бренд
            {countSelected(selectedBrands.brand) > 0 && (
              <span className={styles.selectedCount}>
                {countSelected(selectedBrands.brand)}
              </span>
            )}
            <span
              className={cn(
                styles.footerNavItemArrowIsActive,
                filtersIsShow.brand && styles.footerNavItemArrow
              )}
            >
              {chevronDownIcon()}
            </span>
          </button>
          <ul
            className={cn(styles.showFiltersUl, {
              [styles.showFiltersActive]: filtersIsShow.brand,
            })}
          >
            <div className={styles.showFiltersUl__div}>
              <button className={styles.closeFilterUl} onClick={closeFilters}>
                <Cross />
              </button>
              {filter.brand.length === 0 && <p>Нет доступных брендов</p>}
              {filter.brand.map((item, index) => {
                if (!brandIsShow && index >= 7) {
                  return null;
                }
                return (
                  <ul
                    key={item}
                    className={styles.showFiltersUlContainer}
                    onClick={() => {
                      addBrand(item);
                      onBrandToggle("brand", item);
                    }}
                  >
                    <span
                      className={cn(styles.showFiltersUlContainer__check, {
                        [styles.showFiltersUlContainer__checkActive]:
                          selectedBrands.brand?.[item],
                      })}
                    >
                      {selectedBrands.brand?.[item] && <CheckIcon />}
                    </span>
                    <li className={styles.showFiltersUlContainer__li}>
                      {item}
                    </li>
                  </ul>
                );
              })}
            </div>
            {!brandIsShow && filter.brand.length > 7 && (
              <button
                onClick={handleShowAllBrands}
                className={styles.buttonShowBrand}
              >
                Показать все
              </button>
            )}
            <button
              disabled={!anyBrandSelected}
              className={cn(styles.buttonsContainer__button, {
                [styles.buttonsContainer__buttonDisabled]: !anyBrandSelected,
              })}
              onClick={() => onReset("brand")}
            >
              Сбросить
            </button>
          </ul>
        </div>
        {filter.filter && Object.keys(filter.filter).length > 0 && (
          <div className={styles.brandContainer}>
            <button
              className={styles.buttonBrand}
              onClick={() => toggleFilters("allfilters")}
            >
              Все фильтры
              {countSelectedBrands() > 0 && (
                <span className={styles.selectedCount}>
                  {countSelectedBrands()}
                </span>
              )}
              <span className={cn(styles.footerNavItemArrowIsActive)}>
                {filterIcon()}
              </span>
            </button>
          </div>
        )}
        {isMobile ? (
          <>
            <div className={styles.brandContainer}>
              <button
                className={styles.buttonBrand}
                onClick={() => toggleFilters("allfilters")}
              >
                Все фильтры
                {countSelectedBrands() > 0 && (
                  <span className={styles.selectedCount}>
                    {countSelectedBrands()}
                  </span>
                )}
                <span className={cn(styles.footerNavItemArrowIsActive)}>
                  {filterIcon()}
                </span>
              </button>
            </div>
            <Modal close={open} isVisible={filtersIsShow.allfilters}>
              <AllFiltersMobile
                addFilter={addFilter}
                countSelected={countSelected}
                filter={filter}
                close={closeAllFilters}
                onChange={onChange}
                options={options}
                value={value}
                onBrandToggle={onBrandToggle}
                onReset={onReset}
                selectedBrands={selectedBrands}
                resetSelectionAll={resetSelectionAll}
              />
            </Modal>
          </>
        ) : (
          <Modal close={open} isVisible={filtersIsShow.allfilters}>
            <AllFilters
              addFilter={addFilter}
              countSelected={countSelected}
              filter={filter}
              close={closeAllFilters}
              onChange={onChange}
              options={options}
              value={value}
              onBrandToggle={onBrandToggle}
              onReset={onReset}
              selectedBrands={selectedBrands}
              resetSelectionAll={resetSelectionAll}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default FiltersProducts;
