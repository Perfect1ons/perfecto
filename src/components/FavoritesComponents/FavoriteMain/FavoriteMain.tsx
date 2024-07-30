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
import ReactPaginate from "react-paginate";
import useMediaQuery from "@/hooks/useMediaQuery";
<<<<<<< HEAD
import dynamic from "next/dynamic";
import { IFavoritesModel } from "@/types/Favorites/favorites";
import FavoritesIsEmpty from "./FavoritesIsEmpty";
import Card from "@/components/UI/Card/Card";
import { AuthContext } from "@/context/AuthContext";
import { removeFavorite } from "@/api/clientRequest";
const FavoritesPagination = dynamic(
  () => import("../FavoritesPagination/FavoritesPagination")
);
interface IFavoritesProps {
  favoriteData: IFavoritesModel[];
}

export default function FavoriteMain({ favoriteData }: IFavoritesProps) {
  const [favorites, setFavorites] = useState<IFavoritesModel[]>(favoriteData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 100; 
  const { token } = useContext(AuthContext);
=======

export default function FavoriteMain() {
  const [favorites, setFavorites] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 100; // Показывать по 100 товаров на странице

>>>>>>> 11ebbbb9f850bf6bbc2a0b4570055f23a441a431
  const isMobile = useMediaQuery("(max-width: 480px)");
  const offset = currentPage * itemsPerPage;
  const currentItems = favorites.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
    setIsLoading(false);

    // Read the page number from the URL when the component mounts
    const queryParams = new URLSearchParams(window.location.search);
    const page = parseInt(queryParams.get("page") || "1", 10);
    setCurrentPage(page - 1); // Set the current page (subtract 1 because pages are zero-indexed)
  }, []);

  const removeFromFavorites = (id_tov: number) => {
    const updatedFavorites = favorites.filter((fav) => fav.id_tov !== id_tov);
    setFavorites(updatedFavorites);
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

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    const newPage = selected + 1;
    const queryParams = new URLSearchParams();

    if (newPage > 0) queryParams.set("page", newPage.toString());
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Calculate total pages based on favorites length and itemsPerPage
  const pageCount = Math.ceil(favorites.length / itemsPerPage);

  return (
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
              {/* Render empty state */}
              <div className={styles.section__isEmpty}>
                <div className={styles.content}>
                  <div
                    className={cn("mascot_sprite", "mascot_sprite_favorite")}
                  ></div>
                  <div className={styles.content_text}>
                    <h2 className={styles.content_text_h3}>
                      Товаров в Избранном нет.
                    </h2>
                    <p>Добавляйте понравившиеся товары в избранное</p>
                  </div>
                </div>
                <Link href="/" className={styles.linkToMain}>
                  Перейти на главную
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.favorites__card}>
              {/* Render favorites list */}
              <div className={cn(styles.favorites__card_header, "container")}>
                <h2 className={styles.favorites__card_title}>
                  В избранном{" "}
                  <span className={styles.favorites__card_count}>
                    {favorites.length}
                  </span>{" "}
                  {favorites.length % 10 === 1 && favorites.length % 100 !== 11
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
                {currentItems.map((item) => (
                  <Card
                    key={item.id_tov}
                    cardData={item}
                    removeFromFavorites={removeFromFavorites}
                  />
                ))}
              </div>
              {pageCount > 1 && (
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  forcePage={currentPage}
                  breakLabel={isMobile ? ".." : "..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={isMobile ? 2 : 3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item-btn"}
                  previousLinkClassName={"page-link-previous"}
                  nextClassName={"page-item-btn"}
                  nextLinkClassName={"page-link-next"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
