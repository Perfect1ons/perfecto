"use client"
import { IBasketItems } from "@/interfaces/baskets/basket";
import React, { useEffect, useState } from "react";
import BasketsCard from "./BasketsCard";
import { url } from "@/utils/url";
import { removeProductFromCart, toggleProductSelection } from "@/store/reducers/cart.reducer";
import { useDispatch } from "react-redux";
import styles from './style.module.scss'

interface IBasketItemsProps {
  cartData: IBasketItems[];
}

const BasketsItems = ({ cartData }: IBasketItemsProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState<{
    [key: string]: boolean;
  }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    updateFavoriteItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFavoriteItems = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavorites = favorites.reduce(
      (acc: { [key: string]: boolean }, favItem: IBasketItems) => {
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

  const handleCartEmpty = () => {
    setAdded(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const removeFromCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: IBasketItems
  ) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(removeProductFromCart(item.id)); 

  };
  const handleToggleSelection = (id: number) => {
    dispatch(toggleProductSelection(id));
  };
  return (
    <div className={styles.cards}>
      {cartData.map((item) => {
        const imageUrl =
          item.photos.length > 0
            ? item.photos[0]?.url_part.startsWith("https://goods")
              ? `${item.photos[0]?.url_part}280.jpg`
              : item.photos[0]?.url_part.startsWith("https://")
              ? item.photos[0]?.url_part
              : `${url}nal/img/${item.id_post}/l_${item.photos[0]?.url_part}`
            : "/img/noPhoto.svg";
        return (
          <BasketsCard
            removeFromCart={(e: any) => removeFromCart(e, item)}
            handleToggleSelection={() => handleToggleSelection(item.id)}
            key={item.id}
            item={item}
            imageUrl={imageUrl}
            rating={Math.floor(item.ocenka)}
            handleCartEmpty={handleCartEmpty}
            shouldFocusInput={shouldFocusInput}
            setShouldFocusInput={() => setShouldFocusInput(false)}
          />
        );
      })}
    </div>
  );
};

export default BasketsItems;
