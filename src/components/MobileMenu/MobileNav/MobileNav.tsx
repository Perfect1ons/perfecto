"use client";
import Link from "next/link";
import { useState } from "react";

import styles from "./style.module.scss";
import cn from "clsx";
import {
  AuthIconDark,
  CartIconDark,
  FavoritesIconDark,
  HomeIcon,
} from "../../../../public/Icons/Icons";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className={styles.section}>
      <ul className={styles.ul}>
        <Link href="/" className={styles.option}>
          <HomeIcon />
          <span className={styles.option_span}>Главная</span>
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
          Каталог
        </li>

        <Link href="/favorites" className={styles.option}>
          <FavoritesIconDark />
          <span className={styles.option_span}>Избранные</span>
        </Link>

        <Link href="/cart" className={styles.option}>
          <CartIconDark />
          <span className={styles.option_span}>Корзинка</span>
        </Link>

        <li className={styles.option}>
          <AuthIconDark />
          <span className={styles.option_span}>Профиль</span>
        </li>
      </ul>
    </section>
  );
}
