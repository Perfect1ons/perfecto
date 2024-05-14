import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { useRouter } from "next/navigation";

import styles from "./style.module.scss";
import Image from "next/image";
import { ChevronRightIcon_Mobile } from "../../../../public/Icons/Icons";

interface SubCatTemplateProps {
  catalog: ICatalogMenu;
  activeCategoryId: number | null | undefined;
}

export default function SubCatTemplate({
  catalog,
  activeCategoryId,
}: SubCatTemplateProps) {
  // для роутинга
  const router = useRouter();
  const handleClick = (path: string) => {
    const fullPath = path.startsWith("/catalog/") ? path : `/catalog/${path}`;
    close;
    router.push(fullPath);
  };

  return (
    <>
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
              </div>
            ));
        })}
      </ul>
    </>
  );
}
