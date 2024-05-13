"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import cn from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartIcon, GrayFavoritesIcon, GrayStar, VioletFavoritesIcon, YellowStar } from "../../../public/Icons/Icons";
import { url } from "@/components/temporary/data";

interface IItemPageProps {
  data: Items;
}

const ItemPage = ({ data }: IItemPageProps) => {
  const [rating, setRating] = useState(0);


  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Проверяем, доступен ли localStorage (только на клиентской стороне)
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;

    // Используем localStorage только если он доступен
    if (isLocalStorageAvailable) {
      const favoriteStatus = localStorage.getItem(data.id.toString());
      setIsFavorite(favoriteStatus === "true");
    }
  }, [data.id]);

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      // Проверяем, доступен ли localStorage (только на клиентской стороне)
      const isLocalStorageAvailable =
        typeof window !== "undefined" && window.localStorage;
      if (isLocalStorageAvailable) {
        localStorage.setItem(data.id.toString(), newIsFavorite.toString());
      }
      return newIsFavorite;
    });
  };

  useEffect(() => {
    setRating(Math.floor(data.ocenka));
  }, [data.ocenka]);

  return (
    <section className={cn(styles.wrap, "container")}>
      <div className={styles.productContainer}>
        <div className={styles.miniCardsColumn}>
          {data.photos.map((photo) => {
            return (
              <Image
              className={styles.productPreview}
                key={photo.url_part}
                src={`https://max.kg/nal/img/${data.id_post}/l_${photo.url_part}`}
                width={48}
                height={48}
                alt={photo.url_part}
              ></Image>
            );
          })}
        </div>
        <div className={styles.image}></div>
        <div className={styles.productInfo}>
          <div className={styles.productOcenka}>
            <span className={styles.otzivy}>{`(${data.otz} отзывов)`}</span>
            <div className="ocenka">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < rating ? <YellowStar /> : <GrayStar />}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.productName}>
            <h1 className={styles.productInfoTitle}>{data.name}</h1>
            <span>{`код: ${data.art}`}</span>
          </div>
          <span className={styles.brand}>{`Бренд: ${data.trademark}`}</span>
          <hr className={styles.productInfoHr} />
          <div className={styles.productPrice}>
            <span className={styles.price}>{data.price} с.</span>
            <span className={styles.oldPrice}>{data.old_price}</span>
            <span className={styles.priceUpdate}>{data.price_update}</span>
          </div>
          <div className="ddos">
            <Image
              src={`${url}images/delivery_icon.svg`}
              width={20}
              height={20}
              alt="delivery_icon"
            />
            <p className="ddos__text">{data.ddos}</p>
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
    </section>
  );
};

export default ItemPage;
