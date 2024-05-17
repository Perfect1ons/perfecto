"use client";
import { useEffect, useState } from "react";
// import Header from "../Header";
// import dynamic from "next/dynamic";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { getCatalogsMenu } from "@/api/clientRequest";
// import { getCatalogsMenu } from "@/api/clientRequest";

export default function HeaderWrap() {
  // const MobileNav = dynamic(
  //   () => import("@/components/MobileMenu/MobileNav/MobileNav")
  // );

  const [catalog, setCatalog] = useState<ICatalogMenu>([]);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const catalogs = await getCatalogsMenu();
        console.log(catalogs);
      } catch (error) {
        console.log(error);
      }

      // setCatalog(catalogs);
    };

    fetchCatalogs();
    // fetch("/api/catalog/cat-list-menu")
    //   .then((data) => data.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, []);

  return <h3>dsds</h3>;

  // try {
  //   return (
  //     <>
  //       {/* <Header catalogs={catalog} /> */}
  //       {/* <MobileNav catalogs={catalog} /> */}
  //     </>
  //   );
  // } catch (error) {
  //   console.log(`Error in HeaderWrap: ${error}`);
  // }
}
