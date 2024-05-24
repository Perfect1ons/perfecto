import React from "react";
import styles from "./style.module.scss";
import { ChevronRightIcon_Mobile } from "../../../../public/Icons/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SubCatProps {
  isOpen: boolean;
  close: () => void;
  closeMain: () => void;
  childCategories: any[];
}

export default function SubCatChildrenSecond({
  isOpen,
  close,
  closeMain,
  childCategories,
}: SubCatProps) {
  const router = useRouter();

  const handleClick = (path: string) => {
    closeMain();
    const fullPath = path.startsWith("/catalog/") ? path : `/catalog/${path}`;
    router.push(fullPath);
  };

  return (
    <div className={isOpen ? styles.child2_wrap_active : styles.child2_wrap}>
      <div className={styles.selectedCat_wrap} onClick={close}>
        <div className={styles.leftIcon_wrap}>
          <ChevronRightIcon_Mobile />
        </div>
        <span>Назад</span>
      </div>

      <hr className={styles.hr} />

      <ul className={styles.subCatalogsList}>
        {childCategories.map((childItem, key) => (
          <li
            className={styles.subCatalogsListItem}
            key={key}
            onClick={() => handleClick(childItem.full_slug)}
          >
            <div className={styles.subCatItem_name}>
              <Image
                src={
                  childItem.icon
                    ? `https://max.kg/${childItem.icon}`
                    : `https://max.kg/images/discount/empty-image.png`
                }
                width={30}
                height={30}
                alt=""
                className={styles.subCatItem_image}
              />
              <span>{childItem.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
