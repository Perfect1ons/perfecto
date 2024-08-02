"use client";
import React, { useEffect, useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import { IFavoritesModel } from "@/types/Favorites/favorites";
import Card from "@/components/UI/Card/Card";
import FavoritesIsEmpty from "./FavoritesIsEmpty";
import Image from "next/image";
import { TrashIcon, XMark } from "../../../../public/Icons/Icons";
import {
  deleteFavoritesProductAllAuthed,
  deleteFavoritesProductAuthed,
} from "@/api/clientRequest";

interface IFavoritesProps {
  favoriteData: IFavoritesModel[];
  authToken: string | undefined;
}

export default function Favorites({
  favoriteData,
  authToken,
}: IFavoritesProps) {
  const [favorites, setFavorites] = useState<any[]>(favoriteData);
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const removeFromFavorites = (id_tov: number) => {
    const updatedFavorites = favorites.filter((fav) => fav.id_tov !== id_tov);
    setFavorites(updatedFavorites);
    if (authToken) {
      deleteFavoritesProductAuthed(authToken, id_tov);
    }
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
  const deleteFavoritesProductSelected = () => {
    if (authToken) {
      const selectedIdsArray: number[] = selectedIds
        .split(",")
        .map((id) => parseInt(id, 10));
      deleteFavoritesProductAllAuthed(authToken, selectedIdsArray)
        .then(() => {
          openModal();
        })
        .catch((error) => {
          console.error("Failed to clear cart:", error);
        });
    }
  };
  useEffect(() => {
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isModalVisible) {
      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
      body.style.top = `-${window.scrollY}px`; // Remember the current scroll position
    } else {
      const scrollY = body.style.top;
      body.style.paddingRight = "";
      body.style.overflow = "auto";
      window.scrollTo(0, parseInt(scrollY || "0") * -1); // Return to the previous scroll position
      body.style.top = "";
    }
  }, [isModalVisible]);

  return (
    <section className={styles.favorites}>
      <>
        <div
          className={cn(styles.modalOpen, {
            [styles.modalOpen__active]: isModalVisible,
          })}
        >
          <div className={styles.modalOpen__xmark}>
            <h2>Удалить товары</h2>
            <button
              className={styles.modalOpen__xmark__btn}
              onClick={openModal}
            >
              <XMark />
            </button>
          </div>
          <p className={styles.modalOpen__parap}>
            Вы точно хотите удалить выбранные товары? Отменить данное действие
            будет невозможно.
          </p>
          <button
            className={styles.modalOpen__button}
            onClick={deleteFavoritesProductSelected}
          >
            Удалить
          </button>
        </div>
        {isModalVisible && (
          <div onClick={openModal} className={styles.modalBackdrop}></div>
        )}
      </>
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
              aria-label="select all products"
              className={styles.checkBoxContainer}
              onClick={handleSelectAll}
            >
              <span
                className={cn("showFiltersUlContainer__check", {
                  ["showFiltersUlContainer__checkActive"]: selectedIds,
                })}
              >
                {selectedIds ? (
                  <Image
                    src="/img/checkIconWhite.svg"
                    width={15}
                    height={15}
                    alt="check"
                  />
                ) : (
                  <Image
                    src="/img/checkIconWhite.svg"
                    width={15}
                    height={15}
                    alt="check"
                  />
                )}
              </span>
              Выбрать все товары
            </button>
            <button
              aria-label="delete products"
              onClick={openModal}
              disabled={selectedIds.length <= 0}
              className={styles.trashButton}
            >
              <TrashIcon />
            </button>
          </div>

          <div className="cards">
            {favorites.map((item, index) => {
              return (
                <Card
                  removeFromFavorites={removeFromFavorites}
                  cardData={item}
                  key={index}
                  // selectedIds={selectedIds}
                  // setSelectedIds={setSelectedIds}
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
