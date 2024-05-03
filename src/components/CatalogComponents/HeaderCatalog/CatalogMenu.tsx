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
        {catalog
          .sort((a, b) => a.sort_menu - b.sort_menu)
          .map((item) => (
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
              <ul className={styles.category__ul}>
                {[...Array(3)].map((_, index) => (
                  <div key={`div-${index}`} className={styles.itemContainer}>
                    {item.child_level2
                      .slice(index * 5, (index + 1) * 5)
                      .map((childItem) => (
                        <ul
                          key={childItem.id}
                          className={styles.itemConteinerUL}
                        >
                          <li
                            className={styles.category__li__h3}
                            onClick={() => handleClick(childItem.full_slug)}
                          >
                            {childItem.name}
                          </li>
                          {childItem.child_cat_level3 && (
                            <ul className={styles.itemConteinerUL}>
                              {showMoreCategories[childItem.id]
                                ? childItem.child_cat_level3.map(
                                    (subChildItem) => (
                                      <li
                                        key={subChildItem.id}
                                        className={styles.subCatalogsUl__li}
                                        onClick={() =>
                                          handleClick(subChildItem.full_slug)
                                        }
                                      >
                                        {subChildItem.name}
                                      </li>
                                    )
                                  )
                                : childItem.child_cat_level3
                                    .slice(0, 5)
                                    .map((subChildItem) => (
                                      <li
                                        key={subChildItem.id}
                                        className={styles.subCatalogsUl__li}
                                        onClick={() =>
                                          handleClick(subChildItem.full_slug)
                                        }
                                      >
                                        {subChildItem.name}
                                      </li>
                                    ))}
                              {childItem.child_cat_level3.length > 5 && (
                                <button
                                  onClick={() => {
                                    if (showMoreCategories[childItem.id]) {
                                      handleCollapse(childItem.id);
                                    } else {
                                      handleShowMore(childItem.id);
                                    }
                                  }}
                                  className={styles.buttonsCatalogs}
                                >
                                  {showMoreCategories[childItem.id]
                                    ? "Свернуть"
                                    : `Ещё ${
                                        childItem.child_cat_level3.length - 5
                                      }`}
                                  <span className={styles.buttonsSpanCatalogs}>
                                    {showMoreCategories[childItem.id]
                                      ? chevronUpIcon()
                                      : chevronDownIcon()}
                                  </span>
                                </button>
                              )}
                            </ul>
                          )}
                        </ul>
                      ))}
                  </div>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CatalogMenu;
