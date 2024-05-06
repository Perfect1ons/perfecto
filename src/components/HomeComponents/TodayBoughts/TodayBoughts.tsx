"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IPopularGood } from "@/types/popularGoods";
import TodayBoughtsCards from "./TodayBoughtsCard/TodayBoughtsCard";
import { IBoughtItem } from "@/types/lastBoughts";

interface IPopularGoodsProps {
  boughts: IBoughtItem[];
}

export default function TodayBoughts({ boughts }: IPopularGoodsProps) {
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const perPage = 10;
  const maxPagesToShowMore = 3; // Maximum number of times "Show more" button can be clicked
  const router = useRouter();

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (nextPage >= maxPagesToShowMore) {
      setShowAll(true);
    }
  };

  return (
    <div className="goods">
      <div className="container">
          <h2 className="sections__title">Сегодня купили</h2>
      </div>
        <div className="cardContainer">
          <div className="main__news_cards">
            {boughts.slice(0, page * perPage).map((item, index) => (
              <TodayBoughtsCards goods={item} key={index} />
            ))}
          </div>

          {!showAll && page < maxPagesToShowMore && (
            <div className="showMoreBtn">
              <button
                className="default__buttons_showMore"
                onClick={handleShowMore}
              >
                Показать еще
              </button>
            </div>
          )}

          {showAll && (
            <div className="showMoreBtn">
              <button
                className="default__buttons_showMore"
                onClick={() => router.push("/all-popular-goods")}
              >
                Показать все
              </button>
            </div>
          )}
        </div>
    </div>
  );
}
