"use client";
import React, { useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import { IFavoritesModel } from "@/types/Favorites/favorites";
import Card from "@/components/UI/Card/Card";
import FavoritesIsEmpty from "./FavoritesIsEmpty";

interface IFavoritesProps {
  favoriteData: IFavoritesModel[];
}

export default function Favorites({ favoriteData }: IFavoritesProps) {
  const [favorites, setFavorites] = useState<any[]>(favoriteData);
  const [selectedIds, setSelectedIds] = useState<string>("");

  const removeFromFavorites = (id_tov: number) => {
    const updatedFavorites = favorites.filter((fav) => fav.id_tov !== id_tov);
    setFavorites(updatedFavorites);
  };

  const handleSelectAll = () => {
    if (selectedIds.split(",").length === favorites.length) {
      // Если все элементы уже выбраны, то снимаем выделение со всех
      setSelectedIds("");
    } else {
      // Иначе выбираем все элементы
      const allIds = favorites.map((item) => item.id_tov.toString()).join(",");
      setSelectedIds(allIds);
    }
  };

  return (
    <section className={styles.favorites}>
      {favorites.length > 0 ? (
        <>
          <div className={cn(styles.favorites__card_header, "container")}>
            <h1 className={styles.favorites__card_title}>
              В избранном{" "}
              <span className={styles.favorites__card_count}>
                {favorites.length}
              </span>{" "}
              {favorites.length % 10 === 1 && favorites.length % 100 !== 11
                ? "товар"
                : favorites.length % 10 >= 2 &&
                  favorites.length % 10 <= 4 &&
                  !(
                    favorites.length % 100 >= 12 && favorites.length % 100 <= 14
                  )
                ? "товара"
                : "товаров"}
            </h1>
            <button
              onClick={handleSelectAll}
              className={styles.selectAllButton}
            >
              {selectedIds.split(",").length === favorites.length
                ? "Снять выделение"
                : "Выбрать все"}
            </button>
          </div>

          <div className="cards">
            {favorites.map((item, index) => {
              return (
                <Card
                  removeFromFavorites={removeFromFavorites}
                  cardData={item}
                  key={index}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                />
              );
            })}
          </div>
          <h1>{selectedIds}</h1>
        </>
      ) : (
        <FavoritesIsEmpty />
      )}
    </section>
  );
}
