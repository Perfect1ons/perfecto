"use client";
import { useState } from "react";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { getCatalogsMenu } from "@/api/clientRequest";
import Header from "../Header";

import dynamic from "next/dynamic";
const MobileNav = dynamic(
  () => import("@/components/MobileMenu/MobileNav/MobileNav"),
  { ssr: false }
);

export default function HeaderWrap() {
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header catalogs={catalog} click={fetchCatalogs} loading={loading} />
      <MobileNav catalogs={catalog} click={fetchCatalogs} loading={loading} />
    </>
  );
}
