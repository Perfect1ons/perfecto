// "use client";
// import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
// import styles from "./style.module.scss";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   chevronUpIcon,
//   chevronDownIcon,
//   ChevronRightIcon,
// } from "../../../public/Icons/Icons";
// import CatalogsLeaf from "@/components/CatalogComponents/Catalogs/CatalogsLeaf";
// import CatalogProducts from "@/components/CatalogComponents/CatalogProducts/CatalogProducts";

// interface IProps {
//   catalog: ICatalogMenu;
//   // catalog: ICatalogsProducts;
//   path: string | string[];
// }
// interface ICatalogItem {
//   id: number;
//   name: string;
//   path: string;
//   level: number;
//   icon: string;
//   full_slug?: string;
//   parent?: number;
//   enable: number;
//   sort_menu: number;
// }

// interface IChildCatLevel3 extends ICatalogItem {}

// interface IChildLevel2 {
//   [key: string]: ICatalogItem & { child_cat_level3?: IChildCatLevel3 };
// }

// interface ICatalogMenus extends ICatalogItem {
//   child_level2?: IChildLevel2;
// }
// const Catalogs = ({ catalog, path }: IProps) => {
//   // const router = useRouter();
//   const filteredCatalogs = useMemo(() => {
//     if (!catalog) return [];

//     const filterCatalogs = (
//       catalogItem: ICatalogMenus,
//       path: string | string[]
//     ) => {
//       const filtered: ICatalogMenus[] = [];
//       if (catalogItem.full_slug === path) {
//         filtered.push(catalogItem);
//       }
//       if (catalogItem.child_level2) {
//         filterChildLevel2(catalogItem.child_level2, path, filtered);
//       }
//       return filtered;
//     };

//     const filterChildLevel2 = (
//       childLevel2: IChildLevel2,
//       path: string | string[],
//       filtered: ICatalogMenus[]
//     ) => {
//       Object.values(childLevel2).forEach((child) => {
//         if (child.full_slug === path) {
//           filtered.push(child);
//         }
//         if (child.child_cat_level3) {
//           filterChildCatLevel3(child.child_cat_level3, path, filtered);
//         }
//       });
//     };

//     const filterChildCatLevel3 = (
//       childCatLevel3: IChildCatLevel3,
//       path: string | string[],
//       filtered: ICatalogMenus[]
//     ) => {
//       Object.values(childCatLevel3).forEach((subChild) => {
//         if (subChild.full_slug === path) {
//           filtered.push(subChild);
//         }
//         // Add more levels if needed
//       });
//     };

//     const filtered: ICatalogMenus[] = [];
//     catalog.forEach((catalogItem) => {
//       const result = filterCatalogs(catalogItem, path);
//       if (result.length > 0) {
//         filtered.push(...result);
//       }
//     });

//     return filtered;
//   }, [catalog, path]); // Добавляем showMoreCategories сюда

//   return (
//     <>
//       <CatalogsLeaf catalog={filteredCatalogs} path={path} />
//       <CatalogProducts />
//     </>
//   );
// };

// export default Catalogs;
