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

  const [isFavorite, setIsFavorite] = useState(false);

  const [otz, setOtz] = useState<IOcenka>({
    oc: 0,
    id_tov: data.id_tov,
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

  const handleRatingClick = (oc: number) => {
    setOtz({
      ...otz,
      oc,
    });
    postOc();
  };

  const postOc = () => {
    postRating(otz);
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
                      otz.oc >= star,
                  })}
                  onClick={() => handleRatingClick(star)}
                >
                  {otz.oc >= star ? <YellowStar /> : <GrayStar />}
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
        {data.otz.length !== 0 && (
          <Swiper
            slidesPerView={3}
            spaceBetween={25}
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
            {data.otz.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className={styles.wrap_review_otz_item}
                >
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
                          <p className={styles.card__header_user}>
                            {item.name}
                          </p>
                        )}
                        <ReviewDate date={item.dat1} />
                      </div>
                      <div className="ocenka">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>
                            {index < item.ocenka ? (
                              <YellowStar />
                            ) : (
                              <GrayStar />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={styles.card__content}>
                    <p className={styles.card__content_desc}>{item.text}</p>
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
  );
};

export default ProductReview;
