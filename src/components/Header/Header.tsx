"use client";
import { useState } from "react";
import HeaderNav from "./HeaderNav/HeaderNav";
import { SearchIcon, SearchIconWhite } from "../../../public/Icons/Icons";
import Logo from "../Logo/Logo";
import Modal from "../UI/ModalCatalog/Modal/Modal";

import cn from "clsx";
import styles from "./style.module.scss";
import { ICatalogHome } from "@/types/catalogsHome";
import { subCatalog } from "@/types/subCatalog";
import HeaderCatalog from "../CatalogComponents/HeaderCatalog/HeaderCatalog";
import ModalHeaders from "../UI/ModalHeaders/Modal/Modal";

export interface ICatalogProps {
  catalog: ICatalogHome[];
  category: subCatalog;
}

const Header = ({ catalog, category }: ICatalogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={cn(styles.header__container, "container")}>
        <Logo />

        <div className={styles.header__container_form}>
          {/* <Link className={styles.catalog} href={"/catalog"}>
            Каталог
          </Link> */}

          <div className={styles.catalog_modal}>
            <div className={styles.catalog} onClick={() => setIsOpen(!isOpen)}>
              <button
                className={cn(styles.hamburger, styles.hamburger_3dy, {
                  [styles.is_active]: isOpen,
                })}
                type="button"
              >
                <span className={styles.hamburger_box}>
                  <span className={styles.hamburger_inner}></span>
                </span>
              </button>
              Каталог
            </div>
            <ModalHeaders isVisible={isOpen} close={() => setIsOpen(!isOpen)}>
              <HeaderCatalog catalog={catalog} category={category} />
            </ModalHeaders>
          </div>

          <div className={styles.search}>
            <input
              placeholder="Искать товары и категории"
              type="text"
              id="searchInput"
              className={styles.search__input}
            />
            <label htmlFor="searchInput" className={styles.search__icon}>
              <SearchIcon />
            </label>
          </div>
        </div>
        <div className={styles.header__nav}>
          <HeaderNav />
        </div>
        <div className={styles.search__white}>
          <SearchIconWhite />
        </div>
      </div>
    </header>
  );
};

export default Header;
