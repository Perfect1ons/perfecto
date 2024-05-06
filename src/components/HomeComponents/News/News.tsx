"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { INews } from "@/types/news";
import styles from "./style.module.scss";

interface INewProps {
  news: INews[];
}

const News = ({ news }: INewProps) => {
  const [shownCount, setShownCount] = useState(6);
  const [showAllButton, setShowAllButton] = useState(false);

  const handleShowMore = () => {
    setShownCount((prevCount) => prevCount + 6);
  };

  const handleShowAll = () => {
    setShowAllButton(true);
  };

  return (
    <section className="news">
      <div className="container">
        <h1 className="sections__title">Новости</h1>
        <div className={styles.news__container}>
          {news.slice(0, shownCount).map((item, index) => (
            <div className={styles.promotion__card} key={index}>
              <Link href={`news/${item.id}`}>
                  <Image
                    className={styles.promotion__card_img}
                    src={`https://max.kg/${item.logo}`}
                    width={400}
                    height={250}
                    alt={item.naim}
                  />
              </Link>
            </div>
          ))}
        </div>
        <div className="default__buttons">
          {shownCount < 18 && !showAllButton && (
            <button
              className="default__buttons_showMore"
              onClick={handleShowMore}
            >
              Показать еще
            </button>
          )}
          {shownCount >= 18 && !showAllButton && (
            <Link className="link" href="/news">
              <button className="default__buttons_showMore">Показать все</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default News;
