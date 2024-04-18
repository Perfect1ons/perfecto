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
import Link from "next/link";

const maxkg = "https://max.kg/catalog/";

export default function CategorySwiper({ category }: ICategory) {
  return (
    <div className={styles.category__swiper}>
      <Swiper
        slidesPerView={6}
        spaceBetween={15}
        speed={500}
        slidesPerGroup={6}
        navigation={{
          nextEl: ".team__btn_next",
          prevEl: ".team__btn_prev",
        }}
        grid={{
          rows: 2,
          fill: "row",
        }}
        modules={[Grid, Pagination, Navigation]}
        className="mySwiper"
      >
        {category.map((item) => {
          const imageUrl = item.icon
            ? item.icon.startsWith("https://")
              ? item.icon
              : `https://max.kg/${item.icon}`
            : "https://max.kg/images/discount/empty-image.png";
          return (
            <Link key={item.id} href={`https://max.kg/catalog/${item.full_slug}`}>
              <SwiperSlide className={styles.swiper__slide}>
                <Image
                  className={styles.swiper__slide_img}
                  src={imageUrl}
                  width={93.5}
                  height={93.5}
                  alt={item.name}
                />
                <h1 className={styles.swiper__slide_title}>{item.name}</h1>
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
    </div>
  );
}
