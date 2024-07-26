"use client";
import { useDispatch, useSelector } from "react-redux";
import cn from "clsx";
import BasketProducts from "./BasketProducts/BasketProducts";
import { RootState } from "@/store";
import Link from "next/link";
import BasketOrder from "./BasketOrder/BasketOrder";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TrashIcon, XMark } from "../../../public/Icons/Icons";
import styles from "./style.module.scss";
import {
  clearSelectedProducts,
  toggleSelectAllProducts,
} from "@/store/reducers/cart.reducer";
import useMediaQuery from "@/hooks/useMediaQuery";
import ReactPaginate from "react-paginate";
import { PaymentMethod } from "@/types/Basket/PaymentMethod";
import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { SelectCityType } from "@/types/Basket/SelectCity";
import { getBasketProductsType } from "@/types/Basket/getBasketProduct";

interface IBasketProps {
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  authToken: string | undefined;
  deliveryCity: SelectCityType;
  cart: getBasketProductsType;
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
  const dispatch = useDispatch();
  const data = useSelector((store: RootState) => store.cart);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Показывать по 0 товаров на странице

  const isMobile = useMediaQuery("(max-width: 480px)");

  const offset = currentPage * itemsPerPage;
  const currentItems = data.cart.slice(offset, offset + itemsPerPage);

  const openModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  useEffect(() => {
    // Синхронизируем состояние selectAll с выбором всех товаров
    setSelectAll(data.cart.every((product) => product.selected));
  }, [data.cart]);
  const handleSelectAllToggle = () => {
    dispatch(toggleSelectAllProducts());
    setSelectAll(!selectAll);
  };

  const handleClearCart = () => {
    dispatch(clearSelectedProducts());
    setSelectAll(false); // Сброс состояния selectAll после очистки выбранных продуктов
    openModal();
  };
  useEffect(() => {
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isModalVisible) {
      // Устанавливаем стили, чтобы скрыть прокрутку и фиксировать позицию
      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
      body.style.top = `-${window.scrollY}px`; // Запоминаем текущую позицию скролла
    } else {
      // Восстанавливаем нормальные стили для прокрутки
      const scrollY = body.style.top;
      body.style.paddingRight = "";
      body.style.overflow = "auto";
      window.scrollTo(0, parseInt(scrollY || "0") * -1); // Возвращаемся на прежнюю позицию скролла
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

  // Calculate total pages based on favorites length and itemsPerPage
  const pageCount = Math.ceil(cart.count / itemsPerPage);
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

      {cart.count <= 0 ? (
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
            <h1 className={styles.basketTilte}>Корзина - #160989</h1>
            <div
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
            </div>
            <button
              onClick={openModal}
              disabled={!data.cart.some((product) => product.selected)}
              className={styles.trashButton}
            >
              <TrashIcon />
            </button>
          </div>
          <div className={styles.cardContainer}>
            <BasketProducts currentItems={cart.model} cartId={cartId} />
            <BasketOrder
              deliveryCity={deliveryCity}
              paymentMethod={paymentMethod}
              deliveryMethod={deliveryMethod}
              authToken={authToken}
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
