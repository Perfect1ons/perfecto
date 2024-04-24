"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import clsx from "clsx";
import styles from "./style.module.scss";
import { INews } from "@/types/news";
import { usePathname, useRouter } from "next/navigation";

interface IAllNewsProps {
  allnews: INews[];
}

const AllNews: React.FC<IAllNewsProps> = ({ allnews }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxPage = Math.ceil(allnews.length / itemsPerPage);

  const topRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= maxPage) {
      setCurrentPage(pageNumber);
      scrollToTop();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
      scrollToTop();

  };

  const handleLastPage = () => {
    setCurrentPage(maxPage);
      scrollToTop();

  };

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  const formatNewsDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day < 10 ? "0" : ""}${day}.${
      month < 10 ? "0" : ""
    }${month}.${year}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allnews.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="all__news">
      <div ref={topRef} className="container">
        <div className={styles.all__news_directions}>
          <span
            className={styles.all__news_directions_link}
            onClick={() => router.push("/")}
          >
            Главная
          </span>
          <span className={styles.all__news_directions_link}>{">"}</span>
          <span
            className={clsx(
              styles.all__news_directions_link,
              pathname === "/news" && styles.active
            )}
            onClick={() => router.push("/news")}
          >
            Новости
          </span>
        </div>
        <div className={styles.all__news_container}>
          <h1 className="default__showMore_title">Новости</h1>
          <div className={styles.allNews__container_content}>
            {currentItems.map((news) => (
              <div key={news.id} className={styles.allNews__content}>
                <div className={styles.test}>
                  <Image
                    onClick={() => router.push(`/news/${news.id}`)}
                    className={styles.allNews__content_image}
                    src={`${url}${news.logo}`}
                    width={450}
                    height={280}
                    alt={news.naim}
                  />
                </div>

                <div className={styles.allNews__content_info}>
                  <h1
                    onClick={() => router.push(`/news/${news.id}`)}
                    className="allNews__content_title"
                  >
                    {news.naim}
                  </h1>
                  <div
                    style={{ marginBottom: 20 }}
                    dangerouslySetInnerHTML={{ __html: news.anons }}
                  />
                  <div className={styles.allNews__content_data}>
                    <span>{formatNewsDate(news.dat1)}</span>
                    <span>Просмотров: {news.view}</span>
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
              currentPage === 1 && styles.pagination__button_disactive
            )}
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            className={clsx(
              "pagination__button",
              currentPage === 1 && styles.pagination__button_disactive
            )}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {Array.from({ length: maxPage }, (_, index) => (
            <button
              className={clsx(
                "pagination__button",
                currentPage === index + 1 && styles.pagination__button_active
              )}
              key={index}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={clsx(
              "pagination__button",
              currentPage === maxPage && styles.pagination__button_disactive
            )}
            onClick={handleNextPage}
            disabled={currentPage === maxPage}
          >
            {">"}
          </button>
          <button
            className={clsx(
              "pagination__button_custom",
              currentPage === maxPage && styles.pagination__button_disactive
            )}
            onClick={handleLastPage}
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



