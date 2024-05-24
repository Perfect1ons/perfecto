import React, { useState } from "react";
import Image from "next/image";
import MobileSubCatalog from "../MobileSubCatalog/MobileSubCatalog";
import styles from "./style.module.scss";
import { ChildCatLevel3, ICatalogMenu } from "@/types/Catalog/catalogMenu";

interface MobCatalogProps {
  catalogs: ICatalogMenu | undefined;
  closeMain: () => void;
  loading: boolean;
}

export default function MobileCatalog({
  catalogs,
  closeMain,
  loading,
}: MobCatalogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [subCatChildData, setSubCatChildData] = useState<ChildCatLevel3[]>([]); // Состояние для дочерних категорий
  const [isSubCatChild2Open, setIsSubCatChild2Open] = useState(false); // Состояние для второго подкаталога

  const openOrClose = () => setIsOpen(!isOpen);

  const openAndSetSubCategory = (categoryId: number) => {
    setActiveCategoryId(categoryId);
    setIsOpen(true);
  };

  const handleSubCatChildrenSecondOpen = (
    childCategories: ChildCatLevel3[]
  ) => {
    setSubCatChildData(childCategories);
    setIsSubCatChild2Open(true); // Открыть второй подкаталог
  };

  const closeSubCatChildrenSecond = () => {
    setIsSubCatChild2Open(false); // Закрыть второй подкаталог
  };

  return (
    <section className={styles.catalog_main}>
      <MobileSubCatalog
        open={isOpen}
        close={openOrClose}
        closeMain={closeMain}
        catalogs={catalogs}
        activeCategoryId={activeCategoryId}
        handleSubCatChildrenSecondOpen={handleSubCatChildrenSecondOpen}
        closeSubCatChildrenSecond={closeSubCatChildrenSecond}
        isSubCatChild2Open={isSubCatChild2Open} // Передаем состояние второго подкаталога
        subCatChildData={subCatChildData} // Передаем данные второго подкаталога
      />
      <div
        className={isOpen === false ? styles.grid_active : styles.grid_inactive}
      >
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div className={styles.grid_item_wrap} key={index}>
                <div className={styles.grid_item_skeleton}></div>
              </div>
            ))
          : catalogs &&
            catalogs.map((item) => (
              <div className={styles.grid_item_wrap} key={item.id}>
                <div
                  className={styles.grid_item}
                  onClick={() => {
                    openOrClose();
                    openAndSetSubCategory(item.id);
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
