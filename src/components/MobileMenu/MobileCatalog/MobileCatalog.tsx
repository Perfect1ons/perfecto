import React, { useState } from "react";
import Image from "next/image";
import MobileSubCatalog from "../MobileSubCatalog/MobileSubCatalog";
import styles from "./style.module.scss";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import clsx from "clsx";

interface MobCatalogProps {
  catalogs: ICatalogMenu | undefined;
  closeMain: () => void;
}

export default function MobileCatalog({
  catalogs,
  closeMain,
}: MobCatalogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);

  const openOrClose = () => setIsOpen(!isOpen);

  const openAndSetSubCategory = (categoryId: number) => {
    setActiveCategoryId(categoryId);
    setIsOpen(true);
  };

  return (
    <section className={styles.catalog_main}>
      <MobileSubCatalog
        open={isOpen}
        close={openOrClose}
        closeMain={closeMain}
        catalogs={catalogs}
        activeCategoryId={activeCategoryId}
        selectedCategoryName={selectedCategoryName}
      />
      <div
        className={isOpen === false ? styles.grid_active : styles.grid_inactive}
      >
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div className={styles.grid_item_wrap} key={index}>
                <div className={clsx(styles.grid_item, "skeleton")}></div>
              </div>
            ))
          : catalog &&
            catalog.map((item) => (
              <div className={styles.grid_item_wrap} key={item.id}>
                <div
                  className={styles.grid_item}
                  onClick={() => {
                    openOrClose();
                    openAndSetSubCategory(item.id);
                    setSelectedCategoryName(item.name);
                  }}
                >
                  <div className={styles.item_title}>
                    <span>{item.name}</span>
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
              </div>
            ))}
      </div>
    </section>
  );
}
