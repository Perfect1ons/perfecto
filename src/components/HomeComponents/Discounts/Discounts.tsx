"use client";
import React, { useState, memo } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";
import clsx from "clsx";
import "react-loading-skeleton/dist/skeleton.css";
import { IMainPageDiscounts } from "@/types/HomeTypes/discount";
import { url } from "@/utils/url";

interface IDiscountsProps {
  discounts: IMainPageDiscounts[];
}

const Discounts: React.FC<IDiscountsProps> = memo(({ discounts }) => {
  const [shownCount, setShownCount] = useState(8);
  const handleShowMore = () => {
    setShownCount((prevCount) => prevCount + 8);
  };

  return (
    <section className="discounts">
      <div className="container">
        <h1 className="sections__title">Скидки</h1>
        <div className={styles.discount__container}>
          {discounts.slice(0, shownCount).map((item, index) => (
            <Link
              className={clsx(styles.discount__card, "link")}
              href={`discount/${item.promotion_id}`}
              key={index}
            >
              <div className={styles.discount__card_images}>
                <Image
                  className={styles.discount__card_img}
                  src={
                    item.image
                      ? `${url}${item.image}`
                      : "/img/noPhotoDiscount.svg"
                  }
                  width={400}
                  height={250}
                  alt={item.name}
                />
              </div>

              <div className={styles.discount__card_content}>
                <div className={styles.discount__data}>
                  <h3 className={styles.discount__item_title}>{item.name}</h3>
                  <span className={styles.discount__item_days}>
                    {item.word} {item.days} {item.word_day}
                  </span>
                  <span className={styles.discount__item_fromTo}>
                    {item.message}
                  </span>
                  <span className={styles.discount__by_percent}>
                    Скидка
                    <span className={styles.discount__by_percent_custom}>
                      {item.bonuses[1].discount_value} %
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {shownCount < 20 && (
          <div className="showMore__buttons">
            <button
              className="showMore__button"
              onClick={handleShowMore}
              aria-label="click to show more"
            >
              Показать еще
            </button>
          </div>
        )}

        {shownCount >= 20 && (
          <div className="showMore__buttons">
            <Link href="/discount?page=1">
              <button
                aria-label="click to show all"
                className="showMore__button"
              >
                Показать все
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
});

// Добавляем displayName для компонента
Discounts.displayName = "Discounts";

export default Discounts;
