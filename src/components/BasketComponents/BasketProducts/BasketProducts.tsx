"use client";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import cn from "clsx";
import { clearCart } from "@/store/reducers/cart.reducer";
import Link from "next/link";
import CartReducerBtn from "@/components/UI/CartReducerBtn/CartReducerBtn";
import {
  GrayFavoritesIcon,
  GrayStar,
  TrashIcon,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../../public/Icons/Icons";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { ICard } from "@/types/Card/card";
import FavoriteModal from "@/components/FavoritesComponents/FavoritesModal/FavoritesModal";

const BasketProducts = () => {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const data = useSelector((store: RootState) => store.cart);

  const dispatch = useDispatch();

  const [added, setAdded] = useState(false);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const [allItemsSelected, setAllItemsSelected] = useState(false); // State to track if all items are selecte
  const handleToggleAllItems = () => {
    setAllItemsSelected(!allItemsSelected);
  };

  const handleCartEmpty = () => {
    setAdded(false);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setAllItemsSelected(false);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <div className={styles.cardsAllContainer}>
      <FavoriteModal
        isVisible={isModalVisible}
        message={modalMessage}
        isRedirect={isRedirect}
        onClose={handleModalClose}
      />
      {data.cart.map((item) => {
        const totalPrice = item.cenaok * (item?.quantity ?? 1);
        const imageUrl =
          item.photos.length > 0
            ? item.photos[0]?.url_part.startsWith("https://goods")
              ? `${item.photos[0]?.url_part}280.jpg`
              : item.photos[0]?.url_part.startsWith("https://")
              ? item.photos[0]?.url_part
              : `${url}nal/img/${item.id_post}/l_${item.photos[0]?.url_part}`
            : "/img/noPhoto.svg";
        return (
          <div key={item.id_tov} className={styles.cardsContainer}>
            <div className={styles.leftPart}>
              <div className={styles.leftPart__imageContainer}>
                <Image
                  className={styles.leftPart__imageContainer__image}
                  src={imageUrl}
                  width={200}
                  height={200}
                  alt={item.naim}
                  quality={100}
                  loading="lazy"
                />
              </div>
              <div className={styles.leftPart__informationContainer}>
                <h2 className={styles.leftPart__informationContainer__title}>
                  {item.naim}
                </h2>
                <p className={styles.leftPart__informationContainer__articul}>
                  Код: {item.id_tov}
                </p>
                <div className={styles.ocenka_column}>
                  {[...Array(5)].map((_, index) => (
                    <span key={index}>
                      {index < rating ? <YellowStar /> : <GrayStar />}
                    </span>
                  ))}
                </div>
                <div
                  className={styles.leftPart__informationContainer__delivery}
                >
                  <Image
                    src={`${url}images/delivery_icon.svg`}
                    width={20}
                    height={20}
                    alt="delivery_icon"
                  />
                  <p>{item.ddos}</p>
                </div>
              </div>
            </div>
            <div className={styles.rigthPart}>
              <div className={styles.rigthPart__priceContainer}>
                <span className={styles.default__card_price}>
                  {totalPrice.toLocaleString("ru-RU")}
                  <span className={styles.default__card_price_custom}> с</span>
                </span>
                <div className={styles.rigthPart__priceContainer__buttons}>
                  <button
                    title={
                      isFavorite
                        ? "Удалить из избранного"
                        : "Добавить в избранное"
                    }
                    className={cn("add__to_fav", {
                      ["add__to_fav_active"]: isFavorite,
                    })}
                  >
                    <span className="add__to_fav_icon">
                      {isFavorite ? (
                        <VioletFavoritesIcon />
                      ) : (
                        <GrayFavoritesIcon />
                      )}
                    </span>
                  </button>
                  <button title="Удалить товар" className={cn("add__to_fav")}>
                    <span className="add__to_fav_icon">
                      <TrashIcon />
                    </span>
                  </button>
                </div>
              </div>
              {item.minQty > 1 ? (
                <h3 className={styles.minimal__items}>
                  минимальное количество к заказу от {item.minQty} шт.
                </h3>
              ) : null}
              <div className={styles.add__to_cart_column}>
                <CartReducerBtn
                  data={item}
                  onCartEmpty={handleCartEmpty}
                  shouldFocusInput={shouldFocusInput}
                  onFocusHandled={() => setShouldFocusInput(false)}
                />
              </div>
            </div>
          </div>
        );
      })}
      <button
        className={cn(styles.clearButton, {
          [styles.clearButtonDisabled]: !allItemsSelected,
        })}
        disabled={!allItemsSelected}
        onClick={handleClearCart}
      >
        Очистить корзину
      </button>
    </div>
  );
};

export default BasketProducts;
