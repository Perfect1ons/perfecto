"use client";
import cn from "clsx";
import BasketProducts from "./BasketProducts/BasketProducts";
import Link from "next/link";
import BasketOrder from "./BasketOrder/BasketOrder";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TrashIcon, XMark } from "../../../public/Icons/Icons";
import styles from "./style.module.scss";
import useMediaQuery from "@/hooks/useMediaQuery";
import ReactPaginate from "react-paginate";
import {
  deleteBasketProduct,
  deleteBasketProductAll,
  deleteBasketProductAllAuthed,
  deleteBasketProductAuthedIdTov,
} from "@/api/clientRequest";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { ICard } from "@/types/Card/card";
import { ICityFront } from "@/types/Basket/cityfrontType";
import { IPaymentMethod } from "@/types/Basket/PaymentMethod";
import { IProfileData } from "@/types/Profile/PersonalData";
interface IBasketProps {
  paymentMethod: IPaymentMethod;
  deliveryMethod: IDeliveryMethod;
  authToken: string | undefined;
  deliveryCity: ICityFront;
  cart: any;
  cartId: string | null | undefined;
  user: IProfileData;
}

const Basket = ({
  paymentMethod,
  deliveryMethod,
  authToken,
  deliveryCity,
  cart,
  cartId,
  user,
}: IBasketProps) => {
  const [selectAll, setSelectAll] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allItemsSelected, setAllItemsSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Show 20 items per page

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartItemsGuest, setCartItemsGuest] = useState<any[]>([]);

  const storedCartItems = localStorage.getItem("cartItems");
  const storedCartItemsGuest = localStorage.getItem("cartItemsGuest");

  const isMobile = useMediaQuery("(max-width: 480px)");
  useEffect(() => {
    // Get cartItems from localStorage
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    if (storedCartItemsGuest) {
      setCartItemsGuest(JSON.parse(storedCartItemsGuest));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const which = authToken ? cartItems : cartItemsGuest;
  const updateLocalStorage = (items: ICard[], isGuest: boolean) => {
    const key = isGuest ? "cartItemsGuest" : "cartItems";
    localStorage.setItem(key, JSON.stringify(items));
  };
  const openModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const removeFromCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ICard
  ) => {
    event.stopPropagation();
    event.preventDefault();

    const isGuest = !authToken;
    const key = isGuest ? "cartItemsGuest" : "cartItems";
    const storedCartItems = localStorage.getItem(key);

    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      const updatedCartItems = cartItems.filter(
        (cartItem: ICard) => cartItem.id_tov !== item.id_tov
      );

      // Обновляем localStorage и состояние
      updateLocalStorage(updatedCartItems, isGuest);
      if (isGuest) {
        setCartItemsGuest(updatedCartItems);
        deleteBasketProduct(cartId, item.id_tov);
      } else {
        setCartItems(updatedCartItems);
        deleteBasketProductAuthedIdTov(authToken, item.id_tov);
      }
    }
  };

  const handleSelectAllToggle = () => {
    const isGuest = !authToken;
    const key = isGuest ? "cartItemsGuest" : "cartItems";
    const storedCartItems = localStorage.getItem(key);

    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      const allSelected = !selectAll;
      const updatedCartItems = cartItems.map((item: ICard) => ({
        ...item,
        selected: allSelected,
      }));

      // Обновляем localStorage и состояние
      updateLocalStorage(updatedCartItems, isGuest);
      setCartItems(updatedCartItems);
      setSelectAll(allSelected);
    }
  };

  const handleClearCart = () => {
    const isGuest = !authToken;
    const key = isGuest ? "cartItemsGuest" : "cartItems";
    const storedCartItems = localStorage.getItem(key);

    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      const itemsToRemove = cartItems.filter((item: ICard) => item.selected);
      const itemsToKeep = cartItems.filter((item: ICard) => !item.selected);

      if (itemsToRemove.length > 0) {
        if (authToken) {
          deleteBasketProductAllAuthed(
            authToken,
            itemsToRemove.map((item: ICard) => item.id_tov)
          )
            .then(() => {
              updateLocalStorage(itemsToKeep, isGuest);
              setCartItems(itemsToKeep);
              setAllItemsSelected(false);
              openModal();
            })
            .catch((error) => console.error("Failed to clear cart:", error));
        } else {
          deleteBasketProductAll(
            cartId,
            itemsToRemove.map((item: ICard) => item.id_tov)
          )
            .then(() => {
              updateLocalStorage(itemsToKeep, isGuest);
              setCartItems(itemsToKeep);
              setAllItemsSelected(false);
              openModal();
            })
            .catch((error) => console.error("Failed to clear cart:", error));
        }
      } else {
        openModal();
      }
    }
  };

  useEffect(() => {
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isModalVisible) {
      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
      body.style.top = `-${window.scrollY}px`; // Remember the current scroll position
    } else {
      const scrollY = body.style.top;
      body.style.paddingRight = "";
      body.style.overflow = "auto";
      window.scrollTo(0, parseInt(scrollY || "0") * -1); // Return to the previous scroll position
      body.style.top = "";
    }
  }, [isModalVisible]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    const newPage = selected + 1;
    const queryParams = new URLSearchParams();

    if (newPage > 0) queryParams.set("page", newPage.toString());
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Calculate total pages based on cart length and itemsPerPage
  const currentCartItems = authToken ? cartItems : cartItemsGuest;

  // Количество страниц
  const pageCount = Math.ceil(currentCartItems.length / itemsPerPage);
  return (
    <div className="container">
      <>
        <div
          className={cn(styles.modalOpen, {
            [styles.modalOpen__active]: isModalVisible,
          })}
        >
          <div className={styles.modalOpen__xmark}>
            <h2>Удалить товары</h2>
            <button
              className={styles.modalOpen__xmark__btn}
              onClick={openModal}
            >
              <XMark />
            </button>
          </div>
          <p className={styles.modalOpen__parap}>
            Вы точно хотите удалить выбранные товары? Отменить данное действие
            будет невозможно.
          </p>
          <button
            className={styles.modalOpen__button}
            onClick={handleClearCart}
          >
            Удалить
          </button>
        </div>
        {isModalVisible && (
          <div onClick={openModal} className={styles.modalBackdrop}></div>
        )}
      </>

      {(authToken ? cartItems : cartItemsGuest).length <= 0 ? (
        <section className={cn(styles.section)}>
          <div className={styles.content}>
            <div
              className={cn("mascot_sprite", "mascot_sprite_empty_cart")}
            ></div>
            <div className={styles.content_text}>
              <h3 className={styles.content_text_h3}>
                К сожалению ваша корзина пуста
              </h3>
              <p>
                Добавляйте понравившиеся товары в корзину
                <br />
                или авторизуйтесь, если добавляли ранее
              </p>
            </div>
          </div>
          <Link href="/" className={styles.linkToMain}>
            Перейти на главную
          </Link>
        </section>
      ) : (
        <>
          <div className={styles.basketAllContainer}>
            <div className={styles.controlContainer}>
              <h1 className={styles.basketTilte}>Корзина - {`#${cartId}`}</h1>
              <button
                aria-label="select all products"
                className={styles.checkBoxContainer}
                onClick={handleSelectAllToggle}
              >
                <span
                  className={cn("showFiltersUlContainer__check", {
                    ["showFiltersUlContainer__checkActive"]: selectAll,
                  })}
                >
                  {selectAll ? (
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
                Выбрать все товары
              </button>
              <button
                aria-label="delete products"
                onClick={openModal}
                disabled={!cartItems.some((item) => item.selected)}
                className={styles.trashButton}
              >
                <TrashIcon />
              </button>
            </div>
            <div className={styles.cardContainer}>
              <BasketProducts
                items={authToken ? cartItems : cartItemsGuest}
                cartId={cartId}
                deleteItem={removeFromCart}
                authToken={authToken}
              />
              <BasketOrder
                deliveryCity={deliveryCity}
                paymentMethod={paymentMethod}
                deliveryMethod={deliveryMethod}
                authToken={authToken}
                currentItems={authToken ? cartItems : cartItemsGuest}
                user={user}
              />
            </div>
          </div>
        </>
      )}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          forcePage={currentPage}
          breakLabel={isMobile ? ".." : "..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={isMobile ? 2 : 3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item-btn"}
          previousLinkClassName={"page-link-previous"}
          nextClassName={"page-item-btn"}
          nextLinkClassName={"page-link-next"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

export default Basket;
