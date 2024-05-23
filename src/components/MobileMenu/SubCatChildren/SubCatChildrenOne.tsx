import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";
import Image from "next/image";
import { ChevronRightIcon_Mobile } from "../../../../public/Icons/Icons";

interface SubCatTemplateProps {
  catalogs: ICatalogMenu | undefined;
  activeCategoryId: number | null | undefined;
  closeMain: () => void;
  openSubCat2: (childCategories: any[]) => void;
}

export default function SubCatChildrenOne({
  catalogs,
  activeCategoryId,
  closeMain,
  openSubCat2,
}: SubCatTemplateProps) {
  const router = useRouter();

  const handleClick = (path: string) => {
    closeMain();
    const fullPath = path.startsWith("/catalog/") ? path : `/catalog/${path}`;
    router.push(fullPath);
  };

  const handleItemClick = (item: any) => {
    if (item.is_leaf === 1) {
      handleClick(item.full_slug);
    } else {
      const childCategories = item.child_cat_level3 || []; // Здесь предполагается, что item имеет свойство child_cat_level3
      openSubCat2(childCategories);
    }
  };

  return (
    <>
      <hr className={styles.hr} />

      <ul className={styles.subCatalogsList}>
        {catalogs &&
          catalogs.flatMap((rootItem) => {
            const childLevel2 = Array.isArray(rootItem.child_level2)
              ? rootItem.child_level2
              : [];
            return childLevel2
              .filter((childItem) => childItem.parent === activeCategoryId)
              .map((filteredChildItem, key) => (
                <li
                  className={styles.subCatalogsListItem}
                  onClick={() => handleItemClick(filteredChildItem)}
                  key={key}
                >
                  <div className={styles.subCatItem_name}>
                    <Image
                      src={
                        filteredChildItem.icon
                          ? `https://max.kg/${filteredChildItem.icon}`
                          : `https://max.kg/images/discount/empty-image.png`
                      }
                      width={30}
                      height={30}
                      alt=""
                      className={styles.subCatItem_image}
                    />
                    <span>{filteredChildItem.name}</span>
                  </div>
                  {filteredChildItem.is_leaf === 0 ? (
                    <ChevronRightIcon_Mobile />
                  ) : null}
                </li>
              ));
          })}
      </ul>
    </>
  );
}
