"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import clsx from "clsx";
import { Items } from "@/types/CardProduct/cardProduct";
import { url } from "@/components/temporary/data";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/free-mode";
import "swiper/scss/thumbs";
import {
  FreeMode,
  Navigation,
  Thumbs,
  Keyboard,
  Pagination,
} from "swiper/modules";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import {
  SmallVideoPreview,
  SwiperNextArrow,
  SwiperPrevArrow,
} from "../../../../public/Icons/Icons";
import ItemVideo from "../ItemVideo/ItemVideo";
import DOMPurify from "isomorphic-dompurify";

interface IPhotosProps {
  photos: Items;
}

const ItemSlider = ({ photos }: IPhotosProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);

  const handleMouseEnter = (index: number) => {
    if (mainSwiper) {
      mainSwiper.slideTo(index);
    }
  };

  const [cleanHTML, setCleanHTML] = useState("");

  useEffect(() => {
    const sanitizedHTML = DOMPurify.sanitize(photos.video, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    });
    setCleanHTML(sanitizedHTML);
  }, [photos.video]);

  return (
    <div className={styles.product__swipers}>
      {photos.photos.length > 0 ? (
        <>
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={6}
            direction={"vertical"}
            spaceBetween={10}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className={clsx(styles.product__cards, "mySwiper")}
          >
            {photos.video && (
              <SwiperSlide
                className={styles.product__cards_item}
                onMouseEnter={() => handleMouseEnter(0)}
              >
                <div className={clsx(styles.product_preview, "thumb-actived")}>
                  <SmallVideoPreview />
                </div>
              </SwiperSlide>
            )}
            {photos.photos.map((photo, index) => (
              <SwiperSlide
                className={styles.product__cards_item}
                key={index}
                onMouseEnter={() =>
                  handleMouseEnter(photos.video ? index + 1 : index)
                }
              >
                <Image
                  className={clsx(styles.product_preview, "thumb-actived")}
                  src={
                    photo.url_part.startsWith("https://goods")
                      ? `${photo.url_part}280.jpg`
                      : photo.url_part.startsWith("https://")
                      ? photo.url_part
                      : `${url}nal/img/${photos.id_post}/l_${photo.url_part}`
                  }
                  width={100}
                  height={100}
                  alt={photo.url_part}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        " "
      )}
      <Swiper
        onSwiper={setMainSwiper}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          type: "fraction",
        }}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next_card",
          prevEl: ".swiper-button-prev_card",
          disabledClass: "swiper-button-disabled",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Keyboard, Pagination]}
        className={styles.activeSlide}
      >
        {photos.video && (
          <SwiperSlide className={styles.activeSlide} key={0}>
            <div
              dangerouslySetInnerHTML={{ __html: cleanHTML }}
              className={styles.activeSlide_iframe}
            ></div>
          </SwiperSlide>
        )}
        {photos.photos.length > 0 ? (
          photos.photos.slice(0, 7).map((photo, index) => (
            <SwiperSlide
              key={photos.video ? index + 1 : index}
              className={styles.activeSlide}
            >
              <InnerImageZoom
                width={500}
                height={500}
                src={
                  photo.url_part.startsWith("https://goods")
                    ? `${photo.url_part}280.jpg`
                    : photo.url_part.startsWith("https://")
                    ? photo.url_part
                    : `${url}nal/img/${photos.id_post}/b_${photo.url_part}`
                }
                zoomSrc={
                  photo.url_part.startsWith("https://goods")
                    ? `${photo.url_part}280.jpg`
                    : photo.url_part.startsWith("https://")
                    ? photo.url_part
                    : `${url}nal/img/${photos.id_post}/b_${photo.url_part}`
                }
                zoomType="hover"
                zoomScale={1.7}
                className={styles.product_img}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className={styles.activeSlide}>
            <Image
              className={styles.product_img}
              src="/img/blurImage.png"
              width={500}
              height={500}
              alt="empty.png"
              loading="lazy"
            />
          </SwiperSlide>
        )}
        <button
          className={clsx(
            styles.sliderArrow,
            styles.sliderArrow_left,
            "swiper-button-prev_card"
          )}
        >
          <SwiperPrevArrow />
        </button>
        <button
          className={clsx(
            styles.sliderArrow,
            styles.sliderArrow_right,
            "swiper-button-next_card"
          )}
        >
          <SwiperNextArrow />
        </button>
      </Swiper>
    </div>
  );
};

export default ItemSlider;
