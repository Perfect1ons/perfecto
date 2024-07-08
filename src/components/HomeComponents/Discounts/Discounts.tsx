"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IDiscounts } from "@/types/discounts";
import styles from "./style.module.scss";
import { url } from "@/components/temporary/data";
import Link from "next/link";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IDiscountsProps {
  discounts: IDiscounts[];
}

const Discounts: React.FC<IDiscountsProps> = ({ discounts }) => {
  const [loading, setLoading] = useState(true);
  const [shownCount, setShownCount] = useState(8);

  const handleShowMore = () => {
    setShownCount((prevCount) => prevCount + 8);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <section className="discounts">
      <div className="container">
        <h1 className="sections__title">Скидки</h1>
        <div className={styles.discount__container}>
          {loading
            ? Array.from({ length: shownCount }).map((_, index) => (
                <Skeleton
                  key={index}
                  className={clsx(
                    styles.promotion__card,
                    styles.promotion__card_skeleton
                  )}
                />
              ))
            : discounts.slice(0, shownCount).map((item, index) => (
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
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.discount__card_content}>
                    <div className={styles.discount__data}>
                      <h3 className={styles.discount__item_title}>
                        {item.name}
                      </h3>
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

        {!loading && shownCount < 20 && (
          <div className="default__buttons">
            <button
              className="default__buttons_showMore"
              onClick={handleShowMore}
              aria-label="click to show more"
            >
              Показать еще
            </button>
          </div>
        )}

        {shownCount >= 20 && (
          <div className="default__buttons">
            <Link className="link" href="/discount?page=1">
              <button
                aria-label="click to show all"
                className="default__buttons_showMore"
              >
                Показать все
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Discounts;
