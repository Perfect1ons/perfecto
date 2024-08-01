"use client";
import React, { memo } from "react";
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
import Link from "next/link";
import clsx from "clsx";
import { url } from "@/utils/url";

const CategorySwiper = memo(function CategorySwiper({ category }: ICategory) {
  return (
    <div className={styles.category_swiper}>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
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
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 15,
            slidesPerGroup: 3,
          },
          768: {
            spaceBetween: 30,
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          992: {
            spaceBetween: 25,
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
        modules={[Grid, Pagination, Navigation]}
        className={styles.mySwiper}
      >
        {category.map((item) => {
          const imageUrl = item.icon
            ? item.icon.startsWith(
                "https://cdn2.static1-sima-land.com/categories/25872.jpg"
              ) ||
              item.icon.startsWith(
                "https://cdn2.static1-sima-land.com/categories/27465.jpg"
              )
              ? "/img/noPhoto.svg"
              : item.icon.startsWith("https://")
              ? item.icon
              : `${url}${item.icon}`
            : "/img/noPhoto.svg";

          return (
            <SwiperSlide key={item.idd} className="swiper__slide">
              <Link
                href={`/catalog/${item.full_slug}`}
                className={styles.category_swiper_link}
              >
                <Image
                  className="swiper__slide_img"
                  src={imageUrl}
                  width={93.5}
                  height={93.5}
                  alt={item.name}
                  loading="lazy"
                />
                <h2 className="swiper__item_title">{item.name}</h2>
              </Link>
            </SwiperSlide>
          );
        })}
        <button
          aria-label="prev swiper slide"
          className={clsx(
            styles.team__swiper_btn,
            styles.team__swiper_btn_left,
            "team__btn_prev"
          )}
        >
          <ArrowLeftIcon />
        </button>
        <button
          aria-label="next swiper slide"
          className={clsx(
            styles.team__swiper_btn,
            styles.team__swiper_btn_right,
            "team__btn_next"
          )}
        >
          <ArrowRightIcon />
        </button>
      </Swiper>
    </div>
  );
});

export default CategorySwiper;
