"use client";
import Image from "next/image";
import {
  CartIcon,
  GrayFavoritesIcon,
  GrayStar,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../../public/Icons/Icons";
import { ISimilarItem } from "@/types/SimilarProduct/similarProduct";
import React, { useEffect, useState } from "react";
import { url } from "@/components/temporary/data";
import cn from "clsx";
import Link from "next/link";

interface ISimilarProps {
  similar: ISimilarItem[];
}

const SimilarProducts = ({ similar }: ISimilarProps) => {
  const [rating, setRating] = useState(0);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;

    if (isLocalStorageAvailable) {
      const initialFavorites: { [key: number]: boolean } = {};
      similar.forEach((item) => {
        const favoriteStatus = localStorage.getItem(item.id.toString());
        initialFavorites[item.id] = favoriteStatus === "true";
      });
      setFavorites(initialFavorites);
    }
  }, [similar]);

  const handleFavoriteClick = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites, [id]: !prevFavorites[id] };
      const isLocalStorageAvailable =
        typeof window !== "undefined" && window.localStorage;
      if (isLocalStorageAvailable) {
        localStorage.setItem(id.toString(), newFavorites[id].toString());
      }
      return newFavorites;
    });
  };

  useEffect(() => {
    const totalRating = similar.reduce((acc, item) => acc + item.ocenka, 0);
    setRating(Math.floor(totalRating / similar.length));
  }, [similar]);

  return (
    <div className="similarProducts">
      <h1 className="sections__title container">Похожие товары</h1>
      <div className="main__news_cards">
        {similar.map((item) => {
          const imageUrls =
            item.photos.length > 0
              ? item.photos[0].url_part.startsWith("https://goods-photos")
                ? `${item.photos[0].url_part}280.jpg`
                : item.photos[0].url_part.startsWith("https://")
                ? item.photos[0].url_part
                : `${url}nal/img/${item.id_post}/l_${item.photos[0].url_part}`
              : "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";
          const maxLength = 52;
          const truncatedText =
            item.ddos.length > maxLength
              ? `${item.ddos.slice(0, maxLength)}...`
              : item.ddos;

          return (
            <Link
              className="link"
              href={`/item/${item.id_tov}/${item.url}`}
              key={item.id}
            >
              <div key={item.id} className="default__card">
                <div className="default__card_images">
                  <Image
                    className="default__card_image"
                    src={imageUrls}
                    width={200}
                    height={200}
                    alt={item.naim}
                    quality={100}
                    loading="lazy"
                  />
                </div>
                <div className="default__card_info">
                  <span className="default__card_price">
                    {item.cenaok.toLocaleString("ru-RU")}
                    <span className="default__card_price_custom"> с</span>
                  </span>
                  <h2 className="default__card_name">{item.naim}</h2>
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
                        ["add__to_fav_active"]: favorites[item.id],
                      })}
                      onClick={(event) => handleFavoriteClick(item.id, event)}
                    >
                      <span className="add__to_fav_icon">
                        {favorites[item.id] ? (
                          <VioletFavoritesIcon />
                        ) : (
                          <GrayFavoritesIcon />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;
