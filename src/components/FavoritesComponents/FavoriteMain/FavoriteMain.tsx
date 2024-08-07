"use client";
import React, { useEffect, useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import { IFavoritesModel } from "@/types/Favorites/favorites";
import Card from "@/components/UI/Card/Card";
import FavoritesIsEmpty from "./FavoritesIsEmpty";
import Image from "next/image";
import { TrashIcon, XMark } from "../../../../public/Icons/Icons";
import { deleteFavoritesProductAllAuthed } from "@/api/clientRequest";
import FavoritesPagination from "../FavoritesPagination/FavoritesPagination";
import useMediaQuery from "@/hooks/useMediaQuery";

interface IFavoritesProps {
  favoriteData: IFavoritesModel[];
  authToken: string | undefined;
  favCount: number;
}

export default function Favorites({
  favoriteData,
  authToken,
  favCount,
}: IFavoritesProps) {
  const [favorites, setFavorites] = useState<any[]>(favoriteData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = favCount / 20;

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("favoritesUpdated"));
  }, [favorites]);

  const openModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === favorites.length) {
      setSelectedIds([]);
    } else {
      const allIds = favorites.map((item) => item.id_tov);
      setSelectedIds(allIds);
    }
  };

  const handleSelectionToggle = (id_tov: number) => {
    const newSelectedIds = selectedIds.includes(id_tov)
      ? selectedIds.filter((id) => id !== id_tov)
      : [...selectedIds, id_tov];
    setSelectedIds(newSelectedIds);
  };

  const deleteFavoritesProductSelected = () => {
    if (authToken) {
      deleteFavoritesProductAllAuthed(authToken, selectedIds)
        .then(() => {
          const updatedFavorites = favorites.filter(
            (item) => !selectedIds.includes(item.id_tov)
          );
          setFavorites(updatedFavorites);
          setSelectedIds([]);
          openModal();
        })
        .catch((error) => {
          console.error("Failed to clear favorites:", error);
        });
    }
  };

  const deleteFav = (id_tov: number[]) => {
    if (authToken) {
      deleteFavoritesProductAllAuthed(authToken, id_tov)
        .then(() => {
          const updatedFavorites = favorites.filter(
            (item) => !id_tov.includes(item.id_tov)
          );
          setFavorites(updatedFavorites);
        })
        .catch((error) => {
          console.error("Failed to clear favorites:", error);
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

  const updateUrl = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.replaceState({}, "", url.toString());
  };

  const pageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
    updateUrl(selected + 1);
    window.location.reload();
    window.scrollTo({ top: 300, behavior: "auto" });
  };

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
                  ["showFiltersUlContainer__checkActive"]:
                    selectedIds.length === favorites.length,
                })}
              >
                {selectedIds.length === favorites.length ? (
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
                  cardData={item}
                  key={index}
                  selectedIds={selectedIds}
                  isSelected={true}
                  handleSelectionToggle={handleSelectionToggle}
                  deleteFav={deleteFav}
                />
              );
            })}
          </div>
          <FavoritesPagination
            currentPage={currentPage}
            pageCount={pageCount}
          />
        </>
      ) : (
        <FavoritesIsEmpty />
      )}
    </section>
  );
}
