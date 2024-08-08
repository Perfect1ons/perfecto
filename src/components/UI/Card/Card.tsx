"use client";
import React, { useState, useEffect, useContext } from "react";
import { url } from "@/components/temporary/data";
import {
  CardFavoritesIcon,
  CartIcon,
  GrayStar,
  YellowStar,
} from "../../../../public/Icons/Icons";
import Link from "next/link";
import { truncateText } from "@/utils/utils";
import { ICard } from "@/types/Card/card";
import Image from "next/image";
import CartReducerBtn from "../CartReducerBtn/CartReducerBtn";
import ImageSlider from "@/components/UI/Card/ImageSlider/ImageSlider";
import AuthModal from "@/components/AuthModal/AuthModal";
import { AuthContext } from "@/context/AuthContext";
import {
  postBasketProduct,
  postBasketProductAuthed,
} from "@/api/clientRequest";
import InformationModal from "../InformationModal/InformationModal";
import { IFavoritesModel } from "@/types/Favorites/favorites";
import cn from "clsx";
import useFavorites from "@/hooks/useFavorites";

interface IcardDataProps {
  cardData: ICard;
  id_cart?: string | null | undefined;
  selectedIds?: number[];
  isSelected?: boolean;
  handleSelectionToggle?: (id_tov: number) => void;
  deleteFavorites?: (id_tov: number[]) => void;
}

const Card = ({
  cardData,
  id_cart,
  isSelected,
  selectedIds,
  handleSelectionToggle,
  deleteFavorites,
}: IcardDataProps) => {
  const { isAuth, token } = useContext(AuthContext);
  const maxLength = 40;
  const maxLengthDdos = 32;
  const truncatedTitle = truncateText(cardData.naim, maxLength);
  const truncatedDdos = truncateText(cardData.ddos, maxLengthDdos);
  const [added, setAdded] = useState(false);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const [rating, setRating] = useState(0);
  const [isAuthVisible, setAuthVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [modalMessage, setModalMessage] = useState<React.ReactNode>();
  const openAuthModal = () => setAuthVisible(true);
  const closeAuthModal = () => setAuthVisible(false);

  const { postFav, deleteFav } = useFavorites();
  const handleSelectedToggle = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    if (handleSelectionToggle) {
      handleSelectionToggle(cardData.id_tov);
    }
  };
  const [images, setImages] = useState<string[]>(() => {
    const newImages = cardData.photos.map((photo) =>
      photo.url_part.startsWith("https://goods-photos")
        ? `${photo.url_part}280.jpg`
        : photo.url_part.startsWith("https://")
        ? photo.url_part
        : `${url}nal/img/${cardData.id_post}/l_${photo.url_part}`
    );

    if (newImages.length === 0) {
      newImages.push("/img/noPhoto.svg");
    }

    return newImages;
  });

  useEffect(() => {
    const getStoredBasket = (key: string) => {
      return JSON.parse(localStorage.getItem(key) || "[]");
    };
    const findCardInBasket = (basket: any[], id: number) => {
      return basket.find((item: any) => parseInt(item.id_tov) === id);
    };
    const storedBasket = token
      ? getStoredBasket("cartItems")
      : getStoredBasket("cartItemsGuest");
    const kolCard = findCardInBasket(storedBasket, cardData.id_tov);
    if (kolCard) {
      setQuantity(parseInt(kolCard.quantity) || parseInt(kolCard.kol) || 0);
      setAdded(true);
    } else {
      setQuantity(0);
      setAdded(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData.id_tov, cardData.minQty, token]);

  useEffect(() => {
    setRating(Math.floor(cardData.ocenka));
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(
      favorites.some((fav: IFavoritesModel) => fav.id_tov === cardData.id_tov)
    );
  }, [cardData.ocenka, cardData.id_tov]);

  const handleFavoriteClick = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let message: string | JSX.Element = "";
    if (!isAuth) {
      openAuthModal();
      return;
    }
    try {
      if (isFavorite) {
        favorites = favorites.filter(
          (fav: ICard) => fav.id_tov !== cardData.id_tov
        );
        message = "Товар удален из избранного.";
        if (token) {
          deleteFav(cardData.id_tov);
          if (deleteFavorites) {
            deleteFavorites([cardData.id_tov]);
          }
        }
      } else {
        try {
          const response = await postFav(cardData.id_tov, 1);
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
            setIsFavorite(!isFavorite);
          } else {
            message = <p>Не удалось добавить товар в избранное.</p>;
          }
        } catch (error) {
          console.log(error);
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

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleCardClick = async () => {
    window.location.href = `/item/${cardData.id_tov}/${cardData.url}`;
  };

  const handleCartEmpty = () => {
    setAdded(false);
    setQuantity(0);
  };
  // Функция обновления корзины в localStorage

  const addToCart = async () => {
    if (token) {
      try {
        const data = await postBasketProductAuthed(
          token,
          `${cardData.minQty}`,
          `${cardData.id_tov}`
        );

        if (data) {
          let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

          cartItems.push(data);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          window.dispatchEvent(new Event("cartUpdated")); // Вызов события после добавления в корзину
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        const data = await postBasketProduct(cardData.minQty, cardData.id_tov);

        if (data) {
          let cartItemsGuest = JSON.parse(
            localStorage.getItem("cartItemsGuest") || "[]"
          );

          cartItemsGuest.push(data);
          localStorage.setItem(
            "cartItemsGuest",
            JSON.stringify(cartItemsGuest)
          );
          window.dispatchEvent(new Event("cartUpdated")); // Вызов события после добавления в корзину
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    setAdded(true);
  };

  const handleAddToCart = async () => {
    await addToCart();
    setShouldFocusInput(true);
    setModalMessage(
      <>
        Товар добавлен в корзину.{" "}
        <Link className="linkCart" href={"/cart"}>
          Нажмите, чтобы перейти к списку.
        </Link>
      </>
    );
    setModalVisible(true);
  };

  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHomePage(window.location.pathname === "/");
    }
  }, []);
  return (
    <>
      <AuthModal isVisible={isAuthVisible} close={closeAuthModal} />
      <InformationModal visible={isModalVisible} onClose={handleModalClose}>
        {modalMessage}
      </InformationModal>
      <div className="card" onClick={handleCardClick}>
        {cardData.status !== 6 && (
          <div className="card__notAvailable">
            <span className="card__notAvailable_title">СНЯТ С ПРОДАЖИ</span>
          </div>
        )}
        <div className="card__images">
          <Link
            href={`/item/${cardData.id_tov}/${cardData.url}`}
            className="link"
          >
            <ImageSlider images={images} name={cardData.naim} />
            {cardData.discount_prc > 0 ? (
              <div className="card__info_skidkapercent">
                {cardData.discount_prc}%
              </div>
            ) : null}
          </Link>
          <span
            title={
              isAuth && isFavorite
                ? "Удалить из избранного"
                : "Добавить в избранное"
            }
            className={`card__info_addFavorites ${
              isAuth && isFavorite ? "card__info_addedFavorites" : ""
            }`}
            onClick={handleFavoriteClick}
          >
            <CardFavoritesIcon />
          </span>
          {isSelected && (
            <div className="checkBoxPosition">
              <span
                onClick={handleSelectedToggle}
                className={cn("showFiltersUlContainer__check", {
                  ["showFiltersUlContainer__checkActive"]:
                    selectedIds?.includes(cardData.id_tov),
                })}
              >
                {selectedIds?.includes(cardData.id_tov) ? (
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
            </div>
          )}
        </div>
        <div className="card__info">
          <Link
            href={`/item/${cardData.id_tov}/${cardData.url}`}
            className="link"
          >
            {cardData.discount_prc > 0 ? (
              <div className="card__info_price">
                <div className="card__info_skidkaprice">
                  <span className="card__info_skidkaprice_price">
                    {cardData.cenaok?.toLocaleString("ru-RU")}
                  </span>
                  <span className="card__info_skidkaprice_price_custom">с</span>
                </div>

                <div className="card__info_oldprice">
                  <span className="card__info_oldprice_price">
                    {cardData.old_price.toLocaleString("ru-RU")}c
                  </span>
                </div>
              </div>
            ) : (
              <div className="card__info_price">
                <div className="card__info_currentprice">
                  <span className="card__info_currentprice_price">
                    {cardData.cenaok.toLocaleString("ru-RU")}
                  </span>
                  <span className="card__info_currentprice_price_custom">
                    с
                  </span>
                </div>
              </div>
            )}
          </Link>
          <Link
            href={`/item/${cardData.id_tov}/${cardData.url}`}
            className="link"
          >
            <p className="card__info_title">{truncatedTitle}</p>
          </Link>
          <Link
            href={`/item/${cardData.id_tov}/${cardData.url}`}
            className="link"
            aria-label="check item rating"
          >
            <div className="card__info_rating">
              {[...Array(5)].map((_, index) => (
                <span className="card__info_rating_span" key={index}>
                  {index < rating ? <YellowStar /> : <GrayStar />}
                </span>
              ))}
            </div>
          </Link>
          <Link
            href={`/item/${cardData.id_tov}/${cardData.url}`}
            className="link"
          >
            <div className="card__info_ddos">
              <Image
                className="card__info_ddos_icon"
                src={`/img/deliveryIconLightBlue.svg`}
                width={20}
                height={20}
                alt="delivery_icon"
              />
              <p className="card__info_ddos_desc">{truncatedDdos}</p>
            </div>
          </Link>
          {!added && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="card__info_button"
            >
              <button
                disabled={cardData.status !== 6}
                title="Добавить в корзину"
                aria-label="add to cart"
                className="card__info_addproduct"
                onClick={handleAddToCart}
              >
                <span className="card__info_addproduct_icon">
                  <CartIcon />
                </span>
                В корзину
              </button>
            </div>
          )}
          {added && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="card__info_button_active"
            >
              <CartReducerBtn
                data={cardData}
                onCartEmpty={handleCartEmpty}
                shouldFocusInput={shouldFocusInput}
                onFocusHandled={() => setShouldFocusInput(false)}
                id_cart={id_cart}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
