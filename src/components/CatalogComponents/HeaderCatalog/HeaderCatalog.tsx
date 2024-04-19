import { ICatalogHome } from "@/types/catalogsHome";
import React, { useState } from "react";
import styles from "./style.module.scss";
interface ICatalogProps {
  catalog: ICatalogHome[];
}
const HeaderCatalog = ({ catalog }: ICatalogProps) => {
  return (
    <div className={styles.catalogs}>
      <div>
        {catalog.map((catalog) => (
          <h2 className={styles.catalogs__h2} key={catalog.id}>
            {catalog.name}
          </h2>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default HeaderCatalog;
