"use client"
import { useState, useEffect } from "react";
import { NewsResult } from "@/types/News/NewsById";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import {
  CartIcon,
  GrayFavoritesIcon,
  GrayStar,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../../../public/Icons/Icons";
import cn from "clsx";
import { useRouter } from "next/navigation";

interface INewDataProps {
  newData: NewsResult;
}

const NewsCards = ({ newData }: INewDataProps) => {
  const router = useRouter()
  const imageUrl = 
    newData.photos.length > 0
      ? `${url}nal/img/${newData.id_post}/l_${newData.photos[0].url_part}`
      : "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";

  const [rating, setRating] = useState(0);

  // Проверяем, доступен ли localStorage (только на клиентской стороне)
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  // Используем localStorage только если он доступен
  const [isFavorite, setIsFavorite] = useState(
    isLocalStorageAvailable &&
      localStorage.getItem(newData.id.toString()) === "true"
  );

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      if (isLocalStorageAvailable) {
        localStorage.setItem(newData.id.toString(), newIsFavorite.toString());
      }
      return newIsFavorite;
    });
  };

  useEffect(() => {
    setRating(Math.floor(newData.ocenka));
  }, [newData.ocenka]);
            const maxLength = 52;
            const truncatedText =
              newData.ddos.length > maxLength
                ? `${newData.ddos.slice(0, maxLength)}...`
                : newData.ddos;
  return (
    <div
      onClick={() => router.push(`/item/${newData.id_tov}/${newData.url}`)}
      className="default__card"
    >
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
        {newData.discount > 0 ? (
          <div className="default__card_price_box">
            <h3 className="default__card_price_discount">
              {newData.cenaok.toLocaleString("ru-RU")}
              <span className="default__card_price_custom"> с</span>
            </h3>
            <span className="default__card_price_prc">
              -{newData.discount_prc} %
            </span>
            <h3 className="default__card_price_old">
              {newData.old_price.toLocaleString("ru-RU")}
              <span className="default__card_price_custom"> с</span>
            </h3>
          </div>
        ) : (
          <h3 className="default__card_price_now">
            {newData.cenaok.toLocaleString("ru-RU")}
            <span className="default__card_price_custom"> с</span>
          </h3>
        )}

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
          <p className="ddos__text">{truncatedText}</p>
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


