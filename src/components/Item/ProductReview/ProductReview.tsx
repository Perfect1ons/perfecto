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

interface IProductReviewProps {
  data: Items;
}

const ProductReview = ({ data }: IProductReviewProps) => {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;

    if (isLocalStorageAvailable) {
      const favoriteStatus = localStorage.getItem(data.id.toString());
      setIsFavorite(favoriteStatus === "true");
    }
  }, [data.id]);

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      const isLocalStorageAvailable =
        typeof window !== "undefined" && window.localStorage;
      if (isLocalStorageAvailable) {
        localStorage.setItem(data.id.toString(), newIsFavorite.toString());
      }
      return newIsFavorite;
    });
  };

  useEffect(() => {
    setRating(Math.floor(data.ocenka));
  }, [data.ocenka]);

  return (
    <div className={styles.wrap}>
      <div id="otz" className="productReview">
        <h4 className="sections__title">Отзывы о товаре «{data.naim}»</h4>
        <div className={styles.wrap_review}>
          <span className={styles.wrap_review_grade_title}>Оцените товар</span>
          <div className={styles.wrap_review_grade_btns}>
            <div className="ocenka">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < rating ? <YellowStar /> : <GrayStar />}
                </span>
              ))}
            </div>
          </div>
          <p className={styles.wrap_review_grade_short_desc}>
            Будет здорово, если вы напишете свои впечатления о товаре. Это
            поможет другим покупателям.
          </p>
          <button className="default__buttons_showMore">Написать отзыв</button>
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
              {data.otz.map((item) => {
                return (
                  <SwiperSlide
                    key={item}
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
