"use client"
import React, { useState, useRef } from "react";
import { IPromotion } from "@/types/promotion";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

interface IPromoProps {
  promotion: IPromotion[];
}

const Promotion = ({ promotion }: IPromoProps) => {
  const [showAll, setShowAll] = useState(false);
  const [visiblePromotions, setVisiblePromotions] = useState(
    promotion.slice(0, 6)
  );

  const handleShowMore = () => {
    setVisiblePromotions(promotion.slice(0, visiblePromotions.length + 6));
    if (visiblePromotions.length + 6 >= 12) {
      setShowAll(true);
    }
  };

  return (
    <section className="promotion">
      <div className={"container"}>
        <h1 className="sections__title">Акции</h1>
        <div className={styles.promotion__container}>
          {visiblePromotions.map((item) => (
            <div className={styles.promotion__card} key={item.naim}>
              <Link href={`promotions/${item.id}`} passHref>
                  <Image
                    className={styles.promotion__card_img}
                    src={`https://max.kg/${item.logo}`}
                    width={400}
                    height={250}
                    alt={item.naim}
                  />
              </Link>
            </div>
          ))}
        </div>
        <div className="default__buttons">
          {!showAll ? (
            <button
              className="default__buttons_showMore"
              onClick={handleShowMore}
            >
              Показать ещё
            </button>
          ) : (
            <Link href="promotions" passHref>
              <button className="default__buttons_showMore">
                Показать все
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Promotion;



