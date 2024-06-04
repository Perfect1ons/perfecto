"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import {
  CartIcon,
  CopyIcon,
  GrayFavoritesIcon,
  ShareIcon,
  TgIcon,
  VioletFavoritesIcon,
  WhIcon,
} from "../../../../public/Icons/Icons";
import cn from "clsx";
import { useState } from "react";
import CartReducerBtn from "@/components/UI/CartReducerBtn/CartReducerBtn";
import UserInfoModal from "@/components/UI/UserInfoModal/UserInfoModal";
import { RootState } from "@/store";
import Link from "next/link";

interface IPriceProps {
  data: Items;
}

const ItemPriceCard = ({ data }: IPriceProps) => {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.id);

  const [dropdownActive, setDropdownActive] = useState(false);

  const [modal, setModal] = useState(false);
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const [copy, setCopy] = useState(false);

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

  const handleWhatsAppClick = () => {
    window.location.href = `https://wa.me/?text=${encodeURIComponent(
      window.location.href
    )}`;
    setDropdownActive(!dropdownActive);
  };

  const handleTelegramClick = () => {
    window.location.href = `https://t.me/share/url?url=${encodeURIComponent(
      window.location.href
    )}`;
    setDropdownActive(!dropdownActive);
  };

  const handleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const addToCart = () => {
    dispatch(addProductToCart(data));
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

  return (
    <section className={styles.section_wrap}>
      <div className={styles.ItemPriceCard}>
        {data.discount_prc > 0 ? (
          <div className={styles.ItemPriceCard__cost}>
            <h2 className={styles.ItemPriceCard__price_new}>
              {data.cenaok}
              <span className={styles.ItemPriceCard__price_new_custom}>с</span>
            </h2>
            <span className={styles.ItemPriceCard__price_discount}>
              -{data.discount_prc}%
            </span>
            <h2 className={styles.ItemPriceCard__old_price}>
              {data.old_price.toLocaleString("ru-RU")}
              <span className={styles.ItemPriceCard__old_price_custom}>с</span>
            </h2>
          </div>
        ) : (
          <div className={styles.ItemPriceCard__cost}>
            <h2 className={styles.ItemPriceCard__price}>
              {data.cenaok}
              <span className={styles.ItemPriceCard__price_custom}>с</span>
            </h2>
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
          <p className={styles.ItemPriceCard__ddos_desc}>{data.ddos}</p>
        </div>
        {data.minQty > 1 ? (
          <p className={styles.ItemPriceCard__minQty}>
            минимальное количество к заказу от {data.minQty} шт.
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
              onClick={addToCart}
              className={styles.ItemPriceCard__buttons_cart}
            >
              <span className="add__to_cart_icon">
                <CartIcon />
              </span>
              В корзину
            </button>
          )}
          {product?.quantity && (
            <CartReducerBtn data={data} onCartEmpty={handleCartEmpty} />
          )}
          <button className={styles.ItemPriceCard__buttons_buy}>Купить</button>
        </div>

        <div className={styles.ItemPriceCard__salesman}>
          <h3 className={styles.ItemPriceCard__salesman_title}>
            ИП{" "}
            <span className={styles.ItemPriceCard__salesman_title_custom}>
              Нурдин Улуу Нурболот
            </span>
          </h3>
        </div>
      </div>
      <div className={styles.shareIcon}>
        <div className={styles.share_btnControl}>
          <button
            title="Добавить в избранное"
            className={cn("add__to_fav", {
              ["add__to_fav_active"]: favorite,
            })}
            onClick={handleFavoriteClick}
          >
            <span className="add__to_fav_icon">
              {favorite ? <VioletFavoritesIcon /> : <GrayFavoritesIcon />}
            </span>
          </button>
          <span
            className={cn(
              styles.share_btnControl_info,
              dropdownActive && styles.share_btnControl_info_active
            )}
          >
            Добавить в избранное
          </span>
        </div>
        <div className={styles.share}>
          <div className={styles.share_btnControl}>
            <button
              onClick={handleDropdown}
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
          <div
            className={cn(
              styles.share_shareDropdown,
              dropdownActive && styles.share_shareDropdown_active
            )}
          >
            <div
              onClick={handleTelegramClick}
              className={styles.share_shareDropdown_tg}
            >
              <TgIcon />
              <button className={styles.share_shareDropdown_tg_btn}>
                Telegram
              </button>
            </div>
            <div
              onClick={handleWhatsAppClick}
              className={styles.share_shareDropdown_wh}
            >
              <WhIcon />
              <button className={styles.share_shareDropdown_wh_btn}>
                WhatsApp
              </button>
            </div>
            <div
              onClick={() => handleCopyLink(window.location.href)}
              className={styles.share_shareDropdown_copy}
            >
              <CopyIcon />
              <button className={styles.share_shareDropdown_copy_btn}>
                Скопировать ссылку
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemPriceCard;
