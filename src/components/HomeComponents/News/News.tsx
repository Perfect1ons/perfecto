"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { INews } from "@/types/news";
import styles from "./style.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { url } from "@/components/temporary/data";

interface INewProps {
  news: INews[];
}

const News = ({ news }: INewProps) => {
  const [shownCount, setShownCount] = useState(6);
  const [showAllButton, setShowAllButton] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(false);
  }, []);

  const handleShowMore = () => {
    setShownCount((prevCount) => prevCount + 6);
  };

  return (
    <section className="news">
      <div className="container">
        <h1 className="sections__title">Новости</h1>
        <div className={styles.news__container}>
          {loading
            ? Array.from({ length: shownCount }).map((_, index) => (
                <div className={styles.promotion__card} key={index}>
                  <Skeleton className={styles.promotion__card_skeleton} />
                </div>
              ))
            : news.slice(0, shownCount).map((item, index) => (
                <div className={styles.promotion__card} key={index}>
                  <Link
                    className={styles.promotion__card_link}
                    href={`news/${item.id}`}
                  >
                    <Image
                      className={styles.promotion__card_img}
                      src={`${url}${item.logo}`}
                      width={400}
                      height={250}
                      alt={item.naim}
                      loading="lazy"
                    />
                  </Link>
                </div>
              ))}
        </div>
        <div className="showMore__buttons">
          {!loading && shownCount < 18 && !showAllButton && (
            <button
              className="showMore__button"
              onClick={handleShowMore}
              aria-label="click to show more"
            >
              Показать еще
            </button>
          )}
          {shownCount >= 18 && !showAllButton && (
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
};

export default News;
