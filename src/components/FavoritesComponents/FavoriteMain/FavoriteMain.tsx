"use client";
import React, { useEffect, useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import { IFavoritesModel } from "@/types/Favorites/favorites";
import Card from "@/components/UI/Card/Card";
import FavoritesIsEmpty from "./FavoritesIsEmpty";
import Image from "next/image";
import { TrashIcon, XMark } from "../../../../public/Icons/Icons";
import FavoritesPagination from "../FavoritesPagination/FavoritesPagination";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useSearchParams } from "next/navigation";
import useFavorites from "@/hooks/useFavorites";
import { initial } from "lodash";

interface IFavoritesProps {
  favoriteData: any[];
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
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams?.get("page") || "1", 10);

  const { deleteFavAll, refreshFav } = useFavorites();

  const [currentPage, setCurrentPage] = useState(initialPage);

  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  const pageCount = Math.ceil(favCount / 20);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const fetchFav = async (page: number) => {
    try {
      const response = await refreshFav(page);

      if (response) {
        const existingFavorites = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );

        const newFavorites = response.model.filter(
          (fav) =>
            !existingFavorites.some(
              (existingFav: any) => existingFav.id_tov === fav.id_tov
            )
        );

        const updatedFavorites = [...existingFavorites, ...newFavorites];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        window.scrollTo(0, 0);
      }
    } catch (e) {
      console.log("favorite fetching error:", e);
    }
  };

  const openModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const count = localStorage.getItem("favCount");
    if (count) {
      setFavoriteCount(parseInt(count));
    }
    window.dispatchEvent(new Event("favUpdated"));
  }, [favorites]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );

      const newFavorites = favoriteData.filter(
        (fav) =>
          !existingFavorites.some(
            (existingFav: any) => existingFav.id_tov === fav.id_tov
          )
      );

      const updatedFavorites = [...existingFavorites, ...newFavorites];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      localStorage.setItem("favCount", JSON.stringify(favCount));

      setFavoriteCount(Number(localStorage.getItem("favCount")));
    }
  }, [favoriteData, favCount]);

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
      deleteFavAll(selectedIds)
        .then(() => {
          const updatedFavorites = favorites.filter(
            (item) => !selectedIds.includes(item.id_tov)
          );
          setFavorites(updatedFavorites);
          setSelectedIds([]);
          openModal();
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        })
        .catch((error) => {
          console.error("Failed to clear favorites:", error);
        });
    }
  };

  const deleteFavorites = (id_tov: number[]) => {
    if (authToken) {
      deleteFavAll(id_tov)
        .then(() => {
          const updatedFavorites = favorites.filter(
            (item) => !id_tov.includes(item.id_tov)
          );
          setFavorites(updatedFavorites);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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

  const updateUrl = (newPage: number) => {
    const params = new URLSearchParams();

    params.set("page", newPage.toString());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);
  };

  const pageClick = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    fetchFav(newPage);
    setCurrentPage(newPage);
    updateUrl(newPage);

    window.location.reload();
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
      {favoriteData.length > 0 ? (
        <>
          <div className={cn(styles.favorites__card_header, "container")}>
            <h1 className={styles.favorites__card_title}>
              В избранном{" "}
              <span className={styles.favorites__card_count}>
                {favoriteCount}
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
            {favoriteData.map((item, index) => {
              return (
                <Card
                  cardData={item}
                  key={index}
                  selectedIds={selectedIds}
                  isSelected={true}
                  handleSelectionToggle={handleSelectionToggle}
                  deleteFavorites={deleteFavorites}
                />
              );
            })}
          </div>
          {favoriteCount > 20 && (
            <FavoritesPagination
              isMobile={isMobile}
              handlePageClick={pageClick}
              currentPage={initialPage - 1}
              pageCount={pageCount}
            />
          )}
        </>
      ) : (
        <FavoritesIsEmpty />
      )}
    </section>
  );
}
