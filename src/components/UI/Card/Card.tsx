"use client";
import { useState, useEffect, useContext } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import ReducerBtn from "@/UI/ReducerBtn/ReducerBtn";
import { AuthContext } from "@/context/AuthContext";
import { postBasketProductAuthed, postTovar } from "@/api/clientRequest";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import useFavorites from "@/hooks/useFavorites";
import { IFavoritesModel } from "@/types/Favorites/favorites";
import InformationModal from "../InformationModal/InformationModal";
import ImageSlider from "./ImageSlider/ImageSlider";
import cn from "clsx";
import AuthModal from "@/components/AuthModal/AuthModal";

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
  const { isAuth, token, cartId } = useContext(AuthContext);
  const maxLength = 40;
  const maxLengthDdos = 32;
  const truncatedTitle = truncateText(cardData.naim, maxLength);
  const truncatedDdos = truncateText(cardData.ddos, maxLengthDdos);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const [isAuthVisible, setAuthVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<React.ReactNode>();
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const openAuthModal = () => setAuthVisible(true);
  const closeAuthModal = () => setAuthVisible(false);
  const { postFav, deleteFav } = useFavorites();
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

  const handleSelectedToggle = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    if (handleSelectionToggle) {
      handleSelectionToggle(cardData.id_tov);
    }
  };

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
          setIsFavorite(!isFavorite);
        }
      } else {
        try {
          const response = await postFav(cardData.id_tov, 1);
          if (response) {
            favorites.push(cardData);
            console.log(cardData);

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

  const dispatch = useDispatch();

  const addToCart = async () => {
    if (token) {
      try {
        dispatch(addProductToCart(cardData));
        await postBasketProductAuthed(
          token,
          `${cardData.minQty}`,
          `${cardData.id_tov}`
        );
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        dispatch(addProductToCart(cardData));
        await postTovar(cardData.id_tov, cardData.minQty);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart();
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

  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === cardData.id);

  return (
    <>
      <AuthModal isVisible={isAuthVisible} close={closeAuthModal} />
      <InformationModal visible={isModalVisible} onClose={handleModalClose}>
        {modalMessage}
      </InformationModal>
      <div className="card">
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
            <h1 className="card__info_title">{truncatedTitle}</h1>
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
              <ReducerBtn
                cartId={cartId}
                token={token}
                data={cardData}
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
