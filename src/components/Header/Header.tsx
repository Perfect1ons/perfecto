"use client";
import cn from "clsx";
import styles from "./style.module.scss";
import Logo from "../Logo/Logo";
import HeaderNav from "./HeaderNav/HeaderNav";
import { SearchIcon, SearchIconWhite } from "../../../public/Icons/Icons";
import { useState } from "react";
import Modal from "../shared/UI/Modal/Modal";
import Catalog from "../Catalog/Catalog";

const Header = () => {
  const [close, setClose] = useState(false);
  const orderCancelled = () => setClose(!close);
  return (
    <header className={styles.header}>
      <div className={cn(styles.header__container, "container")}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.catalog} onClick={orderCancelled}>
          Каталог
        </div>
        <Modal isVisible={close} close={orderCancelled}>
          <h1>sdhadhjsdhasj</h1>
          <Catalog />
        </Modal>

        <div className={styles.search}>
          <input
            type="text"
            id="searchInput"
            className={styles.search__input}
          />
          <label htmlFor="searchInput" className={styles.search__icon}>
            <SearchIcon />
          </label>
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
