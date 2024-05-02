"use client"
import React, { useState, useRef } from "react";
import { IPromotion } from "@/types/promotion";
import styles from "./style.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IPromoProps {
  promotion: IPromotion[];
}

const Promotion = ({ promotion }: IPromoProps) => {
  const router = useRouter();
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

  const handleShowAll = () => {
    router.push("promotions");
  };

  return (
    <section className="promotion">
      <div className={"container"}>
        <h1 className="sections__title">Акции</h1>
        <div className={styles.promotion__container}>
          {visiblePromotions.map((item) => (
            <div className={styles.promotion__card} key={item.naim}>
              <Image
                onClick={() => router.push(`promotions/${item.id}`)}
                className={styles.promotion__card_img}
                src={`https://max.kg/${item.logo}`}
                width={400}
                height={250}
                alt={item.naim}
              />
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
            <button
              className="default__buttons_showMore"
              onClick={handleShowAll}
            >
              Показать все
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Promotion;


