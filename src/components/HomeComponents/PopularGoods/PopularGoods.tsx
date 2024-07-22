"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IPopularGood } from "@/types/popularGoods";
import { getPopularGoodsByClient } from "@/api/clientRequest";
import Card from "@/components/UI/Card/Card";
import CardSkeleton from "@/components/UI/Card/CardSkeleton";

interface IPopularGoodsProps {
  goods: IPopularGood[];
}

export default function PopularGoods({ goods }: IPopularGoodsProps) {
  const [data, setData] = useState<IPopularGood[]>(goods);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const perPage = 12;
  const maxPagesToShowMore = 3;
  const router = useRouter();

  const skeletonCards = new Array(12).fill(null);

  const fetchData = async () => {
    try {
      const response: IPopularGood[] = await getPopularGoodsByClient(2);
      setData((prevData) => [...prevData, ...response]);
      if (response.length === 0) {
        setAllDataLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
    setLoading(false);
  }, []);

  return (
    <div className="goods">
      <h1 className="sections__title container">Популярные товары</h1>
      <div className="cards">
        {loading
          ? skeletonCards.map((_, index) => (
              <CardSkeleton key={index} loading={loading} />
            ))
          : data.slice(0, page * perPage).map((item, index) => (
              <Card cardData={item} key={index} />
            ))}
      </div>

      {!loading && !showAll && page < maxPagesToShowMore && (
        <div className="showMore__buttons">
          <button className="showMore__button" onClick={handleShowMore}>
            Показать еще
          </button>
        </div>
      )}

      {showAll && (
        <div className="showMore__buttons">
          <button
            className="showMore__button"
            onClick={() => router.push("/popular")}
          >
            Показать все
          </button>
        </div>
      )}
    </div>
  );
}
