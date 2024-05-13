import { ICatalogMenu } from "@/types/Catalog/catalogMenu";

import styles from "./style.module.scss";
import cn from "clsx";
import { ChevronRightIcon_Mobile } from "../../../../public/Icons/Mobile_Icons";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/getImageUrl";
import { useRouter } from "next/navigation";

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
  // для роутинга
  const router = useRouter();
  const handleClick = (path: string) => {
    const fullPath = path.startsWith("/catalog/") ? path : `/catalog/${path}`;
    router.push(fullPath);
  };

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

      <ul className={styles.subCatalogsList}>
        {catalog.flatMap((rootItem) => {
          const childLevel2 = Array.isArray(rootItem.child_level2)
            ? rootItem.child_level2
            : [];
          return childLevel2
            .filter((childItem) => childItem.parent === activeCategoryId)
            .map((filteredChildItem, key) => (
              <div
                // href={`catalog/${filteredChildItem.full_slug}`}
                onClick={() => {
                  handleClick(filteredChildItem.full_slug);
                }}
                key={key}
                className={styles.subCatalogsListItem_a}
              >
                <li className={styles.subCatalogsListItem}>
                  <div className={styles.subCatItem_name}>
                    <Image
                      src={
                        filteredChildItem.icon
                          ? `https://max.kg/${filteredChildItem.icon}`
                          : "https://max.kg/images/discount/empty-image.png"
                      }
                      width={30}
                      height={30}
                      alt=""
                    />
                    <span>{filteredChildItem.name}</span>
                  </div>
                  {filteredChildItem.is_leaf === 0 ? (
                    <ChevronRightIcon_Mobile />
                  ) : null}
                </li>
              </div>
            ));
        })}
      </ul>
    </div>
  );
}
