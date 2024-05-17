"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../public/Icons/Icons";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { ISeasonCategoryItem } from "@/types/seasonCategory";
import Loader from "@/components/UI/Loader/Loader";

interface ISeasonCategorySwiperProps {
  seasonItems: ISeasonCategoryItem[];
}

const SeasonCategorySwiper = ({ seasonItems }: ISeasonCategorySwiperProps) => {
  const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false);
    }, []);
  return (
    <section className="season__category">
      <div className="container">
        <h1 className="sections__title">Сезонные категории</h1>
        {loading ? (
          <Loader />
        ) : (
          <Swiper
            slidesPerView={5}
            spaceBetween={15}
            slidesPerGroup={5}
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
                  onClick={() => router.push(`catalog/${item.full_slug}`)}
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
        )}
      </div>
    </section>
  );
};

export default SeasonCategorySwiper;