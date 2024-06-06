"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// импорты стилей и иконок
import styles from "./style.module.scss";
import cn from "clsx";
import {
  AuthIconActive,
  AuthIconDark,
  CatalogSearchIcon,
  FavoritesIconActive,
  FavoritesIconDark,
  CartIconActive,
  CartIconDark,
  HomeIcon,
  HomeIconActive,
  XMark,
} from "../../../../public/Icons/Icons";

// типизации и компоненты
import MobileModal from "../MobileModal/MobileModal";
import MobileCatalog from "../MobileCatalog/MobileCatalog";
import MobSearch from "./MobSearch";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";

export interface ICatalogProps {
  catalogs: ICatalogMenu | undefined;
  click: () => void;
  loading: boolean;
  isMobileModalOpen: boolean;
  setMobileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileNav({
  catalogs,
  click,
  loading,
  isMobileModalOpen,
  setMobileModalOpen,
}: ICatalogProps) {
  // переключает state когда setMobileModalOpen не равен isOpen, т.е. вкл/выкл
  const openMobileModal = () => {
    setMobileModalOpen(!isMobileModalOpen);
    click();
  };

  // для того, чтобы менять иконки и стили Link-ов когда их pathname совпадает c текущей страницей
  const pathname = usePathname();

  // для отображения при пролистывании
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      if (pathname.startsWith("/item")) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrollingDown(scrollTop > 20 && scrollTop > prevScrollY);
      prevScrollY = scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <>
      <MobileModal isVisible={isMobileModalOpen}>
        <div className={styles.catalog_wrap}>
          <MobSearch
            isOpen={isMobileModalOpen}
            setIsOpen={setMobileModalOpen}
          />
          <MobileCatalog
            catalogs={catalogs}
            closeMain={openMobileModal}
            loading={loading}
          />
        </div>
      </MobileModal>

      <section
        className={cn(
          styles.mobile_menu,
          `${isScrollingDown ? styles.scrolled : ""}`
        )}
      >
        <ul className={styles.ul}>
          <Link
            href="/"
            className={styles.option}
            onClick={() => setMobileModalOpen(false)}
          >
            {pathname === "/" ? <HomeIconActive /> : <HomeIcon />}
            <span
              className={
                pathname === "/"
                  ? `${cn(styles.option_span, styles.optionSpan_active)}`
                  : styles.option
              }
            >
              Главная
            </span>
          </Link>

          <li className={styles.option} onClick={openMobileModal}>
            <div className={styles.option} onClick={() => click()}>
              <span className={styles.option__icon}>
                {isMobileModalOpen === true ? <XMark /> : <CatalogSearchIcon />}
              </span>
              <span>Каталог</span>
            </div>
          </li>

          <Link
            href="/favorites"
            className={styles.option}
            onClick={() => setMobileModalOpen(false)}
          >
            {pathname === "/favorites" ? (
              <FavoritesIconActive />
            ) : (
              <FavoritesIconDark />
            )}
            <span
              className={
                pathname === "/favorites"
                  ? `${cn(styles.option_span, styles.optionSpan_active)}`
                  : styles.option
              }
            >
              Избранные
            </span>
          </Link>

          <Link
            href="/cart"
            className={styles.option}
            onClick={() => setMobileModalOpen(false)}
          >
            {pathname === "/cart" ? <CartIconActive /> : <CartIconDark />}
            <span
              className={
                pathname === "/cart"
                  ? `${cn(styles.option_span, styles.optionSpan_active)}`
                  : styles.option
              }
            >
              Корзина
            </span>
          </Link>

          <Link
            href="/auth"
            className={styles.option}
            onClick={() => setMobileModalOpen(false)}
          >
            {pathname === "/auth" ? <AuthIconActive /> : <AuthIconDark />}
            <span
              className={
                pathname === "/auth"
                  ? `${cn(styles.option_span, styles.optionSpan_active)}`
                  : styles.option
              }
            >
              Профиль
            </span>
          </Link>
        </ul>
      </section>
    </>
  );
}
