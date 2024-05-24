import React from "react";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import styles from "./style.module.scss";
import { ChevronRightIcon_Mobile } from "../../../../public/Icons/Icons";
import SubCatChildrenOne from "../SubCatChildren/SubCatChildrenOne";
import SubCatChildrenSecond from "../SubCatChildren/SubCatChildrenSecond";

interface SubCatalProps {
  open: boolean;
  close: () => void;
  closeMain: () => void;
  catalogs: ICatalogMenu | undefined;
  activeCategoryId: number | null | undefined;
  handleSubCatChildrenSecondOpen: (childCategories: any[]) => void;
  closeSubCatChildrenSecond: () => void;
  isSubCatChild2Open: boolean;
  subCatChildData: any[];
}

export default function MobileSubCatalog({
  open,
  close,
  catalogs,
  activeCategoryId,
  closeMain,
  handleSubCatChildrenSecondOpen,
  closeSubCatChildrenSecond,
  isSubCatChild2Open,
  subCatChildData,
}: SubCatalProps) {
  const handleOpenOrClose = () => {
    closeSubCatChildrenSecond(); // Закрыть второй подкаталог при закрытии основного
  };

  return (
    <div
      className={
        open ? styles.sub_catalog_wrap_active : styles.sub_catalog_wrap
      }
    >
      <div className={styles.selectedCat_wrap} onClick={close}>
        <div className={styles.leftIcon_wrap}>
          <ChevronRightIcon_Mobile />
        </div>
        <span>Назад</span>
      </div>

      <SubCatChildrenOne
        catalogs={catalogs}
        activeCategoryId={activeCategoryId}
        closeMain={closeMain}
        openSubCat2={handleSubCatChildrenSecondOpen}
      />
      <SubCatChildrenSecond
        isOpen={isSubCatChild2Open}
        close={handleOpenOrClose}
        childCategories={subCatChildData} // Передаем дочерние категории
      />
    </div>
  );
}
