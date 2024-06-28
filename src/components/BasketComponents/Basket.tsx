"use client";
import cn from "clsx";
import styles from "./style.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Items } from "@/types/CardProduct/cardProduct";
import {
  CartIcon,
  GrayFavoritesIcon,
  GrayStar,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../public/Icons/Icons";
import { useState } from "react";
import { url } from "../temporary/data";
import Link from "next/link";
import CartReducerBtn from "../UI/CartReducerBtn/CartReducerBtn";
const Basket = () => {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const data = useSelector((store: RootState) => store.cart);

  return (
    <div className="container">
      {data.cart.length === 0 ? (
        <section className={cn(styles.section)}>
          <div className={styles.content}>
            <div
              className={cn("mascot_sprite", "mascot_sprite_empty_cart")}
            ></div>
            <div className={styles.content_text}>
              <h3 className={styles.content_text_h3}>
                К сожалению ваша корзина пуста
              </h3>
              <p>
                Добавляйте понравившиеся товары в корзину
                <br />
                или авторизуйтесь, если добавляли ранее
              </p>
            </div>
          </div>
          <Link href="/cart/catalog" className={styles.linkToMain}>
            Перейти в каталог AbdulAziz
          </Link>
          <Link href="/" className={styles.linkToMain}>
            Перейти на главную
          </Link>
        </section>
      ) : (
        <div>
          <div>
            <h1>Корзина</h1>
          </div>
          {data.cart.map((item) => {
            const totalPrice = item.cenaok * (item?.quantity ?? 1);
            return (
              <div key={item.id_tov} className="default__card_column">
                <div className="default__card_column_right">
                  <div className="default__card_images_column">
                    <Image
                      className="default__card_image_column"
                      src={
                        item.photos[0]?.url_part.startsWith("https://goods")
                          ? `${item.photos[0]?.url_part}280.jpg`
                          : item.photos[0]?.url_part.startsWith("https://")
                          ? item.photos[0]?.url_part
                          : `${url}nal/img/${item.id_post}/l_${item.photos[0]?.url_part}`
                      }
                      width={200}
                      height={200}
                      alt={item.naim}
                      quality={100}
                      loading="lazy"
                    />
                  </div>
                  <div className="default__card_info_column">
                    <h2 className="default__card_name_column">{item.naim}</h2>
                    <p className="card__column_id">Код: {item.id_tov}</p>
                    <div className="ocenka_column">
                      {[...Array(5)].map((_, index) => (
                        <span key={index}>
                          {index < rating ? <YellowStar /> : <GrayStar />}
                        </span>
                      ))}
                    </div>
                    <div className="ddos__column">
                      <Image
                        src={`${url}images/delivery_icon.svg`}
                        width={20}
                        height={20}
                        alt="delivery_icon"
                      />
                      <p className="ddos__text_column">{item.ddos}</p>
                    </div>
                  </div>
                </div>
                <div className="default__card_buttons_column">
                  <div className="default__card_buttons_column_price">
                    <span className="default__card_price">
                      {totalPrice.toLocaleString("ru-RU")}

                      <span className="default__card_price_custom"> с</span>
                    </span>
                    <button
                      title="Добавить в избранное"
                      className={cn("add__to_fav", {
                        ["add__to_fav_active"]: isFavorite,
                      })}
                    >
                      <span className="add__to_fav_icon">
                        {isFavorite ? (
                          <VioletFavoritesIcon />
                        ) : (
                          <GrayFavoritesIcon />
                        )}
                      </span>
                    </button>
                  </div>

                  {item.minQty > 1 ? (
                    <h3 className="minimal__items">
                      минимальное количество к заказу от {item.minQty} шт.
                    </h3>
                  ) : null}
                  <div className="add__to_cart_column">
                    <button
                      title="Добавить в корзину"
                      className="add__to_cart_column_button"
                      onClick={() => console.log("Добавлено в корзину")}
                    >
                      Количество товара
                    </button>
                    <button className="add__to_cart_column_button column_buy">
                      {item.quantity}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Basket;
