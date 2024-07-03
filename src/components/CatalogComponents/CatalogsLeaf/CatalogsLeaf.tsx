"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import { BackArrow } from "../../../../public/Icons/Icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import { useState } from "react";

interface props {
  catalog: ICatalogsProducts;
  path: string | string[];
  breadCrumbs: BreadCrumbs[];
}

const CatalogsLeaf = ({ catalog, path, breadCrumbs }: props) => {
  const router = useRouter();
  const [imageErrors, setImageErrors] = useState<number[]>([]);

  const handleImageError = (index: number) => {
    setImageErrors((prevErrors) => [...prevErrors, index]);
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
        {breadCrumbs.slice(-2, -1).map((crumbs) => (
          <Link
            className="all__directions_link"
            href={`/catalog/${crumbs.full_slug}`}
            key={crumbs.id}
          >
            <BackArrow /> Назад
          </Link>
        ))}

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
      <h1 className={styles.catalogTitle}>{catalog.category.name}</h1>
      <div className={styles.catalogContainer}>
        <div className={styles.catalogContainer__containerSubCatalog}>
          <ul className={styles.subCatalogsContainerUL}>
            {catalog.category.child.map((catalogItem) => (
              <li
                key={catalogItem.id}
                className={styles.catalogFirst}
                onClick={() => handleClick(catalogItem.full_slug)}
              >
                {catalogItem.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.catalogContainer__cardContainer}>
          {catalog.category.child.map((catalogItem, index) => {
            const imageUrl = catalogItem.icon;
            const validImageUrl = imageUrl
              ? imageUrl.startsWith("https://")
                ? imageUrl
                : `https://max.kg/${imageUrl}`
              : "/img/noPhoto.svg";

            return (
              <div
                key={catalogItem.id}
                className={styles.cotainerCart}
                onClick={() => handleClick(catalogItem.full_slug)}
              >
                {!imageErrors.includes(index) && (
                  <Image
                    className={styles.imageChild}
                    src={validImageUrl}
                    alt={catalogItem.name}
                    onError={() => handleImageError(index)}
                    width={60}
                    height={60}
                  />
                )}
                <li className={styles.nameCatalog}>{catalogItem.name}</li>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CatalogsLeaf;
