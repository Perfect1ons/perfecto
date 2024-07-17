"use client";

import Link from "next/link";
import styles from "./style.module.scss";
import clsx from "clsx";
import { SettingsIcons } from "../../../public/Icons/Icons";
import UserNotification from "./UserNotification/UserNotification";
import Image from "next/image";
import { UserPersonalDataType } from "@/types/Profile/PersonalData";
import { useEffect, useState } from "react";
import { ICard } from "@/types/Card/card";
import { url } from "../temporary/data";

interface IProfileProps {
  data: UserPersonalDataType;
}

const Profile = ({ data }: IProfileProps) => {
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
  const [cart, setCart] = useState<ICard[]>();
  const [favorites, setFavorites] = useState<ICard[]>();

  const [images, setImages] = useState<string[]>();

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

          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <Image
                  src={"/img/orderclipboard.svg"}
                  width={45}
                  height={45}
                  alt="clipboard"
                />
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>Текущие заказы</p>
                <p className={styles.orders}>
                  У вас <span className={styles.orders__count}>3</span> активных
                  заказов
                </p>
              </div>
            </div>
            <div className={styles.orders__images}>
              <div className={styles.orders__images}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className={styles.orders__img}>
                    <span>order</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <Image
                  src={"/img/orderhistory.svg"}
                  width={45}
                  height={45}
                  alt="clipboard"
                />
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>История заказов</p>

                <p className={styles.orders}>
                  Всего <span className={styles.orders__count}> 23</span>{" "}
                  заказов
                </p>
              </div>
            </div>
            <div className={styles.orders__images}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={styles.orders__img}>
                  <span>order</span>
                </div>
              ))}
              <div className={styles.orders__img}>
                <span>Еще 19...</span>
              </div>
            </div>
          </div>

          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <Image
                  src={"/img/ordernotif.svg"}
                  width={45}
                  height={45}
                  alt="clipboard"
                />
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>Уведомления</p>
                <p className={styles.orders}>
                  У вас <span className={styles.orders__count}>1</span>{" "}
                  уведомление
                </p>
              </div>
            </div>
            <div className={styles.profile__userInfo_footer}>
              <span></span>
              <Link
                className={clsx("link", styles.profile__settings)}
                href={"/profile/notification?type=notification"}
              >
                <SettingsIcons />
                <span>Настроить уведомления</span>
              </Link>
            </div>
          </div>

          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <Image
                  src={"/img/orderbag.svg"}
                  width={45}
                  height={45}
                  alt="clipboard"
                />
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>Корзина</p>
                {cartCount <= 0 ? (
                  <p className={styles.orders}>Товаров в корзине нет</p>
                ) : (
                  <p className={styles.orders}>
                    В корзине{" "}
                    <span className={styles.orders__count}>{cartCount}</span>{" "}
                    {cartCount % 10 === 1 && cartCount % 100 !== 11
                      ? "товар"
                      : cartCount % 10 >= 2 &&
                        cartCount % 10 <= 4 &&
                        !(cartCount % 100 >= 12 && cartCount % 100 <= 14)
                      ? "товара"
                      : "товаров"}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.orders__images}>
              {cart && cart?.length > 0 ? (
                <>
                  {cart &&
                    cart.slice(0, 3).map((data) => {
                      const imageUrl =
                        data.photos.length > 0
                          ? data.photos[0]?.url_part.startsWith("https://goods")
                            ? `${data.photos[0]?.url_part}280.jpg`
                            : data.photos[0]?.url_part.startsWith("https://")
                            ? data.photos[0]?.url_part
                            : `${url}nal/img/${data.id_post}/l_${data.photos[0]?.url_part}`
                          : "/img/noPhoto.svg";
                      return (
                        <Link
                          href={`/item/${data.id_tov}/${data.url}`}
                          key={data.id}
                          className={styles.orders__imageContainer}
                        >
                          <Image
                            className={styles.orders__imageContainer__image}
                            width={100}
                            height={100}
                            alt=""
                            src={imageUrl}
                          />
                        </Link>
                      );
                    })}
                  {cart && cart.length > 3 && (
                    <Link href="/cart" className={styles.profile__showMore}>
                      Ещё {cart.length - 3}
                    </Link>
                  )}
                </>
              ) : (
                <div className={styles.orders__images__toCatalog}>
                  <button className={styles.profile__exit}>
                    Перейти в каталог
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <Image
                  src={"/img/orderfav.svg"}
                  width={40}
                  height={40}
                  alt="clipboard"
                />
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>Избранное</p>
                {favoritesCount <= 0 ? (
                  <p className={styles.orders}>
                    Товаров в избранном нет
                    <br />
                    Добавляйте товары в избранное, <br /> чтобы долго не искать
                  </p>
                ) : (
                  <p className={styles.orders}>
                    В избранном{" "}
                    <span className={styles.orders__count}>
                      {favoritesCount}
                    </span>{" "}
                    {favoritesCount % 10 === 1 && favoritesCount % 100 !== 11
                      ? "товар"
                      : favoritesCount % 10 >= 2 &&
                        favoritesCount % 10 <= 4 &&
                        !(
                          favoritesCount % 100 >= 12 &&
                          favoritesCount % 100 <= 14
                        )
                      ? "товара"
                      : "товаров"}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.profile__userInfo_footer}>
              <div className={styles.orders__images}>
                {favorites && favorites?.length > 0 ? (
                  <>
                    {favorites &&
                      favorites.slice(0, 3).map((data) => {
                        const imageUrl =
                          data.photos.length > 0
                            ? data.photos[0]?.url_part.startsWith(
                                "https://goods"
                              )
                              ? `${data.photos[0]?.url_part}280.jpg`
                              : data.photos[0]?.url_part.startsWith("https://")
                              ? data.photos[0]?.url_part
                              : `${url}nal/img/${data.id_post}/l_${data.photos[0]?.url_part}`
                            : "/img/noPhoto.svg";
                        return (
                          <Link
                            href={`/item/${data.id_tov}/${data.url}`}
                            key={data.id}
                            className={styles.orders__imageContainer}
                          >
                            <Image
                              className={styles.orders__imageContainer__image}
                              width={100}
                              height={100}
                              alt=""
                              src={imageUrl}
                            />
                          </Link>
                        );
                      })}
                    {favorites && favorites.length > 3 && (
                      <Link
                        href="/favorites"
                        className={styles.profile__showMore}
                      >
                        Ещё {favorites.length - 3}
                      </Link>
                    )}
                  </>
                ) : (
                  <div className={styles.orders__images__toCatalog}>
                    <button className={styles.profile__exit}>
                      Перейти в каталог
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <UserNotification />
      </div>
    </section>
  );
};

export default Profile;
