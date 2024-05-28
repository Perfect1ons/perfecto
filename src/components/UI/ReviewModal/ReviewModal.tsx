"use client";
import { ChangeEvent, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./style.module.scss";
import cn from "clsx";
import {
  Camera,
  checkIcon,
  Cross,
  GrayStar,
  XMark,
  YellowStar,
} from "../../../../public/Icons/Icons";
import { Items } from "@/types/CardProduct/cardProduct";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { postOtz } from "@/api/clientRequest";

interface IReviewModal {
  func: () => void;
  data: Items;
}

export interface IUser {
  dost?: string;
  nedost?: string;
  name: string;
  comment?: string;
  rating: number;
  image?: File[] | null;
  anonim?: number;
}

const ReviewModal = ({ func, data }: IReviewModal) => {
  const [otz, setOtz] = useState<IUser>({
    dost: "",
    nedost: "",
    name: "",
    comment: "",
    rating: 0,
    image: [],
    anonim: 0,
  });

  const [isAnomim, setIsAnonim] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [previews, setPreviews] = useState<string[]>([]);

  const [isNotValid, setIsNotValid] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = otz.image ? otz.image.length : 0;

    if (totalImages + files.length > 3) {
      return;
    }

    const filePreviews = files.map((file) => URL.createObjectURL(file));

    setOtz((prevOtz) => ({
      ...prevOtz,
      image: [...(prevOtz.image || []), ...files],
    }));

    setPreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setOtz((prevOtz) => {
      const newImages = [...(prevOtz.image || [])];
      newImages.splice(index, 1);
      return { ...prevOtz, image: newImages };
    });
    setPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

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
    if (captchaToken && otz.name && otz.rating) {
      const otzData = {
        ...otz,
      };
      postOtz(otzData);

      func();
    } else {
      setIsNotValid(true);
      return;
    }
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
              width={150}
              height={150}
              alt={data.img}
            ></Image>
          </div>
          <h2 className={styles.wrapper_product_productName}>{data.naim}</h2>
        </div>
        <button onClick={func} className={styles.wrapper_cross}>
          <XMark />
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
            autoComplete="off"
            placeholder="Ваше имя*"
            onChange={ChangeHandler}
            type="text"
            className={styles.wrapper_inputs_name}
          />
          {isNotValid && (
            <p className={styles.wrapper_inputs_warning}>
              Необходимо заполнить «Как Вас зовут? *»
            </p>
          )}
        </div>
        <div className={styles.wrapper_areas}>
          <div className={styles.wrapper_areas_block}>
            <label className={styles.wrapper_areas_block_title} id="dost">
              Достоинства
              <textarea
                rows={1}
                maxLength={255}
                onChange={ChangeHandler}
                name="dost"
                id="dost"
                className={styles.wrapper_areas_block_area}
              ></textarea>
            </label>
          </div>
          <div className={styles.wrapper_areas_block}>
            <label className={styles.wrapper_areas_block_title} id="nedost">
              Недостатки
              <textarea
                rows={1}
                maxLength={255}
                onChange={ChangeHandler}
                name="nedost"
                id="nedost"
                className={styles.wrapper_areas_block_area}
              ></textarea>
            </label>
          </div>
          <div className={styles.wrapper_areas_block}>
            <label className={styles.wrapper_areas_block_title} id="comment">
              Добавить комментарий
              <textarea
                rows={1}
                maxLength={255}
                name="comment"
                id="comment"
                onChange={ChangeHandler}
                className={styles.wrapper_areas_block_area}
              ></textarea>
            </label>
          </div>
        </div>
        <div className={styles.wrapper_selectMedia}>
          <button className={styles.wrapper_selectMedia_uploadBtn}>
            <Camera />
            <label
              className={styles.wrapper_selectMedia_uploadBtn_text}
              id="fileInput"
            >
              Добавить фото
              <input
                onChange={handleFileChange}
                id="fileInput"
                type="file"
                name="image"
                accept="image/*"
                maxLength={2097152}
                className={styles.wrapper_selectMedia_uploadBtn_input}
              ></input>
            </label>
          </button>
        </div>
        {previews && (
          <div className={styles.wrapper_userMediaPreview}>
            {previews.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles.wrapper_userMediaPreview_item}
                >
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className={styles.wrapper_userMediaPreview_item_cross}
                  >
                    <Cross />
                  </button>
                  <Image
                    className={styles.wrapper_userMediaPreview_item_img}
                    src={item}
                    width={100}
                    height={100}
                    alt={item}
                  />
                </div>
              );
            })}
          </div>
        )}
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
            sitekey="6LeyWSMUAAAAAHYqeoWK4VqFVJPyo8KetjDl7l6C"
            onChange={handleCaptchaChange}
          />
          {isNotValid && (
            <p className={styles.wrapper_reCaptcha_warning}>Пройдите капчу</p>
          )}
        </div>
        <button
          onClick={SendOtz}
          disabled={!otz.name.length || !otz.comment?.length}
          className={styles.wrapper_sendBtn}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
