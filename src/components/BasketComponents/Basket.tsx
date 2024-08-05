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
  deleteBasketProductAuthed,
} from "@/api/clientRequest";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { ICard } from "@/types/Card/card";
import { useDispatch, useSelector } from "react-redux";
import { setBasket } from "@/store/reducers/basket.reducer";
import {
  removeItem,
  toggleSelectAllProducts,
} from "@/store/reducers/basket.reducer";
import { RootState } from "@/store";
import { clearSelectedProducts } from "@/store/reducers/basket.reducer";
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

  const isMobile = useMediaQuery("(max-width: 480px)");
  const dispatch = useDispatch();
  useEffect(() => {
    if (cart) {
      cart.forEach((product: any) => {
        dispatch(setBasket(product));
      });
    }
  }, [cart, dispatch]);

  const openModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const basket = useSelector((state: RootState) => state.basket.basket);

  const removeFromCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ICard
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (authToken && item.id_box) {
      deleteBasketProductAuthed(authToken, item.id_box, item.id_tov)
        .then(() => {
          // Обновите корзину в Redux после удаления
          dispatch(removeItem(item.id_tov));
        })
        .catch((error) => {
          console.error("Failed to remove item from cart:", error);
        });
    } else {
      deleteBasketProduct(cartId, item.id_tov)
        .then(() => {
          // Обновите корзину в Redux после удаления
          dispatch(removeItem(item.id_tov));
        })
        .catch((error) => {
          console.error("Failed to remove item from cart:", error);
        });
    }
  };
  const handleSelectAllToggle = () => {
    dispatch(toggleSelectAllProducts()); // Dispatch the action to select/deselect all products
    setSelectAll(!selectAll); // Update local state
  };

  const handleClearCart = () => {
    if (authToken) {
      deleteBasketProductAllAuthed(
        authToken,
        basket.filter((item) => item.selected).map((item) => item.id_tov)
      )
        .then(() => {
          // Обновите корзину в Redux после очистки
          dispatch(clearSelectedProducts());
          setAllItemsSelected(false);
          openModal();
        })
        .catch((error) => {
          console.error("Failed to clear cart:", error);
        });
    } else {
      deleteBasketProductAll(
        cartId,
        basket.filter((item) => item.selected).map((item) => item.id_tov)
      )
        .then(() => {
          // Обновите корзину в Redux после очистки
          dispatch(clearSelectedProducts());
          setAllItemsSelected(false);
          openModal();
        })
        .catch((error) => {
          console.error("Failed to clear cart:", error);
        });
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
  const pageCount = Math.ceil(basket?.length / itemsPerPage);

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

      {basket.length <= 0 ? (
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
              disabled={!basket.some((item) => item.selected)}
              className={styles.trashButton}
            >
              <TrashIcon />
            </button>
          </div>
          <div className={styles.cardContainer}>
            <BasketProducts
              items={basket}
              cartId={cartId}
              deleteItem={removeFromCart}
            />
            <BasketOrder
              deliveryCity={deliveryCity}
              paymentMethod={paymentMethod}
              deliveryMethod={deliveryMethod}
              authToken={authToken}
              currentItems={basket}
              user={user}
            />
          </div>
        </div>
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
