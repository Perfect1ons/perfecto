"use client"
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from './style.module.scss'

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IBanner } from "../Banner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../../public/Icons/Icons";

interface ISlide {
    slides: IBanner[]
}

const BannerSwiper = ({slides}: ISlide) => {
    const router = useRouter()
  return (
    <div>
      <Swiper
        pagination={true}
        modules={[Pagination, Navigation]}
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
              className={styles.swiper__slide}
              onClick={() => router.push(slide.href)}
              key={slide.id}
            >
              <Image
                className={styles.swiper__slide_img}
                src={slide.img}
                width={1410}
                height={410}
                alt={slide.name}
                quality={100}
                priority
              />
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

export default BannerSwiper