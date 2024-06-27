"use client";
import { useState, useEffect } from "react";
import { url } from "@/components/temporary/data";
import {
  CardFavoritesIcon,
  CartIcon,
  GrayStar,
  YellowStar,
} from "../../../../public/Icons/Icons";
import Link from "next/link";
import { truncateText } from "@/utils/utils";
import { ICard } from "@/types/Card/card";
import Image from "next/image";
import styles from "./style.module.scss";
import FavoriteModal from "@/components/FavoritesComponents/FavoritesModal/FavoritesModal";
import CardSkeleton from "./CardSkeleton";

interface IcardDataProps {
  cardData: ICard;
  loading?: boolean;
}

const Card = ({ cardData, loading }: IcardDataProps) => {
  const imageUrl =
    cardData.photos.length > 0
      ? cardData.photos[0].url_part.startsWith("https://goods-photos")
        ? `${cardData.photos[0].url_part}280.jpg`
        : cardData.photos[0].url_part.startsWith("https://")
        ? cardData.photos[0].url_part
        : `${url}nal/img/${cardData.id_post}/l_${cardData.photos[0].url_part}`
      : "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";

  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);

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

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Ваша логика добавления в корзину
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleCardClick = () => {
    window.location.href = `/item/${cardData.id_tov}/${cardData.url}`;
  };

  const maxLength = 40;
  const maxLengthDdos = 32;
  const truncatedTitle = truncateText(cardData.naim, maxLength);
  const truncatedDdos = truncateText(cardData.ddos, maxLengthDdos);

  return (
    <>
      {loading ? (
        <CardSkeleton loading={loading} />
      ) : (
        <div className="card" onClick={handleCardClick}>
          <FavoriteModal
            isVisible={isModalVisible}
            message={modalMessage}
            isRedirect={isRedirect}
            onClose={handleModalClose}
          />
          <div className="card__images">
            <Link
              href={`/item/${cardData.id_tov}/${cardData.url}`}
              className="link"
            >
              <Image
                className="card__image"
                src={imageUrl}
                width={300}
                height={250}
                alt={cardData.naim}
                priority
              />
              {cardData.discount_prc > 0 ? (
                <div className="card__info_skidkapercent">
                  {cardData.discount_prc}%
                </div>
              ) : null}
            </Link>
            <span
              title="Добавить в избранное"
              className={`card__info_addFavorites ${
                isFavorite ? "card__info_addedFavorites" : ""
              }`}
              onClick={handleFavoriteClick}
            >
              <CardFavoritesIcon />
            </span>
          </div>
          <div className="card__info">
            <Link
              href={`/item/${cardData.id_tov}/${cardData.url}`}
              className="link"
            >
              {cardData.discount_prc > 0 ? (
                <div className="card__info_price">
                  <div className="card__info_skidkaprice">
                    <span className="card__info_skidkaprice_price">
                      {cardData.cenaok?.toLocaleString("ru-RU")}
                    </span>
                    <span className="card__info_skidkaprice_price_custom">
                      с
                    </span>
                  </div>

                  <div className="card__info_oldprice">
                    <span className="card__info_oldprice_price">
                      {cardData.old_price.toLocaleString("ru-RU")}c
                    </span>
                  </div>
                </div>
              ) : (
                <div className="card__info_price">
                  <div className="card__info_currentprice">
                    <span className="card__info_currentprice_price">
                      {cardData.cenaok.toLocaleString("ru-RU")}
                    </span>
                    <span className="card__info_currentprice_price_custom">
                      с
                    </span>
                  </div>
                </div>
              )}
            </Link>
            <Link
              href={`/item/${cardData.id_tov}/${cardData.url}`}
              className="link"
            >
            <h1 className="card__info_title">{truncatedTitle}</h1>
            </Link>
            <Link
              href={`/item/${cardData.id_tov}/${cardData.url}`}
              className="link"
            >
            <div className="card__info_rating">
              {[...Array(5)].map((_, index) => (
                <span className="card__info_rating_span" key={index}>
                  {index < rating ? <YellowStar /> : <GrayStar />}
                </span>
              ))}
            </div>
            </Link>
            <Link
              href={`/item/${cardData.id_tov}/${cardData.url}`}
              className="link"
            >
            <div className="card__info_ddos">
              <Image
                className="card__info_ddos_icon"
                src={`${url}images/delivery_icon.svg`}
                width={20}
                height={20}
                alt="delivery_icon"
              />
              <p className="card__info_ddos_desc">{truncatedDdos}</p>
            </div>
            </Link>
            <div className="card__info_button">
              <button
                title="Добавить в корзину"
                className="card__info_addproduct"
                onClick={handleAddToCartClick}
              >
                <span className="card__info_addproduct_icon">
                  <CartIcon />
                </span>
                В корзину
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
