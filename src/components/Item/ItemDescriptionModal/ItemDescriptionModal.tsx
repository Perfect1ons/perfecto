"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import cn from "clsx";
import { CartIcon, CopyIcon, Cross } from "../../../../public/Icons/Icons";
import DOMPurify from "isomorphic-dompurify";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import { useEffect, useRef, useState } from "react";
import CartReducerBtn from "@/components/UI/CartReducerBtn/CartReducerBtn";
import { RootState } from "@/store";

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
  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.id);
  const [toggler, setToggler] = useState<ITogglerProps>({
    about: true,
    video: false,
    characteristics: false,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(true); // состояние для отслеживания наличия скролла
  const [added, setAdded] = useState(false);

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
  const addToCart = () => {
    dispatch(addProductToCart(data));
    setAdded(true);
  };
  const handleCartEmpty = () => {
    setAdded(false);
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
                className={cn(
                  styles.wrapper__container__header__button,
                  styles.characteristics,
                  {
                    [styles.activeH2]: toggler.characteristics,
                  }
                )}
              >
                Характеристики
              </button>
            )}
            {data.video && hasScroll && (
              <button
                onClick={() => handleScroll("video")}
                className={cn(
                  styles.wrapper__container__header__button,
                  styles.characteristics,
                  {
                    [styles.activeH2]: toggler.video,
                  }
                )}
              >
                Видео
              </button>
            )}
          </div>
          <button
            onClick={func}
            className={styles.wrapper__container__header__btn}
          >
            <Cross />
          </button>
        </div>
        <div className={styles.product_info__ddos}></div>
        <div className={styles.aboutProductContainer}>
          {data.description && (
            <div id="about" className={styles.aboutProduct}>
              <h3 className={styles.aboutProduct__h3}>О товаре</h3>
              <p
                className={styles.aboutProduct__description_p}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.description),
                }}
              />
            </div>
          )}
          {data.specification && (
            <div id="characteristics" className={styles.aboutProduct}>
              <h3 className={styles.aboutProduct__h3}>Характеристики</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.specification),
                }}
                className={styles.aboutProduct__description_p}
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
          {data.discount_prc > 0 ? (
            <div className={styles.ItemPriceCard__cost}>
              <h2 className={styles.ItemPriceCard__price_new}>
                {data.cenaok.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__price_new_custom}>
                  с
                </span>
              </h2>
              <span className={styles.ItemPriceCard__price_discount}>
                -{data.discount_prc}%
              </span>
              <h2 className={styles.ItemPriceCard__old_price}>
                {data.old_price.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__old_price_custom}>
                  с
                </span>
              </h2>
            </div>
          ) : (
            <div className={styles.ItemPriceCard__cost}>
              <h2 className={styles.ItemPriceCard__price}>
                {data.cenaok.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__price_custom}>с</span>
              </h2>
            </div>
          )}
          <div className={styles.buttonsContainer}>
            {!product?.quantity && (
              <button
                onClick={addToCart}
                className={styles.ItemPriceCard__buttons_cart}
              >
                <span className="add__to_cart_icon">
                  <CartIcon />
                </span>
                В корзину
              </button>
            )}
            {product?.quantity && (
              <CartReducerBtn data={data} onCartEmpty={handleCartEmpty} />
            )}
            {data.cenaok < 1000 ? null : 
                <button className={styles.ItemPriceCard__buttons_buy}>
                Купить
              </button>
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDescriptionModal;
