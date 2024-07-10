"use client";
import { useState, useEffect } from "react";
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
import FavoriteModal from "@/components/FavoritesComponents/FavoritesModal/FavoritesModal";
import CartReducerBtn from "../CartReducerBtn/CartReducerBtn";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import { RootState } from "@/store";
import ImageSlider from "@/components/UI/Card/ImageSlider/ImageSlider";

interface IcardDataProps {
  cardData: ICard;
  loading?: boolean;
}

const Card = ({ cardData }: IcardDataProps) => {
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

  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    setRating(Math.floor(cardData.ocenka));
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(
      favorites.some((fav: ICard) => fav.id_tov === cardData.id_tov)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData.ocenka, cardData.id_tov]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
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
      minQty: cardData.minQty
    };

    if (isFavorite) {
      favorites = favorites.filter(
        (fav: ICard) => fav.id_tov !== cardData.id_tov
      );
      message = "Товар удален из избранного.";
      setIsRedirect(false);
    } else {
      favorites.push(favoriteData);
      message = "Товар добавлен в избранное. Нажмите, чтобы перейти к списку.";
      setIsRedirect(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event("favoritesUpdated"));

    // Показываем модалку с соответствующим сообщением
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleCardClick = () => {
    window.location.href = `/item/${cardData.id_tov}/${cardData.url}`;
  };

  const maxLength = 40;
  const maxLengthDdos = 32;
  const truncatedTitle = truncateText(cardData.naim, maxLength);
  const truncatedDdos = truncateText(cardData.ddos, maxLengthDdos);

  const [added, setAdded] = useState(false);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);

  const handleCartEmpty = () => {
    setAdded(false);
  };

  const [cartModal, setCartModal] = useState(false);

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addProductToCart(cardData));
    setAdded(true);
    setCartModal(true);
    setTimeout(() => setCartModal(false), 5000);
  };

  const handleAddToCart = () => {
    addToCart();
    setShouldFocusInput(true);
  };

  const closeModalCart = () => {
    setCartModal(false);
  };

  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === cardData.id);

  return (
    <>
      <UserInfoModal visible={cartModal} onClose={closeModalCart}>
        Ваш товар добавлен в корзину. <br />
        Перейдите в корзину чтобы оформить заказ!{" "}
        <Link className="linkCart" href={"/cart"}>
          Перейти в корзину
        </Link>
      </UserInfoModal>
      <FavoriteModal
        isVisible={isModalVisible}
        message={modalMessage}
        isRedirect={isRedirect}
        onClose={handleModalClose}
      />
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
              isFavorite ? "Удалить из избранного" : "Добавить в избранное"
            }
            className={`card__info_addFavorites ${
              isFavorite ? "card__info_addedFavorites" : ""
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
          {!product?.quantity && (
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
          {product?.quantity && (
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
