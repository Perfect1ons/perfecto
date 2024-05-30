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
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";

interface props {
  catalog: ICatalogsProducts;
  path: string | string[];
  breadCrumbs: BreadCrumbs[];
}
const CatalogsLeaf = ({ catalog, path, breadCrumbs }: props) => {
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
    <div className="container">
      <div className="all__directions">
        <Link href={"/"} className="all__directions_link">
          Главная
        </Link>
        {breadCrumbs.map((crumbs) => {
          return (
            <Link
              className="all__directions_link"
              href={`/catalog/${crumbs.full_slug}`}
              key={crumbs.id}
            >
              {crumbs.name}
            </Link>
          );
        })}
      </div>
      <div>
        <h1 className={styles.containerTitle}>{catalog.category.name}</h1>
        <div className={styles.row}>
          <div className={styles.containerSubCatalog}>
            <ul className={styles.subCatalogsContainerUL}>
              {catalog.category.child.map((catalogItem) => (
                <div
                  // href={catalogItem.full_slug}
                  key={catalogItem.id}
                  className={styles.catalogFirst}
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
                className={styles.cotainerCart}
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
                <li className={styles.nameCatalog}>{catalogItem.name}</li>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogsLeaf;
