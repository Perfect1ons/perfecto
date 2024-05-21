"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { IPopularGood } from "@/types/popularGoods";
import { getPopularGoodsByClient } from "@/api/clientRequest";
import PopularGoodsCards from "../PopularGoodsCards/PopularGoodsCards";
import Loader from "@/components/UI/Loader/Loader";

interface IPopularGoodsProps {
  goods: IPopularGood[];
}

export default function AllPopularGoods({ goods }: IPopularGoodsProps) {
  const [data, setData] = useState<IPopularGood[]>(goods);
  const [page, setPage] = useState(2);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const loadedIds = useRef<number[]>(goods.map((item) => item.id));

  const fetchData = async (pageNum: number) => {
    try {
      const response: IPopularGood[] = await getPopularGoodsByClient(pageNum);
      const newIds = response.map((item) => item.id);

      if (
        newIds.length === 0 ||
        newIds.some((id) => loadedIds.current.includes(id))
      ) {
        setAllDataLoaded(true);
      } else {
        loadedIds.current = [...loadedIds.current, ...newIds];
        setData((prevData) => [...prevData, ...response]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !allDataLoaded) {
        const nextPage = page;
        setPage((prevPage) => prevPage + 1);
        fetchData(nextPage);
      }
    },
    [page, allDataLoaded]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "400px",
      threshold: 0.5,
    });

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current && loaderRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRef.current.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver]);

  return (
    <div className="goods">
      <div className="container">
        <h2 className="sections__title">Популярные товары</h2>
      </div>
      <div className="cardContainer">
        <div className="main__news_cards">
          {data.map((item, index) => (
            <PopularGoodsCards goods={item} key={index} />
          ))}
        </div>
        <div ref={loaderRef} className="loading">
          {allDataLoaded ? <h1 className="finished container">Все данные загружены</h1> : <Loader />}
        </div>
      </div>
    </div>
  );
}