"use client";
import { ICatalogHome } from "@/types/catalogsHome";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { getSubCatalogs } from "@/api/requests";
import { subCatalog } from "@/types/subCatalog";
import cn from "clsx";
import { useRouter } from "next/navigation";
interface ICatalogProps {
  catalog: ICatalogHome[];
  category: subCatalog;
}
const HeaderCatalog = ({ catalog, category }: ICatalogProps) => {
  const [subCatalogs, setSubCatalogs] = useState<subCatalog>();
  const [activeCatalogId, setActiveCatalogId] = useState<number | null>(null);
  const router = useRouter();
  const [subCatalogId, setSubCatalogId] = useState<number[]>();
  const [subsCatalogs, setSubsCatalogs] = useState<{
    [key: number]: subCatalog;
  }>({});
  const [isSubsCatalogaVisible, setIsSubsCatalogsVisible] = useState(5);

  const handleMouseEnter = (id: number) => {
    getSubCatalogs(id).then((data) => {
      setSubCatalogs(data);
      setActiveCatalogId(id);
    });
  };
  useEffect(() => {
    setSubCatalogs(category);
    setActiveCatalogId(category.category.id);
  }, []);
  useEffect(() => {
    if (subCatalogs && subCatalogs.category) {
      const categoryIds = Object.values(subCatalogs.category)
        .map((category) => category?.id)
        .filter((id) => id !== null && id !== undefined);
      setSubCatalogId(categoryIds);
    }
  }, [subCatalogs]);
  useEffect(() => {
    // Проверяем, есть ли какие-либо id подкаталогов
    if (subCatalogId && subCatalogId.length > 0) {
      subCatalogId.forEach((id) => {
        getSubCatalogs(id).then((data) => {
          setSubsCatalogs((prevSubsCatalogs) => ({
            ...prevSubsCatalogs,
            [id]: data,
          }));
        });
      });
    }
  }, [subCatalogId]); // Зависимость от subCatalogId, чтобы эффект выполнялся при его обновлении
  const toggle = () => {
    setIsSubsCatalogsVisible(+10);
  };

  return (
    <div className={styles.catalogs}>
      <div className={styles.catalogs__3}>
        <span className={styles.triangle}></span>
        {catalog.map((catalog) => (
          <h2
            key={catalog.id}
            className={cn(
              styles.catalogs__h2,
              catalog.id === activeCatalogId && styles.active
            )}
            onClick={() => router.push(`catalogs/${catalog.id}`)}
            onMouseEnter={() => handleMouseEnter(catalog.id)}
            // onMouseLeave={() => handleMouseLeave(catalog.id)}
          >
            {catalog.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "#777" }}
            >
              <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
            </svg>
          </h2>
        ))}
      </div>
      <div className={styles.catalogs__9}>
        <h3
          className={styles.catalogs__9h3}
          // onClick={() => router.push(`catalogs/${subCatalogs?.category.id}}`)}
        >
          {subCatalogs?.category?.name}
        </h3>
        <ul className={styles.category__ul}>
          {subCatalogs &&
            subCatalogs.category &&
            Object.values(subCatalogs.category).map((category, index) => (
              <li key={index} className={styles.category__li}>
                <h3 className={styles.category__li__h3}>{category?.name}</h3>
                <div>
                  {category &&
                    subsCatalogs[category.id] &&
                    Object.values(subsCatalogs[category.id]?.category)
                      .slice(0, isSubsCatalogaVisible)
                      .map((subCategory, index) => (
                        <h3 key={index} className={styles.category__li__h33}>
                          {subCategory?.name}
                        </h3>
                      ))}
                </div>
                {/* <button>Показать ещё</button> */}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderCatalog;
