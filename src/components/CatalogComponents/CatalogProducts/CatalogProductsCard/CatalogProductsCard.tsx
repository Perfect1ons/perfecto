"use client";
import {
  ICatalogsProducts,
  ICatlogProductsModel,
} from "@/types/Catalog/catalogProducts";
import { url } from "@/components/temporary/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import {
  CartIcon,
  GrayFavoritesIcon,
  GrayStar,
  VioletFavoritesIcon,
  YellowStar,
  chevronDownIcon,
} from "../../../../../public/Icons/Icons";
import { IFiltersBrand } from "@/types/filtersBrand";
interface IProps {
  catalog: ICatlogProductsModel;
  filter: IFiltersBrand;
}

const CatalogProductsCard = ({ catalog, filter }: IProps) => {
  const [filtersIsShow, setFiltersIsShow] = useState(false);
  const showFilters = () => {
    setFiltersIsShow(!filtersIsShow);
  };
  const imageUrl =
    catalog.photos.length > 0
      ? catalog.photos[0].url_part.startsWith("https://")
        ? catalog.photos[0].url_part + "280.jpg" // Добавляем "280.jpg" в конец URL, если он начинается с "https://"
        : `${url}nal/img/${catalog.id_post}/l_${catalog.photos[0].url_part}` // Используем URL с префиксом `${url}nal/img/`, если нет "https://"
      : "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";

  const [rating, setRating] = useState(0);

  // Проверяем, доступен ли localStorage (только на клиентской стороне)
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  // Используем localStorage только если он доступен
  const [isFavorite, setIsFavorite] = useState(
    isLocalStorageAvailable &&
      localStorage.getItem(catalog.id.toString()) === "true"
  );

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      if (isLocalStorageAvailable) {
        localStorage.setItem(catalog.id.toString(), newIsFavorite.toString());
      }
      return newIsFavorite;
    });
  };

  useEffect(() => {
    setRating(Math.floor(catalog.ocenka));
  }, [catalog.ocenka]);
  return (
    <>
      <div className="default__card">
        <div className="default__card_images">
          <Image
            className="default__card_image costyl"
            src={imageUrl}
            width={200}
            height={200}
            alt={catalog.naim}
            quality={100}
            loading="lazy"
          />
        </div>
        <div className="default__card_info">
          <span className="default__card_price">
            {catalog.cenaok.toLocaleString("ru-RU")}
            <span className="default__card_price_custom"> с</span>
          </span>
          <h2 className="default__card_name">{catalog.naim}</h2>
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
            <p className="ddos__text">{catalog.ddos}</p>
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
    </>
  );
};

export default CatalogProductsCard;
