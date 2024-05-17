"use client";
import { useEffect, useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import { IFiltersBrand, N11 } from "@/types/filtersBrand";
import { checkIcon, chevronDownIcon } from "../../../../public/Icons/Icons";
import { it } from "node:test";

interface IProps {
  filter: IFiltersBrand;
  close: () => void;
}
const AllFilters = ({ filter, close }: IProps) => {
  const [brandIsShow, setBrandIsShow] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedBrands, setSelectedBrands] = useState<{
    [key: string]: boolean;
  }>({});
  const [showAllButtonClicked, setShowAllButtonClicked] = useState<{
    [key: string]: boolean;
  }>({});
  const [isOpenState, setIsOpenState] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleFilters = (typeName: string) => {
    setIsOpenState((prevState) => ({
      ...prevState,
      [typeName]: !prevState[typeName],
    }));
  };

  const handleShowAllBrands = (type: string) => {
    setBrandIsShow((prev) => ({
      ...prev,
      [type]: true,
    }));
    setShowAllButtonClicked((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrands((prevSelected) => ({
      ...prevSelected,
      [brandName]: !prevSelected[brandName],
    }));
  };

  // Определяем массив всех фильтров
  const allFilters =
    filter && filter.filter ? Object.values(filter.filter) : [];

  // Определяем количество частей
  const numberOfChunks = 2;

  // Разбиваем массив фильтров на части
  const chunkSize = Math.ceil(allFilters.length / numberOfChunks);
  const filterChunks = Array.from({ length: numberOfChunks }, (_, index) =>
    allFilters.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  return (
    <div className={styles.containerAllFilters}>
      <div className={styles.backDropdiv} onClick={close}></div>
      <div className={styles.sidebarContainer}>
        <h1 className={styles.sidebarContainer__h1}>Все фильтры</h1>
        <div className={styles.buttonsContainerReset}>
          <button
            className={cn(
              styles.buttonsContainerReset__button,
              styles.buttonsContainerReset__buttonDiscard
            )}
          >
            Сбросить
          </button>
          <button
            className={cn(
              styles.buttonsContainerReset__button,
              styles.buttonsContainerReset__buttonApply
            )}
          >
            Применить фильтры
          </button>
        </div>
      </div>
      <div className={styles.divAll}>
        {[...Array(1)].map((_, divIndex) => (
          <div key={divIndex} className={styles.brandContainer}>
            <button
              onClick={() => toggleFilters("delivery")}
              //   onClick={() => setFiltersIsShow(!filtersIsShow)}
              className={styles.buttonBrand}
            >
              Сроки доставки
              <span
                className={cn(
                  styles.footerNavItemArrowIsActive
                  // filtersIsShow.delivery && styles.footerNavItemArrow
                )}
              >
                {chevronDownIcon()}
              </span>
            </button>
            <ul
              className={cn(styles.showFiltersUl, {
                // [styles.showFiltersActive]: filtersIsShow.delivery,
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
                      // onClick={() => toggleBrand(item)}
                    >
                      <span
                        className={cn(styles.showFiltersUlContainer__check, {
                          [styles.showFiltersUlContainer__checkActive]:
                            selectedBrands[item],
                        })}
                      >
                        {selectedBrands[item] && checkIcon()}
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
              {/* {!brandIsShow && filter.variant_day.length > 7 && (
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
                onClick={handleReset}
              >
                Сбросить
              </button> */}
            </ul>
          </div>
        ))}
        {[...Array(2)].map((_, divIndex) => (
          <div key={divIndex} className={styles.wrapContainer}>
            {/* Проверяем, есть ли фильтры для текущего дива */}
            {filterChunks[divIndex] && filterChunks[divIndex].length > 0 && (
              <ul className={styles.divAll__divUls}>
                {/* Проходимся по каждому фильтру в текущей части */}
                {filterChunks[divIndex].map((item: N11) => (
                  <li key={item.id_type} className={styles.divAll__divUlsLi}>
                    <button
                      onClick={() => toggleFilters(item.type_name)}
                      className={styles.buttonBrandsAll}
                    >
                      {item.type_name}

                      <span
                        className={cn(
                          styles.footerNavItemArrowIsActive,
                          isOpenState[item.type_name] &&
                            styles.footerNavItemArrow
                        )}
                      >
                        {chevronDownIcon()}
                      </span>
                    </button>
                    {/* Проверяем, открыт ли текущий фильтр, и показываем его ul */}
                    {isOpenState[item.type_name] && (
                      <ul className={styles.divAll__divUl}>
                        {/* Проходимся по каждому подфильтру в текущем фильтре */}
                        {Object.values(item.filter).map(
                          (subItem: any, subIndex) =>
                            // Проверяем, была ли нажата кнопка "Показать все" для текущего типа фильтров
                            (showAllButtonClicked[item.type_name] ||
                              subIndex < 6) && (
                              <li
                                key={subItem.id_filter}
                                className={styles.showFiltersUlContainer}
                              >
                                <span
                                  className={cn(
                                    styles.showFiltersUlContainer__check,
                                    {
                                      [styles.showFiltersUlContainer__checkActive]:
                                        selectedBrands[subItem.name],
                                    }
                                  )}
                                  onClick={() =>
                                    handleBrandSelect(subItem.name)
                                  }
                                >
                                  {selectedBrands[subItem.name] && checkIcon()}
                                </span>
                                <span
                                  className={styles.showFiltersUlContainer__li}
                                >
                                  {subItem.name} ({subItem.kol})
                                </span>
                              </li>
                            )
                        )}
                        {/* Показываем кнопку "Показать все" только если фильтров больше 6 и кнопка еще не была нажата */}
                        {Object.values(item.filter).length > 6 &&
                          !showAllButtonClicked[item.type_name] && (
                            <li className={styles.showFiltersUlContainer}>
                              <button
                                onClick={() =>
                                  handleShowAllBrands(item.type_name)
                                }
                                className={styles.buttonShowBrand}
                              >
                                Показать все
                              </button>
                            </li>
                          )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFilters;
