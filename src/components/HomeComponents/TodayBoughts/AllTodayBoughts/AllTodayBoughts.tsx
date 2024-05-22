"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { IBoughtItem, IBoughts } from "@/types/lastBoughts";
import { getBoughtsByClient } from "@/api/clientRequest";
import TodayBoughtsCards from "../TodayBoughtsCard/TodayBoughtsCard";
import Loader from "@/components/UI/Loader/Loader";

interface IPopularGoodsProps {
  boughts: IBoughtItem[];
}

export default function AllTodayBoughts({ boughts }: IPopularGoodsProps) {
  const [data, setData] = useState<IBoughtItem[]>(boughts);
  const [page, setPage] = useState(2);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const loadedIds = useRef<Set<number>>(
    new Set(boughts.map((item) => item.id))
  );

  const fetchData = async (pageNum: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response: IBoughts = await getBoughtsByClient(pageNum);
      console.log(`Fetching data for page ${pageNum}:`, response); // Debug log
      const newBoughts = response.lastz.filter(
        (item) => !loadedIds.current.has(item.id)
      );

      if (newBoughts.length === 0) {
        setAllDataLoaded(true);
      } else {
        newBoughts.forEach((item) => loadedIds.current.add(item.id));
        setData((prevData) => [...prevData, ...newBoughts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !allDataLoaded && !isLoading) {
        fetchData(page);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, allDataLoaded, isLoading]
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
        <h2 className="sections__title">Сегодня купили</h2>
      </div>
      <div className="cardContainer">
        <div className="main__news_cards">
          {data.map((item) => (
            <TodayBoughtsCards goods={item} key={item.id} />
          ))}
        </div>
        <div ref={loaderRef} className="loading">
          {allDataLoaded ? (
            <h1 className="finished container">Все данные загружены</h1>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
