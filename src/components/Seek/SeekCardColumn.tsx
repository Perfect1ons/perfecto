"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import cn from "clsx";
import {
  CartIcon,
  GrayFavoritesIcon,
  GrayStar,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../public/Icons/Icons";
import { ISeekItem } from "@/types/Search/seek";
import { url } from "../temporary/data";

interface ICardDataProps {
  cardData: ISeekItem;
}

const SeekCardColumn = ({ cardData }: ICardDataProps) => {
  const imageUrl = useMemo(() => {
    if (
      cardData.photos[0]?.url_part &&
      cardData.photos[0].url_part.startsWith("https://")
    ) {
      return cardData.photos[0].url_part + "280.jpg";
    } else if (cardData.photos[0]?.url_part) {
      return `${url}nal/img/${cardData.id_post}/l_${cardData.photos[0].url_part}`;
    } else {
      return "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";
    }
  }, [cardData]);

  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setRating(Math.floor(cardData.ocenka));
    const favoriteStatus = localStorage.getItem(cardData.id.toString());
    setIsFavorite(favoriteStatus === "true");
  }, [cardData]);

  const handleFavoriteClick = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    localStorage.setItem(cardData.id.toString(), newIsFavorite.toString());
  };

  return (
    <div className="default__card_column">
      <div className="default__card_images_column">
        <Image
          className="default__card_image"
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
        <div className="ocenka">
          {[...Array(5)].map((_, index) => (
            <span key={index}>
              {index < rating ? <YellowStar /> : <GrayStar />}
            </span>
          ))}
        </div>
        <div className="ddos">
          <Image
            src={`${url}images/delivery_icon.svg`}
            width={20}
            height={20}
            alt="delivery_icon"
          />
          <p className="ddos__text">{cardData.ddos}</p>
        </div>
      </div>
      <div className="default__card_buttons_column">
        <div>
          <span className="default__card_price">
            {cardData.cenaok.toLocaleString("ru-RU")}
            <span className="default__card_price_custom"> с</span>
          </span>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default SeekCardColumn;
