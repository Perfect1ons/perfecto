import cn from "clsx";
import {
  GrayFavoritesIcon,
  GrayStar,
  TrashIcon,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../../../public/Icons/Icons";
import styles from "../style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import CartReducerBtn from "@/components/UI/CartReducerBtn/CartReducerBtn";
import Link from "next/link";

interface IBasketCardProps {
  item: any;
  imageUrl: string;
  handleToggleSelection: () => void;
  isFavorite: boolean;
  rating: number;
  handleFavoriteClick: (e: any) => void;
  removeFromCart: (e: any) => void;
  handleCartEmpty: () => void;
  shouldFocusInput: boolean;
  setShouldFocusInput: () => void;
}

const BasketCard = ({
  item,
  imageUrl,
  handleToggleSelection,
  isFavorite,
  rating,
  handleFavoriteClick,
  removeFromCart,
  handleCartEmpty,
  shouldFocusInput,
  setShouldFocusInput,
}: IBasketCardProps) => {
  const totalPrice = item.cenaok * item.quantity;
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
              onClick={handleToggleSelection}
              className={cn("showFiltersUlContainer__check", {
                ["showFiltersUlContainer__checkActive"]: item.selected,
              })}
            >
              {item.selected ? (
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
              className={cn("add__to_fav", {
                ["add__to_fav_active"]: isFavorite,
              })}
            >
              <span className="add__to_fav_icon">
                {isFavorite ? <VioletFavoritesIcon /> : <GrayFavoritesIcon />}
              </span>
            </button>
            <button
              onClick={removeFromCart}
              title="Удалить товар"
              className={cn("add__to_fav")}
            >
              <span className="add__to_fav_icon">
                <TrashIcon />
              </span>
            </button>
          </div>
          <div className={styles.quantityContainer}>
            <span className={styles.priceCustomContainer}>
              кол-во: {item.quantity} шт =
            </span>
            <span className={styles.priceCustomContainer}>
              {totalPrice.toLocaleString("ru-RU")}
              <span className={styles.priceCustom}>с</span>
            </span>
          </div>
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
            onFocusHandled={setShouldFocusInput}
          />
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
