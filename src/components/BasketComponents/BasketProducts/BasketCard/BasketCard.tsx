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
import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { ICard } from "@/types/Card/card";
import {
  deleteFavoritesProductAuthed,
  postFavorite,
} from "@/api/clientRequest";
import InformationModal from "@/components/UI/InformationModal/InformationModal";
interface IBasketCardProps {
  item: any;
  imageUrl: string;
  rating: number;
  removeFromCart: (e: any) => void;
  handleCartEmpty: () => void;
  shouldFocusInput: boolean;
  setShouldFocusInput: () => void;
  selected: boolean | undefined;
  id_cart: string | null | undefined;
  authToken: string | undefined;
}

const BasketCard = ({
  item,
  imageUrl,
  rating,
  removeFromCart,
  handleCartEmpty,
  shouldFocusInput,
  setShouldFocusInput,
  selected,
  id_cart,
  authToken,
}: IBasketCardProps) => {
  const [quantity, setQuantity] = useState<number>(0);

  const { isAuth, token } = useContext(AuthContext);

  const [isAuthVisible, setAuthVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | JSX.Element>("");

  useEffect(() => {
    const getStoredBasket = (key: string) => {
      return JSON.parse(localStorage.getItem(key) || "[]");
    };
    const findCardInBasket = (basket: any[], id: number) => {
      return basket.find((res: any) => parseInt(res.id_tov) === id);
    };
    const storedBasket = token
      ? getStoredBasket("cartItems")
      : getStoredBasket("cartItemsGuest");
    const kolCard = findCardInBasket(storedBasket, parseInt(item.id_tov));
    if (kolCard) {
      setQuantity(parseInt(kolCard.quantity) || parseInt(kolCard.kol) || 0);
    } else {
      setQuantity(0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id_tov, item.minQty, token]);
  const formatNumber = (number: number) => {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(2) + " млрд";
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(2) + " млн";
    } else {
      return number.toLocaleString("ru-RU");
    }
  };
  const totalPrice = authToken ? item.cenaok * quantity : item.cena * quantity;
  const formattedPrice = formatNumber(totalPrice);
  const formattedQuantity = formatNumber(quantity);
  const dispatch = useDispatch();

  const handleSelectionToggle = () => {
    dispatch(toggleProductSelection(item.id));
  };

  const openAuthModal = () => setAuthVisible(true);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFavoriteClick = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let message: string | JSX.Element = "";
    if (!isAuth) {
      openAuthModal();
      return;
    }
    try {
      if (isFavorite) {
        favorites = favorites.filter(
          (fav: ICard) => fav.id_tov !== item.id_tov
        );
        message = "Товар удален из избранного.";
        if (token) {
          await deleteFavoritesProductAuthed(token, item.id_tov);
        }
      } else {
        // Добавляем товар в избранное
        const response = await postFavorite(item.id_tov, 1, token);
        if (response) {
          favorites.push(response);
          message = (
            <>
              Товар добавлен в избранное.{" "}
              <Link className="linkCart" href="/favorites">
                Нажмите, чтобы перейти к списку.
              </Link>
            </>
          );
        } else {
          message = "Не удалось добавить товар в избранное.";
        }
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
      window.dispatchEvent(new Event("favoritesUpdated"));
      setModalMessage(message);
      setModalVisible(true);
    } catch (error) {
      console.error("Error handling favorite click:", error);
      setModalMessage("Произошла ошибка при обработке запроса.");
      setModalVisible(true);
    }
  };

  return (
    <>
      <InformationModal visible={isModalVisible} onClose={handleModalClose}>
        {modalMessage}
      </InformationModal>
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
                className={
                  styles.leftPart__informationContainer__delivery__parap
                }
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
                  {item.cenaok?.toLocaleString("ru-RU")}
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
                  {authToken ? item.cenaok?.toLocaleString("ru-RU") : item.cena}
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
                    isFavorite
                      ? "Удалить из избранного"
                      : "Добавить в избранное"
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
    </>
  );
};

export default BasketCard;
