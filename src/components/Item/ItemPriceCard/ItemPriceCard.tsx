"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import {
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
            <span className={styles.ItemPriceCard__price_new}>
              {data.cenaok.toLocaleString("ru-RU")}
              <span className={styles.ItemPriceCard__price_new_custom}>с</span>
            </span>
            <span className={styles.ItemPriceCard__price_discount}>
              -{data.discount_prc}%
            </span>
            <span className={styles.ItemPriceCard__old_price}>
              {data.old_price.toLocaleString("ru-RU")}
              <span className={styles.ItemPriceCard__old_price_custom}>с</span>
            </span>
          </div>
        ) : (
          <div className={styles.ItemPriceCard__cost}>
            <span className={styles.ItemPriceCard__price}>
              {data.cenaok.toLocaleString("ru-RU")}
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
          {data.cenaok < 1000 ? null : (
            <button className={styles.ItemPriceCard__buttons_buy}>
              Купить
            </button>
          )}
        </div>

        <div className={styles.ItemPriceCard__salesman}>
          <h3 className={styles.ItemPriceCard__salesman_title}>
            <SalesmanIcon/> ИП
            <span className={styles.ItemPriceCard__salesman_title_custom}>
              Нурдин Улуу Нурболот
            </span>
          </h3>
        </div>
      </div>
      <div className={styles.shareIcon}>
        <div className={styles.share_btnControl} onClick={handleFavoriteClick}>
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
          <UserInfoModal visible={copy} onClose={closeModalCart}>
            Ссылка скопирована
          </UserInfoModal>
        </div>
      </div>
    </section>
  );
};

export default ItemPriceCard;
