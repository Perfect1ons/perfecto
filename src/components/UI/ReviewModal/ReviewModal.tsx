"use client";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./style.module.scss";
import cn from "clsx";
import {
  Camera,
  checkIcon,
  GrayStar,
  YellowStar,
} from "../../../../public/Icons/Icons";
import { postOtz } from "@/api/requests";
import { Items } from "@/types/CardProduct/cardProduct";
import Image from "next/image";
import { url } from "@/components/temporary/data";

interface IReviewModal {
  func: () => void;
  data: Items;
}

export interface IUser {
  dost?: string;
  nedost?: string;
  name: string;
  comment: string;
  rating: number;
  anonim: number;
}

const ReviewModal = ({ func, data }: IReviewModal) => {
  const [otz, setOtz] = useState<IUser>({
    dost: "",
    nedost: "",
    name: "",
    comment: "",
    rating: 0,
    anonim: 0,
  });
  const [isAnomim, setIsAnonim] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const ratingTexts = [
    "Ужасный товар",
    "Плохой товар",
    "Обычный товар",
    "Хороший товар",
    "Отличный товар",
  ];

  const ChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const target = event.target as HTMLTextAreaElement | HTMLInputElement;
    setOtz((otz) => ({
      ...otz,
      [target.name]: target.value,
    }));
    if (target instanceof HTMLTextAreaElement) {
      autoResize(target);
    }
  };

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const SendOtz = () => {
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    const otzData = {
      ...otz,
    };
    postOtz(otzData);
    func();
  };

  const AnonimHandler = () => {
    setIsAnonim(!isAnomim);
    setOtz({
      ...otz,
      anonim: isAnomim ? 0 : 1,
    });
  };

  const handleRatingClick = (rating: number) => {
    setOtz({
      ...otz,
      rating,
    });
  };

  const handleRatingMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };

  const handleRatingMouseLeave = () => {
    setHoverRating(0);
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const getImageUrl = (photo: any) => {
    if (!photo || !photo.url_part) {
      // Если photo или url_part не определены, возвращаем URL placeholder
      return "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";
    }

    if (photo.url_part.startsWith("https://goods-photos")) {
      return `${photo.url_part}280.jpg`;
    } else if (photo.url_part.startsWith("https://")) {
      return photo.url_part;
    } else {
      return `${url}nal/img/${data.id_post}/b_${data.img}`;
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <h1 className={styles.wrapper_title}>Вам понравился товар?</h1>
        <div className={styles.wrapper_product}>
          <div className={styles.wrapper_product_imageContainer}>
            <Image
              className={styles.wrapper_product_imageContainer_productImage}
              src={getImageUrl(data.photos[0])}
              width={80}
              height={80}
              alt={data.img}
            ></Image>
          </div>
          <h2 className={styles.wrapper_product_productName}>{data.naim}</h2>
        </div>
        <button onClick={func} className={styles.wrapper_cross}>
          ×
        </button>
        <div className={styles.wrapper_ocenka}>
          <div className={styles.wrapper_ocenka_rating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={cn(styles.wrapper_ocenka_rating_star, {
                  [styles.wrapper_ocenka_rating_starActive]:
                    hoverRating >= star || otz.rating >= star,
                })}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => handleRatingMouseEnter(star)}
                onMouseLeave={handleRatingMouseLeave}
              >
                {hoverRating >= star || otz.rating >= star ? (
                  <YellowStar />
                ) : (
                  <GrayStar />
                )}
              </button>
            ))}
          </div>
          <div className={styles.wrapper_ocenka_text}>
            {ratingTexts[hoverRating - 1] ||
              ratingTexts[otz.rating - 1] ||
              "Поставьте оценку"}
          </div>
        </div>
        <div className={styles.wrapper_inputs}>
          <input
            maxLength={15}
            name="name"
            placeholder="Ваше имя*"
            onChange={ChangeHandler}
            type="text"
            className={styles.wrapper_inputs_name}
          />
        </div>
        <div className={styles.wrapper_areas}>
          <div className={styles.wrapper_areas_block}>
            <span className={styles.wrapper_areas_block_title}>
              Достоинства
            </span>
            <textarea
              rows={1}
              maxLength={255}
              onChange={ChangeHandler}
              name="dost"
              id="dost"
              className={styles.wrapper_areas_block_area}
            ></textarea>
          </div>
          <div className={styles.wrapper_areas_block}>
            <span className={styles.wrapper_areas_block_title}>Недостатки</span>
            <textarea
              rows={1}
              maxLength={255}
              onChange={ChangeHandler}
              name="nedost"
              id="nedost"
              className={styles.wrapper_areas_block_area}
            ></textarea>
          </div>
          <div className={styles.wrapper_areas_block}>
            <span className={styles.wrapper_areas_block_title}>
              Добавить комментарий
            </span>
            <textarea
              rows={1}
              maxLength={255}
              name="comment"
              id="comment"
              onChange={ChangeHandler}
              className={styles.wrapper_areas_block_area}
            />
          </div>
        </div>
        <div className={styles.wrapper_selectMedia}>
          <button className={styles.wrapper_selectMedia_uploadBtn}>
            <Camera />
            <span className={styles.wrapper_selectMedia_uploadBtn_text}>
              Добавить фото или видео
            </span>
            <input
              id="fileInput"
              type="file"
              accept="image/*,video/*"
              maxLength={2097152}
              className={styles.wrapper_selectMedia_uploadBtn_input}
            ></input>
          </button>
        </div>
        <div className={styles.wrapper_anonim}>
          <button className={styles.wrapper_anonim_btn} onClick={AnonimHandler}>
            <span
              className={cn(styles.wrapper_anonim_check, {
                [styles.wrapper_anonim_checkActive]: isAnomim,
              })}
            >
              {isAnomim && checkIcon()}
            </span>
            <span className={styles.wrapper_anonim_text}>
              Оставить отзыв анонимно
            </span>
          </button>
        </div>
        <div className={styles.wrapper_reCaptcha}>
          <ReCAPTCHA
            sitekey="LeyWSMUAAAAAHYqeoWK4VqFVJPyo8KetjDl7l6C"
            onChange={handleCaptchaChange}
          />
        </div>
        <button
          onClick={SendOtz}
          disabled={!otz.name.length || !otz.comment.length}
          className={styles.wrapper_sendBtn}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
