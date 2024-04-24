"use client"
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { IDiscounts } from "@/types/discounts";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import styles from "../style.module.scss";

interface IDiscountsProps {
  discounts: IDiscounts[];
}

const discountPage = 12;

const AllDiscounts = ({ discounts }: IDiscountsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const totalPages = Math.ceil(discounts.length / discountPage);
  const topRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedDiscounts = discounts.slice(
    (currentPage - 1) * discountPage,
    currentPage * discountPage
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    scrollToTop();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    scrollToTop();
  };

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  return (
    <section className="AllDiscounts">
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
              pathname === "/discounts" && styles.active
            )}
            onClick={() => router.push("/discounts")}
          >
            Скидки
          </span>
        </div>

        <div className={styles.all__discounts_container}>
          <h1 className="default__showMore_title">Скидки</h1>
          <div className={styles.discount__container}>
            {paginatedDiscounts.map((item) => (
              <div
                onClick={() => router.push(`discount/${item.promotion_id}`)}
                className={styles.discount__card}
                key={item.name}
              >
                <div className={styles.discount__card_images}>
                  <Image
                    className={styles.discount__card_img}
                    src={`${url}${item.image}`}
                    width={400}
                    height={250}
                    alt={item.name}
                  />
                </div>

                <div className={styles.discount__card_content}>
                  <div className={styles.discount__data}>
                    <h3 className={styles.discount__item_title}>{item.name}</h3>
                    <span className={styles.discount__item_days}>
                      {item.word} {item.days} {item.word_day}
                    </span>
                    <span className={styles.discount__item_fromTo}>
                      {item.message}
                    </span>
                  </div>
                  <div className={styles.discount__by}>
                    <span className={styles.discount__by_percent}>
                      Скидка
                      <span className={styles.discount__by_percent_custom}>
                        {item.bonuses[1].discount_value} %
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Пагинация */}
      <div ref={paginationRef} className="pagination">
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
        {Array.from({ length: totalPages }, (_, index) => (
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
            currentPage === totalPages && styles.pagination__button_disactive
          )}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          className={clsx(
            "pagination__button_custom",
            currentPage === totalPages && styles.pagination__button_disactive
          )}
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </section>
  );
};

export default AllDiscounts;

