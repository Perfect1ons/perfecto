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
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "../../../../../public/Icons/Icons";
import { IIntro } from "@/types/Home/banner";
import Link from "next/link";
import clsx from "clsx";

interface ISlide {
  slides: IIntro[];
}

const BannerSwiper = ({ slides }: ISlide) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    setImageLoaded(false); // Установим loading в false после загрузки компонента
  }, []);

  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 30000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Navigation, Autoplay]}
      navigation={{
        nextEl: ".team__btn_next",
        prevEl: ".team__btn_prev",
      }}
      className={styles.mySwiper}
      loop={true}
    >
      {slides.map((slide) => {
        return (
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
  );
};

export default BannerSwiper;
