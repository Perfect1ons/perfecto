"use client";
import { useState } from "react";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { getCatalogsMenu } from "@/api/clientRequest";
import dynamic from "next/dynamic";
const MobileNav = dynamic(
  () => import("@/components/MobileMenu/MobileNav/MobileNav")
);

const Header = dynamic(() => import("../Header"));


interface IHeaderProps {
  isAuthed: any;
  searchHistory: string[];
}

export default function HeaderWrap({ isAuthed, searchHistory }: IHeaderProps) {
  const [catalog, setCatalog] = useState<ICatalogMenu>();
  const [isCatalogFetched, setIsCatalogFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCatalogs = async () => {
    try {
      setLoading(true);
      if (!isCatalogFetched) {
        const catalogs = await getCatalogsMenu();
        setCatalog(catalogs);
        setLoading(false);
        setIsCatalogFetched(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [isMobileModalOpen, setMobileModalOpen] = useState(false);

  return (
    <header className="header">
      <Header
        isAuthed={isAuthed}
        history={searchHistory}
        catalogs={catalog}
        click={fetchCatalogs}
        loading={loading}
        isMobileModalOpen={isMobileModalOpen}
        setMobileModalOpen={setMobileModalOpen}
      />
      <MobileNav
        isAuthed={isAuthed}
        history={searchHistory}
        catalogs={catalog}
        click={fetchCatalogs}
        loading={loading}
        isMobileModalOpen={isMobileModalOpen}
        setMobileModalOpen={setMobileModalOpen}
      />
    </header>
  );
}
