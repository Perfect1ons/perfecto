"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { IPopularGood } from "@/types/popularGoods";
import { getPopularGoodsByClient } from "@/api/clientRequest";
import Card from "@/components/UI/Card/Card";
import CardSkeleton from "@/components/UI/Card/CardSkeleton";

interface IPopularGoodsProps {
  goods: IPopularGood[];
}

export default function AllPopularGoods({ goods }: IPopularGoodsProps) {
  const [data, setData] = useState<IPopularGood[]>(goods);
  const [page, setPage] = useState(2);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const loadedIds = useRef<Set<number>>(new Set(goods.map((item) => item.id)));

  const fetchData = async (pageNum: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response: IPopularGood[] = await getPopularGoodsByClient(pageNum);
      const newGoods = response.filter(
        (item) => !loadedIds.current.has(item.id)
      );

      if (newGoods.length === 0) {
        setAllDataLoaded(true);
      } else {
        newGoods.forEach((item) => loadedIds.current.add(item.id));
        setData((prevData) => [...prevData, ...newGoods]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
      rootMargin: "100px",
      threshold: 0.1,
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="goods">
      <div className="container">
        <h2 className="sections__title">Популярные товары</h2>
      </div>
      <div className="cardContainer">
        <div className="cards">
          {data.map((item, index) => (
            <Card cardData={item} key={index} />
          ))}
        </div>
        <div ref={loaderRef} className="loading">
          {allDataLoaded ? (
            <h1 className="finished container">Все данные загружены</h1>
          ) : (
            <div className="cards">
              {Array.from({ length: 18 }).map((_, index) => (
                <CardSkeleton key={index} loading={isLoading} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
