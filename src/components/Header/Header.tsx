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
import { useRouter } from "next/navigation";

interface HeaderProps {
  catalog: ICatalogMenu;
}

const Header: React.FC<HeaderProps> = ({ catalog }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения значения поиска
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/seek/search=${searchTerm}`); // Переход на страницу поиска с параметрами
  };

  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(!isOpen);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={cn(styles.header__container, "container")}>
        <div className={styles.logo} onClick={onClose}>
          <Logo />
        </div>
        <Modal isVisible={isOpen} close={() => setIsOpen(!isOpen)}>
          <CatalogMenu catalog={catalog} close={open} />
        </Modal>
        <div className={styles.header__container_form}>
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

          <div className={styles.search} onClick={onClose}>
            <form onSubmit={handleSearchSubmit} className={styles.search__form}>
              <input
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Искать товары и категории"
                type="text"
                maxLength={100}
                id="searchInput"
                autoComplete="off"
                className={styles.search__input}
              />
              <button type="submit" className={styles.search__icon}>
                <SearchIcon />
              </button>
            </form>
          </div>

          <div className={styles.header__nav} onClick={onClose}>
            <HeaderNav />
          </div>
        </div>
        <div className={styles.search__white} onClick={onClose}>
          <SearchIconWhite />
        </div>
      </div>
    </header>
  );
};

export default Header;
