"use client";
import { IItemItems } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import cn from "clsx";
import { CartIcon, Cross } from "../../../../public/Icons/Icons";
import DOMPurify from "isomorphic-dompurify";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import { useEffect, useRef, useState } from "react";
import { RootState } from "@/store";
import ReducerBtn from "@/UI/ReducerBtn/ReducerBtn";

interface IProductReviewProps {
  data: IItemItems;
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
  const [cleanHTML, setCleanHTML] = useState<string>("");
  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.id);
  const [toggler, setToggler] = useState<ITogglerProps>({
    about: true,
    video: false,
    characteristics: false,
  });
  const aboutProductContainerRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(true); // состояние для отслеживания наличия скролла
  const [added, setAdded] = useState(false);

  const handleScroll = (section: keyof ITogglerProps) => {
    const targetSection = document.getElementById(section);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      setToggler({
        about: false,
        video: false,
        characteristics: false,
        [section]: true,
      });
    } else {
      console.error(`Section ${section} not found.`);
    }
  };

  useEffect(() => {
    const aboutProductContainer = aboutProductContainerRef.current;
    if (aboutProductContainer) {
      setHasScroll(
        aboutProductContainer.scrollHeight > aboutProductContainer.clientHeight
      );
    }
  }, [data, visible]);

  const addToCart = () => {
    dispatch(addProductToCart(data));
    setAdded(true);
  };

  const handleCartEmpty = () => {
    setAdded(false);
  };

  useEffect(() => {
    if (data.video) {
      const sanitizedHTML = DOMPurify.sanitize(data.video, {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: [
          "allow",
          "allowfullscreen",
          "frameborder",
          "scrolling",
          "autoplay",
        ],
      });

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = sanitizedHTML;
      const iframe = tempDiv.querySelector("iframe");

      if (iframe) {
        const src = iframe.getAttribute("src");

        if (src) {
          try {
            const newSrc = new URL(src);
            newSrc.searchParams.set("autoplay", "1");
            newSrc.searchParams.set("mute", "1");
            iframe.setAttribute("src", newSrc.toString());
            iframe.setAttribute("autoplay", "true");
            iframe.setAttribute("muted", "");
          } catch (e) {
            console.error("Invalid URL: ", src);
          }
        }
      }
      setCleanHTML(tempDiv.innerHTML);
    }
  }, [data.video]);

  // отдельный state и callback для того, чтобы фокус был на инпут редюсера здесь, а не в родительском
  const [shouldFocusInput, setShouldFocusInput] = useState(false);

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
                  __html: cleanHTML,
                }}
              />
            </div>
          )}
        </div>
        <div className={styles.wrapper__containerFooter}>
          {data?.discount_prc > 0 ? (
            <div className={styles.ItemPriceCard__cost}>
              <span className={styles.ItemPriceCard__price_new}>
                {data.cenaok.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__price_new_custom}>
                  с
                </span>
              </span>
              <span className={styles.ItemPriceCard__price_discount}>
                -{data.discount_prc}%
              </span>
              <span className={styles.ItemPriceCard__old_price}>
                {data.old_price.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__old_price_custom}>
                  с
                </span>
              </span>
            </div>
          ) : (
            <div className={styles.ItemPriceCard__cost}>
              <span className={styles.ItemPriceCard__price}>
                {data?.cenaok.toLocaleString("ru-RU")}
                <span className={styles.ItemPriceCard__price_custom}>с</span>
              </span>
            </div>
          )}
          <div className={styles.buttonsContainer}>
            <div className={styles.buttonsContainer__carts}>
              {!product?.quantity && (
                <button
                  onClick={addToCart}
                  className={styles.buttonsContainer__carts__cart}
                >
                  <span className="add__to_cart_icon">
                    <CartIcon />
                  </span>
                  В корзину
                </button>
              )}
              {product?.quantity && (
                <ReducerBtn
                  data={data}
                  shouldFocusInput={shouldFocusInput}
                  onFocusHandled={() => setShouldFocusInput(false)}
                />
              )}
            </div>

            {data.cenaok < 1000 ? null : (
              <button className={styles.buttonsContainer__buy}>Купить</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDescriptionModal;
