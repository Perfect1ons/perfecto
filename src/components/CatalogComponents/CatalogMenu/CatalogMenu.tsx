"use client";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import styles from "./style.module.scss";
import { useCallback, useState } from "react";
import cn from "clsx";
import { useRouter } from "next/navigation";
import React from "react";
import {
  ChevronRightIconCatalog,
  chevronDownIcon,
  chevronUpIcon,
} from "../../../../public/Icons/Icons";
import Link from "next/link";
import MemoizedCatalogItem from "./MemoizedCatalogItem"; // Импортируем компонент MemoizedCatalogItem

interface IProps {
  catalog: ICatalogMenu | undefined;
  close: () => void;
  loading: boolean;
}

const CatalogMenu = ({ catalog, close, loading }: IProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
    2000000464
  );

  const [showMoreCategories, setShowMoreCategories] = useState<{
    [key: number]: boolean;
  }>({});

  // Функция для обработки отображения дополнительных категорий
  const handleShowMore = useCallback((categoryId: number) => {
    setShowMoreCategories((prevCategories) => ({
      ...prevCategories,
      [categoryId]: true,
    }));
  }, []);

  // Функция для обработки сворачивания категорий
  const handleCollapse = useCallback((categoryId: number) => {
    setShowMoreCategories((prevCategories) => ({
      ...prevCategories,
      [categoryId]: false,
    }));
  }, []);

  // Функция для обработки наведения мыши на категорию
  const handleMouseEnter = useCallback((id: number) => {
    setActiveCategoryId(id);
  }, []);

  // Для роутинга
  const router = useRouter();
  const handleClick = (path: string) => {
    const fullPath = path.startsWith("/catalog/") ? path : `/catalog/${path}`;
    router.push(fullPath);
    close();
  };

  return (
    <>
      {loading ? (
        <div className={styles.catalogs}>
          <div className={styles.catalogs__left}>
            {Array.from({ length: 26 }).map((_, index) => (
              <div className={styles.catalogLinkContainer_skeleton} key={index}>
                <span className={styles.triangle_skeleton}></span>
                <a className={styles.catalogs__h2_skeleton}></a>
              </div>
            ))}
          </div>
          <div className={styles.catalogs__right}>
            <div className={styles.subMenu}>
              <span className={styles.catalogs__9h3_skeleton}></span>
              <ul className={styles.category__ul}>
                {[...Array(3)].map((_, index) => (
                  <div key={`div-${index}`} className={styles.itemContainer}>
                    {[...Array(3)].map((_, index) => (
                      <ul key={index} className={styles.itemConteinerUL}>
                        <span
                          className={styles.category__li__h3_skeleton}
                        ></span>
                        <ul className={styles.itemConteinerUL}>
                          {[...Array(5)].map((_, index) => (
                            <span
                              key={index}
                              className={styles.subCatalogsUl__li_skeleton}
                            ></span>
                          ))}
                          <button
                            className={styles.buttonsCatalogs_skeleton}
                          ></button>
                        </ul>
                      </ul>
                    ))}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.catalogs}>
          <div className={styles.catalogs__left}>
            {catalog &&
              catalog.map((item) => (
                <MemoizedCatalogItem
                  key={item.name}
                  item={item}
                  isActive={item.id === activeCategoryId}
                  onMouseEnter={handleMouseEnter}
                  onClick={() => handleClick(item.full_slug)}
                />
              ))}
          </div>
          <div className={styles.catalogs__right}>
            {catalog &&
              catalog
                .sort((a, b) => a.sort_menu - b.sort_menu)
                .map((item) => (
                  <div
                    key={item.id}
                    className={styles.subMenu}
                    style={{
                      display: activeCategoryId === item.id ? "flex" : "none",
                    }}
                  >
                    <Link
                      href={`/catalog/${item.full_slug}`}
                      className={styles.catalogs__9h3}
                      onClick={() => handleClick(item.full_slug)}
                    >
                      {item.name}
                    </Link>
                    <ul className={styles.category__ul}>
                      {[...Array(3)].map((_, index) => {
                        const itemsPerDiv = Math.ceil(
                          (item?.child_level2?.length || 0) / 3
                        );
                        const startSlice = index * itemsPerDiv;
                        const endSlice = (index + 1) * itemsPerDiv;
                        const slicedItems =
                          item?.child_level2?.slice(startSlice, endSlice) || [];
                        return (
                          slicedItems.length > 0 && (
                            <div
                              key={`div-${index}`}
                              className={styles.itemContainer}
                            >
                              {slicedItems.map((childItem) => (
                                <ul
                                  key={childItem.id}
                                  className={styles.itemConteinerUL}
                                >
                                  <Link
                                    href={`/catalog/${childItem.full_slug}`}
                                    className={styles.category__li__h3}
                                    onClick={() =>
                                      handleClick(childItem.full_slug)
                                    }
                                  >
                                    {childItem.name}
                                  </Link>
                                  {childItem.child_cat_level3 && (
                                    <ul className={styles.itemConteinerUL}>
                                      {showMoreCategories[childItem.id]
                                        ? childItem.child_cat_level3.map(
                                            (subChildItem) => (
                                              <Link
                                                href={`/catalog/${subChildItem.full_slug}`}
                                                key={subChildItem.id}
                                                className={
                                                  styles.subCatalogsUl__li
                                                }
                                                onClick={() =>
                                                  handleClick(
                                                    subChildItem.full_slug
                                                  )
                                                }
                                              >
                                                {subChildItem.name}
                                              </Link>
                                            )
                                          )
                                        : childItem.child_cat_level3
                                            .slice(0, 5)
                                            .map((subChildItem) => (
                                              <Link
                                                href={`/catalog/${subChildItem.full_slug}`}
                                                key={subChildItem.id}
                                                className={
                                                  styles.subCatalogsUl__li
                                                }
                                                onClick={() =>
                                                  handleClick(
                                                    subChildItem.full_slug
                                                  )
                                                }
                                              >
                                                {subChildItem.name}
                                              </Link>
                                            ))}
                                      {childItem.child_cat_level3.length >
                                        5 && (
                                        <button
                                          onClick={() => {
                                            if (
                                              showMoreCategories[childItem.id]
                                            ) {
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
                                                childItem.child_cat_level3
                                                  .length - 5
                                              }`}
                                          <span
                                            className={
                                              styles.buttonsSpanCatalogs
                                            }
                                          >
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
                          )
                        );
                      })}
                    </ul>
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogMenu;
