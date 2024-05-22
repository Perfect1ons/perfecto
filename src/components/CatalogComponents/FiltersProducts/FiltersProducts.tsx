"use client";
import cn from "clsx";
import { IFiltersBrand } from "@/types/filtersBrand";
import styles from "./style.module.scss";
import React, { useState } from "react";
import {
  checkIcon,
  chevronDownIcon,
  filterIcon,
} from "../../../../public/Icons/Icons";
import { useRouter } from "next/navigation";
import Modal from "@/components/UI/ModalHeaders/Modal/Modal";
import AllFilters from "./AllFilters";
interface IProps {
  filter: IFiltersBrand;
  productId: number;
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
}
type FilterType = "brand" | "price" | "delivery" | "allfilters" | "default";

const FiltersProducts = ({
  filter,
  productId,
  options,
  value,
  onChange,
  onBrandToggle,
  selectedBrands,
  onReset,
  resetSelectionAll,
}: IProps) => {
  const router = useRouter();
  const [brandIsShow, setBrandIsShow] = useState(false);

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

  return (
    <>
      <div className={styles.filtersContainer}>
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
                    onClick={() => onBrandToggle("dost", item)}
                  >
                    <span
                      className={cn(styles.showFiltersUlContainer__check, {
                        [styles.showFiltersUlContainer__checkActive]:
                          selectedBrands.dost?.[item],
                      })}
                    >
                      {selectedBrands.dost?.[item] && checkIcon()}
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

                    {/* <li className={styles.showFiltersUlContainer__li}>{item}</li> */}
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
              <input
                type="number"
                className={styles.inputPrice}
                placeholder="От 0"
              />
              <input
                type="number"
                className={styles.inputPrice}
                placeholder="До 0"
              />
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
                    onClick={() => onBrandToggle("brand", item)}
                  >
                    <span
                      className={cn(styles.showFiltersUlContainer__check, {
                        [styles.showFiltersUlContainer__checkActive]:
                          selectedBrands.brand?.[item],
                      })}
                    >
                      {selectedBrands.brand?.[item] && checkIcon()}
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
            <span
              className={cn(
                styles.footerNavItemArrowIsActive
                // filtersIsShow.brand && styles.footerNavItemArrow
              )}
            >
              {filterIcon()}
            </span>
          </button>
        </div>
        <Modal close={open} isVisible={filtersIsShow.allfilters}>
          <AllFilters
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
      </div>
    </>
  );
};

export default FiltersProducts;
