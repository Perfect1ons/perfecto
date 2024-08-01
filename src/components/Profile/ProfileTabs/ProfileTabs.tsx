"use client";
import styles from "./style.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useContext, useEffect, useState, useMemo } from "react";
import { INotifications } from "@/types/Profile/Notifications/notifications";
import { AuthContext } from "@/context/AuthContext";
import { profileLinks } from "@/components/temporary/profileLinks";
import { CurrentOrdersType } from "@/types/Profile/CurrentOrders";

interface IProfileTabsProps {
  notifCount: INotifications;
  orders: CurrentOrdersType;
}

const ProfileTabs = ({ notifCount, orders }: IProfileTabsProps) => {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const savedCart = localStorage.getItem("basket");
    const cart = savedCart ? JSON.parse(savedCart) : [];
    setCartCount(cart.length);

    const savedFavorites = localStorage.getItem("favorites");
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    setFavoritesCount(favorites.length);
  }, [userId]);

  const updatedProfileLinks = useMemo(() => {
    return profileLinks.map((link) => {
      if (link.href === "/profile/notification") {
        return { ...link, count: notifCount.length };
      }
      if (link.href === "/profile/orders") {
        return { ...link, count: orders.items.length };
      }
      if (link.href === "/cart") {
        return { ...link, count: cartCount };
      }
      if (link.href === "/favorites") {
        return { ...link, count: favoritesCount };
      }
      return link;
    });
  }, [notifCount.length, orders.items.length, cartCount, favoritesCount]);

  return (
    <div className={styles.profile__tabs_container}>
      <div className={"container"}>
        <nav className={styles.profile__tabs}>
          {updatedProfileLinks.map((link) => {
            return (
              <Link
                className={clsx(
                  "link",
                  styles.profile__link,
                  pathname === link.href && styles.profile__link_active
                )}
                key={link.id}
                href={link.href}
              >
                {link.count !== undefined && link.count > 0 && (
                  <span className={styles.profile__link_count}>
                    {link.count}
                  </span>
                )}
                {link.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default ProfileTabs;
