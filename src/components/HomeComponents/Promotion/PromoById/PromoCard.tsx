"use client";
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
import { IPromoProduct } from "@/types/Promo/PromoById";

interface INewDataProps {
  promo: IPromoProduct;
}

const PromoCards = ({ promo }: INewDataProps) => {
  const imageUrl =
    promo.photos.length > 0
      ? `${url}nal/img/${promo.id_post}/l_${promo.photos[0].url_part}`
      : "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";

  const [rating, setRating] = useState(0);

  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(promo.id.toString()) === "true"
  );

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      localStorage.setItem(promo.id.toString(), newIsFavorite.toString());
      return newIsFavorite;
    });
  };
  useEffect(() => {
    setRating(Math.floor(promo.ocenka));
  }, [promo.ocenka]);

  return (
    <div className="default__card">
      <div className="default__card_images">
        <Image
          className="default__card_image"
          src={imageUrl}
          width={200}
          height={200}
          alt={promo.naim}
          quality={100}
          loading="lazy"
        />
      </div>
      <div className="default__card_info">
        <span className="default__card_price">
          {promo.cenaok}
          <span className="default__card_price_custom"> с</span>
        </span>
        <h2 className="default__card_name">{promo.naim}</h2>
        <div className="ocenka">
          {/* Отображение звезд в зависимости от округленной оценки */}
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
          {promo.ddos}
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
            {/* Рендерим серые или фиолетовые иконки в зависимости от состояния */}
            <span className="add__to_fav_icon">
              {isFavorite ? <VioletFavoritesIcon /> : <GrayFavoritesIcon />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoCards;
