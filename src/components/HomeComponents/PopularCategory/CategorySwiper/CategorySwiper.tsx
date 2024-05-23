"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./style.module.scss";
import { ICategory } from "../PopularCategory";
import Image from "next/image";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "../../../../../public/Icons/Icons";
import Loader from "@/components/UI/Loader/Loader";
import { url } from "@/components/temporary/data";
import { IPopularCategory } from "@/types/PopularCategory";
import Link from "next/link";

export default function CategorySwiper({ category }: ICategory) {
  const [loading, setLoading] = useState(true);
  const [cachedData, setCachedData] = useState<IPopularCategory[] | null>(null);

  useEffect(() => {
    const cachedCategory = localStorage.getItem("cachedCategory");

    if (cachedCategory) {
      setCachedData(JSON.parse(cachedCategory));
      setLoading(false);
    } else {
      localStorage.setItem("cachedCategory", JSON.stringify(category));
      setCachedData(category);
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    // Сохраняем категории в локальное хранилище при каждом изменении
    if (cachedData !== null) {
      localStorage.setItem("cachedCategory", JSON.stringify(cachedData));
    }
  }, [cachedData]);

  return (
    <div className={styles.category__swiper}>
      {loading ? (
        <Loader />
      ) : (
        <Swiper
          slidesPerView={6}
          spaceBetween={15}
          slidesPerGroup={6}
          navigation={{
            nextEl: ".team__btn_next",
            prevEl: ".team__btn_prev",
          }}
          pagination={{ clickable: true }}
          grid={{
            rows: 2,
            fill: "row",
          }}
          breakpoints={{
            240: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 3,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 3,
              slidesPerGroup: 10,
            },
            768: {
              spaceBetween: 3,
              slidesPerView: 4,
              slidesPerGroup: 15,
            },
            992: {
              spaceBetween: 15,
              slidesPerView: 5,
              slidesPerGroup: 20,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 25,
            },
          }}
          modules={[Grid, Pagination, Navigation]}
          className="myCategory__swiper"
        >
          {category.map((item) => {
            const imageUrl = item.icon
              ? item.icon.startsWith("https://")
                ? item.icon
                : `${url}${item.icon}`
              : `${url}images/discount/empty-image.png`;
            return (
              <Link
                key={item.idd}
                href={`catalog/${item.full_slug}`}
                className="link"
              >
                <SwiperSlide
                  className="swiper__slide"
                >
                  <Image
                    className="swiper__slide_img"
                    src={imageUrl}
                    width={93.5}
                    height={93.5}
                    alt={item.name}
                    loading="lazy"
                  />
                  <h1 className="category__item_title">{item.name}</h1>
                </SwiperSlide>
              </Link>
            );
          })}
          <div className={styles.team__swiper_buttons}>
            <div className="team__btn_prev">
              <button className={styles.team__swiper_btn}>
                <ArrowLeftIcon />
              </button>
            </div>
            <div className="team__btn_next">
              <button className={styles.team__swiper_btn}>
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </Swiper>
      )}
    </div>
  );
}
