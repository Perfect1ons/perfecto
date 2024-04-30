"use client";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import styles from "./style.module.scss";
import { useState } from "react";
import cn from "clsx";
import { useRouter } from "next/navigation";
import React from "react";
import {
  ChevronRightIcon,
  chevronDownIcon,
  chevronUpIcon,
} from "../../../../public/Icons/Icons";
import Link from "next/link";

interface IProps {
  catalog: ICatalogMenu;
  close: () => void;
}
const CatalogMenu = ({ catalog, close }: IProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
    2000000464
  );

  const [showMoreCategories, setShowMoreCategories] = useState<{
    [key: number]: boolean;
  }>({});

  // Функция для обработки отображения дополнительных категорий
  const handleShowMore = (categoryId: number) => {
    setShowMoreCategories((prevCategories) => ({
      ...prevCategories,
      [categoryId]: true,
    }));
  };

  // Функция для обработки сворачивания категорий
  const handleCollapse = (categoryId: number) => {
    setShowMoreCategories((prevCategories) => ({
      ...prevCategories,
      [categoryId]: false,
    }));
  };

  // Функция для обработки наведения мыши на категорию
  const handleMouseEnter = (id: number) => {
    setActiveCategoryId(id);
  };

  // для роутинга
  const router = useRouter();
  const handleClick = (path: string) => {
    const fullPath = path.startsWith("/catalog/") ? path : `/catalog/${path}`;
    router.push(fullPath);
    close();
  };
  const goToCatalog = (path: string) => {
    // Проверяем, содержит ли путь уже "/catalog/".
    const fullPath = path.startsWith("/catalog/") ? path : `/catalog/${path}`;
    router.push(fullPath);
    close();
  };

  return (
    <div className={styles.catalogs}>
      <div className={styles.catalogs__3}>
        {catalog.map((item) => {
          //Отображение главных категорий
          return (
            <React.Fragment key={item.name}>
              <span className={styles.triangle}></span>
              <h2
                className={cn(
                  styles.catalogs__h2,
                  item.id === activeCategoryId && styles.active
                )}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onClick={() => handleClick(item.full_slug)}
                key={item.name}
              >
                {item.name}
                <span>{ChevronRightIcon()}</span>
              </h2>
            </React.Fragment>
          );
        })}
      </div>
      <div className={styles.catalogs__9}>
        {/* Отображение подменю для каждой категории  */}
        {catalog
          .sort((a, b) => {
            return a.sort_menu - b.sort_menu;
          })
          .map((item) => {
            const childLevel2 = Object.values(item.child_level2).sort(
              (a, b) => {
                return a.sort_menu - b.sort_menu;
              }
            );
            return (
              <div
                key={item.id}
                className={styles.subMenu}
                style={{
                  display: activeCategoryId === item.id ? "flex" : "none", // Показывать подменю только для активной категории
                }}
              >
                <h2
                  className={styles.catalogs__9h3}
                  onClick={() => handleClick(item.full_slug)}
                >
                  {item.name}
                </h2>
                {/* Отображение подкатегорий второго уровня */}
                <ul className={styles.category__ul}>
                  {[...Array(3)]
                    .map((_, index) => ({
                      sort_menu: index + 1, // Пример значения sort_menu для каждого элемента
                    }))
                    .sort((a, b) => {
                      return a.sort_menu - b.sort_menu;
                    })
                    .map((_, divIndex) => {
                      const startIdx = divIndex * 5;
                      const endIdx = Math.min(startIdx + 5, childLevel2.length);
                      const itemsInDiv = childLevel2.slice(startIdx, endIdx);
                      return (
                        <div
                          key={`div-${divIndex}`}
                          className={styles.itemContainer}
                        >
                          {itemsInDiv
                            .sort((a, b) => {
                              return a.sort_menu - b.sort_menu;
                            })
                            .map((childItem) => {
                              const childCatLevel3 =
                                childItem.child_cat_level3 || {};
                              const isExpanded =
                                showMoreCategories[childItem.id] || false;
                              // Проверка, раскрыты ли дополнительные подкатегории
                              const childCatLevel3Keys = Object.keys(
                                childCatLevel3
                              ).sort((a, b) => {
                                // Убедитесь, что 'a' и 'b' определены
                                return (
                                  (childCatLevel3[a]?.sort_menu || 0) -
                                  (childCatLevel3[b]?.sort_menu || 0)
                                );
                              });
                              const remainingItems =
                                childCatLevel3Keys?.length - 5;
                              return (
                                <ul
                                  key={childItem.id}
                                  className={styles.itemConteinerUL}
                                >
                                  <li
                                    className={styles.category__li__h3}
                                    onClick={() =>
                                      handleClick(childItem.full_slug)
                                    }
                                    // onClick={() => {
                                    //   if (childItem.child_cat_level3) {
                                    //     const childCatLevel3Keys = Object.keys(
                                    //       childItem.child_cat_level3
                                    //     );
                                    //     if (childCatLevel3Keys.length > 0) {
                                    //       router.push(
                                    //         `catalogs/${childItem.full_slug}`
                                    //       );
                                    //     } else {
                                    //       router.push(
                                    //         `catalogs/products/${childItem.full_slug}`
                                    //       );
                                    //     }
                                    //   } else {
                                    //     router.push(
                                    //       `catalogs/products/${childItem.full_slug}`
                                    //     );
                                    //   }
                                    //   close();
                                    // }}
                                  >
                                    {childItem.name}
                                  </li>
                                  {childCatLevel3Keys
                                    .slice(0, isExpanded ? undefined : 5)
                                    .sort((a, b) => {
                                      // Убедитесь, что 'a' и 'b' определены
                                      return (
                                        (childCatLevel3[a]?.sort_menu || 0) -
                                        (childCatLevel3[b]?.sort_menu || 0)
                                      );
                                    })
                                    .map((key) => (
                                      <li
                                        key={childCatLevel3[key]?.id}
                                        className={styles.subCatalogsUl__li}
                                        // onClick={() => {
                                        //   if (
                                        //     childCatLevel3[key]
                                        //       ?.child_cat_level3
                                        //   ) {
                                        //     const childCatLevel3Keyss =
                                        //       Object.keys(
                                        //         childCatLevel3[key]
                                        //           ?.child_cat_level3
                                        //       );
                                        //     if (
                                        //       childCatLevel3Keyss.length > 0
                                        //     ) {
                                        //       router.push(
                                        //         `catalog/${childCatLevel3[key]?.full_slug}`
                                        //       );
                                        //     } else {
                                        //       router.push(
                                        //         `catalog/products/${childCatLevel3[key]?.full_slug}`
                                        //       );
                                        //     }
                                        //   } else {
                                        //     router.push(
                                        //       `catalogs/products/${childCatLevel3[key]?.full_slug}`
                                        //     );
                                        //   }
                                        //   close();
                                        // }}
                                      >
                                        {childCatLevel3[key]?.name}
                                      </li>
                                    ))}
                                  {childCatLevel3Keys.length > 5 &&
                                    (!isExpanded ? (
                                      <button
                                        onClick={() =>
                                          handleShowMore(childItem.id)
                                        }
                                        className={styles.buttonsCatalogs}
                                      >
                                        Eщё {remainingItems}
                                        <span
                                          className={styles.buttonsSpanCatalogs}
                                        >
                                          {chevronDownIcon()}
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          handleCollapse(childItem.id)
                                        }
                                        className={styles.buttonsCatalogs}
                                      >
                                        Свернуть
                                        <span
                                          className={styles.buttonsSpanCatalogs}
                                        >
                                          {chevronUpIcon()}
                                        </span>
                                      </button>
                                    ))}
                                </ul>
                              );
                            })}
                        </div>
                      );
                    })}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CatalogMenu;
