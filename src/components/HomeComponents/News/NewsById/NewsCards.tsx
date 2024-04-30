"use client"
import { NewsResult } from "@/types/News/NewsById";
import styles from "./style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import {
  CartIcon,
  GrayFavoritesIcon,
  GrayStar,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../../../public/Icons/Icons";
import { useState, useEffect } from "react";
import cn from "clsx";

interface INewDataProps {
  newData: NewsResult;
}

const NewsCards = ({ newData }: INewDataProps) => {
  const imageUrl =
    newData.photos.length > 0
      ? `${url}nal/img/${newData.id_post}/l_${newData.photos[0].url_part}`
      : "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";

  // Создаем состояние для хранения оценки
  const [rating, setRating] = useState(0);

  // Создаем состояние для хранения значения избранного
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(newData.id.toString()) === "true"
  );

const handleFavoriteClick = () => {
  setIsFavorite((prevIsFavorite) => {
    const newIsFavorite = !prevIsFavorite;
    localStorage.setItem(newData.id.toString(), newIsFavorite.toString());
    return newIsFavorite;
  });
};

  useEffect(() => {
    setRating(Math.floor(newData.ocenka));
  }, [newData.ocenka]);

  return (
    <div className="default__card">
      <div className="default__card_images">
        <Image
          className="default__card_image"
          src={imageUrl}
          width={200}
          height={200}
          alt={newData.naim}
          quality={100}
          loading="lazy"
        />
      </div>
      <div className="default__card_info">
        <span className="default__card_price">
          {newData.cenaok}
          <span className="default__card_price_custom"> с</span>
        </span>
        <h2 className="default__card_name">{newData.naim}</h2>
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
          {newData.ddos}
        </div>
        <div className="add__to">
          <button
            title="Добавить в корзину"
            className="add__to_cart"
            onClick={() => console.log("Добавлено в корзину")}
          >
            <span className="add__to_cart_icon">
              <CartIcon />
            </span>
            В корзину
          </button>
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
      </div>
    </div>
  );
};

export default NewsCards;
