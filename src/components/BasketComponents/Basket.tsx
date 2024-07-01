"use client";
import { useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  GrayFavoritesIcon,
  GrayStar,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../public/Icons/Icons";
import { url } from "../temporary/data";
import Link from "next/link";
import CartReducerBtn from "../UI/CartReducerBtn/CartReducerBtn";
import { clearCart } from "@/store/reducers/cart.reducer";

const Basket = () => {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const data = useSelector((store: RootState) => store.cart);

  const dispatch = useDispatch();

  const [added, setAdded] = useState(false);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const [allItemsSelected, setAllItemsSelected] = useState(false); // State to track if all items are selected

  const handleToggleAllItems = () => {
    setAllItemsSelected(!allItemsSelected);
  };

  const handleCartEmpty = () => {
    setAdded(false);
  };

  //cleart cart function
  const handleClearCart = () => {
    // dispath for clear cart
    dispatch(clearCart());
    setAllItemsSelected(false);
  };

  return (
    <div className="container">
      {data.cart.length <= 0 ? (
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
          <Link href="/" className={styles.linkToMain}>
            Перейти на главную
          </Link>
        </section>
      ) : (
        <div>
          <div className={styles.control}>
            <h1 className={styles.basketTilte}>Корзина</h1>
            {/* Checkbox to toggle all items selection */}
            <input
              type="checkbox"
              checked={allItemsSelected}
              onChange={handleToggleAllItems}
            />
            Выбрать все товары
          </div>
          {data.cart.map((item) => {
            const totalPrice = item.cenaok * (item?.quantity ?? 1);
            const imageUrl =
              item.photos.length > 0
                ? item.photos[0]?.url_part.startsWith("https://goods")
                  ? `${item.photos[0]?.url_part}280.jpg`
                  : item.photos[0]?.url_part.startsWith("https://")
                  ? item.photos[0]?.url_part
                  : `${url}nal/img/${item.id_post}/l_${item.photos[0]?.url_part}`
                : "/img/noPhoto.svg";
            return (
              <div key={item.id_tov} className={styles.default__card_column}>
                <div className={styles.default__card_column_right}>
                  <div className={styles.default__card_images_column}>
                    <Image
                      className={styles.default__card_image_column}
                      src={imageUrl}
                      width={200}
                      height={200}
                      alt={item.naim}
                      quality={100}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.default__card_info_column}>
                    <h2 className={styles.default__card_name_column}>
                      {item.naim}
                    </h2>
                    <p className={styles.card__column_id}>Код: {item.id_tov}</p>
                    <div className={styles.ocenka_column}>
                      {[...Array(5)].map((_, index) => (
                        <span key={index}>
                          {index < rating ? <YellowStar /> : <GrayStar />}
                        </span>
                      ))}
                    </div>
                    <div className={styles.ddos__column}>
                      <Image
                        src={`${url}images/delivery_icon.svg`}
                        width={20}
                        height={20}
                        alt="delivery_icon"
                      />
                      <p className={styles.ddos__text_column}>{item.ddos}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.default__card_buttons_column}>
                  <div className={styles.default__card_buttons_column_price}>
                    <span className={styles.default__card_price}>
                      {totalPrice.toLocaleString("ru-RU")}
                      <span className={styles.default__card_price_custom}>
                        {" "}
                        с
                      </span>
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
                    <h3 className={styles.minimal__items}>
                      минимальное количество к заказу от {item.minQty} шт.
                    </h3>
                  ) : null}
                  <div className={styles.add__to_cart_column}>
                    <CartReducerBtn
                      data={item}
                      onCartEmpty={handleCartEmpty}
                      shouldFocusInput={shouldFocusInput}
                      onFocusHandled={() => setShouldFocusInput(false)}
                    />
                    <button
                      className={cn(
                        styles.add__to_cart_column_button,
                        styles.column_buy
                      )}
                    >
                      {item.quantity}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Clear button enabled only when all items are selected */}
          <button
            className={cn(styles.clearButton, {
              [styles.clearButtonDisabled]: !allItemsSelected,
            })}
            disabled={!allItemsSelected}
            onClick={handleClearCart}
          >
            Очистить корзину
          </button>
        </div>
      )}
    </div>
  );
};

export default Basket;
