"use client";
import Image from "next/image";
import styles from "./card.module.scss";
import Link from "next/link";
import { ICard } from "@/types/Card/card";
import { url } from "@/components/temporary/data";
import { useMemo } from "react";

interface IFavoritesCardProps {
  favoritesCount: number;
  favorites: ICard[];
}

const FavoritesCard = ({ favoritesCount, favorites }: IFavoritesCardProps) => {
  const favoriteWord = useMemo(() => {
    if (favoritesCount % 10 === 1 && favoritesCount % 100 !== 11)
      return "товар";
    if (
      favoritesCount % 10 >= 2 &&
      favoritesCount % 10 <= 4 &&
      !(favoritesCount % 100 >= 12 && favoritesCount % 100 <= 14)
    )
      return "товара";
    return "товаров";
  }, [favoritesCount]);

  const imageUrl = (data: ICard) => {
    if (data.photos.length > 0) {
      const urlPart = data.photos[0]?.url_part;
      if (urlPart.startsWith("https://goods")) return `${urlPart}280.jpg`;
      if (urlPart.startsWith("https://")) return urlPart;
      return `${url}nal/img/${data.id_post}/l_${urlPart}`;
    }
    return "/img/noPhoto.svg";
  };

  return (
    <Link className="link" href={"/favorites"}>
      <div className={styles.profile__userInfo}>
        <div className={styles.profile__userInfo_header}>
          <div className={styles.profile__userInfo_icon}>
            <Image
              src="/img/orderfav.svg"
              width={40}
              height={40}
              alt="clipboard"
            />
          </div>
          <div>
            <p className={styles.profile__userInfo_name}>Избранное</p>
            {favoritesCount <= 0 ? (
              <p className={styles.orders}>
                Товаров в избранном нет
                <br />
                Добавляйте товары в избранное, <br /> чтобы долго не искать
              </p>
            ) : (
              <p className={styles.orders}>
                В избранном{" "}
                <span className={styles.orders__count}>{favoritesCount}</span>{" "}
                {favoriteWord}
              </p>
            )}
          </div>
        </div>
        <div className={styles.profile__userInfo_footer}>
          <div className={styles.orders__images}>
            {favorites && favorites.length > 0 ? (
              <>
                {favorites.slice(0, 3).map((data) => (
                  <Link
                    href={`/item/${data.id_tov}/${data.url}`}
                    key={data.id}
                    className={styles.orders__imageContainer}
                  >
                    <Image
                      className={styles.orders__imageContainer__image}
                      width={100}
                      height={100}
                      alt={data.naim || "Изображение товара"}
                      src={imageUrl(data)}
                    />
                  </Link>
                ))}
                {favorites.length > 3 && (
                  <Link href="/favorites" className={styles.profile__showMore}>
                    Ещё {favorites.length - 3}
                  </Link>
                )}
              </>
            ) : (
              <div className={styles.orders__images__toCatalog}>
                <button className={styles.profile__exit}>
                  Перейти в каталог
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FavoritesCard;
