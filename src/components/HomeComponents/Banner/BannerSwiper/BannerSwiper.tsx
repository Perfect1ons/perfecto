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
import cn from "clsx";
import {
  SwiperNextArrow,
  SwiperPrevArrow,
} from "../../../../../public/Icons/Icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ISlide {
  slides: IIntro[];
}

const BannerSwiper = ({ slides }: ISlide) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    setImageLoaded(false);
  }, []);

  const isLoop = slides.length > 1;

  return (
    <Swiper
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      spaceBetween={15}
      modules={[Pagination, Navigation, Autoplay]}
      navigation={{
        prevEl: ".swiper-button-prev_card",
        nextEl: ".swiper-button-next_card",
        disabledClass: "swiper-button-disabled",
      }}
      style={isLoop ? { paddingBottom: "40px" } : {}}
      className={styles.swiper}
      loop={isLoop}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className={`${styles.swiper__slide}`}>
          <Link href={slide.url.replace("https://max.kg/", "")}>
            {imageLoaded ? (
              <Skeleton className={styles.swiper__slide_img_skeleton} />
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
                priority
              />
            )}
          </Link>
        </SwiperSlide>
      ))}
      {isLoop && (
        <>
          <button
            aria-label="prev swiper slide"
            className={cn(
              styles.sliderArrow,
              styles.sliderArrow_left,
              "swiper-button-prev_card"
            )}
          >
            <SwiperPrevArrow />
          </button>
          <button
            aria-label="next swiper slide"
            className={cn(
              styles.sliderArrow,
              styles.sliderArrow_right,
              "swiper-button-next_card"
            )}
          >
            <SwiperNextArrow />
          </button>
        </>
      )}
    </Swiper>
  );
};

export default BannerSwiper;
