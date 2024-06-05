"use client";
import { useEffect, useState } from "react";
import HeaderNav from "./HeaderNav/HeaderNav";
import { SearchIcon, SearchIconWhite } from "../../../public/Icons/Icons";
import Logo from "../Logo/Logo";
import cn from "clsx";
import styles from "./style.module.scss";
import Modal from "../UI/ModalHeaders/Modal/Modal";
import { useRouter } from "next/navigation";
import MobileSearchHeader from "./MobileSearchHeader/MobileSearchHeader";
import CatalogMenu from "../CatalogComponents/CatalogMenu/CatalogMenu";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import Link from "next/link";

export interface ICatalogProps {
  catalogs: ICatalogMenu | undefined;
  click: () => void;
  loading: boolean;
}

const Header = ({ catalogs, click, loading }: ICatalogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputEmpty, setInputEmpty] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleUnload = (event: BeforeUnloadEvent) => {
      if (searchTerm.trim() !== "") {
        setSearchTerm("");
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setInputEmpty(false);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      setInputEmpty(true);
    } else {
      router.push(`/seek/search=${searchTerm}`);
    }
  };

  const handleGoToMainPage = () => {
    setSearchTerm("");
    router.push("/");
  };

  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    click();
    setIsOpen(!isOpen);
  };
  const closeModal = () => {
    click();
    setIsOpen(!isOpen);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={cn(styles.header__container, "container")}>
        <Link href={'/'} className={cn(styles.header__logo, styles.logo)} onClick={onClose}>
          <Logo gomain={handleGoToMainPage} />
        </Link >
        <Modal isVisible={isOpen} close={() => setIsOpen(!isOpen)}>
          <CatalogMenu
            catalog={catalogs}
            close={closeModal}
            loading={loading}
          />
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
                placeholder={
                  inputEmpty
                    ? "Введите название товара!!!"
                    : "Искать товары и категории"
                }
                type="text"
                maxLength={100}
                id="searchInput"
                autoComplete="off"
                className={cn(styles.search__input, {
                  [styles.empty]: inputEmpty, // Добавляем класс empty, если inputEmpty равен true
                })}
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

        <MobileSearchHeader />
        <div className={styles.search__white}>
          <SearchIconWhite />
        </div>
      </div>
    </header>
  );
};

export default Header;
