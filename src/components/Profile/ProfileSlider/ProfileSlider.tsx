"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import styles from '../style.module.scss'
// Import Swiper styles
import "swiper/css";


const ProfileSlider = () => {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={10}
      className="mySwiper"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        
        <SwiperSlide key={index} className={styles.orders__img}>
          <span>order</span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProfileSlider;
