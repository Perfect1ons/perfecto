"use client";
import { RootState } from "@/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import cn from "clsx";
import { clearCart } from "@/store/reducers/cart.reducer";
import Link from "next/link";
import CartReducerBtn from "@/components/UI/CartReducerBtn/CartReducerBtn";
import {
  GrayFavoritesIcon,
  GrayStar,
  TrashIcon,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../../public/Icons/Icons";
import Image from "next/image";
import { url } from "@/components/temporary/data";

const BasketProducts = () => {
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

  const handleClearCart = () => {
    dispatch(clearCart());
    setAllItemsSelected(false);
  };
  return (
    <div>
      <div className={styles.controlContainer}>
        <h1 className={styles.basketTilte}>Корзина - #160989</h1>
        {/* Checkbox to toggle all items selection */}
        <div
          className={styles.checkBoxContainer}
          onChange={handleToggleAllItems}
        >
          <span
            className={cn("showFiltersUlContainer__check", {
              ["showFiltersUlContainer__checkActive"]: added,
            })}
          >
            {added ? (
              <Image
                src="/img/checkIconWhite.svg"
                width={15}
                height={15}
                alt="check"
              />
            ) : (
              <Image
                src="/img/checkIconWhite.svg"
                width={15}
                height={15}
                alt="check"
              />
            )}
          </span>
          Выбрать все товары
        </div>
        <button className={styles.trashButton}>
          <TrashIcon />
        </button>
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
          <div key={item.id_tov} className={styles.cardsContainer}>
            <div className={styles.leftPart}>
              <div className={styles.leftPart__imageContainer}>
                <Image
                  className={styles.leftPart__imageContainer__image}
                  src={imageUrl}
                  width={200}
                  height={200}
                  alt={item.naim}
                  quality={100}
                  loading="lazy"
                />
              </div>
              <div className={styles.leftPart__informationContainer}>
                <h2 className={styles.leftPart__informationContainer__title}>
                  {item.naim}
                </h2>
                <p className={styles.leftPart__informationContainer__articul}>
                  Код: {item.id_tov}
                </p>
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
                  <span className={styles.default__card_price_custom}> с</span>
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
  );
};

export default BasketProducts;
