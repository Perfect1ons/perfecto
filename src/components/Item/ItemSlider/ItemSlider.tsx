"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import clsx from "clsx";

import { ICardProductItems } from "@/types/CardProduct/cardProduct";
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
  Mousewheel,
} from "swiper/modules";

import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import {
  SmallVideoPreview,
  SwiperNextArrow,
  SwiperPrevArrow,
} from "../../../../public/Icons/Icons";
import DOMPurify from "isomorphic-dompurify";
import ItemSliderModal from "./ItemSliderModal/ItemSliderModal";
import useMediaQuery from "@/hooks/useMediaQuery";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IPhotosProps {
  photos: ICardProductItems;
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

  const [cleanHTML, setCleanHTML] = useState<string>("");
  useEffect(() => {
    const sanitizedHTML = DOMPurify.sanitize(photos.items.video, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: [
        "allow",
        "allowfullscreen",
        "frameborder",
        "scrolling",
        "autoplay",
      ],
    });

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = sanitizedHTML;
    const iframe = tempDiv.querySelector("iframe");

    if (iframe) {
      const src = iframe.getAttribute("src");

      if (src) {
        try {
          const newSrc = new URL(src);
          newSrc.searchParams.set("autoplay", "1");
          newSrc.searchParams.set("mute", "1");
          iframe.setAttribute("src", newSrc.toString());
          iframe.setAttribute("autoplay", "true");
          iframe.setAttribute("muted", "");
        } catch (e) {
          console.error("Invalid URL: ", src);
        }
      }
    }

    setCleanHTML(tempDiv.innerHTML);
  }, [photos.items.video]);

  const pauseVideo = () => {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      const iframeSrc = iframe.getAttribute("src");
      if (iframeSrc) {
        iframe.setAttribute("src", iframeSrc); // Reloads the iframe, effectively pausing the video
      }
    }
  };

  if (!photos || !photos.items.photos || photos.items.photos.length === 0) {
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

  const paginationEnabled = photos.items.photos.length > 1;

  return (
    <>
      {modalSliderIsOpen && (
        <ItemSliderModal
          isOpen={modalSliderIsOpen}
          closeModal={modalSliderOpenOrClose}
          photos={photos}
          zoom={isZoomEnabled}
        />
      )}

      <div className={styles.product__swipers}>
        {/* Боковой слайдер */}
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={6}
          direction={"vertical"}
          spaceBetween={10}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
          mousewheel={true}
          navigation={{
            nextEl: ".swiper-button-next_card",
            prevEl: ".swiper-button-prev_card",
            disabledClass: "swiper-button-disabled",
          }}
          className={clsx(styles.product__cards, "mySwiper")}
        >
          {photos.items.video && (
            <SwiperSlide
              className={styles.product__cards_item}
              onMouseEnter={() => handleMouseEnter(0)}
            >
              <div className={clsx(styles.product_preview, "thumb-actived")}>
                <SmallVideoPreview />
              </div>
            </SwiperSlide>
          )}

          {photos.items.photos.map((photo, index) => (
            <SwiperSlide
              className={styles.product__cards_item}
              key={index}
              onMouseEnter={() =>
                handleMouseEnter(photos.items.video ? index + 1 : index)
              }
            >
              <Image
                className={clsx(styles.product_preview, "thumb-actived")}
                src={
                  photo.url_part.startsWith("https://goods")
                    ? `${photo.url_part}280.jpg`
                    : photo.url_part.startsWith("https://")
                    ? photo.url_part
                    : `${url}nal/img/${photos.items.id_post}/l_${photo.url_part}`
                }
                width={100}
                height={100}
                alt={photo.url_part}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
          <button
            className={clsx(
              styles.sliderArrow,
              styles.sliderArrow_top,
              "swiper-button-prev_card"
            )}
          >
            <SwiperPrevArrow />
          </button>
          <button
            className={clsx(
              styles.sliderArrow,
              styles.sliderArrow_bottom,
              "swiper-button-next_card"
            )}
          >
            <SwiperNextArrow />
          </button>
        </Swiper>

        {/* Основной слайдер */}
        <Swiper
          onSwiper={setMainSwiper}
          onSlideChange={pauseVideo} // Add this line to pause video on slide change
          keyboard={{
            enabled: true,
          }}
          pagination={
            paginationEnabled
              ? {
                  clickable: true,
                  type: "fraction",
                }
              : false
          }
          spaceBetween={10}
          navigation={{
            nextEl: ".swiper-button-next_card",
            prevEl: ".swiper-button-prev_card",
            disabledClass: "swiper-button-disabled",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Keyboard, Pagination]}
          className={styles.mainSwiperWrap}
        >
          {photos.items.video && (
            <SwiperSlide className={styles.activeSlide} key={0}>
              <div
                dangerouslySetInnerHTML={{ __html: cleanHTML }}
                className={styles.iframe_wrap}
              ></div>
            </SwiperSlide>
          )}
          {photos.items.photos.map((photo, index) => (
            <SwiperSlide
              key={photo.url_part ? index + 1 : index}
              className={styles.activeSlide}
            >
              {isZoomEnabled ? (
                <InnerImageZoom
                  width={500}
                  height={500}
                  src={
                    photo.url_part.startsWith("https://goods")
                      ? `${photo.url_part}700-nw.jpg`
                      : photo.url_part.startsWith("https://")
                      ? photo.url_part
                      : `${url}nal/img/${photos.items.id_post}/b_${photo.url_part}`
                  }
                  zoomSrc={
                    photo.url_part.startsWith("https://goods")
                      ? `${photo.url_part}700-nw.jpg`
                      : photo.url_part.startsWith("https://")
                      ? photo.url_part
                      : `${url}nal/img/${photos.items.id_post}/b_${photo.url_part}`
                  }
                  zoomType="hover"
                  hideHint={true}
                  zoomScale={1.6}
                  className={styles.product_img}
                />
              ) : (
                <Image
                  width={500}
                  height={500}
                  src={
                    photo.url_part.startsWith("https://goods")
                      ? `${photo.url_part}700-nw.jpg`
                      : photo.url_part.startsWith("https://")
                      ? photo.url_part
                      : `${url}nal/img/${photos.items.id_post}/b_${photo.url_part}`
                  }
                  alt={photo.url_part}
                  className={styles.product_img}
                  onClick={modalSliderOpenOrClose}
                  loading="lazy"
                />
              )}
            </SwiperSlide>
          ))}
          {paginationEnabled && (
            <button className={styles.seeAll} onClick={modalSliderOpenOrClose}>
              Все фото
            </button>
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
      {/* <div className={styles.banner}>
        <ItemBanner />
      </div> */}
    </>
  );
};

export default ItemSlider;
