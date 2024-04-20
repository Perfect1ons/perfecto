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
      console.log(data);
    });
  };

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
