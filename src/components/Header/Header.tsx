"use client";
import { useState } from "react";
import HeaderNav from "./HeaderNav/HeaderNav";
import { SearchIcon, SearchIconWhite } from "../../../public/Icons/Icons";
import Logo from "../Logo/Logo";
import cn from "clsx";
import styles from "./style.module.scss";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import CatalogMenu from "../CatalogComponents/HeaderCatalog/CatalogMenu";
import Modal from "../UI/ModalHeaders/Modal/Modal";

export interface ICatalogProps {
  catalog: ICatalogMenu;
}

const Header = ({ catalog }: ICatalogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={cn(styles.header__container, "container")}>
        <Logo />
        <Modal isVisible={isOpen} close={() => setIsOpen(!isOpen)}>
          <CatalogMenu catalog={catalog} close={open} />
        </Modal>
        <div className={styles.header__container_form}>
          {/* <Link className={styles.catalog} href={"/catalog"}>
            Каталог
          </Link> */}

          <div className={styles.catalog_modal}>
            <div className={styles.catalog} onClick={open}>
              <button
                className={cn("hamburger", "hamburger_3dy", {
                  ["is_active"]: isOpen,
                })}
                type="button"
              >
                <span className="hamburger_box">
                  <span className="hamburger_inner"></span>
                </span>
              </button>
              Каталог
            </div>
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
