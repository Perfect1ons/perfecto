"use client";

import HeaderNav from "./HeaderNav/HeaderNav";
import CatalogeHome from "@/app/catalog/page";

import { SearchIcon, SearchIconWhite } from "../../../public/Icons/Icons";
import Logo from "../Logo/Logo";
import { useState } from "react";
import Modal from "../UI/ModalCatalog/Modal/Modal";
import Link from "next/link";
import HCFirst from "./HeaderCatalog/HCFirst";
import HCSecond from "./HeaderCatalog/HCSecond";

import cn from "clsx";
import styles from "./style.module.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={cn(styles.header__container, "container")}>
        {/* <button className={styles.catalog} onClick={handleClick}>
          Каталог
        </button>
        <Modal close={handleClick} isVisible={show}>
          <CatalogeHome />
          <h1>asdasd</h1>
        </Modal> */}

        <Logo />

        <div className={styles.header__container_form}>
          {/* <Link className={styles.catalog} href={"/catalog"}>
            Каталог
          </Link> */}

          <div className={styles.catalog_modal}>
            <button
              className={styles.catalog}
              onClick={() => setIsOpen(!isOpen)}
            >
              Каталог
            </button>
          </div>
          <Modal open={isOpen} containerId="portal">
            <div className={styles.modal_cont_wrap}>
              <HCFirst />
              <HCSecond />
            </div>
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
