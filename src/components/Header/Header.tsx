"use client";
import cn from "clsx";
import styles from "./style.module.scss";
import { SearchIcon, SearchIconWhite } from "../../../public/Icons/Icons";
import Logo from "../Logo/Logo";
import HeaderNav from "./HeaderNav/HeaderNav";
import { useState } from "react";
import Modal from "../UI/ModalCatalog/Modal/Modal";
import Link from "next/link";
import HeaderCatalog from "../CatalogComponents/HeaderCatalog/HeaderCatalog";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <header className={styles.header}>
      <div className={cn(styles.header__container, "container")}>
        <Logo />

        <div className={styles.header__container_form}>
          {/* <Link
            className={styles.catalog}
            href={"/catalog"}
            onClick={handleClick}
          >
            <button
              className={cn(styles.hamburger, styles.hamburger_3dy, {
                [styles.is_active]: show,
              })}
              type="button"
            >
              <span className={styles.hamburger_box}>
                <span className={styles.hamburger_inner}></span>
              </span>
            </button>
            Каталог
          </Link> */}
          <div className={styles.catalog} onClick={handleClick}>
            <button
              className={cn(styles.hamburger, styles.hamburger_3dy, {
                [styles.is_active]: show,
              })}
              type="button"
            >
              <span className={styles.hamburger_box}>
                <span className={styles.hamburger_inner}></span>
              </span>
            </button>
            Каталог
          </div>
          <Modal close={handleClick} isVisible={show}>
            <HeaderCatalog />
            <h1>asdasd</h1>
          </Modal>
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
