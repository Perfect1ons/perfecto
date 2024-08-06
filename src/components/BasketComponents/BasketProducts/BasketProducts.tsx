"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { url } from "@/components/temporary/data";
import { ICard } from "@/types/Card/card";
import BasketCard from "./BasketCard/BasketCard";
import { Model } from "@/types/Basket/getBasketProduct";

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

  const handleCartEmpty = () => {
    setAdded(false);
  };

  return (
    <div className={styles.cardsAllContainer}>
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
              rating={Math.floor(item.ocenka)}
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
