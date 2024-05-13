"use client";
import cn from "clsx";
import { IFiltersBrand } from "@/types/filtersBrand";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import { checkIcon, chevronDownIcon } from "../../../../public/Icons/Icons";
import { getSortsBrand } from "@/api/requests";
import { useRouter } from "next/navigation";
interface IProps {
  filter: IFiltersBrand;
  productId: number;
}

const FiltersProducts = ({ filter, productId }: IProps) => {
  const router = useRouter();
  const [filtersIsShow, setFiltersIsShow] = useState(false);
  const [brandIsShow, setBrandIsShow] = useState(false);
  const [priceFiltersIsShow, setPriceFiltersIsShow] = useState(false);
  const [brandFiltersIsShow, setBrandFiltersIsShow] = useState(false);

  // Toggle price filter visibility
  const togglePriceFilters = () => {
    setPriceFiltersIsShow(!priceFiltersIsShow);
    // Close brand filter when opening price filter
    if (!priceFiltersIsShow) {
      setBrandFiltersIsShow(false);
    }
  };

  // Toggle brand filter visibility
  const toggleBrandFilters = () => {
    setBrandFiltersIsShow(!brandFiltersIsShow);
    // Close price filter when opening brand filter
    if (!brandFiltersIsShow) {
      setPriceFiltersIsShow(false);
    }
  };

  // Создаем состояние для отслеживания состояния выбора для каждого элемента
  const [selectedBrands, setSelectedBrands] = useState<{
    [key: string]: boolean;
  }>({});
  const handleShowAllBrands = () => {
    setBrandIsShow(true);
  };

  // Функция для обновления состояния выбора для конкретного элемента
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prevState) => ({
      ...prevState,
      [brand]: !prevState[brand],
    }));
  };

  // Проверяем, есть ли хотя бы один выбранный бренд
  const anyBrandSelected = Object.values(selectedBrands).some((value) => value);

  const handleReadyButtonClick = async () => {
    // Проверяем, есть ли хотя бы один выбранный бренд
    const anyBrandSelected = Object.values(selectedBrands).some(
      (value) => value
    );

    // Если хотя бы один бренд выбран, отправляем запрос
    if (anyBrandSelected) {
      const selectedBrandsList = Object.keys(selectedBrands).filter(
        (brand) => selectedBrands[brand]
      );
      console.log(selectedBrandsList);

      try {
        const response = await getSortsBrand(
          productId,
          selectedBrandsList.join(",")
        );
        // Обработка успешного ответа
        console.log("Response from getSortsBrand:", response);
      } catch (error) {
        // Обработка ошибки
        console.error("Error in getSortsBrand:", error);
      }
    }
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.brandContainer}>
        <button
          className={styles.buttonBrand}
          onClick={togglePriceFilters}
          //   onClick={() => setFiltersIsShow(!filtersIsShow)}
        >
          Цена
          <span
            className={cn(
              styles.footerNavItemArrowIsActive,
              priceFiltersIsShow && styles.footerNavItemArrow
            )}
          >
            {chevronDownIcon()}
          </span>
        </button>
        <ul
          className={cn(styles.showFiltersUl, {
            [styles.showFiltersActive]: priceFiltersIsShow,
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
            <button className={styles.buttonsContainer__button}>Готово</button>
          </div>
        </ul>
      </div>
      <div className={styles.brandContainer}>
        <button
          onClick={toggleBrandFilters}
          //   onClick={() => setFiltersIsShow(!filtersIsShow)}
          className={styles.buttonBrand}
        >
          Бренд
          <span
            className={cn(
              styles.footerNavItemArrowIsActive,
              brandFiltersIsShow && styles.footerNavItemArrow
            )}
          >
            {chevronDownIcon()}
          </span>
        </button>
        <ul
          className={cn(styles.showFiltersUl, {
            [styles.showFiltersActive]: brandFiltersIsShow,
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
                <li
                  key={item}
                  className={styles.showFiltersUlContainer}
                  onClick={() => toggleBrand(item)}
                >
                  <span
                    className={cn(styles.showFiltersUlContainer__check, {
                      [styles.showFiltersUlContainer__checkActive]:
                        selectedBrands[item],
                    })}
                  >
                    {selectedBrands[item] && checkIcon()}
                  </span>
                  <span className={styles.showFiltersUl__li}>{item}</span>
                </li>
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
            onClick={handleReadyButtonClick}
          >
            Готово
          </button>
        </ul>
      </div>
    </div>
  );
  //   return (
  //     <div className={styles.filtersContainer}>
  //       <div className={styles.brandContainer}>
  //         <button onClick={showFilters} className={styles.buttonBrand}>
  //           Бренд
  //           <span
  //             className={cn(
  //               styles.footerNavItemArrowIsActive,
  //               filtersIsShow && styles.footerNavItemArrow
  //             )}
  //           >
  //             {chevronDownIcon()}
  //           </span>
  //         </button>
  //         <ul
  //           className={cn(styles.showFiltersUl, {
  //             [styles.showFiltersActive]: filtersIsShow,
  //           })}
  //         >
  //           {filter.brand.map((item, index) => {
  //             if (!brandIsShow && index >= 7) {
  //               return null;
  //             }
  //             return (
  //               <div
  //                 key={item}
  //                 className={styles.showFiltersUlContainer}
  //                 // onClick={(showButtonReset)}
  //                 onClick={() => {
  //                   showButtonReset();
  //                   checked();
  //                 }}
  //               >
  //                 <span
  //                   className={cn(styles.showFiltersUlContainer__check, {
  //                     [styles.showFiltersUlContainer__checkActive]: clickCheck,
  //                   })}
  //                   // className={styles.showFiltersUlContainer__check}
  //                 >
  //                   {clickCheck && checkIcon()}
  //                   {/* {checkIcon()} */}
  //                 </span>
  //                 <li className={styles.showFiltersUl__li}>{item}</li>
  //               </div>
  //             );
  //           })}
  //           {!brandIsShow && filter.brand.length > 7 && (
  //             <button onClick={brandShowAll} className={styles.buttonShowBrand}>
  //               Показать все
  //             </button>
  //           )}
  //           {/* Показываем кнопки только если showAll равен true */}
  //           <div className={styles.buttonsContainer}>
  //             <button className={styles.buttonsContainer__button}>Готово</button>
  //           </div>
  //         </ul>
  //       </div>
  //     </div>
  //   );
};

export default FiltersProducts;
