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

  // Обработчик клика по кнопке избранного
  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  // Устанавливаем начальное значение оценки
  useEffect(() => {
    setRating(Math.floor(newData.ocenka));
  }, [newData.ocenka]);

  return (
    <div className={styles.news__card}>
      <div className={styles.news__card_images}>
        {/* Используем imageUrl в качестве источника изображения */}
        <Image
          className={styles.news__card_image}
          src={imageUrl}
          width={200}
          height={200}
          alt={newData.naim}
          quality={100}
          loading="lazy"
        />
      </div>
      <div className={styles.news__card_info}>
        <span className={styles.news__card_price}>
          {newData.cenaok}
          <span className={styles.news__card_price_custom}> с</span>
        </span>
        <h2 className={styles.news__card_name}>{newData.naim}</h2>
        <div className={styles.ocenka}>
          {/* Отображение звезд в зависимости от округленной оценки */}
          {[...Array(5)].map((_, index) => (
            <span key={index}>
              {index < rating ? <YellowStar /> : <GrayStar />}
            </span>
          ))}
        </div>
        <div className={styles.ddos}>
          <Image
            src={`${url}images/delivery_icon.svg`}
            width={20}
            height={20}
            alt="delivery_icon"
          />
          {newData.ddos}
        </div>
        <div className={styles.add__to}>
          <button
            title="Добавить в корзину"
            className={styles.add__to_cart}
            onClick={() => console.log("Добавлено в корзину")}
          >
            <span className={styles.add__to_cart_icon}>
              <CartIcon />
            </span>
            В корзину
          </button>
          <button
            title="Добавить в избранное"
            className={cn(styles.add__to_fav, {
              [styles.add__to_fav_active]: isFavorite,
            })}
            onClick={handleFavoriteClick}
          >
            {/* Рендерим серые или фиолетовые иконки в зависимости от состояния */}
            <span className={styles.add__to_fav_icon}>
              {isFavorite ? <VioletFavoritesIcon /> : <GrayFavoritesIcon />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCards;

