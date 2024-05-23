"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import styles from "./style.module.scss";
import { INews } from "@/types/news";
import { url } from "@/components/temporary/data";

interface IAllNewsProps {
  allnews: INews[];
}

const AllNews: React.FC<IAllNewsProps> = ({ allnews }) => {
const [currentPage, setCurrentPage] = useState(() => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("page") || "1", 10);
  }
  return 1; // По умолчанию
});

  const itemsPerPage = 10;
  const maxPage = Math.ceil(allnews.length / itemsPerPage);

  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [currentPage]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", String(currentPage));
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  }, [currentPage]);

  const formatNewsDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day < 10 ? "0" : ""}${day}.${
      month < 10 ? "0" : ""
    }${month}.${year}`;
  };

  return (
    <section className="all__news" ref={topRef}>
      <div className="container">
        <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          <Link
            href={"/news"}
            className={clsx(
              "all__directions_link",
                "all__directions_linkActive"
            )}
          >
            <h1>
              Новости
            </h1>
          </Link>
        </div>
        <div className={styles.all__news_container}>
          <h1 className="default__showMore_title">Новости</h1>
          <div className={styles.allNews__container_content}>
            {allnews
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((news, index) => (
                <div key={news.id} className={styles.allNews__content}>
                  <div className={styles.allNews__content_images}>
                    <Link href={`/news/${news.id}`}>
                      <Image
                        className={styles.allNews__content_image}
                        src={`${url}${news.logo}`}
                        width={450}
                        height={280}
                        title={news.naim}
                        alt={news.naim}
                      />
                    </Link>
                  </div>
                  <div className={styles.allNews__content_info}>
                    <h1 className="allNews__content_title">
                      <Link
                        className={styles.allNews__content_link}
                        href={`/news/${news.id}`}
                      >
                        {news.naim}
                      </Link>
                    </h1>
                    <div className={styles.allNews__desc}>
                      <Link
                        className={styles.allNews__desc_link}
                        href={`/news/${news.id}`}
                        title="Нажмите чтобы получить подробную информацию"
                      >
                        Подробнее
                      </Link>
                    </div>
                    <div className={styles.allNews__content_data}>
                      <span>{formatNewsDate(news.dat1)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="pagination">
          <button
            className={clsx(
              "pagination__button_custom",
              currentPage === 1 && "pagination__button_disactive"
            )}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            className={clsx(
              "pagination__button",
              currentPage === 1 && "pagination__button_disactive"
            )}
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {Array.from({ length: maxPage }, (_, index) => (
            <button
              className={clsx(
                "pagination__button",
                currentPage === index + 1 && "pagination__button_active"
              )}
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={clsx(
              "pagination__button",
              currentPage === maxPage && "pagination__button_disactive"
            )}
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={currentPage === maxPage}
          >
            {">"}
          </button>
          <button
            className={clsx(
              "pagination__button_custom",
              currentPage === maxPage && "pagination__button_disactive"
            )}
            onClick={() => setCurrentPage(maxPage)}
            disabled={currentPage === maxPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllNews;
