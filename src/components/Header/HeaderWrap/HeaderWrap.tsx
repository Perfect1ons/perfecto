"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { getCatalogsMenu } from "@/api/clientRequest";
import Header from "../Header";

export default function HeaderWrap() {
  const MobileNav = dynamic(
    () => import("@/components/MobileMenu/MobileNav/MobileNav")
  );

  const [catalog, setCatalog] = useState<ICatalogMenu>();
  const [isCatalogFetched, setIsCatalogFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCatalogs = async () => {
    try {
      setLoading(true);
      if (!isCatalogFetched) {
        const catalogs = await getCatalogsMenu();
        setCatalog(catalogs);
        setIsCatalogFetched(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  try {
    return (
      <>
        <Header catalogs={catalog} click={fetchCatalogs} loading={loading} />
        <MobileNav catalogs={catalog} click={fetchCatalogs} loading={loading} />
      </>
    );
  } catch (error) {
    console.log(`Error in HeaderWrap: ${error}`);
  }
}
