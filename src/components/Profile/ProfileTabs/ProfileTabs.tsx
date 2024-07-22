"use client";
import styles from "./style.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profileLinks } from "@/components/temporary/profileLinks";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getNotificationCount } from "@/api/clientRequest";
import cn from "clsx";

const ProfileTabs = () => {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const { userId, orders } = useContext(AuthContext);

  useEffect(() => {
    const notification = async () => {
      try {
        const notif = await getNotificationCount(userId);
        setNotificationCount(notif.length);
      } catch (error) {
        console.log(error);
      }
    };
    notification();
    const savedCart = localStorage.getItem("basket");
    const cart = savedCart ? JSON.parse(savedCart) : [];
    setCartCount(cart.length);

    const savedFavorites = localStorage.getItem("favorites");
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    setFavoritesCount(favorites.length);
  }, [userId]);
  // Обновляем count для корзины и избранного
  const updatedProfileLinks = profileLinks.map((link) => {
    if (link.href === "/profile/notification") {
      return { ...link, count: notificationCount };
    }
    if (link.href === "/profile/orders") {
      return { ...link, count: orders };
    }
    if (link.href === "/cart") {
      return { ...link, count: cartCount };
    }
    if (link.href === "/favorites") {
      return { ...link, count: favoritesCount };
    }

    return link;
  });

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
                  <span
                    className={cn(
                      styles.profile__link_count,
                      link.count <= 99 ? null : styles.profile__link_count_max
                    )}
                  >
                    {link.count > 99 ? "99+" : link.count}
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
