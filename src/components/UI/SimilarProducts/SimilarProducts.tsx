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
import { useEffect, useState } from "react";
import { url } from "@/components/temporary/data";
import { useRouter } from "next/navigation";
import cn from "clsx";

interface ISimilarProps {
  similar: ISimilarItem[];
}

const SimilarProducts = ({ similar }: ISimilarProps) => {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Проверяем, доступен ли localStorage (только на клиентской стороне)
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;

    // Используем localStorage только если он доступен
    if (isLocalStorageAvailable) {
      const favoriteStatus = localStorage.getItem(
        similar.map((item) => item.id).toString()
      );
      setIsFavorite(favoriteStatus === "true");
    }
  }, [similar]);

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      // Проверяем, доступен ли localStorage (только на клиентской стороне)
      const isLocalStorageAvailable =
        typeof window !== "undefined" && window.localStorage;
      if (isLocalStorageAvailable) {
        localStorage.setItem(
          similar.map((item) => item.id).toString(),
          newIsFavorite.toString()
        );
      }
      return newIsFavorite;
    });
  };

  useEffect(() => {
    const totalRating = similar.reduce((acc, item) => acc + item.ocenka, 0);
    setRating(Math.floor(totalRating / similar.length));
  }, [similar]);

  return (
    <div className="similarProducts">
      <h1 className="sections__title">Похожие товары</h1>
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

          return (
            <div
              key={item.id}
              onClick={() => router.push(`/item/${item.art}/${item.url}`)}
              className="default__card"
            >
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
                  <p className="ddos__text">{item.ddos}</p>
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
                      {isFavorite ? (
                        <VioletFavoritesIcon />
                      ) : (
                        <GrayFavoritesIcon />
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;