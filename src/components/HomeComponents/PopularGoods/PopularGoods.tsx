"use client";
import styles from "./style.module.scss"
import { IPopularGood } from "@/types/popularGoods";
import PopularGoodsSection from "./PopularGoodsSection/PopularGoodsSection";
import { useEffect, useState } from "react";
import { getPopularGoods } from "@/api/requests";
import { useRouter } from "next/navigation";

export default function PopularGoods({ showAll = false }) {
    const [page, setPage] = useState(1);
  const [popularGoodsDataPage, setPopularGoodsDataPage] = useState<
    IPopularGood[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    getPopularGoods(page).then((goods) => {
      setPopularGoodsDataPage(goods);
    });
  }, [page]);

const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getPopularGoods(nextPage).then((goods) => {
        setPopularGoodsDataPage((prevGoods) => [...prevGoods, ...goods]);
    });
};

  const handleShowAll = () => {
    router.push("/all-popular-goods");
  };

  return (
    <div className="goods">
      <div className="container">
          <div className="cardContainer">
              <h2 className="sections__title">Популярные товары</h2>
              <PopularGoodsSection goods={popularGoodsDataPage} />
              <div className={styles.showMoreBtn}>
                  {!showAll && (
                    <button className="news__buttons_showMore" onClick={handleShowMore} disabled={page >= 3}>
                      {page < 3 ? "Показать еще" : "Показать все"}
                    </button>
                  )}
                  {showAll && <button className="news__buttons_showMore" onClick={handleShowAll}>Показать все</button>}
              </div>
          </div>
      </div>
    </div>
  );
}
