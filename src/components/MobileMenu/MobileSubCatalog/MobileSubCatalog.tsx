import { ICatalogMenu } from "@/types/Catalog/catalogMenu";

import styles from "./style.module.scss";
import { ChevronRightIcon_Mobile } from "../../../../public/Icons/Mobile_Icons";
import { getImageUrl } from "@/lib/getImageUrl";
import SubCatTemplate from "./SubCatTemplate";

export interface SubCatalProps {
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
        <div className={styles.selectedCat_wrap} onClick={close}>
          <div className={styles.leftIcon_wrap}>
            <ChevronRightIcon_Mobile />
          </div>
          <span>{selectedCategoryName}</span>
        </div>
      )}

      <hr className={styles.hr} />

      <SubCatTemplate catalog={catalog} activeCategoryId={activeCategoryId} />
    </div>
  );
}
