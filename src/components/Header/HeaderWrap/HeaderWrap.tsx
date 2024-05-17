"use client";
import { useState } from "react";
import Header from "../Header";
// import dynamic from "next/dynamic";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { getCatalogsMenu } from "@/api/clientRequest";
// import { getCatalogsMenu } from "@/api/clientRequest";

export default function HeaderWrap() {
  // const MobileNav = dynamic(
  //   () => import("@/components/MobileMenu/MobileNav/MobileNav")
  // );

  const [catalog, setCatalog] = useState<ICatalogMenu>();

  const fetchCatalogs = async () => {
    if (catalog) {
      setCatalog(catalog);
    } else {
      const catalogs = await getCatalogsMenu();
      setCatalog(catalogs);
    }
  };

  // useEffect(() => {
  //   fetch("/api/catalog/cat-list-menu")
  //     .then((data) => data.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

  try {
    return (
      <>
        <Header catalogs={catalog} click={fetchCatalogs} />
        {/* <MobileNav catalogs={catalog} /> */}
      </>
    );
  } catch (error) {
    console.log(`Error in HeaderWrap: ${error}`);
  }
}
