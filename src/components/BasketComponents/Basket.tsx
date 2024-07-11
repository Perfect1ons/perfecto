"use client";
import { useDispatch, useSelector } from "react-redux";
import cn from "clsx";
import BasketProducts from "./BasketProducts/BasketProducts";
import { RootState } from "@/store";
import Link from "next/link";
import BasketOrder from "./BasketOrder/BasketOrder";
import Image from "next/image";
import { useState } from "react";
import { TrashIcon } from "../../../public/Icons/Icons";
import styles from "./style.module.scss";
const Basket = () => {
  const data = useSelector((store: RootState) => store.cart);

  const [added, setAdded] = useState(false);
  const [allItemsSelected, setAllItemsSelected] = useState(false);

  const handleToggleAllItems = () => {
    setAllItemsSelected(!allItemsSelected);
  };

  const dispatch = useDispatch();
  return (
    <div className="container">
      {data.cart.length <= 0 ? (
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
              onChange={handleToggleAllItems}
            >
              <span
                className={cn("showFiltersUlContainer__check", {
                  ["showFiltersUlContainer__checkActive"]: added,
                })}
              >
                {added ? (
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
            <button className={styles.trashButton}>
              <TrashIcon />
            </button>
          </div>
          <div className={styles.cardContainer}>
            <BasketProducts />
            <BasketOrder />
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
