"use client";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { chevronUpIcon, chevronDownIcon } from "../../../public/Icons/Icons";

interface IProps {
  catalog: ICatalogMenu;
  // catalog: ICatalogsProducts;
  path: string | string[];
}
interface ICatalogItem {
  id: number;
  name: string;
  path: string;
  level: number;
  icon: string;
  full_slug?: string;
  parent?: number;
  enable: number;
  sort_menu: number;
}

interface IChildCatLevel3 extends ICatalogItem {}

interface IChildLevel2 {
  [key: string]: ICatalogItem & { child_cat_level3?: IChildCatLevel3 };
}

interface ICatalogMenus extends ICatalogItem {
  child_level2?: IChildLevel2;
}
const Catalogs = ({ catalog, path }: IProps) => {
  const router = useRouter();
  // const filteredCatalogs = catalog.filter(
  //   (catalogItem) => catalogItem.full_slug === path
  // );
  const [filteredCatalogs, setFilteredCatalogs] = useState<ICatalogMenus[]>([]);

  useMemo(() => {
    if (!catalog) return [];

    const filterCatalogs = (
      catalogItem: ICatalogMenus,
      path: string | string[]
    ) => {
      const filtered: ICatalogMenus[] = [];
      if (catalogItem.full_slug === path) {
        filtered.push(catalogItem);
      }
      if (catalogItem.child_level2) {
        filterChildLevel2(catalogItem.child_level2, path, filtered);
      }
      return filtered;
    };

    const filterChildLevel2 = (
      childLevel2: IChildLevel2,
      path: string | string[],
      filtered: ICatalogMenus[]
    ) => {
      Object.values(childLevel2).forEach((child) => {
        if (child.full_slug === path) {
          filtered.push(child);
        }
        if (child.child_cat_level3) {
          filterChildCatLevel3(child.child_cat_level3, path, filtered);
        }
      });
    };

    const filterChildCatLevel3 = (
      childCatLevel3: IChildCatLevel3,
      path: string | string[],
      filtered: ICatalogMenus[]
    ) => {
      Object.values(childCatLevel3).forEach((subChild) => {
        if (subChild.full_slug === path) {
          filtered.push(subChild);
        }
        // Add more levels if needed
      });
    };

    const filtered: ICatalogMenus[] = [];
    catalog.forEach((catalogItem) => {
      const result = filterCatalogs(catalogItem, path);
      if (result.length > 0) {
        filtered.push(...result);
      }
    });

    setFilteredCatalogs(filtered);
  }, [catalog, path]);

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

  return (
    <div className={styles.container}>
      <ol className={styles.breadcrumb}>
        <li className={styles.links}>
          <Link href="/" className={styles.link}>
            Главная
          </Link>
          {filteredCatalogs &&
            filteredCatalogs.map((title) => (
              <Link
                key={title.id}
                href={title.full_slug || "sadas"}
                className={styles.link}
              >
                {title.name}
              </Link>
            ))}
        </li>
      </ol>
      <div>
        <h1 className={styles.container__h1}>
          {filteredCatalogs && filteredCatalogs.map((title) => title.name)}
        </h1>
        {/* <div className={styles.row}>
          <div className={styles.wrapps}>
            {filteredCatalogs &&
              filteredCatalogs.map((catalog) => {
                const childLevel2 = Object.values(catalog?.child_level2);
                return (
                  <div key={catalog.id}>
                    <ul className={styles.subCatalogsContainerUL}>
                      {childLevel2
                        .sort((a, b) => {
                          return a.sort_menu - b.sort_menu;
                        })
                        .map((childItem3) => {
                          const childCatLevel3 =
                            childItem3.child_cat_level3 || {};
                          const childCatLevel3Keys =
                            Object.keys(childCatLevel3);
                          const isExpanded =
                            showMoreCategories[childItem3.id] || false;
                          const displayedCatLevel3Keys = isExpanded
                            ? childCatLevel3Keys
                            : childCatLevel3Keys.slice(0, 5);
                          const remainingItems =
                            childCatLevel3Keys.length -
                            displayedCatLevel3Keys.length;
                          return (
                            <li
                              key={childItem3.id}
                              className={styles.catalog__lih3}
                            >
                              {childItem3.name}
                              <ul className={styles.subCatalogUL}>
                                {displayedCatLevel3Keys.map((res) => (
                                  <li key={res} className={styles.subCatalogLI}>
                                    {childCatLevel3[res].name}
                                  </li>
                                ))}
                              </ul>
                              {childCatLevel3Keys.length > 5 && (
                                <button
                                  onClick={() =>
                                    isExpanded
                                      ? handleCollapse(childItem3.id)
                                      : handleShowMore(childItem3.id)
                                  }
                                  className={styles.buttonsCatalogs}
                                >
                                  {isExpanded
                                    ? `Свернуть`
                                    : `Eщё ${remainingItems}`}
                                  <span className={styles.buttonsSpanCatalogs}>
                                    {isExpanded
                                      ? chevronUpIcon()
                                      : chevronDownIcon()}
                                  </span>
                                </button>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                );
              })}
          </div>
          <div className={styles.wrpps}>
            {filteredCatalogs &&
              filteredCatalogs.map((catalog) => {
                const childLevel2 = Object.values(catalog?.child_level2);
                return (
                  <div className={styles.row__9} key={catalog.id}>
                    {childLevel2
                      .sort((a, b) => {
                        return a.sort_menu - b.sort_menu;
                      })
                      .map((item) => {
                        return (
                          <div
                            key={item.id}
                            className={styles.row__9li}
                            onClick={() => {
                              if (childLevel2?.child_cat_level3) {
                                router.push(
                                  `/${childLevel2?.child_cat_level3.full_slug}`
                                );
                              } else {
                                router.push(`products/${item.full_slug}`);
                              }
                            }}
                          >
                            <Image
                              src={
                                item.icon
                                  ? `https://max.kg/${item.icon}`
                                  : "https://max.kg/images/discount/empty-image.png"
                              }
                              alt={item.name}
                              width={60}
                              height={60}
                            />
                            <li key={item.id} className={styles.name__h3}>
                              {item.name}
                            </li>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div> */}
        <div className={styles.row}>
          <div className={styles.wrapps}>
            {filteredCatalogs &&
              filteredCatalogs.map((catalog) => {
                const childItems = Object.values(
                  catalog?.child_level2 || catalog?.child_cat_level3 || {}
                );
                return (
                  <div key={catalog.id}>
                    <ul className={styles.subCatalogsContainerUL}>
                      {childItems
                        .sort((a: any, b: any) => a.sort_menu - b.sort_menu)
                        .map((childItem: any) => {
                          const childCatLevel3 =
                            childItem.child_cat_level3 || {};
                          const isExpanded =
                            showMoreCategories[childItem.id] || false;
                          const displayedCatLevel3 = isExpanded
                            ? Object.values(childCatLevel3)
                            : Object.values(childCatLevel3).slice(0, 5);
                          const remainingItems =
                            Object.keys(childCatLevel3).length -
                            displayedCatLevel3.length;
                          return (
                            <li
                              key={childItem.id}
                              className={styles.catalog__lih3}
                            >
                              {childItem.name}
                              <ul className={styles.subCatalogUL}>
                                {displayedCatLevel3.map(
                                  (
                                    res: any // Используем any для res из-за динамической структуры данных
                                  ) => (
                                    <li
                                      key={res.id}
                                      className={styles.subCatalogLI}
                                    >
                                      {res.name}
                                    </li>
                                  )
                                )}
                              </ul>
                              {Object.keys(childCatLevel3).length > 5 && (
                                <button
                                  onClick={() =>
                                    isExpanded
                                      ? handleCollapse(childItem.id)
                                      : handleShowMore(childItem.id)
                                  }
                                  className={styles.buttonsCatalogs}
                                >
                                  {isExpanded
                                    ? `Свернуть`
                                    : `Eщё ${remainingItems}`}
                                  <span className={styles.buttonsSpanCatalogs}>
                                    {isExpanded
                                      ? chevronUpIcon()
                                      : chevronDownIcon()}
                                  </span>
                                </button>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                );
              })}
          </div>
          <div className={styles.wrpps}>
            {filteredCatalogs &&
              filteredCatalogs.map((catalog) => {
                const childItems = Object.values(
                  catalog?.child_level2 || catalog?.child_cat_level3 || {}
                );
                return (
                  <div className={styles.row__9} key={catalog.id}>
                    {childItems
                      .sort((a: any, b: any) => a.sort_menu - b.sort_menu)
                      .map((item: any) => (
                        <div key={item.id} className={styles.row__9li}>
                          <Image
                            src={
                              item.icon
                                ? `https://max.kg/${item.icon}`
                                : "https://max.kg/images/discount/empty-image.png"
                            }
                            alt={item.name}
                            width={60}
                            height={60}
                          />
                          <li className={styles.name__h3}>{item.name}</li>
                        </div>
                      ))}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogs;
