"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PopularGoodsCards from "./PopularGoodsCards/PopularGoodsCards";
import { IPopularGood } from "@/types/popularGoods";
import { getPopularGoodsByClient } from "@/api/clientRequest";
import PopularGoodsSkeletonCard from "./AllPopularGoods/PopularGoodsSkeletonCard";

interface IPopularGoodsProps {
  goods: IPopularGood[];
}

export default function PopularGoods({ goods }: IPopularGoodsProps) {
  const [data, setData] = useState<IPopularGood[]>(goods);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const perPage = 10;
  const maxPagesToShowMore = 3;
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: IPopularGood[] = await getPopularGoodsByClient(2);
      setData((prevData) => [...prevData, ...response]);
      if (response.length === 0) {
        setAllDataLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    if (!allDataLoaded) {
      const nextPage = page + 1;
      setPage(nextPage);
      if (nextPage >= maxPagesToShowMore) {
        setShowAll(true);
      }
      fetchData();
    }
  };

  useEffect(() => {
    // Initial data fetch if needed
    fetchData();
  }, []);

  return (
    <div className="goods">
      <div className="container">
        <h1 className="sections__title">Популярные товары</h1>
      </div>
      <div className="cardContainer">
        <div className="main__news_cards">
          {loading
            ? Array.from({ length: perPage }).map((_, index) => (
                <PopularGoodsSkeletonCard key={index} />
              ))
            : data
                .slice(0, page * perPage)
                .map((item, index) => (
                  <PopularGoodsCards goods={item} key={index} />
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
              onClick={() => router.push("/popular")}
            >
              Показать все
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
