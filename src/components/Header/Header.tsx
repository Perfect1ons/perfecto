"use client";
import { useEffect, useRef, useState } from "react";
import HeaderNav from "./HeaderNav/HeaderNav";
import { SearchIconAbdu, SearchIconWhite } from "../../../public/Icons/Icons";
import Logo from "../Logo/Logo";
import cn from "clsx";
import styles from "./style.module.scss";
import Modal from "../UI/ModalHeaders/Modal/Modal";
import { useRouter } from "next/navigation";
import MobileSearchHeader from "./MobileSearchHeader/MobileSearchHeader";
import CatalogMenu from "../CatalogComponents/CatalogMenu/CatalogMenu";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import Link from "next/link";
import HeaderSearch from "./HeaderSearch/HeaderSearch";

export interface ICatalogProps {
  catalogs: ICatalogMenu | undefined;
  click: () => void;
  loading: boolean;
  setMobileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileModalOpen: boolean;
}

export interface UserCoordinates {
  latitude: number;
  longitude: number;
}

const Header = ({
  catalogs,
  click,
  loading,
  isMobileModalOpen,
  setMobileModalOpen,
}: ICatalogProps) => {
  //! Функционал и стейты для быстрого в Header
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchIconClick = () => {
    if (searchInputRef.current) {
      if (searchValue) {
        handleSubmit();
      } else {
        searchInputRef.current.focus();
      }
    }
  };

  const handleSubmit = () => {
    window.location.href = `/seek/search=${searchValue}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  //! Функционал и стейты для быстрого в Header

  const [searchTerm, setSearchTerm] = useState("");
  const [inputEmpty, setInputEmpty] = useState(false);

  const router = useRouter();

  // для поиска
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

  // перекидывание на главную
  const handleGoToMainPage = () => {
    setSearchTerm("");
    router.push("/");
  };

  // открытие и закрытие
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

  // переключает state когда setMobileModalOpen не равен isOpen, т.е. вкл/выкл. Отправляет fetch запрос по клику
  const openMobileModal = () => {
    setMobileModalOpen(!isMobileModalOpen);
    click();
    scrollLockBlock();
  };

  // для блокировки скролла на главной при открытой модалке
  const scrollLockBlock = () => {
    const body = document.body;
    if (body) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (body.style.overflow === "hidden") {
        body.style.paddingRight = "";
        body.style.overflow = "auto";
        window.scrollTo(0, parseInt(body.style.top || "0", 10) * -1);
        body.style.top = "";
      } else {
        body.style.paddingRight = `${scrollBarWidth}px`;
        body.style.overflow = "hidden";
        body.style.top = `-${window.scrollY}px`;
      }
    }
  };

  useEffect(() => {
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
      body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = body.style.top;
      body.style.paddingRight = "";
      body.style.overflow = "auto";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      body.style.top = "";
    }
  }, [isOpen]);

  return (
    <div className={styles.header}>
      <div className={cn(styles.header__container, "container")}>
        <Link
          href={"/"}
          className={cn(styles.header__logo, styles.logo)}
          onClick={onClose}
        >
          <Logo gomain={handleGoToMainPage} />
        </Link>

        <Modal isVisible={isOpen} close={open}>
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
            <HeaderSearch
              searchInputRef={searchInputRef}
              onInputChange={handleChange}
              searchValue={searchValue}
            />
            <div
              className={cn("header__search_icon", styles.search_icon)}
              onClick={handleSearchIconClick}
            >
              <SearchIconAbdu />
            </div>
          </div>

          <div className={styles.header__nav} onClick={onClose}>
            <HeaderNav />
          </div>
        </div>

        <MobileSearchHeader />
        <div className={styles.search__white} onClick={openMobileModal}>
          <SearchIconWhite />
        </div>
      </div>
    </div>
  );
};

export default Header;
