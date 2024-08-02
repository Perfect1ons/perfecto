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
  postFavorite,
} from "@/api/clientRequest";
import InformationModal from "../InformationModal/InformationModal";
import { IFavoritesModel } from "@/types/Favorites/favorites";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setBasket } from "@/store/reducers/basket.reducer";

interface IcardDataProps {
  cardData: ICard;
  removeFromFavorites?: (id_tov: number) => void;
  id_cart?: string | null | undefined;
}

const Card = ({ cardData, removeFromFavorites, id_cart }: IcardDataProps) => {
  const { isAuthed, token } = useContext(AuthContext);
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
  const basket = useSelector((state: RootState) => state.basket.basket);
  const dispatch = useDispatch();

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
    const storedBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    const kolCard = storedBasket.find(
      (res: any) => res.id_tov === cardData.id_tov
    );
    if (kolCard) {
      setQuantity(kolCard.quantity || kolCard.kol || 0);
      setAdded(true);
    } else {
      setQuantity(0);
      setAdded(false);
    }
  }, [cardData.id_tov, cardData.minQty]);

  useEffect(() => {
    setRating(Math.floor(cardData.ocenka));
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(
      favorites.some((fav: IFavoritesModel) => fav.id_tov === cardData.id_tov)
    );
  }, [cardData.ocenka, cardData.id_tov]);
  const handleFavoriteClick = (e: React.MouseEvent<HTMLSpanElement>) => {
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
    if (!isAuthed) {
      openAuthModal();
      return;
    }
    if (isFavorite) {
      favorites = favorites.filter(
        (fav: ICard) => fav.id_tov !== cardData.id_tov
      );
      message = "Товар удален из избранного.";
      if (removeFromFavorites) {
        removeFromFavorites(cardData.id_tov);
      }
    } else {
      postFavorite(cardData.id_tov, 1, token);
      favorites.push(favoriteData);
      message = (
        <>
          Товар добавлен в избранное.{" "}
          <Link className="linkCart" href="/favorites">
            Нажмите, чтобы перейти к списку.
          </Link>
        </>
      );
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event("favoritesUpdated"));
    setModalMessage(message);
    setModalVisible(true);
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
      await postBasketProductAuthed(
        token,
        `${cardData.minQty}`,
        `${cardData.id_tov}`
      );
    } else {
      await postBasketProduct(cardData.minQty, cardData.id_tov);
    }
    setAdded(true);
  };
  const handleAddToCart = async () => {
    dispatch(setBasket(cardData));
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
          {!isHomePage && id_cart && added && (
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
