"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import { BackArrow } from "../../../../public/Icons/Icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";

interface props {
  catalog: ICatalogsProducts;
  path: string | string[];
  breadCrumbs: BreadCrumbs[];
}
const CatalogsLeaf = ({ catalog, path, breadCrumbs }: props) => {
  const router = useRouter();
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
                    ? catalogItem.icon.startsWith("https://")
                      ? catalogItem.icon
                      : `https://max.kg/${catalogItem.icon}`
                    : "/img/noPhoto.svg"
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
  );
};

export default CatalogsLeaf;
