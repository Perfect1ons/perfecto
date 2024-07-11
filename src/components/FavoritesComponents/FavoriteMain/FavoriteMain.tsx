"use client";
import React, { useState, useEffect } from "react";
import cn from "clsx";
import Link from "next/link";
import { ICard } from "@/types/Card/card"; // Импорт типа для товаров
import styles from "./style.module.scss";
import Card from "@/components/UI/Card/Card";
import MainLoader from "@/components/UI/Loader/MainLoader";
import { TrashIcon } from "../../../../public/Icons/Icons";
import FavoriteModal from "../FavoritesModal/FavoritesModal";

export default function FavoriteMain() {
  const [favorites, setFavorites] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State для авторизации

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
    setIsLoading(false);

    // Проверка статуса авторизации
    const authStatus = localStorage.getItem("isAuthed") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const removeFromFavorites = (id_tov: number) => {
    const updatedFavorites = favorites.filter((fav) => fav.id_tov !== id_tov);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setModalMessage("Товар удален из избранного.");
    setModalVisible(true);
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
    setModalMessage("Все товары удалены из избранного.");
    setModalVisible(true);
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      {!isAuthenticated ? (
        <div className="container">
        <p className="sections__title">
          Зарегистрируйтесь, пожалуйста, чтобы добавлять товары в избранное.
        </p>

        </div>
      ) : (
        <section>
          <FavoriteModal
            isVisible={isModalVisible}
            message={modalMessage}
            onClose={handleModalClose}
          />
          {isLoading ? (
            <MainLoader />
          ) : (
            <>
              {favorites.length === 0 ? (
                <div className={cn("container", styles.favorites__container)}>
                  <div className={styles.section__isEmpty}>
                    <div className={styles.content}>
                      <div
                        className={cn(
                          "mascot_sprite",
                          "mascot_sprite_favorite"
                        )}
                      ></div>
                      <div className={styles.content_text}>
                        <h2 className={styles.content_text_h3}>
                          Товаров в Избранном нет.
                        </h2>
                      </div>
                    </div>
                    {!isAuthenticated ? (
                      <Link href="/" className={styles.linkToMain}>
                        Перейти на главную
                      </Link>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className={styles.favorites__card}>
                  <div
                    className={cn(styles.favorites__card_header, "container")}
                  >
                    <h2 className={styles.favorites__card_title}>
                      В избранном{" "}
                      <span className={styles.favorites__card_count}>
                        {favorites.length}
                      </span>{" "}
                      {favorites.length % 10 === 1 &&
                      favorites.length % 100 !== 11
                        ? "товар"
                        : favorites.length % 10 >= 2 &&
                          favorites.length % 10 <= 4 &&
                          !(
                            favorites.length % 100 >= 12 &&
                            favorites.length % 100 <= 14
                          )
                        ? "товара"
                        : "товаров"}
                    </h2>

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
                    {favorites.map((item) => (
                      <Card
                        key={item.id_tov} // Ensure key is unique
                        cardData={item}
                        removeFromFavorites={removeFromFavorites}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      )}
    </>
  );
}
