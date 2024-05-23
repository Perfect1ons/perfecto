"use client";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./style.module.scss";
import cn from "clsx";
import {
  checkIcon,
  GrayStar,
  YellowStar,
} from "../../../../public/Icons/Icons";
import { postOtz } from "@/api/requests";

interface IReviewModal {
  func: () => void;
}

export interface IUser {
  dost?: string;
  nedost?: string;
  name: string;
  comment: string;
  rating: number;
  anonim: number;
}

const ReviewModal = ({ func }: IReviewModal) => {
  const [otz, setOtz] = useState<IUser>({
    dost: "",
    nedost: "",
    name: "",
    comment: "",
    rating: 0,
    anonim: 0,
  });
  console.log(otz);

  const [isAnomim, setIsAnonim] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const ChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setOtz((otz) => {
      return {
        ...otz,
        [event.target.name]: event.target.value,
      };
    });
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

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
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
                  [styles.wrapper_ocenka_rating_starActive]: otz.rating >= star,
                })}
                onClick={() => handleRatingClick(star)}
              >
                {otz.rating >= star ? <YellowStar /> : <GrayStar />}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.wrapper_areas}>
          <div className={styles.wrapper_areas_block}>
            <span className={styles.wrapper_areas_block_title}>
              Достоинства
            </span>
            <textarea
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
              maxLength={255}
              onChange={ChangeHandler}
              name="nedost"
              id="nedost"
              className={styles.wrapper_areas_block_area}
            ></textarea>
          </div>
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
        <div className={styles.wrapper_inputs}>
          <input
            maxLength={15}
            name="name"
            placeholder="Ваше имя*"
            onChange={ChangeHandler}
            type="text"
            className={styles.wrapper_inputs_name}
          />
          <input
            maxLength={255}
            name="comment"
            placeholder="Добавить комментарии*"
            onChange={ChangeHandler}
            type="text"
            className={styles.wrapper_inputs_comm}
          />
        </div>
        <div className={styles.wrapper_reCaptcha}>
          <ReCAPTCHA
            sitekey="6LeyWSMUAAAAAH6F2DozJL5PF8B7_2F25GvOCDOn"
            onChange={handleCaptchaChange}
          />
        </div>
        <button
          onClick={SendOtz}
          disabled={otz.name.length == 0 || otz.comment.length == 0}
          className={styles.wrapper_sendBtn}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
