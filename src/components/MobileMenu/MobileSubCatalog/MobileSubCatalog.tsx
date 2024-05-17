import { ICatalogMenu } from "@/types/Catalog/catalogMenu";

import styles from "./style.module.scss";
import { ChevronRightIcon_Mobile } from "../../../../public/Icons/Icons";

import SubCatChildrenOne from "../SubCatChildren/SubCatChildrenOne";

export interface SubCatalProps {
  open: boolean;
  close: () => void;
  closeMain: () => void;
  catalog: ICatalogMenu | undefined;
  activeCategoryId: number | null | undefined;
  selectedCategoryName: string | null;
}

export default function MobileSubCatalog({
  open,
  close,
  catalog,
  activeCategoryId,
  selectedCategoryName,
  closeMain,
}: SubCatalProps) {
  return (
    <div
      className={
        open === true ? styles.sub_catalog_wrap_active : styles.sub_catalog_wrap
      }
    >
      {selectedCategoryName && (
        <div className={styles.selectedCat_wrap} onClick={close}>
          <div className={styles.leftIcon_wrap}>
            <ChevronRightIcon_Mobile />
          </div>
          <span>{selectedCategoryName}</span>
        </div>
      )}

      <SubCatChildrenOne
        catalog={catalog}
        activeCategoryId={activeCategoryId}
        closeMain={closeMain}
      />
    </div>
  );
}
