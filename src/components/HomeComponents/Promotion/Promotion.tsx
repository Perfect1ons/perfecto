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
  const [itemsToShow, setItemsToShow] = useState<number>(6);
  const totalItems = promotion.length;
  const router = useRouter();
  const promotionRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = () => {
    setItemsToShow((prevItems) => prevItems + 6);
  };

  const handleHide = () => {
    setItemsToShow(6);
    if (promotionRef.current) {
      promotionRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  const handleShowAll = () => {
    router.push("/all-promotions");
  };

  return (
    <section className="promotion" ref={promotionRef}>
      <div className={"container"}>
        <h1 className="sections__title">Акции</h1>
        <div className={styles.promotion__container}>
          {promotion.slice(0, itemsToShow).map((item) => (
            <div className={styles.promotion__card} key={item.naim}>
              <Image
                onClick={() => router.push(`https://max.kg/promo/${item.id}`)}
                className={styles.promotion__card_img}
                src={`https://max.kg/${item.logo}`}
                width={400}
                height={250}
                alt={item.naim}
              />
            </div>
          ))}
        </div>
        <div className={styles.promotion__buttons}>
          <div className="showMore">
            {itemsToShow < totalItems && (
              <button
                className="news__buttons_showMore"
                onClick={handleLoadMore}
              >
                Показать ещё
              </button>
            )}
          </div>
          <div className="hideMore">
            {itemsToShow >= totalItems && itemsToShow > 6 && (
              <button className="news__buttons_showMore" onClick={handleHide}>
                Скрыть все
              </button>
            )}
          </div>
          <button
            className="news__buttons_showMore showAll_button"
            onClick={handleShowAll}
          >
            Показать все
          </button>
        </div>
      </div>
    </section>
  );
};

export default Promotion;


