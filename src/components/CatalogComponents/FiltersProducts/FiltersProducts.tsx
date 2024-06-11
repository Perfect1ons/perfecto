"use client";
import cn from "clsx";
import { IFiltersBrand } from "@/types/filtersBrand";
import styles from "./style.module.scss";
import React, { useEffect, useState } from "react";
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
  selectedFilters: IFiltersProps;
}
const MIN = 100;
const MAX = 99999;
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
  selectedFilters,
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
  const toggleFilters = (filterType: FilterType) => {
    setFiltersIsShow((prevState) => ({
      ...prevState,
      [filterType]: !prevState[filterType],
    }));

    // Закрываем другие фильтры при открытии текущего
    if (!filtersIsShow[filterType]) {
      setFiltersIsShow((prevState) => ({
        brand: filterType === "brand" ? true : false,
        price: filterType === "price" ? true : false,
        delivery: filterType === "delivery" ? true : false,
        allfilters: filterType === "allfilters" ? true : false,
        default: filterType === "default" ? true : false,
      }));
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
  const anyBrandSelected = Object.values(selectedBrands).some((value) => value);
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
  // Функция для подсчета количества выбранных элементов в selectedBrands
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
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.querySelector(
        `.${styles.filtersContainer}`
      );
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        setFiltersIsShow({
          brand: false,
          price: false,
          delivery: false,
          allfilters: false,
          default: false,
        });
      }
    };

    if (Object.values(filtersIsShow).some((isShow) => isShow)) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [filtersIsShow]);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(10000);

  const handlePriceChange = (values: any) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
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
              {/* Сортировка */}
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
                  // className={`option ${value === option.value ? "selected" : ""}`}
                  onClick={() => {
                    onChange(option.value);
                  }}
                >
                  <span className={styles.option__cyrcle}></span>
                  {/* <span className="option__cyrcle"></span> */}
                  {option.label}
                </div>
              ))}
            </div>
          </ul>
        </div>
        <div className={styles.brandContainer}>
          <button
            onClick={() => toggleFilters("delivery")}
            //   onClick={() => setFiltersIsShow(!filtersIsShow)}
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
              {/* Если брендов нет, выводим сообщение */}
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
              onClick={() => onReset("day")}
            >
              Сбросить
            </button>
          </ul>
        </div>
        <div className={styles.brandContainer}>
          <button
            className={styles.buttonBrand}
            onClick={() => toggleFilters("price")}
            //   onClick={() => setFiltersIsShow(!filtersIsShow)}
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
                  onChange={handlePriceChange}
                  defaultValue={[10, 100]}
                  className={styles.sliderRange}
                  thumbClassName={styles.thumbClassName}
                  trackClassName={cn(styles.trackClassName)}
                  minDistance={1} // минимальное расстояние между ползунками в 1 единицу
                  min={10}
                  max={10000}
                  renderTrack={(props, state) => (
                    <div
                      {...props}
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
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                  />
                  <input
                    type="number"
                    className={styles.inputPrice}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <div className={styles.buttonsContainer}>
              <button className={styles.buttonsContainer__button}>
                Готово
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.brandContainer}>
          <button
            onClick={() => toggleFilters("brand")}
            //   onClick={() => setFiltersIsShow(!filtersIsShow)}
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
              {/* Если брендов нет, выводим сообщение */}
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
                      addBrand(item), onBrandToggle("brand", item);
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
