"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import cn from "clsx";
import { CopyIcon, Cross } from "../../../../public/Icons/Icons";
import DOMPurify from "isomorphic-dompurify";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import { useEffect, useRef, useState } from "react";

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(true); // состояние для отслеживания наличия скролла
  const handleScroll = (section: keyof ITogglerProps) => {
    setToggler({
      about: false,
      video: false,
      characteristics: false,
      [section]: true,
    });
    document
      .querySelector(`#${section}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      setHasScroll(wrapper.scrollHeight > wrapper.clientHeight);
    }
  }, [data, visible]);

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
        className={cn(styles.backdrop, {
          [styles.activeBackdrop]: visible,
        })}
      ></div>
      <div className={cn(styles.wrapper, { [styles.visible]: visible })}>
        <div className={styles.wrapper__container}>
          <div className={styles.wrapper__container__header}>
            {data.description && (
              <button
                onClick={() => handleScroll("about")}
                className={cn(styles.wrapper__container__header__button, {
                  [styles.activeH2]: toggler.about,
                })}
              >
                О товаре
              </button>
            )}
            {data.specification && hasScroll && (
              <button
                onClick={() => handleScroll("characteristics")}
                className={cn(styles.wrapper__container__header__button, {
                  [styles.activeH2]: toggler.characteristics,
                })}
              >
                Характеристики
              </button>
            )}
            {data.video && hasScroll && (
              <button
                onClick={() => handleScroll("video")}
                className={cn(styles.wrapper__container__header__button, {
                  [styles.activeH2]: toggler.video,
                })}
              >
                Видео
              </button>
            )}
            {/* {data.specification && (
              <button
                onClick={() => handleScroll("characteristics")}
                className={cn(styles.wrapper__container__header__button, {
                  [styles.activeH2]: toggler.characteristics,
                })}
              >
                Характеристики
              </button>
            )}
            {data.video && (
              <button
                onClick={() => handleScroll("video")}
                className={cn(styles.wrapper__container__header__button, {
                  [styles.activeH2]: toggler.video,
                })}
              >
                Видео
              </button>
            )} */}
          </div>
          <button
            onClick={func}
            className={styles.wrapper__container__header__btn}
          >
            <Cross />
          </button>
        </div>
        <div className={styles.product_info__ddos}></div>
        <div
          className={styles.aboutProductContainer}
          style={{ height: hasScroll ? "100%" : "auto" }}
        >
          {data.specification && (
            <div id="about" className={styles.aboutProduct}>
              <h3 className={styles.aboutProduct__h3}>О товаре</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.specification),
                }}
                className={styles.aboutProduct__description_p}
              />
            </div>
          )}
          {data.description && (
            <div id="characteristics" className={styles.aboutProduct}>
              <h3 className={styles.aboutProduct__h3}>Характеристики</h3>
              <p
                className={styles.aboutProduct__description_p}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.description),
                }}
              />
            </div>
          )}

          {data.video && (
            <div id="video" className={styles.aboutProduct}>
              <h3 className={styles.aboutProduct__h3}>Видео</h3>
              <div
                className={styles.aboutProduct__video}
                dangerouslySetInnerHTML={{
                  __html: sanitizedVideoHTML,
                }}
              />
            </div>
          )}
        </div>
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
