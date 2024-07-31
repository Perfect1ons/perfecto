"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { url } from "@/components/temporary/data";
import { ICard } from "@/types/Card/card";
import BasketCard from "./BasketCard/BasketCard";
import { Model } from "@/types/Basket/getBasketProduct";
import InformationModal from "@/components/UI/InformationModal/InformationModal";
import Link from "next/link";

interface IBasketProductsProps {
  items: any;
  cartId: string | null | undefined;
  deleteItem: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ICard
  ) => void;
}

const BasketProducts = ({
  items,
  cartId,
  deleteItem,
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

  const handleFavoriteClick = (e: React.MouseEvent, cardData: ICard) => {
    e.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let message: string | JSX.Element = "";

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
      message = (
        <>
          Товар добавлен в избранное.{" "}
          <Link className="linkCart" href="/favorites">
            Нажмите, чтобы перейти к списку.
          </Link>
        </>
      );
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

  return (
    <div className={styles.cardsAllContainer}>
      <InformationModal visible={isModalVisible} onClose={handleModalClose}>
        {modalMessage}
      </InformationModal>
      {items.map((item: Model) => {
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
            isFavorite={isFavorite}
            rating={Math.floor(item.ocenka)}
            handleFavoriteClick={(e: React.MouseEvent) =>
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
          />
        );
      })}
    </div>
  );
};

export default BasketProducts;
