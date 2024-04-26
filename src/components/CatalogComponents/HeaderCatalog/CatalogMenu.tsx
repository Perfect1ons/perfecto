"use client";
import { ICatalogMenu, N29879 } from "@/types/Catalog/catalogMenu";
import styles from "./style.module.scss";
import { useState } from "react";
import cn from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

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
  const ChevronRightIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-right"
      width="16"
      height="16"
      viewBox="0 0 25 25"
      strokeWidth="1.8"
      stroke="#777"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 6l6 6l-6 6" />
    </svg>
  );
  const chevronUpIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-up"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 15l6 -6l6 6" />
    </svg>
  );
  const chevronDownIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-down"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/catalogs/${id}`);
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
                onClick={() => handleClick(item.id)}
                key={item.name}
              >
                {item.name}
                {ChevronRightIcon()}
              </h2>
            </React.Fragment>
          );
        })}
      </div>
      <div className={styles.catalogs__9}>
        {/* Отображение подменю для каждой категории  */}
        {catalog.map((item) => {
          const childLevel2 = Object.values(item.child_level2);
          return (
            <div
              key={item.id}
              className={styles.subMenu}
              style={{
                display: activeCategoryId === item.id ? "flex" : "none", // Показывать подменю только для активной категории
                overflowX: "hidden",
              }}
            >
              <h2
                className={styles.catalogs__9h3}
                onClick={() => handleClick(item.id)}
              >
                {item.name}
              </h2>
              {/* Отображение подкатегорий второго уровня */}
              <ul className={styles.category__ul}>
                {[...Array(3)].map((_, divIndex) => {
                  const startIdx = divIndex * 5;
                  const endIdx = Math.min(startIdx + 5, childLevel2.length);
                  const itemsInDiv = childLevel2.slice(startIdx, endIdx);

                  return (
                    <div
                      key={`div-${divIndex}`}
                      className={styles.itemContainer}
                    >
                      {itemsInDiv.map((childItem) => {
                        const childCatLevel3 = childItem.child_cat_level3 || {};
                        const isExpanded =
                          showMoreCategories[childItem.id] || false;
                        // Проверка, раскрыты ли дополнительные подкатегории
                        const childCatLevel3Keys = Object.keys(childCatLevel3);
                        const remainingItems = childCatLevel3Keys?.length - 5;

                        return (
                          <ul
                            key={childItem.id}
                            className={styles.itemConteinerUL}
                          >
                            <li
                              className={styles.category__li__h3}
                              onClick={() => {
                                if (childItem.child_cat_level3) {
                                  const childCatLevel3Keys = Object.keys(
                                    childItem.child_cat_level3
                                  );
                                  if (childCatLevel3Keys.length > 0) {
                                    router.push(`catalogs/${childItem.id}`);
                                  } else {
                                    router.push(
                                      `catalogs/products/${childItem.id}`
                                    );
                                  }
                                } else {
                                  router.push(
                                    `catalogs/products/${childItem.id}`
                                  );
                                }
                                close();
                              }}
                            >
                              {childItem.name}
                            </li>
                            {childCatLevel3Keys
                              .slice(0, isExpanded ? undefined : 5)
                              .map((key) => (
                                <li
                                  key={childCatLevel3[key]?.id}
                                  className={styles.subCatalogsUl__li}
                                  onClick={() => {
                                    if (childCatLevel3[key]?.child_cat_level3) {
                                      const childCatLevel3Keyss = Object.keys(
                                        childCatLevel3[key]?.child_cat_level3
                                      );
                                      if (childCatLevel3Keyss.length > 0) {
                                        router.push(
                                          `catalogs/${childCatLevel3[key]?.id}`
                                        );
                                      } else {
                                        router.push(
                                          `catalogs/products/${childCatLevel3[key]?.id}`
                                        );
                                      }
                                    } else {
                                      router.push(
                                        `catalogs/products/${childCatLevel3[key]?.id}`
                                      );
                                    }
                                    close();
                                  }}
                                >
                                  {childCatLevel3[key]?.name}
                                </li>
                              ))}
                            {childCatLevel3Keys.length > 5 &&
                              (!isExpanded ? (
                                <button
                                  onClick={() => handleShowMore(childItem.id)}
                                  className={styles.buttonsCatalogs}
                                >
                                  Eщё {remainingItems}
                                  <span className={styles.buttonsSpanCatalogs}>
                                    {chevronDownIcon()}
                                  </span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleCollapse(childItem.id)}
                                  className={styles.buttonsCatalogs}
                                >
                                  Свернуть
                                  <span className={styles.buttonsSpanCatalogs}>
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
