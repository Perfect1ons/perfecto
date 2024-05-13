"use client"
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../public/Icons/Icons";
import { ISeekCatalog } from "@/types/Search/seek";
import styles from "./style.module.scss";
import SeekCatalogLoader from "../UI/Loader/SeekCatalogLoader";

interface ISeekCatalogProps {
  catalog: ISeekCatalog[];
}

const SeekCatalog = ({ catalog }: ISeekCatalogProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);


  if (isLoading) {
    return <SeekCatalogLoader />;
  }

  return (
    <Swiper
      ref={swiperRef}
      slidesPerView={7}
      slidesPerGroup={7}
      spaceBetween={15}
      navigation={{
        nextEl: ".team__btn_next",
        prevEl: ".team__btn_prev",
      }}
      pagination={{ clickable: true }}
      breakpoints={{
        240: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        480: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        640: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        768: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
        992: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },
        1200: {
          slidesPerView: 7,
          slidesPerGroup: 7,
        },
      }}
      modules={[Navigation, Pagination]}
      className={styles.mySwiper}
    >
      {catalog.map((item, index) => {
        const iconSrc = item.icon
          ? !item.icon.startsWith("https://")
            ? `https://max.kg/${item.icon}`
            : item.icon
          : "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";

        return (
          <SwiperSlide
            onClick={() => router.push(`/catalog/${item.full_slug}`)}
            key={index}
            className={styles.seek__catalog_card}
          >
            <Image
              className={styles.seek__catalog_card_image}
              src={iconSrc}
              width={65}
              height={65}
              alt={item.name}
            />
            <h1 className={styles.seek__catalog_card_title}>{item.name}</h1>
          </SwiperSlide>
        );
      })}
      <div className={styles.team__swiper_buttons}>
        <div
          className="team__btn_prev"
        >
          <button
            className={styles.team__swiper_btn}
          >
            <ArrowLeftIcon />
          </button>
        </div>
        <div
          className="team__btn_next"
        >
          <button
            className={styles.team__swiper_btn}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </Swiper>
  );
};

export default SeekCatalog;

