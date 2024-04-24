"use client"
import React, { useRef, useState } from "react";
import Image from "next/image";
import { INews } from "@/types/news";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";

export interface INew {
  news: INews[];
}

const News = ({ news }: INew) => {
  const router = useRouter();


  const handleShowAll = () => {
    router.push("/all-news");
  };

  return (
    <section className="news" >
      <div className="container">
        <h1 className="sections__title">Новости</h1>
        <div className={styles.news__container}>
          {news.slice(0, 6).map((item, index) => (
            <div className={styles.promotion__card} key={index}>
              <Image
                onClick={() => router.push(`https://max.kg/promo/${item.id}`)}
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
    
          <button
            className="default__buttons_showMore"
            onClick={handleShowAll}
          >
            Показать все
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;
