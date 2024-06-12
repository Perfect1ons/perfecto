"use client";
import { ICardProductItems } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import {
  ArrowDropdown,
  ArrowLeftIcon,
  CartIcon,
  HeartIconShare,
  HeartIconShareFill,
  SalesmanIcon,
  ShareIcon,
} from "../../../../public/Icons/Icons";
import cn from "clsx";
import { useState } from "react";
import CartReducerBtn from "@/components/UI/CartReducerBtn/CartReducerBtn";
import UserInfoModal from "@/components/UI/UserInfoModal/UserInfoModal";
import { RootState } from "@/store";
import Link from "next/link";
import clsx from "clsx";
import useMediaQuery from "@/hooks/useMediaQuery";
import MobileBuyBtn from "../MobileBuyBtn/MobileBuyBtn";

interface IPriceProps {
  data: ICardProductItems;
}

const ItemPriceCard = ({ data }: IPriceProps) => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width: 992px)");

  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.items.id);

  const [dropdownActive, setDropdownActive] = useState(false);

  const [modal, setModal] = useState(false);
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const [copy, setCopy] = useState(false);

  const [ipOpen, setIpOpen] = useState(false);

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

  const addToCart = () => {
    dispatch(addProductToCart(data.items));
    setAdded(true);
    setModal(true);
    setTimeout(() => setModal(false), 5000);
  };
  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  const handleCartEmpty = () => {
    setAdded(false);
  };
  const closeModalCart = () => {
    setModal(false);
  };
  const closeModalCopy = () => {
    setCopy(false);
  };

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
  };

  return (
    <>
      <MobileBuyBtn
        data={data}
        handleCartEmpty={handleCartEmpty}
        product={product}
        handleAddToCart={handleAddToCart}
        shouldFocusInput={shouldFocusInput}
        onFocusHandled={() => setShouldFocusInput(false)}
      />

      <section className={styles.section_wrap}>
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
            <UserInfoModal visible={modal} onClose={closeModalCart}>
              Ваш товар добавлен в корзину. <br />
              Перейдите в корзину чтобы оформить заказ!{" "}
              <Link className={styles.linkCart} href={"/cart"}>
                Перейти в корзину
              </Link>
            </UserInfoModal>
            {!product?.quantity && (
              <button
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
              <CartReducerBtn
                data={data.items}
                onCartEmpty={handleCartEmpty}
                shouldFocusInput={shouldFocusInput}
                onFocusHandled={() => setShouldFocusInput(false)}
              />
            )}
            {data.items?.cenaok < 1000 ? null : (
              <button className={styles.ItemPriceCard__buttons_buy}>
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
              title="Добавить в избранное"
              className={cn(styles.heartIconShare, {
                [styles.heartIconShareFill]: favorite,
              })}
            >
              <span className="add__to_fav_icon">
                {favorite ? <HeartIconShareFill /> : <HeartIconShare />}
              </span>
            </button>
            <span
              className={cn(
                styles.share_btnControl_info,
                dropdownActive && styles.share_btnControl_info_active
              )}
            >
              {/* {favorite ? "Товар в избранном" : "Добавить в избранное"} */}
              Добавить в избранное
            </span>
          </div>
          <div className={styles.share} title="Копировать ссылку">
            <div
              className={styles.share_btnControl}
              onClick={() => handleCopyLink(window.location.href)}
            >
              <button
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
