"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import clsx from "clsx";
import { Items } from "@/types/CardProduct/cardProduct";
import { url } from "@/components/temporary/data";
import { useState } from "react";
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
  SwiperNextArrow,
  SwiperPrevArrow,
} from "../../../../public/Icons/Icons";

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

  return (
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
        {photos.photos.map((photo, index) => (
          <SwiperSlide
            className={styles.product__cards_item}
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <Image
              className={clsx(styles.product_preview, "thumb-actived")}
              src={`${url}nal/img/${photos.id_post}/b_${photo.url_part}`}
              width={100}
              height={100}
              alt={photo.url_part}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
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
          nextEl: ".my-swiper-button-next",
          prevEl: ".my-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Keyboard, Pagination]}
        className={styles.activeSlide}
      >
        {photos.photos.slice(0, 7).map((photo, index) => (
          <SwiperSlide key={index} className={styles.activeSlide}>
            <InnerImageZoom
              width={500}
              height={500}
              src={`${url}nal/img/${photos.id_post}/b_${photo.url_part}`}
              zoomSrc={`${url}nal/img/${photos.id_post}/b_${photo.url_part}`}
              zoomType="hover"
              zoomScale={1.7}
              className={styles.product_img}
            />
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
    </div>
  );
};

export default ItemSlider;

// "use client";
// import Image from "next/image";
// import styles from "./style.module.scss";
// import clsx from "clsx";
// import { Items } from "@/types/CardProduct/cardProduct";
// import { url } from "@/components/temporary/data";
// import { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/scss";
// import "swiper/scss/navigation";
// import "swiper/scss/pagination";
// import "swiper/scss/free-mode";
// import "swiper/scss/thumbs";
// import { FreeMode, Navigation, Thumbs, Keyboard } from "swiper/modules";
// import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

// interface IPhotosProps {
//   photos: Items;
// }

// const ItemSlider = ({ photos }: IPhotosProps) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
//   const [mainSwiper, setMainSwiper] = useState<any>(null);

//   const handleMouseEnter = (index: number) => {
//     if (mainSwiper) {
//       mainSwiper.slideTo(index);
//     }
//   };

//   return (
//     <div className={styles.product__swipers}>
//       <Swiper
//         onSwiper={setThumbsSwiper}
//         direction={"vertical"}
//         spaceBetween={10}
//         slidesPerView={5}
//         freeMode={true}
//         watchSlidesProgress={true}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className={clsx(styles.product__cards, "mySwiper")}
//       >
//         {photos.photos.slice(0, 7).map((photo, index) => (
//           <SwiperSlide
//             className={styles.product__cards_item}
//             key={index}
//             onMouseEnter={() => handleMouseEnter(index)}
//           >
//             <Image
//               className={clsx(styles.product_preview, "thumb-actived")}
//               src={`${url}nal/img/${photos.id_post}/b_${photo.url_part}`}
//               width={100}
//               height={100}
//               alt={photo.url_part}
//               loading="lazy"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <Swiper
//         onSwiper={setMainSwiper}
//         keyboard={{
//           enabled: true,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         spaceBetween={0} // Установим расстояние между слайдами в 0
//         slidesPerView={1} // Установим по 1 фото на слайд
//         navigation
//         thumbs={{ swiper: thumbsSwiper }}
//         modules={[FreeMode, Navigation, Thumbs, Keyboard]}
//         className={styles.activeSlide}
//       >
//         {photos.photos.slice(0, 7).map((photo, index) => (
//           <SwiperSlide key={index} className={styles.activeSlide}>
//             <InnerImageZoom
//               width={500}
//               height={500}
//               src={`${url}nal/img/${photos.id_post}/b_${photo.url_part}`}
//               zoomSrc={`${url}nal/img/${photos.id_post}/b_${photo.url_part}`}
//               zoomType="hover"
//               zoomScale={1.7}
//               className={styles.product_img}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ItemSlider;
