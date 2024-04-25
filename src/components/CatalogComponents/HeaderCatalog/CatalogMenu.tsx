"use client";
import { ICatalogMenu, N29879 } from "@/types/Catalog/catalogMenu";
import styles from "./style.module.scss";
import { useState } from "react";
import cn from "clsx";

interface IProps {
  catalog: ICatalogMenu;
}
const CatalogMenu = ({ catalog }: IProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
    2000000464
  );
  //   const [showMore, setShowMore] = useState<boolean>(false);
  //   const [activeId, setActiveId] = useState<number | null>(null);
  const [showMoreCategories, setShowMoreCategories] = useState<{
    [key: number]: boolean;
  }>({});

  const handleShowMore = (categoryId: number) => {
    setShowMoreCategories((prevCategories) => ({
      ...prevCategories,
      [categoryId]: true,
    }));
  };
  const handleCollapse = (categoryId: number) => {
    setShowMoreCategories((prevCategories) => ({
      ...prevCategories,
      [categoryId]: false,
    }));
  };
  const handleMouseEnter = (id: number) => {
    setActiveCategoryId(id);
  };

  const ChevronRightIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-right"
      width="24"
      height="24"
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

  return (
    <div className={styles.catalogs}>
      <div className={styles.catalogs__3}>
        {catalog.map((item) => {
          return (
            <h2
              className={cn(
                styles.catalogs__h2,
                item.id === activeCategoryId && styles.active
              )}
              onMouseEnter={() => handleMouseEnter(item.id)}
              key={item.name}
            >
              {item.name}
              {ChevronRightIcon()}
            </h2>
          );
        })}
      </div>
      <div className={styles.catalogs__9}>
        {catalog.sort().map((item) => {
          const childLevel2 = Object.values(item.child_level2);
          return (
            <div
              key={item.id}
              className="submenu"
              style={{
                display: activeCategoryId === item.id ? "block" : "none",
                overflowX: "hidden",
              }}
            >
              <h2 className={styles.catalogs__9h3}>{item.name}</h2>
              <ul className={styles.category__ul}>
                {childLevel2
                  .sort((a, b) => {
                    if (a.child_cat_level3 && !b.child_cat_level3) {
                      return -1;
                    }
                    if (!a.child_cat_level3 && b.child_cat_level3) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((childItem) => {
                    const childCatLevel3 = childItem.child_cat_level3 || {};
                    const isExpanded =
                      showMoreCategories[childItem.id] || false;
                    const childCatLevel3Keys = Object.keys(childCatLevel3);
                    const remainingItems = childCatLevel3Keys.length - 5;

                    return (
                      <div key={childItem.id} className={styles.itemContainer}>
                        <li className={styles.category__li__h3}>
                          {childItem.name}
                        </li>
                        <ul>
                          {childCatLevel3Keys
                            .slice(0, isExpanded ? undefined : 5)
                            .map((key) => (
                              <li key={childCatLevel3[key]?.id}>
                                {childCatLevel3[key]?.name}
                              </li>
                            ))}
                        </ul>
                        {childCatLevel3Keys.length > 5 &&
                          (!isExpanded ? (
                            <button
                              onClick={() => handleShowMore(childItem.id)}
                            >
                              Показать ещё {remainingItems}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleCollapse(childItem.id)}
                            >
                              Свернуть
                            </button>
                          ))}
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
