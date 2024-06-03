"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import clsx from "clsx";

import { Items } from "@/types/CardProduct/cardProduct";
import { url } from "@/components/temporary/data";

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
  PlusIcon,
  SmallVideoPreview,
  SwiperNextArrow,
  SwiperPrevArrow,
} from "../../../../public/Icons/Icons";
import DOMPurify from "isomorphic-dompurify";
import ItemSliderModal from "./ItemSliderModal/ItemSliderModal";
import useMediaQuery from "@/hooks/useMediaQuery";

interface IPhotosProps {
  photos: Items;
  toggleScrollLock: () => void;
}

const ItemSlider = ({ photos, toggleScrollLock }: IPhotosProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [modalSliderIsOpen, setModalSliderIsOpen] = useState(false);

  const isZoomEnabled = useMediaQuery("(min-width: 992px)");

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

  if (!photos || !photos.photos || photos.photos.length === 0) {
    return (
      <div className={styles.product__swipers}>
        <Image
          src="https://max.kg/images/xempty-photo.png.pagespeed.ic.VU5saRrMht.webp"
          width={500}
          height={500}
          alt="No image available"
        />
      </div>
    );
  }

  const modalSliderOpenOrClose = () => {
    setModalSliderIsOpen(!modalSliderIsOpen);
    toggleScrollLock();
  };

  return (
    <>
      {modalSliderIsOpen && (
        <div className={styles.wrap_modal}>
          <ItemSliderModal
            isOpen={modalSliderIsOpen}
            closeModal={modalSliderOpenOrClose}
            photos={photos}
          />
          <div
            onClick={() => setModalSliderIsOpen(false)}
            className={styles.wrap_backdrop}
          ></div>
        </div>
      )}

      <div className={styles.product__swipers}>
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
          <SwiperSlide
            className={clsx(
              styles.product__cards_item,
              styles.little_show_more
            )}
            onClick={modalSliderOpenOrClose}
          >
            <PlusIcon />
          </SwiperSlide>
        </Swiper>
        <div className={styles.mainSwiperWrap}>
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
            {photos.photos.slice(0, 7).map((photo, index) => (
              <SwiperSlide
                key={photos.video ? index + 1 : index}
                className={styles.activeSlide}
              >
                {isZoomEnabled ? (
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
                ) : (
                  <Image
                    width={500}
                    height={500}
                    src={
                      photo.url_part.startsWith("https://goods")
                        ? `${photo.url_part}280.jpg`
                        : photo.url_part.startsWith("https://")
                        ? photo.url_part
                        : `${url}nal/img/${photos.id_post}/b_${photo.url_part}`
                    }
                    alt={photo.url_part}
                    className={styles.product_img}
                  />
                )}
              </SwiperSlide>
            ))}
            <button className={styles.seeAll} onClick={modalSliderOpenOrClose}>
              Посмотреть все
            </button>
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
      </div>
    </>
  );
};

export default ItemSlider;
