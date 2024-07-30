"use client";
import { ICardProductItems } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import {
  ArrowDropdown,
  CardFavoritesIcon,
  CartIcon,
  HeartIconShare,
  HeartIconShareFill,
  SalesmanIcon,
  ShareIcon,
} from "../../../../public/Icons/Icons";
import cn from "clsx";
import { useContext, useEffect, useRef, useState } from "react";
import CartReducerBtn from "@/components/UI/CartReducerBtn/CartReducerBtn";
import UserInfoModal from "@/components/UI/UserInfoModal/UserInfoModal";
import { RootState } from "@/store";
import Link from "next/link";
import clsx from "clsx";
import useMediaQuery from "@/hooks/useMediaQuery";
import MobileBuyBtn from "../MobileBuyBtn/MobileBuyBtn";
import { ICard } from "@/types/Card/card";
import {
  postBasketProduct,
  postBasketProductAuthed,
} from "@/api/clientRequest";
import { AuthContext } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal/AuthModal";
import InformationModal from "@/components/UI/InformationModal/InformationModal";

interface IPriceProps {
  data: ICardProductItems;
  id_cart?: string | null | undefined;
}

const ItemPriceCard = ({ data, id_cart }: IPriceProps) => {
  const dispatch = useDispatch();
  const { isAuthed, token } = useContext(AuthContext);

  const isMobile = useMediaQuery("(max-width: 992px)");

  // логика добавления в корзину в редакс
  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.items.id);

  const addToCart = () => {
    if (token) {
      postBasketProductAuthed(
        token,
        `${data.items.minQty}`,
        `${data.items.id_tov}`
      );
    } else {
      postBasketProduct(data.items.minQty, data.items.id_tov);
    }
    setAdded(true);
  };

  // копирования ссылки
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
  const [modalMessage, setModalMessage] = useState<React.ReactNode>();
  const [added, setAdded] = useState(false);

  const openAuthModal = () => setAuthVisible(true);
  const closeAuthModal = () => setAuthVisible(false);
  useEffect(() => {
    setRating(Math.floor(data.items.ocenka));
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(
      favorites.some((fav: ICard) => fav.id_tov === data.items.id_tov)
    );
  }, [data.items.ocenka, data.items.id_tov]);
  const showModal = (message: React.ReactNode) => {
    // Сначала закрываем старое модальное окно, если оно открыто
    if (isModalVisible) {
      setModalVisible(false);
      setTimeout(() => {
        setModalMessage(message);
        setModalVisible(true);
      }, 300); // Небольшая задержка для плавного перехода
    } else {
      setModalMessage(message);
      setModalVisible(true);
    }
  };
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthed) {
      openAuthModal();
      return;
    }

    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const favoriteData = {
      id: data.items.id,
      id_tov: data.items.id_tov,
      id_post: data.items.id_post,
      old_price: data.items.old_price,
      discount_prc: data.items.discount_prc,
      naim: data.items.naim,
      ddos: data.items.ddos,
      cenaok: data.items.cenaok,
      url: data.items.url,
      photos: data.items.photos,
      ocenka: data.items.ocenka,
      status: data.items.status,
      minQty: data.items.minQty,
    };

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
      favorites = favorites.filter(
        (fav: ICard) => fav.id_tov !== data.items.id_tov
      );
      // if (removeFromFavorites) {
      //   removeFromFavorites(data.items.id_tov);
      // }
    } else {
      favorites.push(favoriteData);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event("favoritesUpdated"));

    showModal(message);
    setIsRedirect(!isFavorite);
  };
  const handleCartEmpty = () => {
    setAdded(false);
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

  // для перевода фокуса на инпут
  const [shouldFocusInput, setShouldFocusInput] = useState(false);

  const handleAddToCart = () => {
    addToCart();
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

  // для отображения MobileBuyBtn на мобильных устройствах
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

  return (
    <>
      {!isSectionVisible && (
        <MobileBuyBtn
          data={data}
          handleCartEmpty={handleCartEmpty}
          product={product}
          addToCart={addToCart}
        />
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
            {!added && (
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
            {added && (
              <CartReducerBtn
                data={data.items}
                onCartEmpty={handleCartEmpty}
                shouldFocusInput={shouldFocusInput}
                onFocusHandled={() => setShouldFocusInput(false)}
                id_cart={id_cart}
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
            {/* <FavoriteModal
              isVisible={isModalVisible}
              message={modalMessage}
              isRedirect={isRedirect}
              onClose={handleModalClose}
            /> */}
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
