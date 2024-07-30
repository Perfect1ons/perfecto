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
  deleteBasketProductAuthed,
} from "@/api/clientRequest";

import { PaymentMethod } from "@/types/Basket/PaymentMethod";
import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { SelectCityType } from "@/types/Basket/SelectCity";
import { Model } from "@/types/Basket/getBasketProduct";
import { ICard } from "@/types/Card/card";

interface IBasketProps {
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  authToken: string | undefined;
  deliveryCity: SelectCityType;
  cart: any;
  cartId: string | null | undefined;
}

const Basket = ({
  paymentMethod,
  deliveryMethod,
  authToken,
  deliveryCity,
  cart,
  cartId,
}: IBasketProps) => {
  const [selectAll, setSelectAll] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items, setItems] = useState<Model[]>([]);
  const [allItemsSelected, setAllItemsSelected] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Show 20 items per page

  const isMobile = useMediaQuery("(max-width: 480px)");

  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    if ("model" in cart) {
      setItems(cart.model);
    } else {
      setItems(cart);
    }
  }, [cart]);

  const openModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const removeFromCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ICard
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (authToken) {
      deleteBasketProductAuthed(authToken, item.id_box, item.id_tov)
        .then(() => {
          setItems((prevItems) =>
            prevItems.filter((i) => i.id_tov !== item.id_tov)
          );
        })
        .catch((error) => {
          console.error("Failed to remove item from cart:", error);
        });
    } else {
      deleteBasketProduct(cartId, item.id_tov)
        .then(() => {
          setItems((prevItems) =>
            prevItems.filter((i) => i.id_tov !== item.id_tov)
          );
        })
        .catch((error) => {
          console.error("Failed to remove item from cart:", error);
        });
    }
  };

  const handleSelectAllToggle = () => {
    if (!selectAll) {
      const allIds = items.map((product) => product.id_tov);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
    setSelectAll(!selectAll);
  };

  const handleClearCart = () => {
    deleteBasketProductAll(cartId, selected)
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((i) => !selected.includes(i.id_tov))
        );
        setSelected([]);
        setAllItemsSelected(false); // Reset the state after clearing selected items
        openModal();
      })
      .catch((error) => {
        console.error("Failed to clear cart:", error);
      });
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
  const pageCount = Math.ceil(items.length / itemsPerPage);

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

      {items.length <= 0 ? (
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
              disabled={selected.length === 0}
              className={styles.trashButton}
            >
              <TrashIcon />
            </button>
          </div>
          <div className={styles.cardContainer}>
            <BasketProducts
              items={items}
              cartId={cartId}
              selected={selected}
              setSelected={setSelected}
              deleteItem={removeFromCart}
              setItems={setItems}
            />
            <BasketOrder
              deliveryCity={deliveryCity}
              paymentMethod={paymentMethod}
              deliveryMethod={deliveryMethod}
              authToken={authToken}
              currentItems={items}
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
