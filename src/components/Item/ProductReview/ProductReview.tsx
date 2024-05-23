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

interface IProductReviewProps {
  data: Items;
  func: () => void;
}
interface IOtz {
  rating: number;
}

const ProductReview = ({ data, func }: IProductReviewProps) => {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const [otz, setOtz] = useState<IOtz>({
    rating: 0,
  });

  useEffect(() => {
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;

    if (isLocalStorageAvailable) {
      const favoriteStatus = localStorage.getItem(data.id.toString());
      setIsFavorite(favoriteStatus === "true");
    }
  }, [data.id]);

  useEffect(() => {
    setRating(Math.floor(data.ocenka));
  }, [data.ocenka]);

  const handleRatingClick = (rating: number) => {
    setOtz({
      ...otz,
      rating,
    });
  };

  return (
    <div className={styles.wrap}>
      <div id="otz" className="productReview">
        <h4 className="sections__title">Отзывы о товаре «{data.naim}»</h4>
        <div className={styles.wrap_review}>
          <span className={styles.wrap_review_grade_title}>Оцените товар</span>
          <div className={styles.wrap_review_grade_btns}>
            <div className={styles.wrap_review_grade_rating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={cn(styles.wrap_review_grade_rating_star, {
                    [styles.wrap_review_grade_rating_starActive]:
                      otz.rating >= star,
                  })}
                  onClick={() => handleRatingClick(star)}
                >
                  {otz.rating >= star ? <YellowStar /> : <GrayStar />}
                </button>
              ))}
            </div>
          </div>
          <p className={styles.wrap_review_grade_short_desc}>
            Будет здорово, если вы напишете свои впечатления о товаре. Это
            поможет другим покупателям.
          </p>
          <button onClick={func} className="default__buttons_showMore">
            Написать отзыв
          </button>
        </div>
        <div className={styles.wrap_review_swiper}>
          {data.otz.length !== 0 && (
            <Swiper
              slidesPerView={3}
              spaceBetween={15}
              navigation={{
                nextEl: ".team__btn_next",
                prevEl: ".team__btn_prev",
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
                  spaceBetween: 10,
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              {data.otz.map((item, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className={styles.wrap_review_otz_item}
                  >
                    <div className={styles.wrap_review_otz_item_info}>
                      <div className={styles.wrap_review_otz_item_info_sender}>
                        <p
                          className={
                            styles.wrap_review_otz_item_info_sender_name
                          }
                        >
                          {item.name}
                        </p>
                        <div
                          className={
                            styles.wrap_review_otz_item_info_sender_ocenka
                          }
                        >
                          {[...Array(5)].map((_, index) => (
                            <span key={index}>
                              {index < rating ? <YellowStar /> : <GrayStar />}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className={styles.wrap_review_otz_item_info_date}>
                        {item.dat1}
                      </p>
                    </div>
                    <div className={styles.wrap_review_otz_item_comment}>
                      {item.dostoinsva && (
                        <div className={styles.wrap_review_otz_item_comm}>
                          <p
                            className={
                              styles.wrap_review_otz_item_comment_title
                            }
                          >
                            Достоинства:
                          </p>
                          <p
                            className={styles.wrap_review_otz_item_comment_text}
                          >
                            {item.dostoinsva}
                          </p>
                        </div>
                      )}
                      {item.nedostatki && (
                        <div className={styles.wrap_review_otz_item_comm}>
                          <p
                            className={
                              styles.wrap_review_otz_item_comment_title
                            }
                          >
                            Недостатки:
                          </p>
                          <p
                            className={styles.wrap_review_otz_item_comment_text}
                          >
                            {item.nedostatki}
                          </p>
                        </div>
                      )}
                      {item.text && (
                        <div className={styles.wrap_review_otz_item_comm}>
                          <p
                            className={
                              styles.wrap_review_otz_item_comment_title
                            }
                          >
                            Комментарий:
                          </p>
                          <p
                            className={styles.wrap_review_otz_item_comment_text}
                          >
                            {item.text}
                          </p>
                        </div>
                      )}
                    </div>
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
      </div>
    </div>
  );
};

export default ProductReview;
