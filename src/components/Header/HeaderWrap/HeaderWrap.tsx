"use client";
import { useEffect, useState } from "react";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { getCatalogsMenu } from "@/api/clientRequest";
import MobileNav from "@/components/MobileMenu/MobileNav/MobileNav";
import Header from "../Header";

export default function HeaderWrap() {
  const [catalog, setCatalog] = useState<ICatalogMenu>([]);

 
    const fetchCatalogs = async () => {
      try {
        const catalogs = await getCatalogsMenu();
        setCatalog(catalogs)
        console.log(catalogs);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        <Header catalogs={catalog} click={fetchCatalogs} />
        <MobileNav catalogs={catalog} click={fetchCatalogs} />
      </>
    );
}
