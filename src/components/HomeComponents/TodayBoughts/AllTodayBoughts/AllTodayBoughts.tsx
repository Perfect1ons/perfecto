"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IBoughtItem, IBoughts } from "@/types/lastBoughts";
import { getBoughtsByClient } from "@/api/clientRequest";
import TodayBoughtsCards from "../TodayBoughtsCard/TodayBoughtsCard";

interface IPopularGoodsProps {
  boughts: IBoughtItem[];
}

export default function AllTodayBoughts({ boughts }: IPopularGoodsProps) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<IBoughtItem[]>(boughts);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const perPage = 10;
  const maxPagesToShowMore = 3;
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response: IBoughts = await getBoughtsByClient(page);
      if (response.lastz.length === 0) {
        setAllDataLoaded(true);
      } else {
        setData((prevData) => [...prevData, ...response.lastz]);
        setPage((prevPage) => prevPage + 1); // Увеличиваем страницу на 1 после успешного запроса
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowMore = () => {
    if (!allDataLoaded) {
      fetchData();
    }
  };

  return (
    <div className="goods">
      <div className="container">
        <h2 className="sections__title">Сегодня купили</h2>
      </div>
      <div className="cardContainer">
        <div className="main__news_cards">
          {data.slice(0, page * perPage).map((item, index) => (
            <TodayBoughtsCards goods={item} key={index} />
          ))}
        </div>

        {!allDataLoaded && page < maxPagesToShowMore && (
          <div className="showMoreBtn">
            <button
              className="default__buttons_showMore"
              onClick={handleShowMore}
            >
              Показать еще
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
