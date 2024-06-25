"use client";
import styles from "./style.module.scss";
import {
  AuthIcon,
  CartIcon,
  FavoritesIcon,
} from "../../../../public/Icons/Icons";
import { useState, useEffect } from "react";
import cn from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthModal from "@/components/AuthModal/AuthModal";

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
    title: "Избранные",
    id: 1,
    icon: <FavoritesIcon />,
    count: 0,
  },
  { href: "/auth", title: "Войти", id: 2, icon: <AuthIcon /> },
  { href: "/cart", title: "Корзина", id: 3, icon: <CartIcon />, count: 0 },
];

const HeaderNav = () => {
  const [isAuthVisible, setAuthVisible] = useState(false);
  const [links, setLinks] = useState(navLinks);

  const openAuthModal = () => setAuthVisible(true);
  const closeModals = () => setAuthVisible(false);

  const pathname = usePathname();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    setLinks((prevLinks) =>
      prevLinks.map((link) => {
        if (link.href === "/favorites") {
          return { ...link, count: favorites.length };
        } else if (link.href === "/cart") {
          return { ...link, count: cart.length };
        }
        return link;
      })
    );
  }, []);

  return (
    <nav className={styles.nav}>
      <AuthModal isVisible={isAuthVisible} close={closeModals} />

      {links.map((link) =>
        link.href === "/auth" ? (
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
              <h6 className={styles.nav__link_items_title}>{link.title}</h6>
            </div>
          </div>
        ) : (
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
                  <span className={styles.nav__link_items_count}>
                    {link.count}
                  </span>
                )}
              </div>
              <h6 className={styles.nav__link_items_title}>{link.title}</h6>
            </div>
          </Link>
        )
      )}
    </nav>
  );
};

export default HeaderNav;
