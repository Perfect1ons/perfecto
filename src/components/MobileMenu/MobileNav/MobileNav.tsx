"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

// импорты стилей и иконок
import styles from "./style.module.scss";
import cn from "clsx";
import {
  AuthIconActive,
  AuthIconDark,
  CartIconActive,
  CartIconDark,
  CatalogSearchIcon,
  FavoritesIconActive,
  FavoritesIconDark,
  HomeIcon,
  HomeIconActive,
  SearchIcon,
  XMark,
} from "../../../../public/Icons/Icons";

// типизации и компоненты
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import MobileModal from "../MobileModal/MobileModal";
import MobileCatalog from "../MobileCatalog/MobileCatalog";

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

  return (
    <>
      <MobileModal isVisible={isOpen} close={() => setIsOpen(!isOpen)}>
        <div className={styles.catalog_wrap}>
          <div className={styles.search_bar}>
            <input
              placeholder="Поиск товаров"
              type="text"
              id="searchInput"
              className={styles.search__input}
            />
            <label htmlFor="searchInput" className={styles.search__icon}>
              <SearchIcon />
            </label>
          </div>

          <MobileCatalog catalog={catalog} />
        </div>
      </MobileModal>

      <section className={styles.mobile_menu}>
        <ul className={styles.ul}>
          <Link href="/" className={styles.option}>
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

          <Link href="/favorites" className={styles.option}>
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

          <Link href="/cart" className={styles.option}>
            {pathname === "/cart" ? <CartIconActive /> : <CartIconDark />}
            <span
              className={
                pathname === "/cart"
                  ? `${cn(styles.option_span, styles.optionSpan_active)}`
                  : styles.option
              }
            >
              Корзинка
            </span>
          </Link>

          <Link href="/auth" className={styles.option}>
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
