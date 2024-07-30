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
import { postBasketProduct, postFavorites } from "@/api/clientRequest";
import InformationModal from "../InformationModal/InformationModal";
import { IFavoritesModel } from "@/types/Favorites/favorites";

interface IcardDataProps {
  favoritesData?: IFavoritesModel[];
  cardData: ICard;
  removeFromFavorites?: (id_tov: number) => void;
}

const Card = ({
  favoritesData,
  cardData,
  removeFromFavorites,
}: IcardDataProps) => {
  const { isAuthed, token } = useContext(AuthContext);
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
  const [rating, setRating] = useState(Math.floor(cardData.ocenka));
  const [isAuthVisible, setAuthVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<React.ReactNode>();
  const maxLength = 40;
  const maxLengthDdos = 32;
  const truncatedTitle = truncateText(cardData.naim, maxLength);
  const truncatedDdos = truncateText(cardData.ddos, maxLengthDdos);
  const [added, setAdded] = useState(false);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);

  const openAuthModal = () => setAuthVisible(true);
  const closeAuthModal = () => setAuthVisible(false);
  const showModal = (message: React.ReactNode) => {
    if (isModalVisible) {
      setModalVisible(false);
      setTimeout(() => {
        setModalMessage(message);
        setModalVisible(true);
      }, 300);
    } else {
      setModalMessage(message);
      setModalVisible(true);
    }
  };
  useEffect(() => {
    if (favoritesData) {
      setIsFavorite(
        favoritesData.some(
          (fav: IFavoritesModel) => fav.id_tov === cardData.id_tov
        )
      );
    }
  }, [cardData.ocenka, cardData.id_tov, favoritesData]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthed) {
      openAuthModal();
      return;
    }


    const message = isFavorite ? (
      "Товар удален из избранного."
    ) : (
      <>
        Товар добавлен в избранное.
        <Link className="linkCart" href={"/favorites"}>
          Нажмите, чтобы перейти к списку.
        </Link>
      </>
    );

    if (isFavorite) {
      favoritesData = favoritesData?.filter(
        (fav: IFavoritesModel) => fav.id_tov !== cardData.id_tov
      );
      if (removeFromFavorites) {
        removeFromFavorites(cardData.id_tov);
      }
    } else {
      postFavorites(1, cardData.id_tov, token);
    }

    showModal(message);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleCardClick = async () => {
    window.location.href = `/item/${cardData.id_tov}/${cardData.url}`;
  };

  const handleCartEmpty = () => {
    setAdded(false);
  };

  const addToCart = async () => {
    await postBasketProduct(cardData.minQty, cardData.id_tov);
    setAdded(true);
  };

  const handleAddToCart = async () => {
    await addToCart();
    setShouldFocusInput(true);
    showModal(
      <>
        Товар добавлен в корзину.{" "}
        <Link className="linkCart" href={"/cart"}>
          Нажмите, чтобы перейти к списку.
        </Link>
      </>
    );
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
              isAuthed && isFavorite
                ? "Удалить из избранного"
                : "Добавить в избранное"
            }
            className={`card__info_addFavorites ${
              isAuthed && isFavorite ? "card__info_addedFavorites" : ""
            }`}
            onClick={handleFavoriteClick}
          >
            <CardFavoritesIcon />
          </span>
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
          {!isHomePage && !added && (
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
          {!isHomePage && added && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="card__info_button_active"
            >
              <CartReducerBtn
                data={cardData}
                onCartEmpty={handleCartEmpty}
                shouldFocusInput={shouldFocusInput}
                onFocusHandled={() => setShouldFocusInput(false)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
