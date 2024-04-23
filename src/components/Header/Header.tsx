"use client";
import cn from "clsx";
import styles from "./style.module.scss";
import { SearchIcon, SearchIconWhite } from "../../../public/Icons/Icons";
import Logo from "../Logo/Logo";
import HeaderNav from "./HeaderNav/HeaderNav";
import { useState } from "react";
import Modal from "../UI/ModalCatalog/Modal/Modal";
import CatalogeHome from "@/app/catalog/page";
import Link from "next/link";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <header className={styles.header}>
      <div className={cn(styles.header__container, "container")}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <Link className={styles.catalog} href={"/catalog"}>
          Каталог
        </Link>
        {/* <button className={styles.catalog} onClick={handleClick}>
          Каталог
        </button>
        <Modal close={handleClick} isVisible={show}>
          <CatalogeHome />
          <h1>asdasd</h1>
        </Modal> */}
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
