import React from "react";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { MobNavProps } from "../MobileNav/MobileNav";

import styles from "./style.module.scss";
import cn from "clsx";
import Image from "next/image";

export default function MobileCatalog({ catalog }: MobNavProps) {
  return (
    <div className={styles.grid}>
      {catalog.map((item) => {
        return (
          <div className={styles.grid_item}>
            <div className={styles.item_title}>
              <span key={item.name}>{item.name}</span>
            </div>
            <Image
              src={
                item.icon
                  ? `https://max.kg/${item.icon}`
                  : "https://max.kg/images/discount/empty-image.png"
              }
              width={100}
              height={100}
              alt={item.name}
              className={styles.grid_img}
            />
          </div>
        );
      })}
    </div>
  );
}
