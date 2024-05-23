"use client";
import clsx from "clsx";
import React from "react";

import styles from "./style.module.scss";
import {
  CartIcon,
  GrayFavoritesIcon,
  GrayStar,
  TrashCan,
} from "../../../../public/Icons/Icons";
import Image from "next/image";

export default function FavoriteMain() {
  const clickTest = () => {
    console.log("hello world");
  };

  return (
    <section className={styles.mainSection}>
      <div className={clsx(styles.container, "container")}>
        <div className={styles.optionsWrap}>
          <h1 className={styles.count}>
            В избранном <span>n</span> товаров
          </h1>
          <div className={styles.buttonsWrap}>
            <div className={styles.selectAll}>
              <input
                className={styles.selectAll__check}
                type="checkbox"
                name="checkbox"
              />
              <span>Выбрать всё</span>
            </div>
            <button className={styles.delete}>
              <TrashCan />
            </button>
            <button className={styles.purchase}>Купить</button>
          </div>
        </div>
      </div>
      <div className={clsx("main__news_cards")}>
        {[...Array(5)].map((_, index) => (
          <div onClick={clickTest} className={"default__card"} key={index}>
            <div className="default__card_images">
              <Image
                className="default__card_image"
                src={`https://max.kg/images/discount/empty-image.png`}
                width={200}
                height={200}
                alt={"default"}
                quality={100}
                loading="lazy"
              />
            </div>
            <div className="default__card_info">
              <span className="default__card_price">
                1'000'000
                <span className="default__card_price_custom"> с</span>
              </span>
              <h2 className="default__card_name">Название</h2>
              <div className="ocenka">
                {[...Array(5)].map((_, index) => (
                  <span key={index}>
                    <GrayStar />
                  </span>
                ))}
              </div>
              <div className="ddos">
                <Image
                  src={`https://max.kg/images/delivery_icon.svg`}
                  width={20}
                  height={20}
                  alt="delivery_icon"
                />
                <p className="ddos__text">Доставка в течении 1000 лет</p>
              </div>
              <div className="add__to">
                <button
                  title="Добавить в корзину"
                  className="add__to_cart"
                  onClick={() => console.log("Добавлено в корзину")}
                >
                  <span className="add__to_cart_icon">
                    <CartIcon />
                  </span>
                  В корзину
                </button>
                <button
                  title="Добавить в избранное"
                  className={clsx("add__to_fav")}
                >
                  <span className="add__to_fav_icon">
                    <GrayFavoritesIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
