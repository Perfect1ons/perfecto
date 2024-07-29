"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { url } from "@/components/temporary/data";
import { ICard } from "@/types/Card/card";
import FavoriteModal from "@/components/FavoritesComponents/FavoritesModal/FavoritesModal";
import BasketCard from "./BasketCard/BasketCard";
import { Model } from "@/types/Basket/getBasketProduct";
import { deleteBasketProduct } from "@/api/clientRequest";

interface IBasketProductsProps {
  currentItems: Model[];
  cartId: string | null | undefined;
  selected: number[];
  setSelected: React.Dispatch<SetStateAction<number[]>>;
}

const BasketProducts = ({
  currentItems,
  cartId,
  selected,
  setSelected,
}: IBasketProductsProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    updateFavoriteItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const [allItemsSelected, setAllItemsSelected] = useState(false); // State to track if all items are selecte

  const handleToggleAllItems = () => {
    setAllItemsSelected(!allItemsSelected);
  };

  const handleFavoriteClick = (e: React.MouseEvent, cardData: ICard) => {
    e.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let message = "";

    const favoriteData = {
      id: cardData.id,
      id_tov: cardData.id_tov,
      id_post: cardData.id_post,
      old_price: cardData.old_price,
      discount_prc: cardData.discount_prc,
      naim: cardData.naim,
      ddos: cardData.ddos,
      cenaok: cardData.cenaok,
      url: cardData.url,
      photos: cardData.photos,
      ocenka: cardData.ocenka,
      status: cardData.status,
      minQty: cardData.minQty,
    };

    if (favoriteItems[cardData.id_tov]) {
      favorites = favorites.filter(
        (fav: ICard) => fav.id_tov !== cardData.id_tov
      );
      message = "Товар удален из избранного.";
      setFavoriteItems((prev) => ({ ...prev, [cardData.id_tov]: false }));
      setIsRedirect(false);
    } else {
      favorites.push(favoriteData);
      message = "Товар добавлен в избранное. Нажмите, чтобы перейти к списку.";
      setFavoriteItems((prev) => ({ ...prev, [cardData.id_tov]: true }));
      setIsRedirect(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("favoritesUpdated"));

    setModalMessage(message);
    setModalVisible(true);
  };

  const handleCartEmpty = () => {
    setAdded(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  // remove from redux cart storage function
  const removeFromCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ICard
  ) => {
    event.stopPropagation();
    event.preventDefault();

    deleteBasketProduct(cartId, item.id_tov);
  };
  const handleToggleSelection = (id: number) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <div className={styles.cardsAllContainer}>
      <FavoriteModal
        isVisible={isModalVisible}
        message={modalMessage}
        isRedirect={isRedirect}
        onClose={handleModalClose}
      />
      {currentItems.map((item) => {
        const imageUrl =
          item.photos.length > 0
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
            handleToggleSelection={() => handleToggleSelection(item.id_tov)}
            isFavorite={isFavorite}
            rating={Math.floor(item.ocenka)}
            handleFavoriteClick={(e: React.MouseEvent) =>
              handleFavoriteClick(e, item)
            }
            removeFromCart={(e: React.MouseEvent<HTMLButtonElement>) =>
              removeFromCart(e, item)
            }
            handleCartEmpty={handleCartEmpty}
            shouldFocusInput={shouldFocusInput}
            setShouldFocusInput={() => setShouldFocusInput(false)}
            selected={selected.includes(item.id_tov)}
          />
        );
      })}
    </div>
  );
};

export default BasketProducts;
