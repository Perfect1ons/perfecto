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
} from "../../../../public/Icons/Icons";

// типизации и компоненты
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import MobileModal from "../MobileModal/MobileModal";
import MobileCatalog from "../MobileCatalog/MobileCatalog";
import {
  CartIconActive,
  CartIconDark,
  HomeIcon,
  HomeIconActive,
  XMark,
} from "../../../../public/Icons/Mobile_Icons";
import MobSearch from "./MobSearch";

// пропсы
export interface MobNavProps {
  catalog: ICatalogMenu;
}

export default function MobileNav({ catalog }: MobNavProps) {
  // задается state для открытия и закрытия
  const [isOpen, setIsOpen] = useState(false);

  // переключает state когда setIsOpen не равен isOpen, т.е. вкл/выкл
  const open = () => {
    setIsOpen(!isOpen);
  };

  // для того, чтобы менять иконки и стили Link-ов когда их pathname совпадает c текущей страницей
  const pathname = usePathname();

  // для отображения при пролистывании
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrollingDown(scrollTop > 20 && scrollTop > prevScrollY);
      prevScrollY = scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <MobileModal isVisible={isOpen} close={() => setIsOpen(!isOpen)}>
        <div className={styles.catalog_wrap}>
          <MobSearch isOpen={isOpen} setIsOpen={setIsOpen} />
          <MobileCatalog catalog={catalog} />
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
            onClick={() => {
              setIsOpen(false);
            }}
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

          <li className={styles.option} onClick={open}>
            {isOpen === true ? <XMark /> : <CatalogSearchIcon />}
            <span>Каталог</span>
          </li>

          <Link
            href="/favorites"
            className={styles.option}
            onClick={() => {
              setIsOpen(false);
            }}
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
            onClick={() => {
              setIsOpen(false);
            }}
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
            onClick={() => {
              setIsOpen(false);
            }}
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
