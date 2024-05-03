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
  const childLevel2Keys = Object.keys(
    catalog.find((cat) => cat.id === activeCategoryId)?.child_level2 ?? {}
  );

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
        {childLevel2Keys.map((key) => (
          <li className={styles.subCatalogsListItem} key={key}>
            <span>
              {
                catalog.find((cat) => cat.id === activeCategoryId)
                  ?.child_level2[key].name
              }
            </span>
            <ChevronRightIcon />
          </li>
        ))}
      </ul>
    </div>
  );
}
