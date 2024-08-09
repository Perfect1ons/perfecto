"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import Link from "next/link";
import {
  CheckIcons,
  FavoritesIcons,
  GrayStar,
  TrashIcon,
  YellowStar,
} from "../../../../public/Icons/Icons";
import clsx from "clsx";
import ReducerBtn from "@/UI/ReducerBtn/ReducerBtn";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface IBasketCardProps {
  token?: any;
  setShouldFocusInput: () => void;
  shouldFocusInput: boolean;
  removeFromCart: (id_tov: number) => void;
  isChecked: boolean;
  onCheckboxChange: (id_tov: number, isChecked: boolean) => void;
  item: any;
  imageUrl: string;
  rating: number;
}

const BasketsCard = ({
  token,
  setShouldFocusInput,
  shouldFocusInput,
  removeFromCart,
  isChecked,
  onCheckboxChange,
  item,
  imageUrl,
  rating,
}: IBasketCardProps) => {
  const [animatedPrice, setAnimatedPrice] = useState<number>(
    item.cenaok * (item.quantity ?? item.minQty)
  );

  const formatNumber = (number: number) => {
    if (number >= 1e9) {
      return (
        (Math.floor((number / 1e9) * 1000) / 1000)
          .toFixed(3)
          .replace(/(\.[0-9]*[1-9])0+$/, "$1") + " млрд"
      );
    } else if (number >= 1e6) {
      return (
        (Math.floor((number / 1e6) * 1000) / 1000)
          .toFixed(3)
          .replace(/(\.[0-9]*[1-9])0+$/, "$1") + " млн"
      );
    } else {
      return number.toLocaleString("ru-RU");
    }
  };

  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((data) => data.id === item.id);
  const quantity = product?.quantity ?? item.minQty;
  const totalPrice = item.cenaok * quantity;
  const formattedPrice = formatNumber(totalPrice);

  const animatePrice = useCallback((startValue: number, endValue: number) => {
    const duration = 300;
    const start = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const newValue = Math.round(
        startValue + (endValue - startValue) * progress
      );

      setAnimatedPrice(newValue);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    animatePrice(animatedPrice, totalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, totalPrice, animatePrice]);

  const handleCheckboxClick = () => {
    onCheckboxChange(item.id_tov, !isChecked);
  };

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.leftPart}>
        <div onClick={handleCheckboxClick} className={styles.checkBoxContainer}>
          <span
            className={clsx("showFiltersUlContainer__check", {
              ["showFiltersUlContainer__checkActive"]: isChecked,
            })}
          >
            {isChecked ? <CheckIcons /> : null}
          </span>
        </div>
        <div className={styles.leftPart__imageContainer}>
          <Image
            className={styles.leftPart__imageContainer__image}
            src={imageUrl}
            width={200}
            height={200}
            alt={item.naim}
            loading="lazy"
          />
        </div>

        <div className={styles.leftPart__informationContainer}>
          <Link className="link" href={`/item/${item.id_tov}/${item.url}`}>
            <h2 className={styles.leftPart__informationContainer__title}>
              {item.naim}
            </h2>
          </Link>
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
          <div className={styles.leftPart__informationContainer__delivery}>
            <Image
              src={`${url}images/delivery_icon.svg`}
              width={20}
              height={20}
              alt="delivery_icon"
            />
            <p
              className={styles.leftPart__informationContainer__delivery__parap}
            >
              {item.ddos}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.rigthPart}>
        <div className={styles.rigthPart__priceContainer}>
          {item?.discount_prc > 0 ? (
            <div className={styles.ItemPriceCard__cost}>
              <span className={styles.ItemPriceCard__price_new}>
                {item.cenaok.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__price_new_custom}>
                  с
                </span>
              </span>
              <span className={styles.ItemPriceCard__price_discount}>
                -{item.discount_prc}%
              </span>
              <span className={styles.ItemPriceCard__old_price}>
                {item.old_price.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__old_price_custom}>
                  с
                </span>
              </span>
            </div>
          ) : (
            <div className={styles.ItemPriceCard__cost}>
              <span className={styles.ItemPriceCard__price}>
                {item?.cenaok.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__price_custom}>с</span>
              </span>
            </div>
          )}

          <div
            title={formattedPrice + " Сом"}
            className={styles.quantityContainer}
          >
            <span className={styles.priceCustomContainer}>
              кол-во: {quantity} шт =
            </span>
            <span className={styles.priceCustomContainer}>
              {animatedPrice.toLocaleString("ru-RU")}
              <span className={styles.priceCustom}>с</span>
            </span>
          </div>
          <div className={styles.rigthPart__priceContainer__buttons}>
            <button
              className={styles.iconBasket}
              onClick={() => removeFromCart(item.id_tov)}
            >
              <TrashIcon />
            </button>
            <button className={styles.faviconBasket}>
              <FavoritesIcons />
            </button>
          </div>
        </div>
        {item.minQty > 1 ? (
          <h3 className={styles.minimal__items}>
            минимальное количество к заказу от {item.minQty} шт.
          </h3>
        ) : null}
      </div>
      {item.id_tov}
      <div className={styles.add__to_cart_column}>
        <ReducerBtn
          removeItem={removeFromCart}
          token={token}
          data={item}
          shouldFocusInput={shouldFocusInput}
          onFocusHandled={setShouldFocusInput}
        />
      </div>
    </div>
  );
};

export default BasketsCard;
