"use client";
import { ChangeEvent, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./style.module.scss";
import cn from "clsx";
import {
  Camera,
  CheckIcon,
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
  dostoinsva?: string;
  nedostatki?: string;
  name: string;
  text?: string;
  ocenka: number;
  images?: File[] | null;
  anonim?: number;
  id_tovar: number;
  url_tovar: string;
}

const ReviewModal = ({ func, data }: IReviewModal) => {
  const [otz, setOtz] = useState<IUser>({
    dostoinsva: "",
    nedostatki: "",
    name: "",
    text: "",
    ocenka: 0,
    images: [],
    anonim: 0,
    id_tovar: data.id_tov,
    url_tovar: data.url,
  });

  const [isAnomim, setIsAnonim] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [previews, setPreviews] = useState<string[]>([]);

  const [errors, setErrors] = useState<{
    captcha?: string;
    name?: string;
    rating?: string;
  }>({});

  const [isSended, setIsSended] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = otz.images ? otz.images.length : 0;

    if (totalImages + files.length > 3) {
      return;
    }

    const filePreviews = files.map((file) => URL.createObjectURL(file));

    setOtz((prevOtz) => ({
      ...prevOtz,
      images: [...(prevOtz.images || []), ...files],
    }));

    setPreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);

    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setOtz((prevOtz) => {
      const newImages = [...(prevOtz.images || [])];
      newImages.splice(index, 1);
      return { ...prevOtz, images: newImages };
    });
    setPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(index, 1);
      return newPreviews;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    const error = { captcha: "", name: "", rating: "" };

    if (!captchaToken) {
      error.captcha = "Пройдите «Капчу».";
    }

    if (!otz.name || otz.name.length === 0) {
      error.name = "Необходимо заполнить «Ваше имя*».";
    }

    if (!otz.ocenka || otz.ocenka < 1) {
      error.rating = "Необходимо поставить «Оценку».";
    }

    if (error.captcha || error.name || error.rating) {
      setErrors(error);
      return;
    }

    const otzData = {
      ...otz,
    };
    postOtz(otzData);
    setIsSended(true);
  };

  const AnonimHandler = () => {
    setIsAnonim(!isAnomim);
    setOtz({
      ...otz,
      anonim: isAnomim ? 0 : 1,
    });
  };

  const handleRatingClick = (ocenka: number) => {
    setOtz({
      ...otz,
      ocenka,
    });
  };

  const handleRatingMouseEnter = (ocenka: number) => {
    setHoverRating(ocenka);
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
        <div className={styles.wrapper_nav}>
          <h1 className={styles.wrapper_nav_title}>Вам понравился товар?</h1>
          <button onClick={func} className={styles.wrapper_nav_cross}>
            <XMark />
          </button>
        </div>
        {!isSended && (
          <div className={styles.container}>
            <div className={styles.container_product}>
              <div className={styles.container_product_imageContainer}>
                <Image
                  className={
                    styles.container_product_imageContainer_productImage
                  }
                  src={getImageUrl(data.photos[0])}
                  width={150}
                  height={150}
                  alt={data.img}
                ></Image>
              </div>
              <h2 className={styles.container_product_productName}>
                {data.naim}
              </h2>
            </div>
            <div className={styles.container_ocenka}>
              <div className={styles.container_ocenka_rating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={cn(styles.container_ocenka_rating_star, {
                      [styles.container_ocenka_rating_starActive]:
                        hoverRating >= star || otz.ocenka >= star,
                    })}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => handleRatingMouseEnter(star)}
                    onMouseLeave={handleRatingMouseLeave}
                  >
                    {hoverRating >= star || otz.ocenka >= star ? (
                      <YellowStar />
                    ) : (
                      <GrayStar />
                    )}
                  </button>
                ))}
              </div>
              <div className={styles.container_ocenka_text}>
                {ratingTexts[hoverRating - 1] ||
                  ratingTexts[otz.ocenka - 1] ||
                  "Поставьте оценку"}
              </div>
              {errors.rating && (
                <p className={styles.container_ocenka_warning}>
                  {errors.rating}
                </p>
              )}
            </div>
            <div className={styles.container_inputs}>
              <label id="name" className={styles.container_inputs_title}>
                Ваше имя
                <input
                  maxLength={15}
                  name="name"
                  autoComplete="off"
                  onChange={ChangeHandler}
                  type="text"
                  className={styles.container_inputs_name}
                />
              </label>
              {errors.name && (
                <p className={styles.container_inputs_warning}>{errors.name}</p>
              )}
            </div>
            <div className={styles.container_areas}>
              <div className={styles.container_areas_block}>
                <label className={styles.container_areas_block_title} id="dost">
                  Достоинства
                  <textarea
                    rows={1}
                    maxLength={255}
                    onChange={ChangeHandler}
                    name="dostoinsva"
                    id="dostoinsva"
                    className={styles.container_areas_block_area}
                  ></textarea>
                </label>
              </div>
              <div className={styles.container_areas_block}>
                <label
                  className={styles.container_areas_block_title}
                  id="nedost"
                >
                  Недостатки
                  <textarea
                    rows={1}
                    maxLength={255}
                    onChange={ChangeHandler}
                    name="nedostatki"
                    id="nedostatki"
                    className={styles.container_areas_block_area}
                  ></textarea>
                </label>
              </div>
              <div className={styles.container_areas_block}>
                <label
                  className={styles.container_areas_block_title}
                  id="comment"
                >
                  Добавить комментарий
                  <textarea
                    rows={1}
                    maxLength={255}
                    name="text"
                    id="text"
                    onChange={ChangeHandler}
                    className={styles.container_areas_block_area}
                  ></textarea>
                </label>
              </div>
            </div>
            <div className={styles.container_selectMedia}>
              <button className={styles.container_selectMedia_uploadBtn}>
                <Camera />
                <label
                  className={styles.container_selectMedia_uploadBtn_text}
                  id="fileInput"
                >
                  Добавить фото
                  <input
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    id="fileInput"
                    type="file"
                    name="image"
                    accept="image/*"
                    maxLength={2097152}
                    className={styles.container_selectMedia_uploadBtn_input}
                  ></input>
                </label>
              </button>
            </div>
            {previews && (
              <div className={styles.container_userMediaPreview}>
                {previews.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.container_userMediaPreview_item}
                    >
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className={styles.container_userMediaPreview_item_cross}
                      >
                        <Cross />
                      </button>
                      <Image
                        className={styles.container_userMediaPreview_item_img}
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
            <div className={styles.container_anonim}>
              <button
                className={styles.container_anonim_btn}
                onClick={AnonimHandler}
              >
                <span
                  className={cn(styles.container_anonim_check, {
                    [styles.container_anonim_checkActive]: isAnomim,
                  })}
                >
                  {isAnomim && <CheckIcon />}
                </span>
                <span className={styles.container_anonim_text}>
                  Оставить отзыв анонимно
                </span>
              </button>
            </div>
            <div className={styles.container_reCaptcha}>
              <ReCAPTCHA
                sitekey="6LeyWSMUAAAAAHYqeoWK4VqFVJPyo8KetjDl7l6C"
                onChange={handleCaptchaChange}
              />
              {errors.captcha && (
                <p className={styles.container_reCaptcha_warning}>
                  {errors.captcha}
                </p>
              )}
            </div>
          </div>
        )}
        {isSended && (
          <div className={styles.thanks}>
            <div className={styles.thanks_image}>
              <div
                className={cn("mascot_sprite", "mascot_sprite_rahmat")}
              ></div>
            </div>
            <div className={styles.thanks_text}>
              <h1 className={styles.thanks_text_title}>Спасибо за отзыв!</h1>
              <p className={styles.thanks_text_desc}>
                Вы очень помогаете другим покупателям.
              </p>
            </div>
          </div>
        )}
        {!isSended && (
          <button onClick={SendOtz} className={styles.wrapper_sendBtn}>
            Отправить
          </button>
        )}
        {isSended && (
          <button onClick={func} className={styles.wrapper_sendBtn}>
            Закрыть
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
