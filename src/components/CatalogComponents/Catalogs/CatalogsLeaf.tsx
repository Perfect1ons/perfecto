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
    // <div className={styles.container}>
    //   <ol className={styles.breadcrumb}>
    //     <li className={styles.links}>
    //       <Link href="/" className={styles.link}>
    //         Главная {ChevronRightIcon()}
    //       </Link>
    //       <Link
    //         href={catalog.category.full_slug || "sadas"}
    //         className={styles.link}
    //       >
    //         {catalog.category.name}
    //       </Link>
    //     </li>
    //   </ol>
    //   <h1>{catalog.category.name}</h1>
    //   {catalog &&
    //     catalog.category &&
    //     Object.keys(catalog.category).map((key, index) => {
    //       const category = catalog?.category[key];
    //       return (
    //         <div className={styles.row} key={index}>
    //           <li className={styles.catalog__lih3}>{category?.name}</li>
    //         </div>
    //       );
    //     })}
    // </div>

    <div className={styles.container}>
      <ol className={styles.breadcrumb}>
        <li className={styles.links}>
          <Link href="/" className={styles.link}>
            Главная
          </Link>
          <Link
            href={catalog.category.full_slug || "sadas"}
            className={styles.link}
          >
            {catalog.category.name}
          </Link>
        </li>
      </ol>
      <div>
        <h1 className={styles.container__h1}>{catalog.category.name}</h1>
        <div className={styles.row}>
          <div className={styles.wrapps}>
            <div>
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
          </div>
          <div className={styles.wrpps}>
            <div className={styles.row__9}>
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
    </div>
  );
};

export default CatalogsLeaf;
