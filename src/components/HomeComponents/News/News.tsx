"use client"
import React, { useState } from "react";
import Image from "next/image";
import { INews } from "@/types/news";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";

interface INewProps {
  news: INews[];
}

const News = ({ news }: INewProps) => {
  const router = useRouter();
  const [shownCount, setShownCount] = useState(6);

  const handleShowMore = () => {
    setShownCount((prevCount) => prevCount + 6);
  };

  const handleShowAll = () => {
    router.push("/news?page=1");
  };

  return (
    <section className="news">
      <div className="container">
        <h1 className="sections__title">Новости</h1>
        <div className={styles.news__container}>
          {news.slice(0, shownCount).map((item, index) => (
            <div className={styles.promotion__card} key={index}>
              <Image
                onClick={() => router.push(`news/${item.id}`)}
                className={styles.promotion__card_img}
                src={`https://max.kg/${item.logo}`}
                width={400}
                height={250}
                alt={item.naim}
              />
            </div>
          ))}
        </div>
        <div className="default__buttons">
          {shownCount < 18 && (
            <button
              className="default__buttons_showMore"
              onClick={handleShowMore}
            >
              Показать еще
            </button>
          )}
          {shownCount >= 18 && (
            <button
              className="default__buttons_showMore"
              onClick={handleShowAll}
            >
              Показать все
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default News;





