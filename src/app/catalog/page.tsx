"use client";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";

interface IProps {
  // catalog: ICatalogMenu;
  catalog: ICatalogsProducts;

  path: string | string[];
}

const Catalogs = ({ catalog, path }: IProps) => {
  const router = useRouter();
  // // const filteredCatalogs = catalog.filter(
  // //   (catalogItem) => catalogItem.full_slug === path
  // // );
  // const filteredCatalogs = useMemo(() => {
  //   if (!catalog) return [];
  //   return catalog.filter((catalogItem) => {
  //     if (catalogItem.full_slug === path) {
  //       return true;
  //     }
  //     if (catalogItem.child_level2) {
  //       const childLevel2 = Object.values(catalogItem.child_level2);
  //       return childLevel2.some((child) => child.full_slug === path);
  //     }
  //     return false;
  //   });
  // }, [catalog, path]);
  // const [showMoreCategories, setShowMoreCategories] = useState<{
  //   [key: number]: boolean;
  // }>({});
  // // Функция для обработки отображения дополнительных категорий
  // const handleShowMore = (categoryId: number) => {
  //   setShowMoreCategories((prevCategories) => ({
  //     ...prevCategories,
  //     [categoryId]: true,
  //   }));
  // };
  // // Функция для обработки сворачивания категорий
  // const handleCollapse = (categoryId: number) => {
  //   setShowMoreCategories((prevCategories) => ({
  //     ...prevCategories,
  //     [categoryId]: false,
  //   }));
  // };
  // const chevronUpIcon = () => (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     className="icon icon-tabler icon-tabler-chevron-up"
  //     width="20"
  //     height="20"
  //     viewBox="0 0 24 24"
  //     stroke-width="1.5"
  //     stroke="currentColor"
  //     fill="none"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //   >
  //     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  //     <path d="M6 15l6 -6l6 6" />
  //   </svg>
  // );
  // const chevronDownIcon = () => (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     className="icon icon-tabler icon-tabler-chevron-down"
  //     width="20"
  //     height="20"
  //     viewBox="0 0 24 24"
  //     stroke-width="1.5"
  //     stroke="currentColor"
  //     fill="none"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //   >
  //     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  //     <path d="M6 9l6 6l6 -6" />
  //   </svg>
  // );
  return (
    <div>
      <h1>{catalog?.category?.name}</h1>
      <h1>{catalog.category[0]?.name}</h1>
    </div>

    // <div className={styles.container}>
    //   <ol className={styles.breadcrumb}>
    //     <li className={styles.links}>
    //       <Link href="/" className={styles.link}>
    //         Главная
    //       </Link>
    //       <Link href="/" className={styles.link}>
    //         {filteredCatalogs && filteredCatalogs.map((title) => title.name)}
    //       </Link>
    //     </li>
    //   </ol>
    //   <div>
    //     <h1 className={styles.container__h1}>
    //       {filteredCatalogs && filteredCatalogs.map((title) => title.name)}
    //     </h1>
    //     <div className={styles.row}>
    //       <div className={styles.wrapps}>
    //         {filteredCatalogs &&
    //           filteredCatalogs.map((catalog) => {
    //             const childLevel2 = Object.values(catalog.child_level2);
    //             return (
    //               <div key={catalog.id}>
    //                 <ul className={styles.subCatalogsContainerUL}>
    //                   {childLevel2
    //                     .sort((a, b) => {
    //                       return a.sort_menu - b.sort_menu;
    //                     })
    //                     .map((childItem3) => {
    //                       const childCatLevel3 =
    //                         childItem3.child_cat_level3 || {};
    //                       const childCatLevel3Keys =
    //                         Object.keys(childCatLevel3);
    //                       const isExpanded =
    //                         showMoreCategories[childItem3.id] || false;
    //                       const displayedCatLevel3Keys = isExpanded
    //                         ? childCatLevel3Keys
    //                         : childCatLevel3Keys.slice(0, 5);
    //                       const remainingItems =
    //                         childCatLevel3Keys.length -
    //                         displayedCatLevel3Keys.length;
    //                       return (
    //                         <li
    //                           key={childItem3.id}
    //                           className={styles.catalog__lih3}
    //                         >
    //                           {childItem3.name}
    //                           <ul className={styles.subCatalogUL}>
    //                             {displayedCatLevel3Keys.map((res) => (
    //                               <li key={res} className={styles.subCatalogLI}>
    //                                 {childCatLevel3[res].name}
    //                               </li>
    //                             ))}
    //                           </ul>
    //                           {childCatLevel3Keys.length > 5 && (
    //                             <button
    //                               onClick={() =>
    //                                 isExpanded
    //                                   ? handleCollapse(childItem3.id)
    //                                   : handleShowMore(childItem3.id)
    //                               }
    //                               className={styles.buttonsCatalogs}
    //                             >
    //                               {isExpanded
    //                                 ? `Свернуть`
    //                                 : `Eщё ${remainingItems}`}
    //                               <span className={styles.buttonsSpanCatalogs}>
    //                                 {isExpanded
    //                                   ? chevronUpIcon()
    //                                   : chevronDownIcon()}
    //                               </span>
    //                             </button>
    //                           )}
    //                         </li>
    //                       );
    //                     })}
    //                 </ul>
    //               </div>
    //             );
    //           })}
    //       </div>
    //       <div>
    //         {filteredCatalogs &&
    //           filteredCatalogs.map((catalog) => {
    //             const childLevel2 = Object.values(catalog.child_level2);
    //             return (
    //               <div className={styles.row__9} key={catalog.id}>
    //                 {childLevel2
    //                   .sort((a, b) => {
    //                     return a.sort_menu - b.sort_menu;
    //                   })
    //                   .map((item) => {
    //                     return (
    //                       <div
    //                         key={item.id}
    //                         className={styles.row__9li}
    //                         onClick={() => {
    //                           if (childLevel2?.child_cat_level3) {
    //                             router.push(
    //                               `/${childLevel2?.child_cat_level3.full_slug}`
    //                             );
    //                           } else {
    //                             router.push(`products/${item.full_slug}`);
    //                           }
    //                         }}
    //                       >
    //                         <Image
    //                           src={
    //                             item.icon
    //                               ? `https://max.kg/${item.icon}`
    //                               : "https://max.kg/images/discount/empty-image.png"
    //                           }
    //                           alt={item.name}
    //                           width={60}
    //                           height={60}
    //                         />
    //                         <li key={item.id} className={styles.name__h3}>
    //                           {item.name}
    //                         </li>
    //                       </div>
    //                     );
    //                   })}
    //               </div>
    //             );
    //           })}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Catalogs;
