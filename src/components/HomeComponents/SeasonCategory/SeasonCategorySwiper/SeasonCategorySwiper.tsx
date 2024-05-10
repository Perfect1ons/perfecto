"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../../public/Icons/Icons";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { ISeasonCategoryItem } from "@/types/seasonCategory";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss"

interface ISeasonCategorySwiperProps{
    seasonItems: ISeasonCategoryItem[];
}

const SeasonCategorySwiper = ({seasonItems}: ISeasonCategorySwiperProps) => {
    const router = useRouter();
  return (
    <div className={styles.category__swiper}>
            <Swiper
              slidesPerView={6}
              spaceBetween={15}
              slidesPerGroup={6}
              pagination={{clickable: true}}
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
                },
                480: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                  slidesPerGroup: 3,
                },
                768: {
                  spaceBetween: 15,
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                992: {
                  spaceBetween: 15,
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 15,
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
                  : "https://max.kg/images/discount/empty-image.png";
                return (
                  <SwiperSlide
                    key={item.idd}
                    onClick={() =>
                      router.push(`catalog/${item.full_slug}`)
                    }
                    className={styles.swiper__slide}
                  >
                    <Image
                      className={styles.swiper__slide_img}
                      src={imageUrl}
                      width={93.5}
                      height={93.5}
                      alt={item.name}
                      placeholder="blur"
                      loading="lazy"
                      blurDataURL={imageUrl}
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
          </div>
  )
}

export default SeasonCategorySwiper