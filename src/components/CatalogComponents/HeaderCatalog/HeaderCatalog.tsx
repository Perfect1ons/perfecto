"use client";
import { ICatalogHome } from "@/types/catalogsHome";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { getSubCatalogs } from "@/api/requests";
import { subCatalog } from "@/types/subCatalog";
interface ICatalogProps {
  catalog: ICatalogHome[];
}
const HeaderCatalog = ({ catalog }: ICatalogProps) => {
  const [subCatalogs, setSubCatalogs] = useState<subCatalog>();

  const handleMouseEnter = (id: number) => {
    getSubCatalogs(id).then((data) => {
      setSubCatalogs(data);
    });
  };

  return (
    <div>
      {catalog.map((catalog) => (
        <div key={catalog.id} className={styles.catalogs}>
          <h2
            className={styles.catalogs__h2}
            onClick={() => handleMouseEnter(catalog.id)}
          >
            {catalog.name}
          </h2>
        </div>
      ))}
      {subCatalogs?.category[0].name}
    </div>
  );
};

export default HeaderCatalog;
