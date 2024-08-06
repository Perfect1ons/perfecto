"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { url } from "@/components/temporary/data";
import { ICard } from "@/types/Card/card";
import BasketCard from "./BasketCard/BasketCard";
import { Model } from "@/types/Basket/getBasketProduct";
import InformationModal from "@/components/UI/InformationModal/InformationModal";
import Link from "next/link";
import {
  deleteFavoritesProductAuthed,
  postFavorite,
} from "@/api/clientRequest";
import AuthModal from "@/components/AuthModal/AuthModal";

interface IBasketProductsProps {
  items: any;
  cartId: string | null | undefined;
  deleteItem: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ICard
  ) => void;
  authToken: string | undefined;
}

const BasketProducts = ({
  items,
  cartId,
  deleteItem,
  authToken,
}: IBasketProductsProps) => {
  // Initialize with currentItems
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | JSX.Element>("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState<{
    [key: string]: boolean;
  }>({});
  useEffect(() => {
    updateFavoriteItems();
  }, []);

  const updateFavoriteItems = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavorites = favorites.reduce(
      (acc: { [key: string]: boolean }, favItem: ICard) => {
        acc[favItem.id_tov] = true;
        return acc;
      },
      {}
    );
    setFavoriteItems(updatedFavorites);
  };

  const [added, setAdded] = useState(false);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const [allItemsSelected, setAllItemsSelected] = useState(false); // State to track if all items are selected
  const handleToggleAllItems = () => {
    setAllItemsSelected(!allItemsSelected);
  };
  const [isAuthVisible, setAuthVisible] = useState(false);

  const openAuthModal = () => setAuthVisible(!isAuthVisible);

  const handleFavoriteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    item: ICard
  ) => {
    e.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let message: string | JSX.Element = "";
    if (!authToken) {
      openAuthModal();
      return;
    }
    try {
      if (favoriteItems[item.id_tov]) {
        favorites = favorites.filter(
          (fav: ICard) => fav.id_tov !== item.id_tov
        );
        message = "Товар удален из избранного.";
        if (authToken) {
          await deleteFavoritesProductAuthed(authToken, item.id_tov);
          setFavoriteItems((prev) => ({ ...prev, [item.id_tov]: false }));
        }
      } else {
        // Добавляем товар в избранное
        const response = await postFavorite(item.id_tov, 1, authToken);
        if (response) {
          favorites.push(response);
          message = (
            <>
              Товар добавлен в избранное.{" "}
              <Link className="linkCart" href="/favorites">
                Нажмите, чтобы перейти к списку.
              </Link>
            </>
          );
          setFavoriteItems((prev) => ({ ...prev, [item.id_tov]: true }));
        } else {
          message = "Не удалось добавить товар в избранное.";
        }
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      window.dispatchEvent(new Event("favoritesUpdated"));
      setModalMessage(message);
      setModalVisible(true);
    } catch (error) {
      console.error("Error handling favorite click:", error);
      setModalMessage("Произошла ошибка при обработке запроса.");
      setModalVisible(true);
    }
  };

  const handleCartEmpty = () => {
    setAdded(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.cardsAllContainer}>
      <AuthModal isVisible={isAuthVisible} close={openAuthModal} />
      <InformationModal visible={isModalVisible} onClose={handleModalClose}>
        {modalMessage}
      </InformationModal>
      {items &&
        items.map((item: Model) => {
          const imageUrl =
            item.photos?.length > 0
              ? item.photos[0]?.url_part.startsWith("https://goods")
                ? `${item.photos[0]?.url_part}280.jpg`
                : item.photos[0]?.url_part.startsWith("https://")
                ? item.photos[0]?.url_part
                : `${url}nal/img/${item.id_post}/l_${item.photos[0]?.url_part}`
              : "/img/noPhoto.svg";
          const isFavorite = favoriteItems[item.id_tov] || false;
          return (
            <BasketCard
              key={item.id_tov}
              item={item}
              imageUrl={imageUrl}
              isFavorite={isFavorite}
              rating={Math.floor(item.ocenka)}
              handleFavoriteClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleFavoriteClick(e, item)
              }
              removeFromCart={(e: React.MouseEvent<HTMLButtonElement>) =>
                deleteItem(e, item)
              }
              handleCartEmpty={handleCartEmpty}
              shouldFocusInput={shouldFocusInput}
              setShouldFocusInput={() => setShouldFocusInput(false)}
              selected={item.selected}
              id_cart={cartId}
              authToken={authToken}
            />
          );
        })}
    </div>
  );
};

export default BasketProducts;
