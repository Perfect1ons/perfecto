"use client";
import cn from "clsx";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ICard } from "@/types/Card/card"; // Импорт типа для товаров
import styles from "./style.module.scss";
import Card from "@/components/UI/Card/Card";
import MainLoader from "@/components/UI/Loader/MainLoader";
import { TrashIcon } from "../../../../public/Icons/Icons";

export default function FavoriteMain() {
  const [favorites, setFavorites] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
    setIsLoading(false);
  }, []);

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <section>
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          {favorites.length === 0 ? (
            <div className={cn("container", styles.favorites__container)}>
              <div className={styles.section__isEmpty}>
                <div className={styles.content}>
                  <div
                    className={cn("mascot_sprite", "mascot_sprite_favorite")}
                  ></div>
                  <div className={styles.content_text}>
                    <h3 className={styles.content_text_h3}>
                      Товаров в Избранном нет.
                    </h3>
                    <p>
                      Добавляйте понравившиеся товары в избранное
                      <br />
                      или авторизуйтесь, если добавляли ранее.
                    </p>
                  </div>
                </div>
                <Link href="/" className={styles.linkToMain}>
                  Перейти на главную
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.favorites__card}>
              <div className={cn(styles.favorites__card_header, "container")}>
                <h1 className={styles.favorites__card_title}>
                  В избранном{" "}
                  <span className={styles.favorites__card_count}>
                    {favorites.length}
                  </span>{" "}
                  товара
                </h1>
                <button
                  title="Удалить все товары в избранном"
                  className={styles.clearFavoritesButton}
                  onClick={clearFavorites}
                >
                  <TrashIcon />
                  Очистить избранное
                </button>
              </div>
              <div className="cards">
                {favorites.map((item, index) => (
                  <Card cardData={item} key={index} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
