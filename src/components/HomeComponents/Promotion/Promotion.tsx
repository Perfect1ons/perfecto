"use client";
import React, { useState, memo } from "react";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import { IMainPagePromotion } from "@/types/HomeTypes/promotions";
import InfoCard from "@/components/UI/InfoCard/InfoCard";

interface IPromoProps {
  promotions: IMainPagePromotion[];
}

const Promotions: React.FC<IPromoProps> = memo(({ promotions }) => {
  const [showAll, setShowAll] = useState(false);
  const [visiblePromotions, setVisiblePromotions] = useState(
    promotions.slice(0, 6)
  );

  const handleShowMore = () => {
    setVisiblePromotions(promotions.slice(0, visiblePromotions.length + 6));
    if (visiblePromotions.length + 6 >= 18) {
      setShowAll(true);
    }
  };

  return (
    <section className="promotions">
      <div className="container">
        <h1 className="sections__title">Акции</h1>
        <div className="info__cards">
          {visiblePromotions.map((item) => (
            <InfoCard key={item.id} item={item} />
          ))}
        </div>
        <div className="showMore__buttons">
          {!showAll ? (
            <button className="showMore__button" onClick={handleShowMore}>
              Показать ещё
            </button>
          ) : (
            <Link href="promotions" passHref>
              <button className="showMore__button">Показать все</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
});
Promotions.displayName = "Promotions";

export default Promotions;
