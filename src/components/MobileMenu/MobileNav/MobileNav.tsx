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
import { getCatalogsMenu } from "@/api/requests";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

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

  const [catalogData, setCatalogData] = useState<ICatalogMenu | null>(null);
  const handleCatalogClick = async () => {
    try {
      const response: ICatalogMenu = await getCatalogsMenu();
      setCatalogData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <MobileModal isVisible={isOpen} close={open}>
        <div className={styles.catalog_wrap}>
          <MobSearch isOpen={isOpen} setIsOpen={setIsOpen} />
          <MobileCatalog catalog={catalogData} closeMain={open} />
        </div>
      </MobileModal>

      <section
        className={cn(
          styles.mobile_menu,
          `${isScrollingDown ? styles.scrolled : ""}`
        )}
      >
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
              Корзина
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
