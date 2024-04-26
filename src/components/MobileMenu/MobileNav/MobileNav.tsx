"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

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
import MobileCatalog from "../MobileCatalog/MobileCatalog";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  return (
    <section className={styles.section}>
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
          <MobileCatalog isOpen={isOpen} setOpen={setIsOpen} />
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
