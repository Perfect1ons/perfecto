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

  useEffect(() => {
    // Открываем все фильтры при загрузке страницы
    if (filter && filter.filter) {
      const openState: { [key: string]: boolean } = {};
      Object.values(filter.filter).forEach((item: N11) => {
        openState[item.type_name] = true;
      });
      setIsOpenState(openState);
    }
  }, [filter]);

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
  // Функция для разделения массива на части
  const chunkArray = (arr: any, size: any) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // Определяем массив всех фильтров
  const allFilters =
    filter && filter.filter ? Object.values(filter.filter) : [];

  // Определяем количество частей
  const numberOfChunks = 4;

  // Разбиваем массив фильтров на части
  const chunkSize = Math.ceil(allFilters.length / numberOfChunks);
  const filterChunks = Array.from({ length: numberOfChunks }, (_, index) =>
    allFilters.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  return (
    <div className={styles.divAll}>
      {[...Array(4)].map((_, divIndex) => (
        <div key={divIndex} className={styles.warpssss}>
          {/* Проверяем, есть ли фильтры для текущего дива */}
          {filterChunks[divIndex] && filterChunks[divIndex].length > 0 && (
            <ul className={styles.divAll__divUls}>
              {/* Проходимся по каждому фильтру в текущей части */}
              {filterChunks[divIndex].map((item: N11) => (
                <li key={item.id_type} className={styles.divAll__divUl}>
                  <button
                    onClick={() => toggleFilters(item.type_name)}
                    className={styles.buttonBrand}
                  >
                    {item.type_name}
                    <span
                      className={cn(
                        styles.footerNavItemArrowIsActive,
                        isOpenState[item.type_name] && styles.footerNavItemArrow
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
                                onClick={() => handleBrandSelect(subItem.name)}
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
  );
};

export default AllFilters;
