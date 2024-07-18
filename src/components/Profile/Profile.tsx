"use client";
import Link from "next/link";
import styles from "./style.module.scss";
import clsx from "clsx";
import { SettingsIcons } from "../../../public/Icons/Icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ICard } from "@/types/Card/card";
import { Item } from "@/types/OrdersHistory/OrdersHistory";
import { UserPersonalDataType } from "@/types/Profile/PersonalData";
import OrderHistoryCard from "./ProfileCards/OrderHistoryCard";
import FavoritesCard from "./ProfileCards/FavoritesCard";
import BasketCard from "./ProfileCards/BasketCard";
import NotificationCard from "./ProfileCards/NotificationCard";
import OrderCard from "./ProfileCards/OrderCard";
import { CurrentOrdersType } from "@/types/Profile/CurrentOrders";

interface IProfileProps {
  history: Item[];
  data: UserPersonalDataType;
  orders: CurrentOrdersType
}


const Profile = ({ history, data, orders }: IProfileProps) => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "DELETE",
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log("An error occurred");
    }
  };

  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cart, setCart] = useState<ICard[]>([]);
  const [favorites, setFavorites] = useState<ICard[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("basket");
    const cartItems: ICard[] = savedCart ? JSON.parse(savedCart) : [];
    setCart(cartItems);
    setCartCount(cartItems.length);

    const savedFavorites = localStorage.getItem("favorites");
    const favoriteItems: ICard[] = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
    setFavorites(favoriteItems);
    setFavoritesCount(favoriteItems.length);
  }, []);
  return (
    <section className={styles.profile}>
      <div className="container">
        <div className={styles.profile__cards}>
          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <Image
                  className={styles.profile__img}
                  src={"/img/userPhoto.png"}
                  width={60}
                  height={60}
                  alt="clipboard"
                  quality={100}
                />
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>
                  {data.fio} {data.name}
                </p>
                <p className={styles.phone}>
                  <span>т.</span>
                  <span className={styles.phone__number}>{`+${data.tel}`}</span>
                </p>
                <p className={styles.city}>
                  <span>г.</span>
                  <span className={styles.city__name}>
                    {data.id_city}, {data.adres} {data.org}
                  </span>
                </p>
              </div>
            </div>

            <div className={styles.profile__userInfo_footer}>
              <button onClick={handleLogout} className={styles.profile__exit}>
                Выйти
              </button>
              <Link
                className={clsx("link", styles.profile__settings)}
                href={"/profile/lk"}
              >
                <SettingsIcons />
                <span>Личные данные</span>
              </Link>
            </div>
          </div>

          <OrderCard orders={orders} />
          <OrderHistoryCard history={history} />
          <NotificationCard />
          <BasketCard cartCount={cartCount} cart={cart} />
          <FavoritesCard
            favoritesCount={favoritesCount}
            favorites={favorites}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
