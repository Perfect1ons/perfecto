"use client";
import React, { useState, useEffect } from "react";
import { IPromotion } from "@/types/promotion";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { url } from "@/components/temporary/data";

interface IPromoProps {
  promotion: IPromotion[];
}

const Promotion = ({ promotion }: IPromoProps) => {
  const [showAll, setShowAll] = useState(false);
  const [visiblePromotions, setVisiblePromotions] = useState(
    promotion.slice(0, 6)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100); // Установите нужное время задержки

    return () => clearTimeout(timer);
  }, []);

  const handleShowMore = () => {
    setVisiblePromotions(promotion.slice(0, visiblePromotions.length + 6));
    if (visiblePromotions.length + 6 >= 18) {
      setShowAll(true);
    }
  };

  return (
    <section className="promotion">
      <div className="container">
        <h1 className="sections__title">Акции</h1>
        <div className={styles.promotion__container}>
          {loading
            ? Array.from({ length: visiblePromotions.length }).map(
                (_, index) => (
                  <div className={styles.promotion__card} key={index}>
                    <Skeleton className={styles.promotion__card_skeleton} />
                  </div>
                )
              )
            : visiblePromotions.map((item) => (
                <div className={styles.promotion__card} key={item.naim}>
                  <Link
                    className={styles.promotion__card_link}
                    href={`promotions/${item.id}`}
                    passHref
                  >
                    <Image
                      className={styles.promotion__card_img}
                      src={`${url}${item.logo}`}
                      width={400}
                      height={250}
                      alt={item.naim}
                    />
                  </Link>
                </div>
              ))}
        </div>
        <div className="showMore__buttons">
          {!loading ? (
            !showAll ? (
              <button className="showMore__button" onClick={handleShowMore}>
                Показать ещё
              </button>
            ) : (
              <Link  href="promotions" passHref>
                <button className="showMore__button">Показать все</button>
              </Link>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default Promotion;
