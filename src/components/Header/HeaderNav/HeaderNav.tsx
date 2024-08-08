"use client";
import { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import cn from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthModal from "@/components/AuthModal/AuthModal";
import { AuthContext } from "@/context/AuthContext";
import {
  AuthIcon,
  BellIcon,
  CartIcon,
  FavoritesIcon,
} from "../../../../public/Icons/Icons";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

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
  { href: "/profile", title: "Профиль", id: 4, icon: <AuthIcon />, count: 0 },
  { href: "/cart", title: "Корзина", id: 3, icon: <CartIcon />, count: 0 },
];

interface IHeaderNav {
  isAuthed: boolean;
}

const HeaderNav = ({ isAuthed }: IHeaderNav) => {
  const [isAuthVisible, setAuthVisible] = useState(false);
  const [authStatus, setAuthStatus] = useState<boolean>(isAuthed);
  const [links, setLinks] = useState(navLinks);
  const pathname = usePathname();
  const { notif } = useContext(AuthContext);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const openAuthModal = () => setAuthVisible(true);
  const closeModals = () => setAuthVisible(false);
  const addToFavorite = () => setAuthVisible(false);

  const updateCounts = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const baskets = JSON.parse(localStorage.getItem("basket") || "[]");

    setLinks((prevLinks) =>
      prevLinks.map((link) => {
        if (link.href === "/favorites") {
          return { ...link, count: authStatus ? favorites.length : 0 };
        }
        if (link.href === "/profile") {
          return { ...link, count: notif };
        }
        if (link.href === "/cart") {
          return { ...link, count: baskets.length };
        }
        return link;
      })
    );
  };

  useEffect(() => {
    updateCounts();

    const favoritesListener = () => updateCounts();
    const cartListener = () => updateCounts();

    window.addEventListener("favoritesUpdated", favoritesListener);
    window.addEventListener("cartUpdated", cartListener);

    return () => {
      window.removeEventListener("favoritesUpdated", favoritesListener);
      window.removeEventListener("cartUpdated", cartListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notif, authStatus, isAuthed, cart]);

  return (
    <nav className={styles.nav}>
      <AuthModal isVisible={isAuthVisible} close={closeModals} />

      {links.map((link) =>
        link.href === "/auth" && !authStatus ? (
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
              if (!authStatus) {
                setAuthVisible(true);
              } else {
                window.location.href = link.href;
              }
            }}
          >
            <div className={styles.nav__link_items}>
              <div className={styles.nav__link_items_icon}>
                {link.icon}
                {authStatus && link.count !== undefined && link.count > 0 && (
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
        ) : link.href === "/profile" && authStatus ? (
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
                  <span className={cn(styles.nav__link_items_countBell)}>
                    {<BellIcon />}
                  </span>
                )}
              </div>
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
