"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import cn from "clsx";
import DOMPurify from "dompurify";
import { Cross } from "../../../../public/Icons/Icons";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import { useState } from "react";

interface IProductReviewProps {
  data: Items;
  func: () => void;
  visible: boolean;
}
interface ITogglerProps {
  about: boolean;
  video: boolean;
  characteristics: boolean;
}

const ItemDescriptionModal = ({ data, func, visible }: IProductReviewProps) => {
  const dispatch = useDispatch();
  const [toggler, setToggler] = useState<ITogglerProps>({
    about: true,
    video: false,
    characteristics: false,
  });
  const handleToggle = (section: keyof ITogglerProps) => {
    setToggler((prevState: ITogglerProps) => {
      const updatedToggler: ITogglerProps = { ...prevState };
      Object.keys(updatedToggler).forEach((key: string) => {
        const sectionKey = key as keyof ITogglerProps;
        if (sectionKey !== section) {
          updatedToggler[sectionKey] = false;
        }
      });
      updatedToggler[section] = !prevState[section];
      return updatedToggler;
    });
  };

  const handleToggleClick = (section: keyof ITogglerProps) => {
    if (!toggler[section]) {
      handleToggle(section);
    }
  };

  const sanitizedVideoHTML = DOMPurify.sanitize(data.video, {
    ALLOWED_TAGS: ["iframe"], // разрешаем только тег <iframe>
    ALLOWED_ATTR: [
      // разрешаем необходимые атрибуты
      "src",
      "width",
      "height",
      "frameborder",
      "allow",
      "allowfullscreen",
      "type",
      "data",
    ],
  });

  return (
    <div className={styles.container}>
      <div
        onClick={func}
        className={cn(styles.container__backdrop, {
          [styles.activeBackdrop]: visible,
        })}
      ></div>
      <div className={cn(styles.wrapper, { [styles.visible]: visible })}>
        <div className={styles.wrapper__container}>
          <div className={styles.wrapper__container__header}>
            {data.description && (
              <h2
                className={cn(styles.wrapper__container__header__h2, {
                  [styles.activeH2]: toggler.about,
                })}
                onClick={() => handleToggleClick("about")}
              >
                О товаре
              </h2>
            )}
            {data.specification && (
              <h2
                className={cn(styles.wrapper__container__header__h2, {
                  [styles.activeH2]: toggler.characteristics,
                })}
                onClick={() => handleToggleClick("characteristics")}
              >
                Характеристики
              </h2>
            )}
            {data.video && (
              <h2
                className={cn(styles.wrapper__container__header__h2, {
                  [styles.activeH2]: toggler.video,
                })}
                onClick={() => handleToggleClick("video")}
              >
                Видео
              </h2>
            )}
          </div>
          <button
            onClick={func}
            className={styles.wrapper__container__header__btn}
          >
            <Cross />
          </button>
        </div>
        {toggler.about && (
          <div className={styles.aboutProduct}>
            <div className={styles.aboutProduct__description}>
              <p
                className={styles.aboutProduct__description_p}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.description),
                }}
              />
            </div>
          </div>
        )}
        {toggler.characteristics && (
          <div className={styles.aboutProduct}>
            <div className={styles.aboutProduct__description}>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.specification),
                }}
                className={styles.aboutProduct__description_p}
              />
            </div>
          </div>
        )}
        {toggler.video && data.video && (
          <div className={styles.aboutProduct}>
            <h3 className={styles.aboutProduct__h3}>Видео</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizedVideoHTML,
              }}
            />
          </div>
        )}
        <div className={styles.wrapper__containerFooter}>
          <h2 className={styles.wrapper__containerFooter__h2}>
            {data.price}с.
          </h2>
          <button
            onClick={() => dispatch(addProductToCart(data))}
            className={styles.wrapper__containerFooter__btn}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDescriptionModal;
