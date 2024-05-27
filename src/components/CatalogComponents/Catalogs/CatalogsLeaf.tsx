"use client";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import Image from "next/image";
import {
  ChevronRightIcon,
  chevronDownIcon,
  chevronUpIcon,
} from "../../../../public/Icons/Icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";
import Link from "next/link";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import cn from "clsx";

interface props {
  // catalog: ICatalogMenu;
  catalog: ICatalogsProducts;
  path: string | string[];
}
const CatalogsLeaf = ({ catalog, path }: props) => {
  const router = useRouter();

  const [showMoreCategories, setShowMoreCategories] = useState<{
    [key: number]: boolean;
  }>({});

  const handleShowMore = (categoryId: number) => {
    setShowMoreCategories((prevCategories) => ({
      ...prevCategories,
      [categoryId]: true,
    }));
  };
  // Функция для обработки сворачивания категорий
  const handleCollapse = (categoryId: number) => {
    setShowMoreCategories((prevCategories) => ({
      ...prevCategories,
      [categoryId]: false,
    }));
  };
  const handleClick = (pathProduct: string) => {
    const fullPath = pathProduct.startsWith(`/catalog/${path}/`)
      ? pathProduct
      : `/catalog/${pathProduct}`;
    router.push(fullPath);
  };

  return (
    <div className={styles.container}>
      <ol className={styles.breadcrumb}>
        <li className={cn(styles.links, "all__directions")}>
          <Link href="/" className={cn(styles.link, "all__directions_link")}>
            Главная
          </Link>
          <Link
            href={catalog.category.full_slug || "sadas"}
            className={cn(
              styles.link,
              "all__directions_link",
              "all__directions_linkActive"
            )}
          >
            {catalog.category.name}
          </Link>
        </li>
      </ol>
      <div>
        <h1 className={styles.container__h1}>{catalog.category.name}</h1>
        <div className={styles.row}>
          <div className={styles.containerSubCatalog}>
            <ul className={styles.subCatalogsContainerUL}>
              {catalog.category.child.map((catalogItem) => (
                <div
                  // href={catalogItem.full_slug}
                  key={catalogItem.id}
                  className={styles.catalog__lih3}
                  onClick={() => handleClick(catalogItem.full_slug)}
                >
                  {catalogItem.name}
                </div>
              ))}
            </ul>
          </div>
          <div className={styles.row__containerRow}>
            {catalog.category.child.map((catalogItem) => (
              <div
                // href={catalogItem.full_slug.slice()}
                key={catalogItem.id}
                className={styles.row__9li}
                onClick={() => handleClick(catalogItem.full_slug)}
              >
                <Image
                  className={styles.imageChild}
                  src={
                    catalogItem.icon
                      ? `https://max.kg/${catalogItem.icon}`
                      : "https://max.kg/images/discount/empty-image.png"
                  }
                  alt={catalogItem.name}
                  width={60}
                  height={60}
                />
                <li className={styles.name__h3}>{catalogItem.name}</li>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogsLeaf;
