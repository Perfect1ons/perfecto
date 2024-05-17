import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { useRouter } from "next/navigation";

import styles from "./style.module.scss";
import Image from "next/image";
import { ChevronRightIcon_Mobile } from "../../../../public/Icons/Icons";
import SubCatChildrenSecond from "./SubCatChildrenSecond";
import { useState } from "react";

interface SubCatTemplateProps {
  catalog: ICatalogMenu | null;
  activeCategoryId: number | null | undefined;
  closeMain: () => void;
}

export default function SubCatChildrenOne({
  catalog,
  activeCategoryId,
  closeMain,
}: SubCatTemplateProps) {
  // state
  const [isSubCatChildOpen, setCatChildOpen] = useState(false);
  const handleOpenOrClose = () => {
    setCatChildOpen(!isSubCatChildOpen);
  };

  // роутер
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
      // <SubCatChildrenSecond />;
      console.log("hello");
    }
  };

  return (
    <>
      <hr className={styles.hr} />

      <ul className={styles.subCatalogsList}>
        {catalog &&
          catalog.flatMap((rootItem) => {
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
