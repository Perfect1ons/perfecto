"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import cn from "clsx";
import {
  CartIcon,
  GrayFavoritesIcon,
  GrayStar,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../../public/Icons/Icons";
import { url } from "@/components/temporary/data";
import { Tov } from "@/types/Catalog/catalogProducts";
import React from "react";
import { ICard } from "@/types/Card/card";
import FavoriteModal from "@/components/FavoritesComponents/FavoritesModal/FavoritesModal";

interface ICardDataProps {
  cardData: Tov;
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
  const [isRedirect, setIsRedirect] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
      setIsRedirect(false);
    } else {
      favorites.push(cardData);
      message = "Товар добавлен в избранное. Нажмите, чтобы перейти к списку.";
      setIsRedirect(true);
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

    const handleCardClick = () => {
      window.location.href = `/item/${cardData.id_tov}/${cardData.url}`;
    };

  return (
    <div className="default__card_column" onClick={handleCardClick}>
      <FavoriteModal
        isVisible={isModalVisible}
        message={modalMessage}
        isRedirect={isRedirect}
        onClose={handleModalClose}
      />
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
        <div className="default__card_buttons_column_price">
          <span className="default__card_price">
            {cardData.cenaok.toLocaleString("ru-RU")}
            <span className="default__card_price_custom"> с</span>
          </span>
          <button
            title="Добавить в избранное"
            className={cn("add__to_fav", {
              ["add__to_fav_active"]: isFavorite,
            })}
            onClick={handleFavoriteClick}
          >
            <span className="add__to_fav_icon">
              {isFavorite ? <VioletFavoritesIcon /> : <GrayFavoritesIcon />}
            </span>
          </button>
        </div>

        {cardData.minQty > 1 ? (
          <h3 className="minimal__items">
            минимальное количество к заказу от {cardData.minQty} шт.
          </h3>
        ) : null}

        <div className="add__to_cart_column">
          <button
            title="Добавить в корзину"
            className="add__to_cart_column_button"
            onClick={() => console.log("Добавлено в корзину")}
          >
            <span className="add__to_cart_icon">
              <CartIcon />
            </span>
            В корзину
          </button>
          <button className="add__to_cart_column_button column_buy">
            Купить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardColumn;
