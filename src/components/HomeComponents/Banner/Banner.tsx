"use client";
import styles from "./style.module.scss";
import cn from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const Banner = () => {
  return (
    <div className={cn(styles.banner, "container")}>
      <Swiper
        pagination={{
            clickable: true,
        }}
        slidesPerView={1}
        modules={[Pagination]}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
