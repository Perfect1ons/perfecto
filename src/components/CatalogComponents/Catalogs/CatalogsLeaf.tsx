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
  const handleClick = (item: any) => {
    const fullPath =
      typeof path === "string" && path.startsWith("/catalog/")
        ? path
        : `/catalog/${path}`;
    if (item.child_cat_level3) {
      router.push(`/catalog/${item.full_slug}`);
    } else {
      alert(item.id);
    }
  };
  return (
    <div>
      <h1>{catalog.category.name}</h1>
      {catalog &&
        catalog.category &&
        Object.keys(catalog.category).map((key, index) => {
          const category = catalog?.category[key];
          return <h1 key={index}>{category?.name}</h1>;
        })}
    </div>
    // <div>
    //   <div className={styles.container}>
    //     <ol className={styles.breadcrumb}>
    //       <li className={styles.links}>
    //         <Link href="/" className={styles.link}>
    //           Главная {ChevronRightIcon()}
    //         </Link>
    //         {catalog.map((link) => (
    //           <Link
    //             key={link.id}
    //             href={link.full_slug || "sadas"}
    //             className={styles.link}
    //           >
    //             {link.name}
    //           </Link>
    //         ))}
    //       </li>
    //     </ol>
    //     <div>
    //       <h1 className={styles.container__h1}>
    //         {catalog.map((title) => title.name)}
    //       </h1>
    //       <div className={styles.row}>
    //         <div className={styles.wrapps}>
    //           {catalog.map((catalogItem) => (
    //             <div key={catalogItem.id}>
    //               <ul className={styles.subCatalogsContainerUL}>
    //                 {(
    //                   catalogItem.child_level2 ||
    //                   (catalogItem.child_cat_level3 as any) ||
    //                   []
    //                 ).map((childItem) => {
    //                   const childCatLevel3 = childItem.child_cat_level3 || [];
    //                   const isExpanded =
    //                     showMoreCategories[childItem.id] || false;
    //                   const displayedCatLevel3 = isExpanded
    //                     ? childCatLevel3
    //                     : childCatLevel3.slice(0, 5);
    //                   const remainingItems =
    //                     childCatLevel3.length - displayedCatLevel3.length;
    //                   return (
    //                     <li key={childItem.id} className={styles.catalog__lih3}>
    //                       {childItem.name}
    //                       <ul className={styles.subCatalogUL}>
    //                         {displayedCatLevel3.map((res) => (
    //                           <li key={res.id} className={styles.subCatalogLI}>
    //                             {res.name}
    //                           </li>
    //                         ))}
    //                       </ul>
    //                       {childCatLevel3.length > 5 && (
    //                         <button
    //                           onClick={() =>
    //                             isExpanded
    //                               ? handleCollapse(childItem.id)
    //                               : handleShowMore(childItem.id)
    //                           }
    //                           className={styles.buttonsCatalogs}
    //                         >
    //                           {isExpanded
    //                             ? `Свернуть`
    //                             : `Ещё ${remainingItems}`}
    //                           <span className={styles.buttonsSpanCatalogs}>
    //                             {isExpanded
    //                               ? chevronUpIcon()
    //                               : chevronDownIcon()}
    //                           </span>
    //                         </button>
    //                       )}
    //                     </li>
    //                   );
    //                 })}
    //               </ul>
    //             </div>
    //           ))}
    //         </div>
    //         <div className={styles.wrpps}>
    //           {catalog.map((catalogItem) => (
    //             <div className={styles.row__9} key={catalogItem.id}>
    //               {catalogItem.child_level2
    //                 ? catalogItem.child_level2.map((item) => (
    //                     <div key={item.id} className={styles.row__9li}>
    //                       <Image
    //                         src={
    //                           item.icon
    //                             ? `https://max.kg/${item.icon}`
    //                             : "https://max.kg/images/discount/empty-image.png"
    //                         }
    //                         alt={item.name}
    //                         width={60}
    //                         height={60}
    //                         onClick={() => handleClick(item)}
    //                       />
    //                       <li className={styles.name__h3}>{item.name}</li>
    //                     </div>
    //                   ))
    //                 : (catalogItem?.child_cat_level3 || []).map((item) => (
    //                     <div key={item.id} className={styles.row__9li}>
    //                       <Image
    //                         src={
    //                           item.icon
    //                             ? `https://max.kg/${item.icon}`
    //                             : "https://max.kg/images/discount/empty-image.png"
    //                         }
    //                         alt={item.name}
    //                         width={60}
    //                         height={60}
    //                         onClick={() => handleClick(item)}
    //                       />
    //                       <li className={styles.name__h3}>{item.name}</li>
    //                     </div>
    //                   ))}
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CatalogsLeaf;
