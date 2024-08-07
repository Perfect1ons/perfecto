"use client";
import { ICardProductItems } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowDropdown,
  CardFavoritesIcon,
  CartIcon,
  SalesmanIcon,
  ShareIcon,
} from "../../../../public/Icons/Icons";
import cn from "clsx";
import { useContext, useEffect, useRef, useState } from "react";
import UserInfoModal from "@/components/UI/UserInfoModal/UserInfoModal";
import { RootState } from "@/store";
import Link from "next/link";
import clsx from "clsx";
import useMediaQuery from "@/hooks/useMediaQuery";
import MobileBuyBtn from "../MobileBuyBtn/MobileBuyBtn";
import { ICard } from "@/types/Card/card";
import {
  postBasketProductAuthed,
  postTovar,
} from "@/api/clientRequest";
import { AuthContext } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal/AuthModal";
import InformationModal from "@/components/UI/InformationModal/InformationModal";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import useFavorites from "@/hooks/useFavorites";
import ReducerBtn from "@/UI/ReducerBtn/ReducerBtn";

interface IPriceProps {
  data: ICardProductItems;
  id_cart?: string | null | undefined;
}

const ItemPriceCard = ({ data, id_cart }: IPriceProps) => {
  const { isAuth, token, cartId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 992px)");
  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.items.id);

  const [copy, setCopy] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const handleCopyLink = (entryText: string) => {
    navigator.clipboard
      .writeText(entryText)
      .then(() => {
        setDropdownActive(false);
      })
      .catch((err) => {
        console.error("Ошибка при копировании ссылки: ", err);
        setDropdownActive(false);
      });
    setCopy(true);
    setTimeout(() => setCopy(false), 5000);
  };

  const closeModalCopy = () => {
    setCopy(false);
  };

  // добавление в избранное
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAuthVisible, setAuthVisible] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | JSX.Element>("");
  const [added, setAdded] = useState(false);
  const { postFav, deleteFav } = useFavorites();

  const openAuthModal = () => setAuthVisible(true);
  const closeAuthModal = () => setAuthVisible(false);
  useEffect(() => {
    setRating(Math.floor(data.items.ocenka));
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(
      favorites.some((fav: ICard) => fav.id_tov === data.items.id_tov)
    );
  }, [data.items.ocenka, data.items.id_tov]);
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
          (fav: ICard) => fav.id_tov !== data.items.id_tov
        );
        message = "Товар удален из избранного.";
        if (token) {
          deleteFav(data.items.id_tov);
        }
        setIsFavorite(!isFavorite);
      } else {
        try {
          const response = await postFav(data.items.id_tov, 1);
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

  // для открытия модалки ИП (не айпи)
  const [ipOpen, setIpOpen] = useState(false);

  const IpOpenHandler = () => {
    setIpOpen(true);
  };
  const IpCloseHandler = () => {
    setIpOpen(false);
  };
  const ipMobileOpen = () => {
    setIpOpen(!ipOpen);
  };

  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(true);

  useEffect(() => {
    const sectionRefCurrent = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRefCurrent) {
      observer.observe(sectionRefCurrent);
    }

    return () => {
      if (sectionRefCurrent) {
        observer.unobserve(sectionRefCurrent);
      }
    };
  }, [sectionRef]);
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const [cartModal, setCartModal] = useState(false);

  const addToCart = async () => {
    if (token) {
      try {
        setCartModal(true);
        dispatch(addProductToCart(data.items));
        setTimeout(() => setCartModal(false), 3000);
        await postBasketProductAuthed(
          token,
          `${data.items.minQty}`,
          `${data.items.id_tov}`
        );
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        setCartModal(true);
        dispatch(addProductToCart(data.items));
        setTimeout(() => setCartModal(false), 3000);
        await postTovar(data.items.id_tov, data.items.minQty);
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

  const closeModalCart = () => {
    setCartModal(false);
  };

  return (
    <>
      {!isSectionVisible && (
        <MobileBuyBtn data={data} product={product} addToCart={addToCart} />
      )}
      <AuthModal isVisible={isAuthVisible} close={closeAuthModal} />
      <InformationModal visible={isModalVisible} onClose={handleModalClose}>
        {modalMessage}
      </InformationModal>

      <section className={styles.section_wrap} ref={sectionRef}>
        <div className={styles.ItemPriceCard}>
          {data.items?.discount_prc > 0 ? (
            <div className={styles.ItemPriceCard__cost}>
              <span className={styles.ItemPriceCard__price_new}>
                {data.items.cenaok.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__price_new_custom}>
                  с
                </span>
              </span>
              <span className={styles.ItemPriceCard__price_discount}>
                -{data.items.discount_prc}%
              </span>
              <span className={styles.ItemPriceCard__old_price}>
                {data.items.old_price.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__old_price_custom}>
                  с
                </span>
              </span>
            </div>
          ) : (
            <div className={styles.ItemPriceCard__cost}>
              <span className={styles.ItemPriceCard__price}>
                {data.items?.cenaok.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__price_custom}>с</span>
              </span>
            </div>
          )}
          <div className={styles.ItemPriceCard__ddos}>
            <div className={styles.ItemPriceCard__ddos_info}>
              <Image
                className={styles.product_info__ddos_icon}
                src={`${url}images/delivery_icon.svg`}
                width={20}
                height={20}
                alt="delivery_icon"
                loading="lazy"
              />
              <p className={styles.ItemPriceCard__ddos_title}>
                Наличие и доставка!
              </p>
            </div>
            <p className={styles.ItemPriceCard__ddos_desc}>
              <span>{data.items?.ddos}</span>
              {data?.seller?.balance_warehouse &&
                `На складе: ${data.seller.balance_warehouse} шт.`}
            </p>
          </div>
          {data.items?.minQty > 1 ? (
            <p className={styles.ItemPriceCard__minQty}>
              минимальное количество к заказу от {data.items.minQty} шт.
            </p>
          ) : (
            <span className={styles.ItemPriceCard__minQty_none}></span>
          )}
          <div className={styles.ItemPriceCard__buttons}>
            {!product?.quantity && (
              <button
                title="Добавить в корзину"
                aria-label="add to cart"
                onClick={handleAddToCart}
                className={styles.ItemPriceCard__buttons_cart}
              >
                <span className="add__to_cart_icon">
                  <CartIcon />
                </span>
                В корзину
              </button>
            )}
            {product?.quantity && (
              <ReducerBtn
                cartId={cartId}
                token={token}
                data={data.items}
                shouldFocusInput={shouldFocusInput}
                onFocusHandled={() => setShouldFocusInput(false)}
              />
            )}
            {data.items?.cenaok < 1000 ? null : (
              <button
                title="Купить товар"
                aria-label="buy goods"
                className={styles.ItemPriceCard__buttons_buy}
              >
                Купить
              </button>
            )}
          </div>

          {data.seller?.name && !isMobile && (
            <div className={styles.ItemPriceCard__salesman}>
              <h3
                onMouseEnter={IpOpenHandler}
                onMouseLeave={IpCloseHandler}
                className={styles.ItemPriceCard__salesman_title}
              >
                <span className={styles.ItemPriceCard__salesman_title_icon}>
                  <SalesmanIcon />{" "}
                </span>
                <span className={styles.ItemPriceCard__salesman_title_custom}>
                  {data.seller?.name}
                </span>
                <span
                  className={clsx(
                    ipOpen
                      ? styles.ItemPriceCard__salesman_title_arrowUp
                      : styles.ItemPriceCard__salesman_title_arrowDown
                  )}
                >
                  <ArrowDropdown />
                </span>
              </h3>
              {ipOpen && (
                <div className={styles.ItemPriceCard__salesman_ipModal}>
                  <div className={styles.ItemPriceCard__salesman_ipModal_name}>
                    {data.seller.full_name && (
                      <span
                        className={
                          styles.ItemPriceCard__salesman_ipModal_name_text
                        }
                      >
                        OcOO:
                      </span>
                    )}
                    {data.seller.inn && (
                      <span
                        className={
                          styles.ItemPriceCard__salesman_ipModal_name_text
                        }
                      >
                        ИНН:
                      </span>
                    )}
                  </div>
                  <div className={styles.ItemPriceCard__salesman_ipModal_info}>
                    {data.seller.full_name && (
                      <span
                        className={
                          styles.ItemPriceCard__salesman_ipModal_info_text
                        }
                      >
                        {data.seller.full_name}
                      </span>
                    )}
                    {data.seller.inn && (
                      <span
                        className={
                          styles.ItemPriceCard__salesman_ipModal_info_text
                        }
                      >
                        {data.seller.inn}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {data.seller?.name && isMobile && (
            <div
              onClick={ipMobileOpen}
              className={styles.ItemPriceCard__salesman}
            >
              <h3 className={styles.ItemPriceCard__salesman_title}>
                <span className={styles.ItemPriceCard__salesman_title_icon}>
                  <SalesmanIcon />{" "}
                </span>
                <span className={styles.ItemPriceCard__salesman_title_custom}>
                  {data.seller?.name}
                </span>
                <span
                  className={clsx(
                    ipOpen
                      ? styles.ItemPriceCard__salesman_title_arrowUp
                      : styles.ItemPriceCard__salesman_title_arrowDown
                  )}
                >
                  <ArrowDropdown />
                </span>
              </h3>
              {ipOpen && (
                <div className={styles.ItemPriceCard__salesman_ipModal}>
                  <div className={styles.ItemPriceCard__salesman_ipModal_name}>
                    {data.seller.full_name && (
                      <span
                        className={
                          styles.ItemPriceCard__salesman_ipModal_name_text
                        }
                      >
                        OcOO:
                      </span>
                    )}
                    {data.seller.inn && (
                      <span
                        className={
                          styles.ItemPriceCard__salesman_ipModal_name_text
                        }
                      >
                        ИНН:
                      </span>
                    )}
                  </div>
                  <div className={styles.ItemPriceCard__salesman_ipModal_info}>
                    {data.seller.full_name && (
                      <span
                        className={
                          styles.ItemPriceCard__salesman_ipModal_info_text
                        }
                      >
                        {data.seller.full_name}
                      </span>
                    )}
                    {data.seller.inn && (
                      <span
                        className={
                          styles.ItemPriceCard__salesman_ipModal_info_text
                        }
                      >
                        {data.seller.inn}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.shareIcon}>
          <div
            className={styles.share_btnControl}
            onClick={handleFavoriteClick}
          >
            <button
              aria-label="add to favorites"
              title={
                isFavorite ? "Удалить из избранного" : "Добавить в избранное"
              }
              className={cn(styles.heartIconShare, {
                [styles.heartIconShareFill]: favorite,
              })}
            >
              <span
                title={
                  isFavorite ? "Удалить из избранного" : "Добавить в избранное"
                }
                className={`add__to_fav_icon ${
                  isFavorite ? "card__info_addedFavorites" : ""
                }`}
                onClick={handleFavoriteClick}
              >
                <CardFavoritesIcon />
              </span>
            </button>
            <span
              className={cn(
                styles.share_btnControl_info,
                dropdownActive && styles.share_btnControl_info_active
              )}
            >
              {isFavorite ? "В избранном" : "Добавить в избранное"}
            </span>
          </div>
          <div className={styles.share} title="Копировать ссылку">
            <div
              className={styles.share_btnControl}
              onClick={() => handleCopyLink(window.location.href)}
            >
              <button
                aria-label="copy link"
                className={cn(
                  styles.share_btnControl_shareBtn,
                  dropdownActive && styles.share_btnControl_shareBtn_active
                )}
              >
                <ShareIcon />
              </button>
              <span
                className={cn(
                  styles.share_btnControl_info,
                  dropdownActive && styles.share_btnControl_info_active
                )}
              >
                Поделиться
              </span>
            </div>
            <UserInfoModal visible={copy} onClose={closeModalCopy}>
              Ссылка скопирована
            </UserInfoModal>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemPriceCard;
