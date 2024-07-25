"use client";
import React, { memo, useState } from "react";
import { IMainPageNews } from "@/types/HomeTypes/news";
import Link from "next/link";
import InfoCard from "@/components/UI/InfoCard/InfoCard";

interface INewProps {
  news: IMainPageNews[];
}

const News = memo(function News({ news }: INewProps) {
  const [shownCount, setShownCount] = useState(6);

  const handleShowMore = () => {
    setShownCount((prevCount) => prevCount + 6);
  };

  return (
    <section className="news">
      <div className="container">
        <h1 className="sections__title">Новости</h1>

        <div className="info__cards">
          {news.slice(0, shownCount).map((item) => (
            <InfoCard item={item} key={item.id} />
          ))}
        </div>

        <div className="showMore__buttons">
          {shownCount < news.length && (
            <button
              className="showMore__button"
              onClick={handleShowMore}
              aria-label="click to show more"
            >
              Показать еще
            </button>
          )}
          {shownCount >= news.length && news.length > 6 && (
            <Link href="/news">
              <button
                aria-label="click to show all"
                className="showMore__button"
              >
                Показать все
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
});

export default News;
