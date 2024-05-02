import React, { useState } from "react";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";

import styles from "./style.module.scss";
import cn from "clsx";
import { ChevronLeftIcon } from "../../../../public/Icons/Icons";

interface SubCatalProps {
  open: boolean;
  close: () => void;
  catalog: ICatalogMenu;
}

export default function MobileSubCatalog({
  open,
  close,
  catalog,
}: SubCatalProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>();

  return (
    <div
      className={
        open === true
          ? `${cn(styles.sub_catalog_wrap, styles.sub_catalog_wrap_active)}`
          : styles.sub_catalog_wrap
      }
    >
      <div className={styles.menu_wrap} onClick={close}>
        <div className={styles.icon_wrap}>
          <ChevronLeftIcon />
        </div>
      </div>
    </div>
  );
}
