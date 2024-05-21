"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { getCatalogsMenu } from "@/api/clientRequest";
import Header from "../Header";
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
      console.log("First SetLoading");
      if (!isCatalogFetched) {
        const catalogs = await getCatalogsMenu();
        setCatalog(catalogs);
        setIsCatalogFetched(true);
        console.log("second setCatalog");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log("second setLoad");
    }
  };

  return (
    <>
      <Header catalogs={catalog} click={fetchCatalogs} loading={loading} />
      <MobileNav catalogs={catalog} click={fetchCatalogs} />
    </>
  );
}
