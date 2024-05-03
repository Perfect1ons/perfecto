import React, { useState } from "react";
import { ICatalogMenu, ChildLevel2 } from "@/types/Catalog/catalogMenu"; // Assuming ChildLevel2 is exported from your types

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
  activeCategoryId: number | null | undefined;
  selectedCategoryName: string | null;
}

export default function MobileSubCatalog({
  open,
  close,
  catalog,
  activeCategoryId,
  selectedCategoryName,
}: SubCatalProps) {
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

      {selectedCategoryName && (
        <div className={cn(styles.menu_wrap, styles.subCatalogsName)}>
          <div className={styles.icon_wrap}>
            <ChevronLeftIcon />
          </div>
          <span>{selectedCategoryName}</span>
        </div>
      )}

      <hr className={styles.hr} />

      <ul className={styles.subCatalogsList}>
        {catalog.flatMap((rootItem) => {
          const childLevel2 = Array.isArray(rootItem.child_level2)
            ? rootItem.child_level2
            : [];
          return childLevel2
            .filter((childItem) => childItem.parent === activeCategoryId)
            .map((filteredChildItem, key) => (
              <li className={styles.subCatalogsListItem} key={key}>
                <span>{filteredChildItem.name}</span>
                <ChevronRightIcon />
              </li>
            ));
        })}
      </ul>
    </div>
  );
}
