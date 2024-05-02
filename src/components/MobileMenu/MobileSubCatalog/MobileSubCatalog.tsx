import React, { useState } from "react";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";

import styles from "./style.module.scss";
import cn from "clsx";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../../../public/Icons/Icons";

interface SubCatalProps {
  open: boolean;
  close: () => void;
  catalog: ICatalogMenu;
  activeCategoryId: number | null; // Добавляем activeCategoryId в Props
}

export default function MobileSubCatalog({
  open,
  close,
  catalog,
  activeCategoryId,
}: SubCatalProps) {
  const filteredSubCatalogs = activeCategoryId
    ? catalog.find((cat) => cat.id === activeCategoryId)?.child_level2
    : null; // Фильтруем подкаталоги по активному categoryId

  return (
    <div
      className={
        open === true ? styles.sub_catalog_wrap_active : styles.sub_catalog_wrap
      }
    >
      <div className={styles.menu_wrap} onClick={close}>
        <div className={styles.icon_wrap}>
          <ChevronLeftIcon />
        </div>
        <span>На главную</span>
      </div>
      <ul className={styles.subCatalogsList}>
        {/* {filteredSubCatalogs &&
          filteredSubCatalogs.map((subCat) => {
            const childLevel2 = Object.values(subCat.child_level2).sort(
              (a, b) => {
                return a.sort_menu - b.sort_menu;
              }
            );
            return <li key={subCat.id}>{subCat.name}</li>;
          })} */}
        <li className={styles.subCatalogsListItem}>
          <span>Дочерний 1</span>
          <ChevronRightIcon />
        </li>
        <li className={styles.subCatalogsListItem}>
          <span>Дочерний 2</span>
          <ChevronRightIcon />
        </li>
        <li className={styles.subCatalogsListItem}>
          <span>Дочерний 3</span>
          <ChevronRightIcon />
        </li>
      </ul>
    </div>
  );
}
