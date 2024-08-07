"use client";
import React, { memo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../public/Icons/Icons";
import { Grid, Navigation, Pagination } from "swiper/modules";
import styles from "./style.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { ISeasonCategoryItem } from "@/types/HomeTypes/season";

interface ISeasonCategorySwiperProps {
  seasonItems: ISeasonCategoryItem[];
}

const SeasonCategory = memo(({ seasonItems }: ISeasonCategorySwiperProps) => {
  return (
    <section className={clsx(styles.category_swiper, "season__category")}>
      <div className="container">
        <h1 className="sections__title">Сезонные категории</h1>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          slidesPerGroup={6}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".team__btn_next",
            prevEl: ".team__btn_prev",
          }}
          grid={{
            rows: 2,
            fill: "row",
          }}
          breakpoints={{
            240: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 10,
              slidesPerGroup: 3,
            },
            768: {
              spaceBetween: 15,
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            992: {
              spaceBetween: 15,
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            1200: {
              spaceBetween: 30,
            },
          }}
          modules={[Grid, Pagination, Navigation]}
          className={styles.mySwiper}
        >
          {seasonItems.map((item) => {
            const imageUrl = item.icon
              ? item.icon.startsWith("https://")
                ? item.icon
                : `https://max.kg/${item.icon}`
              : "/img/noPhoto.svg";
            return (
              <SwiperSlide key={item.idd} className="swiper__slide">
                <Link className="link" href={`/catalog/${item.full_slug}`}>
                  <Image
                    className="swiper__slide_img"
                    src={imageUrl}
                    width={93.5}
                    height={93.5}
                    alt={item.name}
                    placeholder="blur"
                    loading="lazy"
                    blurDataURL={imageUrl}
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
    </section>
  );
});

SeasonCategory.displayName = "SeasonCategory";

export default SeasonCategory;
