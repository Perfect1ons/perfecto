"use client";
import { ICatalogHome } from "@/types/Catalog/catalogsHome";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { getSubCatalogs } from "@/api/requests";
import cn from "clsx";
import { useRouter } from "next/navigation";
import { ICatalogsChild } from "@/types/Catalog/catalogsChild";
interface ICatalogProps {
  catalog: ICatalogHome[];
  category: ICatalogsChild;
  close: () => void;
}
const HeaderCatalog = ({ catalog, category, close }: ICatalogProps) => {
  const [subCatalogs, setSubCatalogs] = useState<ICatalogsChild>();
  const [activeCatalogId, setActiveCatalogId] = useState<number | null>(null);
  const router = useRouter();
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
  const handleMouseEnter = (id: number) => {
    getSubCatalogs(id).then((data) => {
      setSubCatalogs(data);
      setActiveCatalogId(id);
    });
  };
  useEffect(() => {
    setSubCatalogs(category);
    setActiveCatalogId(category?.parent?.id);
  }, []);
  const clicks = (id: number) => {
    router.push(`catalogs/${id}`);
    close();
  };

  return (
    <div className={styles.catalogs}>
      <div className={styles.catalogs__3}>
        <span className={styles.triangle}></span>
        {catalog?.map((catalog) => (
          <h2
            key={catalog.id}
            className={cn(
              styles.catalogs__h2,
              catalog.id === activeCatalogId && styles.active
            )}
            onClick={() => clicks(catalog.id)}
            onMouseEnter={() => handleMouseEnter(catalog.id)}
            // onMouseLeave={() => handleMouseLeave(catalog.id)}
          >
            {catalog.name}
            {ChevronRightIcon()}
          </h2>
        ))}
      </div>
      {/* <div className={styles.catalogs__9}>
        <h3
          className={styles.catalogs__9h3}
          // onClick={() => router.push(catalogs/${subCatalogs?.category.id}})}
        >
          {subCatalogs?.category?.name}
        </h3>
        <ul className={styles.category__ul}>
          {subCatalogs &&
            subCatalogs.category &&
            Object.values(subCatalogs.category).map((category, index) => (
              <li key={index} className={styles.category__li}>
                <h3
                  className={styles.category__li__h3}
                  onClick={() => goToCatalogOrProduct(category?.id)}
                >
                  {category?.name}
                </h3>
                <div>
                  {category && subsCatalogs[category.id]?.category && (
                    <>
                      {Object.values(subsCatalogs[category.id]?.category)
                        .slice(0, isSubsCatalogaVisible ? undefined : 5) 
                        .map((subCategory, index) => (
                          <h3
                            key={index}
                            className={styles.category__li__h33}
                            onClick={() =>
                              router.push(
                                `catalogs/products/${subCategory?.id}`
                              )
                            }
                          >
                            {subCategory?.name}
                          </h3>
                        ))}
                      {Object.values(subsCatalogs[category.id]?.category)
                        .length > 5 && (
                        <button onClick={toggle}>
                          {isSubsCatalogaVisible ? "Свернуть" : "Показать еще"}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div> */}
      <div className={styles.catalogs__9}>
        <h3 className={styles.catalogs__9h3}>{subCatalogs?.parent.name}</h3>
        <ul className={styles.category__ul}>
          {subCatalogs?.child.map((child) => {
            return (
              <h3 key={child?.id} className={styles.category__li__h3}>
                {child.name}
              </h3>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HeaderCatalog;
