"use client";
import { useState } from "react";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { getCatalogsMenu } from "@/api/clientRequest";
import Header from "../Header";
import MobileNav from "@/components/MobileMenu/MobileNav/MobileNav";

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

  // задается state для открытия и закрытия
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
