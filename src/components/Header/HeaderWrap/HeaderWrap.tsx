"use client";
import { useState } from "react";
import Header from "../Header";
import dynamic from "next/dynamic";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { getCatalogsMenu } from "@/api/clientRequest";
// import { getCatalogsMenu } from "@/api/clientRequest";

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
      console.log("First SetLoading");
      if (!isCatalogFetched) {
        const catalogs = await getCatalogsMenu();
        setCatalog(catalogs);
        setIsCatalogFetched(true);
        console.log("second setCatalog");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      console.log("second setLoad");
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
