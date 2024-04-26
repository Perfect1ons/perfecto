"use client";
import styles from "./style.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IBoughtItem } from "@/types/lastBoughts";
import TodayBoughtsSection from "./TodayBoughtsSection/TodayBoughtsSection";

interface IPopularGoodsProps {
  pageOne: IBoughtItem[];
  pageTwo: IBoughtItem[];
  pageThree: IBoughtItem[];
}

export default function PopularGoods({
  pageOne,
  pageTwo,
  pageThree,
}: IPopularGoodsProps) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  console.log(pageOne);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (page >= 3) {
      router.push("/all-popular-goods");
    }
  };

  return (
    <div className="boughts">
      <div className="container">
        <div className="cardContainer">
          <h2 className="sections__title">Сегодня купили</h2>
          <TodayBoughtsSection boughts={pageOne} />
          {page >= 2 && <TodayBoughtsSection boughts={pageTwo} />}
          {page >= 3 && <TodayBoughtsSection boughts={pageThree} />}
          <div className="showMoreBtn">
            <button className="news__buttons_showMore" onClick={handleShowMore}>
              {page < 3 ? "Показать еще" : "Показать все"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
