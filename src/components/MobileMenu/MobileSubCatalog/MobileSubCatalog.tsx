import React, { useState } from "react";
import { ICatalogMenu, ChildLevel2 } from "@/types/Catalog/catalogMenu"; // Assuming ChildLevel2 is exported from your types

import styles from "./style.module.scss";
import cn from "clsx";
import {
  ChevronLeftIcon_Mobile,
  ChevronRightIcon_Mobile,
} from "../../../../public/Icons/Mobile_Icons";
import Image from "next/image";

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
      {selectedCategoryName && (
        <div
          className={cn(styles.menu_wrap, styles.subCatalogsName)}
          onClick={close}
        >
          <div className={styles.icon_wrap}>
            <ChevronLeftIcon_Mobile />
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
              <a
                href={`https://max.kg/catalog/${filteredChildItem.full_slug}`}
                key={key}
                className={styles.subCatalogsListItem_a}
                // onClick={() => {
                //   console.log(
                //     `https://max.kg/api/catalog/cathome/${filteredChildItem.id}${filteredChildItem.icon}`
                //   );
                // }}
              >
                <li className={styles.subCatalogsListItem}>
                  <div className={styles.subCatItem_name}>
                    <Image
                      src={`https://max.kg/${filteredChildItem.icon}`}
                      width={50}
                      height={50}
                      alt=""
                    />
                    <span>{filteredChildItem.name}</span>
                  </div>
                  <ChevronRightIcon_Mobile />
                </li>
              </a>
            ));
        })}
      </ul>
    </div>
  );
}
