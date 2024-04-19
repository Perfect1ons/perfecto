"use client";
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


export default function CategorySwiper({ category }: ICategory) {
  const router = useRouter();

  return (
    <div className={styles.category__swiper}>
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
        className={styles.mySwiper}
      >
        {category.map((item) => {
          const imageUrl = item.icon
            ? item.icon.startsWith("https://")
              ? item.icon
              : `https://max.kg/${item.icon}`
            : "https://max.kg/images/discount/empty-image.png";
          return (
            <SwiperSlide
              key={item.idd}
              onClick={() =>
                router.push(`https://max.kg/catalog/${item.full_slug}`)
              }
              className={styles.swiper__slide}
            >
              <Image
                className={styles.swiper__slide_img}
                src={imageUrl}
                width={93.5}
                height={93.5}
                alt={item.name}
              />
              <h1 className={styles.swiper__slide_title}>{item.name}</h1>
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
    </div>
  );
}
