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
import { useRouter } from "next/navigation";
import Loader from "@/components/UI/Loader/Loader";
import { url } from "@/components/temporary/data";
import { IPopularCategory } from "@/types/PopularCategory";

export default function CategorySwiper({ category }: ICategory) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Изначально установите значение loading в true
const [cachedData, setCachedData] = useState<IPopularCategory[]>([]);

  useEffect(() => {
    // Попробуем получить данные из кеша
    const cachedCategory = localStorage.getItem("cachedCategory");
    if (cachedCategory) {
      setCachedData(JSON.parse(cachedCategory));
      setLoading(false); // Устанавливаем loading в false, так как данные доступны из кеша
    } else {
      // Если данные отсутствуют в кеше, загружаем их и сохраняем в кеш
      localStorage.setItem("cachedCategory", JSON.stringify(category));
      setCachedData(category);
      setLoading(false); // Устанавливаем loading в false после загрузки и сохранения данных
    }
  }, [category]); // Запускаем useEffect при изменении категории

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
              slidesPerGroup: 3,
            },
            768: {
              spaceBetween: 3,
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            992: {
              spaceBetween: 15,
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 15,
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
              <SwiperSlide
                key={item.idd}
                onClick={() => router.push(`catalog/${item.full_slug}`)}
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

