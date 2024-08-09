"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  CardFavoritesIcon,
  CartIcon,
  GrayStar,
  YellowStar,
} from "../../../../public/Icons/Icons";
import { url } from "@/components/temporary/data";
import React from "react";
import { ICard } from "@/types/Card/card";
import FavoriteModal from "@/components/FavoritesComponents/FavoritesModal/FavoritesModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import Link from "next/link";
import ReducerBtn from "@/UI/ReducerBtn/ReducerBtn";
import InformationModal from "../InformationModal/InformationModal";

interface ICardDataProps {
  cardData: ICard;
}

const CardColumn = ({ cardData }: ICardDataProps) => {
  const imageUrl =
    cardData.photos.length > 0
      ? cardData.photos[0].url_part.startsWith("https://goods-photos")
        ? `${cardData.photos[0].url_part}280.jpg`
        : cardData.photos[0].url_part.startsWith("https://")
        ? cardData.photos[0].url_part
        : `${url}nal/img/${cardData.id_post}/l_${cardData.photos[0].url_part}`
      : "/img/noPhoto.svg";

  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<React.ReactNode>();

  useEffect(() => {
    setRating(Math.floor(cardData.ocenka));
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(
      favorites.some((fav: ICard) => fav.id_tov === cardData.id_tov)
    );
  }, [cardData.ocenka, cardData.id_tov]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let message = "";

    if (isFavorite) {
      favorites = favorites.filter(
        (fav: ICard) => fav.id_tov !== cardData.id_tov
      );
      message = "Товар удален из избранного.";
    } else {
      favorites.push(cardData);
      message = "Товар добавлен в избранное. Нажмите, чтобы перейти к списку.";
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event("favoritesUpdated"));

    // Показываем модалку с соответствующим сообщением
    setModalMessage(message);
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };
  const [cartModal, setCartModal] = useState(false);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);

  const handleCardClick = () => {
    window.location.href = `/item/${cardData.id_tov}/${cardData.url}`;
  };
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addProductToCart(cardData));
    setCartModal(true);
    setTimeout(() => setCartModal(false), 5000);
  };



  const handleAddToCart = () => {
    addToCart();
    setShouldFocusInput(true);
    setModalMessage(
      <>
        Товар добавлен в корзину.{" "}
        <Link className="linkCart" href={"/cart"}>
          Нажмите, чтобы перейти к списку.
        </Link>
      </>
    );
    setModalVisible(true);
  };

  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === cardData.id);

  return (
    <div className="default__card_column" onClick={handleCardClick}>
      <InformationModal visible={isModalVisible} onClose={handleModalClose}>
        {modalMessage}
      </InformationModal>
      <div className="default__card_column_right">
        <div className="default__card_images_column">
          <Image
            className="default__card_image_column"
            src={imageUrl}
            width={200}
            height={200}
            alt={cardData.naim}
            quality={100}
            loading="lazy"
          />
        </div>
        <div className="default__card_info_column">
          <h2 className="default__card_name_column">{cardData.naim}</h2>
          <p className="card__column_id">Код: {cardData.id_tov}</p>
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
            <p className="ddos__text_column">{cardData.ddos}</p>
          </div>
        </div>
      </div>
      <div className="default__card_buttons_column">
        <div
          style={{ position: "relative" }}
          className="default__card_buttons_column_price"
        >
          <div className="default__card_buttons_column_price_count">
            <span className="default__card_buttons_column_price_count_current">
              {cardData.cenaok.toLocaleString("ru-RU")}
              <span className="default__card_price_custom"> с</span>
            </span>
            {cardData.discount_prc > 0 ? (
              <div className="default__card_percent">
                {cardData.discount_prc}%
              </div>
            ) : null}
            {cardData.discount_prc > 0 ? (
              <div className="default__card_oldprice">
                <span className="default__card_oldprice_price">
                  {cardData.old_price.toLocaleString("ru-RU")}c
                </span>
              </div>
            ) : null}
          </div>
          <span
            style={{ top: "0" }}
            title={
              isFavorite ? "Удалить из избранного" : "Добавить в избранное"
            }
            className={`card__info_addFavorites ${
              isFavorite ? "card__info_addedFavorites" : ""
            }`}
            onClick={handleFavoriteClick}
          >
            <CardFavoritesIcon />
          </span>
        </div>

        {cardData.minQty > 1 ? (
          <h3 className="minimal__items">
            минимальное количество к заказу от {cardData.minQty} шт.
          </h3>
        ) : null}

        <div
          className="add__to_cart_column"
          onClick={(e) => e.stopPropagation()}
        >
          {!product?.quantity && (
            <button
              title="Добавить в корзину"
              className="add__to_cart_column_button"
              onClick={handleAddToCart}
            >
              <span className="add__to_cart_icon">
                <CartIcon />
              </span>
              В корзину
            </button>
          )}
          {product?.quantity && (
            <ReducerBtn
              data={cardData}
              shouldFocusInput={shouldFocusInput}
              onFocusHandled={() => setShouldFocusInput(false)}
            />
          )}
          <button className="add__to_cart_column_button column_buy">
            Купить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardColumn;
