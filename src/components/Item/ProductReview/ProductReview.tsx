"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.scss";
import { Navigation } from "swiper/modules";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GrayStar,
  YellowStar,
} from "../../../../public/Icons/Icons";
import { Items } from "@/types/CardProduct/cardProduct";
import { useEffect, useState } from "react";
import cn from "clsx";
import ReviewDate from "./ReviewDate/ReviewDate";
import Image from "next/image";
import { postRating } from "@/api/clientRequest";
import clsx from "clsx";

interface IProductReviewProps {
  data: Items;
  func: () => void;
}
export interface IOcenka {
  oc: number;
  id_tov: number;
}

const ProductReview = ({ data, func }: IProductReviewProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [otz, setOtz] = useState<IOcenka>({
    oc: 0,
    id_tov: data.id_tov,
  });

  useEffect(() => {
    setRating(Math.floor(data.ocenka));
  }, [data.ocenka]);

  const handleRatingClick = (oc: number) => {
    setOtz((prevOtz) => ({
      ...prevOtz,
      oc,
    }));
    postRating({ ...otz, oc });
  };

  const handleRatingMouseEnter = (ocenka: number) => {
    setHoverRating(ocenka);
  };

  const handleRatingMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className={styles.wrap}>
      <div id="otz" className="productReview">
        <h2 className={styles.wrap_title}>Отзывы о товаре</h2>
        <div className={styles.wrap_review}>
          <h2 className={styles.wrap_review_grade_title}>Оцените товар</h2>
          <div className={styles.wrap_review_grade_btns}>
            <div className={styles.wrap_review_grade_rating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  aria-label="rating button"
                  title={`Оценить товар ${star} из 5`}
                  key={star}
                  type="button"
                  className={cn(
                    styles.wrap_review_grade_rating_ocenka_rating_star,
                    {
                      [styles.wrap_review_grade_rating_ocenka_rating_starActive]:
                        hoverRating >= star || otz.oc >= star,
                    }
                  )}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => handleRatingMouseEnter(star)}
                  onMouseLeave={handleRatingMouseLeave}
                >
                  {hoverRating >= star || otz.oc >= star ? (
                    <YellowStar />
                  ) : (
                    <GrayStar />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className={styles.wrap_review_grade_short_desc}>
          Будет здорово, если вы напишете свои впечатления о товаре. Это поможет
          другим покупателям.
        </p>
        <button
          aria-label="write a review about a product"
          title="написать отзыв от товаре"
          onClick={func}
          className="default__buttons_showMore"
        >
          Написать отзыв
        </button>
      </div>
      {data.otz && data.otz.length !== 0 && (
        <Swiper
          slidesPerView={3}
          spaceBetween={25}
          navigation={{
            nextEl: ".team__btn_next",
            prevEl: ".team__btn_prev",
            disabledClass: "swiper-button-disabled",
          }}
          breakpoints={{
            240: {
              slidesPerView: 1,
              slidesPerGroup: 3,
              spaceBetween: 1,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 5,
              slidesPerGroup: 1,
            },
            768: {
              spaceBetween: 10,
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            992: {
              spaceBetween: 15,
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
          }}
          modules={[Navigation]}
          className={cn(styles.wrap_otz, "mySwiper")}
        >
          {data.otz &&
            data.otz.map((item, index) => (
              <SwiperSlide key={index} className={styles.wrap_review_otz_item}>
                <div className={styles.card__header}>
                  <Image
                    className={styles.card__header_userImage}
                    src="https://static-basket-01.wbbasket.ru/vol0/i/v3/user/avatar.png"
                    width={50}
                    height={50}
                    alt="user"
                  />
                  <div className={styles.card__header_content}>
                    <div className={styles.card__header_content_userInfo}>
                      {item.anonim ? (
                        <p className={styles.card__header_user}>
                          Анонимный пользователь
                        </p>
                      ) : (
                        <p className={styles.card__header_user}>{item.name}</p>
                      )}
                      <ReviewDate date={item.dat1} />
                    </div>
                    <div className="ocenka">
                      {[...Array(5)].map((_, index) => (
                        <span key={index}>
                          {index < item.ocenka ? <YellowStar /> : <GrayStar />}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.card__content}>
                  <p className={styles.card__content_desc}>{item.text}</p>
                </div>
              </SwiperSlide>
            ))}
          <button
            aria-label="prev swiper slide"
            className={clsx(
              styles.team__swiper_btn,
              styles.team__swiper_btn_left,
              "team__btn_prev"
            )}
          >
            <ArrowLeftIcon />
          </button>

          <button
            aria-label="next swiper slide"
            className={clsx(
              styles.team__swiper_btn,
              styles.team__swiper_btn_right,
              "team__btn_next"
            )}
          >
            <ArrowRightIcon />
          </button>
        </Swiper>
      )}
    </div>
  );
};

export default ProductReview;
