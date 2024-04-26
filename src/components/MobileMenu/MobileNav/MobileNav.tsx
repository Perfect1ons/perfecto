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
  FavoritesIconActive,
  FavoritesIconDark,
  HomeIcon,
  HomeIconActive,
} from "../../../../public/Icons/Icons";

// типизации и компоненты
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import MobileModal from "../MobileModal/MobileModal";

// пропсы
interface MobNavProps {
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
    <section className={styles.section}>
      <MobileModal isVisible={isOpen} close={() => setIsOpen(!isOpen)}>
        <div>its here</div>
      </MobileModal>

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
          <button
            className={cn(styles.mod_hamburger, "hamburger", "hamburger_3dy", {
              ["is_active"]: isOpen,
            })}
            type="button"
          >
            <span className="hamburger_box">
              <span className="hamburger_inner"></span>
            </span>
          </button>
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
  );
}
