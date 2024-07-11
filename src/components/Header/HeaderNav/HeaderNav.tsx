"use client";
import styles from "./style.module.scss";
import {
  AuthIcon,
  CartIcon,
  FavoritesIcon,
} from "../../../../public/Icons/Icons";
import { useState, useEffect, useMemo, useCallback } from "react";
import cn from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthModal from "@/components/AuthModal/AuthModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ILinks {
  href: string;
  title: string;
  id: number;
  icon: React.ReactNode;
  count?: number;
}

const navLinks: ILinks[] = [
  {
    href: "/favorites",
    title: "Избранное",
    id: 1,
    icon: <FavoritesIcon />,
    count: 0,
  },
  { href: "/auth", title: "Войти", id: 2, icon: <AuthIcon /> },
  { href: "/profile", title: "Профиль", id: 4, icon: <AuthIcon /> },
  { href: "/cart", title: "Корзина", id: 3, icon: <CartIcon />, count: 0 },
];

const HeaderNav = () => {
  const [isAuthVisible, setAuthVisible] = useState(false);
  const [isAuthed, setAuthed] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const pathname = usePathname();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const openAuthModal = () => setAuthVisible(true);
  const closeModals = () => setAuthVisible(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      setFavorites(storedFavorites);
    }
  }, []);

  const totalItemsInCart = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  }, [cart]);

  const links = useMemo(() => {
    return navLinks.map((link) => {
      if (link.href === "/favorites") {
        return { ...link, count: favorites.length };
      } else if (link.href === "/cart") {
        return { ...link, count: totalItemsInCart };
      }
      return link;
    });
  }, [favorites.length, totalItemsInCart]);

  const updateAuthStatus = useCallback(() => {
    if (typeof window !== "undefined") {
      const authStatus = localStorage.getItem("isAuthed") === "true";
      setAuthed(authStatus);
    }
  }, []);

  useEffect(() => {
    updateAuthStatus();

    window.addEventListener("favoritesUpdated", updateAuthStatus);
    window.addEventListener("cartUpdated", updateAuthStatus);

    return () => {
      window.removeEventListener("favoritesUpdated", updateAuthStatus);
      window.removeEventListener("cartUpdated", updateAuthStatus);
    };
  }, [updateAuthStatus]);

  return (
    <nav className={styles.nav}>
      <AuthModal isVisible={isAuthVisible} close={closeModals} />

      {links.map((link) =>
        link.href === "/auth" && !isAuthed ? (
          <div
            key={link.id}
            className={cn(
              styles.nav__link,
              pathname === link.href && styles.active
            )}
            onClick={openAuthModal}
          >
            <div className={styles.nav__link_items}>
              <div className={styles.nav__link_items_icon}>{link.icon}</div>
              <p className={styles.nav__link_items_title}>{link.title}</p>
            </div>
          </div>
        ) : link.href === "/favorites" ? (
          <div
            key={link.id}
            className={cn(
              styles.nav__link,
              pathname === link.href && styles.active
            )}
            onClick={() => {
              if (!isAuthed) {
                setAuthVisible(true);
              } else {
                window.location.href = link.href;
              }
            }}
          >
            <div className={styles.nav__link_items}>
              <div className={styles.nav__link_items_icon}>
                {link.icon}
                {link.count !== undefined && link.count > 0 && (
                  <span
                    className={cn(
                      styles.nav__link_items_count,
                      link.count <= 99 ? null : styles.nav__link_items_count_max
                    )}
                  >
                    {link.count <= 99 ? link.count : "99+"}
                  </span>
                )}
              </div>
              <p className={styles.nav__link_items_title}>{link.title}</p>
            </div>
          </div>
        ) : link.href === "/profile" && isAuthed ? (
          <Link
            href={link.href}
            className={cn(
              styles.nav__link,
              pathname === link.href && styles.active
            )}
            key={link.id}
          >
            <div className={styles.nav__link_items}>
              <div className={styles.nav__link_items_icon}>{link.icon}</div>
              <p className={styles.nav__link_items_title}>{link.title}</p>
            </div>
          </Link>
        ) : link.href === "/cart" ? (
          <Link
            href={link.href}
            className={cn(
              styles.nav__link,
              pathname === link.href && styles.active
            )}
            key={link.id}
          >
            <div className={styles.nav__link_items}>
              <div className={styles.nav__link_items_icon}>
                {link.icon}
                {link.count !== undefined && link.count > 0 && (
                  <span
                    className={cn(
                      styles.nav__link_items_count,
                      link.count <= 99 ? null : styles.nav__link_items_count_max
                    )}
                  >
                    {link.count <= 99 ? link.count : "99+"}
                  </span>
                )}
              </div>
              <p className={styles.nav__link_items_title}>{link.title}</p>
            </div>
          </Link>
        ) : null
      )}
    </nav>
  );
};

export default HeaderNav;
