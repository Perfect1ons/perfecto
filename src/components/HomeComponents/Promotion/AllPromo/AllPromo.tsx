"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import styles from "./style.module.scss";
import { INews } from "@/types/news";
import { url } from "@/components/temporary/data";

interface IAllNewsProps {
  allpromo: INews[];
}

const AllPromo: React.FC<IAllNewsProps> = ({ allpromo }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxPage = Math.ceil(allpromo.length / itemsPerPage);
  const topRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Получение параметра "page" из URL и установка текущей страницы
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= maxPage) {
      setCurrentPage(pageNumber);
      const newUrl = `/promotions?page=${pageNumber}`;
      router.push(newUrl);
      scrollToTop();
    }
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

  // Рассчитать индексы первого и последнего элементов для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allpromo.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="all__news">
      <div ref={topRef} className="container">
        <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          <Link
            href={"/news"}
            className={clsx(
              "all__directions_link",
              pathname === "/promotions" && "all__directions_linkActive"
            )}
          >
            Акции
          </Link>
        </div>
        <div className={styles.all__news_container}>
          <h1 className="default__showMore_title">Акции</h1>
          <div className={styles.allNews__container_content}>
            {currentItems.map((news) => (
              <div key={news.id} className={styles.allNews__content}>
                <div className={styles.allNews__content_images}>
                  <Image
                    onClick={() => router.push(`/promotions/${news.id}`)}
                    className={styles.allNews__content_image}
                    src={`${url}${news.logo}`}
                    width={450}
                    height={280}
                    title={news.naim}
                    alt={news.naim}
                  />
                </div>

                <div className={styles.allNews__content_info}>
                  <h1
                    onClick={() => router.push(`/promotions/${news.id}`)}
                    className="allNews__content_title"
                  >
                    {news.naim}
                  </h1>
                  <div className={styles.allNews__desc}>
                    <Link
                      className={styles.allNews__desc_link}
                      href={`/promotions/${news.id}`}
                      title="Нажмите чтобы получить подробную информацию"
                    >
                      Подробнее
                    </Link>
                  </div>
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
              currentPage === 1 && "pagination__button_disactive"
            )}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            className={clsx(
              "pagination__button",
              currentPage === 1 && "pagination__button_disactive"
            )}
            onClick={() => handlePageChange(currentPage - 1)}
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
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={clsx(
              "pagination__button",
              currentPage === maxPage && "pagination__button_disactive"
            )}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === maxPage}
          >
            {">"}
          </button>
          <button
            className={clsx(
              "pagination__button_custom",
              currentPage === maxPage && "pagination__button_disactive"
            )}
            onClick={() => handlePageChange(maxPage)}
            disabled={currentPage === maxPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllPromo;
