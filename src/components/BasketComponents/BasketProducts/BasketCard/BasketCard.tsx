"use client";
import cn from "clsx";
import {
  CardFavoritesIcon,
  GrayStar,
  TrashIcon,
  YellowStar,
} from "../../../../../public/Icons/Icons";
import styles from "../style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import CartReducerBtn from "@/components/UI/CartReducerBtn/CartReducerBtn";
import Link from "next/link";
import { toggleProductSelection } from "@/store/reducers/basket.reducer";
import { useDispatch, useSelector } from "react-redux";
import { Model } from "@/types/Basket/getBasketProduct";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
interface IBasketCardProps {
  item: Model;
  imageUrl: string;
  isFavorite: boolean;
  rating: number;
  handleFavoriteClick: (e: any) => void;
  removeFromCart: (e: any) => void;
  handleCartEmpty: () => void;
  shouldFocusInput: boolean;
  setShouldFocusInput: () => void;
  selected: boolean | undefined;
  id_cart: string | null | undefined;
}

const BasketCard = ({
  item,
  imageUrl,
  isFavorite,
  rating,
  handleFavoriteClick,
  removeFromCart,
  handleCartEmpty,
  shouldFocusInput,
  setShouldFocusInput,
  selected,
  id_cart,
}: IBasketCardProps) => {
  const basket = useSelector((state: RootState) => state.basket.basket);

  const [quantity, setQuantity] = useState<number>(item.kol || item.minQty);
  useEffect(() => {
    const kolCard = basket.find((res) => res.id_tov === item.id_tov);
    if (kolCard) {
      setQuantity(
        kolCard.kol !== undefined
          ? Math.max(kolCard.kol, kolCard.quantity || 0)
          : kolCard.quantity || 0
      );
    } else {
      setQuantity(kolCard.minQty);
    }
  }, [basket, item.id_tov, item.minQty]);
  const formatNumber = (number: number) => {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(2) + " млрд";
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(2) + " млн";
    } else {
      return number.toLocaleString("ru-RU");
    }
  };
  const totalPrice = item.cenaok * quantity;
  const formattedPrice = formatNumber(totalPrice);
  const formattedQuantity = formatNumber(quantity);
  const dispatch = useDispatch();

  const handleSelectionToggle = () => {
    dispatch(toggleProductSelection(item.id));
  };

  return (
    <div className={styles.cardsContainer}>
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
          <div className={styles.checkBoxPosition}>
            <span
              onClick={handleSelectionToggle}
              className={cn("showFiltersUlContainer__check", {
                ["showFiltersUlContainer__checkActive"]: selected,
              })}
            >
              {selected ? (
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
          </div>
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
          <div className={styles.rigthPart__priceContainer__buttons}>
            <button
              onClick={handleFavoriteClick}
              title={
                isFavorite ? "Удалить из избранного" : "Добавить в избранное"
              }
              className={styles.iconBasket}
            >
              <span
                title={
                  isFavorite ? "Удалить из избранного" : "Добавить в избранное"
                }
                className={cn(
                  "add__to_fav_icon",
                  ` ${isFavorite ? "card__info_addedFavorites" : ""}`
                )}
              >
                <CardFavoritesIcon />
              </span>
            </button>
            <button
              onClick={removeFromCart}
              title="Удалить товар"
              className={styles.iconBasket}
            >
              <span className="add__to_fav_icon">
                <TrashIcon />
              </span>
            </button>
          </div>
          <div className={styles.quantityContainer}>
            <span className={styles.priceCustomContainer}>
              кол-во: {formattedQuantity} шт =
            </span>
            <span className={styles.priceCustomContainer}>
              {formattedPrice}
              <span className={styles.priceCustom}> с</span>
            </span>
          </div>
          {item.minQty > 1 ? (
            <h3 className={styles.minimal__items}>
              минимальное количество к заказу от {item.minQty} шт.
            </h3>
          ) : null}
        </div>

        <div className={styles.add__to_cart_column}>
          <CartReducerBtn
            data={item}
            onCartEmpty={handleCartEmpty}
            shouldFocusInput={shouldFocusInput}
            onFocusHandled={setShouldFocusInput}
            id_cart={id_cart}
          />
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
