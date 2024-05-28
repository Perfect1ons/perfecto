"use client";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.scss";
import useMediaQuery from "@/hooks/useMediaQuery";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { IIntro } from "@/types/Home/banner";
import Link from "next/link";
import clsx from "clsx";
import {
  SwiperNextArrow,
  SwiperPrevArrow,
} from "../../../../../public/Icons/Icons";

interface ISlide {
  slides: IIntro[];
}

const BannerSwiper = ({ slides }: ISlide) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    setImageLoaded(false);
  }, []);

  return (
    <Swiper
      pagination={{ clickable: true }}
      autoplay={{ delay: 30000, disableOnInteraction: false }}
      spaceBetween={15}
      modules={[Pagination, Navigation, Autoplay]}
      navigation={{
        nextEl: ".my-swiper-button-next",
        prevEl: ".my-swiper-button-prev",
        disabledClass: "swiper-button-disabled",
      }}
      className={clsx("customSwiper", styles.swiper)}
      loop={true}
    >
      {slides.map((slide) => (
        <SwiperSlide
          key={slide.id}
          className={`${styles.swiper__slide} ${
            slides.length === 2 ? "slideWithPadding" : "notmorethentwo"
          }`}
        >
          <Link href={slide.url.replace("https://max.kg/", "")}>
            {imageLoaded ? (
              <div className={styles.swiper__slide_img_skeleton}></div>
            ) : (
              <Image
                className={styles.swiper__slide_img}
                src={
                  isMobile
                    ? `https://max.kg/bimages/baner/mobile/baner_${slide.id}.jpg`
                    : `https://max.kg/bimages/baner/baner_${slide.id}.jpg`
                }
                width={1410}
                height={410}
                alt={slide.naim}
                loading="lazy"
              />
            )}
          </Link>
        </SwiperSlide>
      ))}
      <button
        className={clsx(
          styles.sliderArrow,
          styles.sliderArrow_left,
          "my-swiper-button-prev"
        )}
      >
        <SwiperPrevArrow />
      </button>
      <button
        className={clsx(
          styles.sliderArrow,
          styles.sliderArrow_right,
          "my-swiper-button-next"
        )}
      >
        <SwiperNextArrow />
      </button>
    </Swiper>
  );
};

export default BannerSwiper;
