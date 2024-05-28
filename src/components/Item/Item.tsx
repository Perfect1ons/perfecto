"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import cn from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CartIcon,
  CopyIcon,
  GrayFavoritesIcon,
  GrayStar,
  ShareIcon,
  TgIcon,
  VioletFavoritesIcon,
  WhIcon,
  YellowStar,
} from "../../../public/Icons/Icons";
import { url } from "@/components/temporary/data";
import { ISimilarItem } from "@/types/SimilarProduct/similarProduct";
import ProductInfo from "@/components/UI/DaysLeftCalculate/DaysLeftCalculate";
import DOMPurify from "isomorphic-dompurify";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import SimilarProducts from "../UI/SimilarProducts/SimilarProducts";
import ProductReview from "./ProductReview/ProductReview";
import ReviewModal from "../UI/ReviewModal/ReviewModal";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { useDispatch } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/free-mode";
import "swiper/scss/thumbs";
import { FreeMode, Navigation, Thumbs, Keyboard } from "swiper/modules";
import ItemDescriptionModal from "./ItemDescriptionModal/ItemDescriptionModal";
import { addProductToCart } from "@/store/reducers/cart.reducer";

interface IItemPageProps {
  data: Items;
  similar: ISimilarItem[];
}

const ItemPage = ({ data, similar }: IItemPageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [itemModalDescription, setiItemModalDescription] = useState(false);

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
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
  const toggleScrollLock = () => {
    const body = document.body;
    if (body) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (body.style.overflow === "hidden") {
        body.style.paddingRight = "";
        body.style.overflow = "auto";
        window.scrollTo(0, parseInt(body.style.top || "0", 10) * -1);
        body.style.top = "";
      } else {
        body.style.paddingRight = `${scrollBarWidth}px`;
        body.style.overflow = "hidden";
        body.style.top = `-${window.scrollY}px`;
      }
    }
  };

  const openItemModalDescription = () => {
    setiItemModalDescription(!itemModalDescription);
    toggleScrollLock();
  };
  const openModal = () => {
    setIsOpen(!isOpen);
    toggleScrollLock();
  };
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setDropdownActive(false);
      })
      .catch((err) => {
        console.error("Ошибка при копировании ссылки: ", err);
        setDropdownActive(false);
      });
  };
  const handleCopyCode = () => {
    navigator.clipboard.writeText(data.art.toString());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000); // Скрыть уведомление через 3 секунды
  };
  useEffect(() => {
    setRating(Math.floor(data.ocenka));
  }, [data.ocenka]);

  // const getImageUrl = (photo: any) => {
  //   if (!photo || !photo.url_part) {
  //     // Если photo или url_part не определены, возвращаем URL placeholder
  //     return "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";
  //   }

  //   if (photo.url_part.startsWith("https://goods-photos")) {
  //     return `${photo.url_part}280.jpg`;
  //   } else if (photo.url_part.startsWith("https://")) {
  //     return photo.url_part;
  //   } else {
  //     return `${url}nal/img/${data.id_post}/b_${data.img}`;
  //   }
  // };

  const handleWhatsAppClick = () => {
    window.location.href = `https://wa.me/?text=${encodeURIComponent(
      window.location.href
    )}`;
    setDropdownActive(!dropdownActive);
  };

  const handleTelegramClick = () => {
    window.location.href = `https://t.me/share/url?url=${encodeURIComponent(
      window.location.href
    )}`;
    setDropdownActive(!dropdownActive);
  };

  const handleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };
  // Проверяем наличие data.description
  const hasDescription = data.description && data.description.trim().length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.querySelector(
        `.${styles.product_info__share}`
      );
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        setDropdownActive(false);
      }
    };

    if (dropdownActive) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownActive]);
  // Где-то в вашем компоненте...
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
    <section className={cn(styles.wrap, "container")}>
      {isOpen && (
        <div className={styles.wrap_modal}>
          <ReviewModal func={openModal} data={data} />
          <div onClick={openModal} className={styles.wrap_backdrop}></div>
        </div>
      )}
      <div className={styles.wrap_modal}>
        <ItemDescriptionModal
          data={data}
          func={openItemModalDescription}
          visible={itemModalDescription}
        />
      </div>
      <div className="all__directions">
        <Link href={"/"} className="all__directions_link">
          Главная
        </Link>
        <Link
          href={`/item/${data.art}/${data.url}`}
          className={cn("all__directions_link", "all__directions_linkActive")}
        >
          <h1>{data.name.split(" ").slice(0, 6).join(" ")}</h1>
        </Link>
      </div>
      <div className={styles.product}>
        <Swiper
          onSwiper={setThumbsSwiper}
          direction={"vertical"}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={cn(styles.product_cards, "mySwiper")}
        >
          {/* слева */}
          {data.photos
            .map((photo, index) => (
              <div className={styles.product_cards__item} key={index}>
                <SwiperSlide className={styles.swiper_slide}>
                  <Image
                    className={styles.product_preview}
                    src={`${url}nal/img/${data.id_post}/l_${photo.url_part}`}
                    width={48}
                    height={48}
                    alt={photo.url_part}
                    loading="lazy"
                  />
                </SwiperSlide>
              </div>
            ))
            .slice(0, 5)}
        </Swiper>

        {/* главные */}
        <div className={styles.product_image}>
          <Swiper
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            spaceBetween={10}
            navigation={{
              nextEl: ".my-swiper-button-next",
              prevEl: ".my-swiper-button-prev",
              disabledClass: "swiper-button-disabled",
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Keyboard]}
            className="mySwiper2"
          >
            {data.photos
              .map((photo, index) => (
                <div className={styles.activeSlide} key={index}>
                  <SwiperSlide>
                    <InnerImageZoom
                      width={500}
                      height={300}
                      src={`${url}nal/img/${data.id_post}/b_${photo.url_part}`}
                      zoomSrc={`${url}nal/img/${data.id_post}/b_${photo.url_part}`}
                      zoomType="hover" // Используйте "hover" для активации при наведении
                      className={styles.product_img} // Примените локальный класс к изображению
                    />
                  </SwiperSlide>
                </div>
              ))
              .slice(0, 4)}
          </Swiper>
        </div>
        <div className={styles.product_info}>
          <h1 className={styles.product_info__title}>{data.name}</h1>
          {/* <span
            className={styles.product_info__articul}
          >{`Код: ${data.art}`}</span> */}

          <div className={styles.product_info__ocenka}>
            <span className={styles.product_info_ocenka__count}>
              {data.ocenka}
            </span>
            <div className="ocenka">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < rating ? <YellowStar /> : <GrayStar />}
                </span>
              ))}
            </div>
            <Link
              href={data.otz.length !== 0 ? "#otz" : ""}
              className={styles.product_info_ocenka__otzivy}
            >{`(${data.otz.length})`}</Link>
          </div>
          <div className={styles.product_info__add_to}>
            <button
              title="Добавить в корзину"
              className={styles.product_info__add_to__cart}
              onClick={() => dispatch(addProductToCart(data))}
            >
              <span className={styles.add__to_cart_icon}>
                <CartIcon />
              </span>
              В корзину
            </button>
            <button className={styles.product_info__buy_btn}>Купить</button>
            <button
              title="Добавить в избранное"
              className={cn("add__to_fav", {
                ["add__to_fav_active"]: isFavorite,
              })}
              onClick={handleFavoriteClick}
            >
              <span className="add__to_fav_icon">
                {isFavorite ? <VioletFavoritesIcon /> : <GrayFavoritesIcon />}
              </span>
            </button>
            <div className={styles.product_info__share}>
              <button
                onClick={handleDropdown}
                className={cn(
                  styles.product_info__share_btn,
                  dropdownActive && styles.product_info__share_btn__active
                )}
              >
                <ShareIcon />
              </button>
              <div
                className={cn(
                  styles.product_info__share_dropdown,
                  dropdownActive && styles.product_info__share_dropdown__active
                )}
              >
                <div
                  onClick={handleTelegramClick}
                  className={styles.product_info_share__tg}
                >
                  <TgIcon />
                  <button className={styles.product_info_share_telegram__btn}>
                    Telegram
                  </button>
                </div>
                <div
                  onClick={handleWhatsAppClick}
                  className={styles.product_info_share__wh}
                >
                  <WhIcon />
                  <button className={styles.product_info_share_whatsapp__btn}>
                    WhatsApp
                  </button>
                </div>
                <div
                  onClick={handleCopyLink}
                  className={styles.product_info_share__copy}
                >
                  <CopyIcon />
                  <button className={styles.product_info_share_copy_link__btn}>
                    Скопировать ссылку
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.product__descriptionContainer}>
            <h2 className={styles.product__descriptionContainer_h2}>
              Описание
            </h2>
            <p
              className={styles.product__descriptionContainer_p}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  data.description.slice(0, 152) + "..."
                ),
              }}
            ></p>
            <button
              onClick={openItemModalDescription}
              className={styles.product__descriptionContainer_button}
            >
              Читать далее
            </button>
          </div>
          <div className={styles.product__aboutTheProduct}>
            <h3 className={styles.product__aboutTheProduct_h3}>
              Коротко о товаре
            </h3>
            <div className={styles.product__aboutTheProduct_wrap}>
              <div className={styles.product__aboutTheProduct_wrap_articul}>
                Код:
                <span
                  className={styles.product__aboutTheProduct_wrap_articul_span}
                ></span>
                <div
                  className={styles.product__aboutTheProduct_wrap_articul_div}
                >
                  <span>{data.art}</span>
                  <span
                    onClick={handleCopyCode}
                    className={
                      styles.product__aboutTheProduct_wrap_articul_div_copy
                    }
                  >
                    <CopyIcon />
                  </span>
                </div>
                {copiedCode && (
                  <div
                    className={
                      styles.product__aboutTheProduct_wrap_articul_copied
                    }
                  >
                    Код скопирован!
                  </div>
                )}
              </div>
              {data.specification && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data.specification)
                      .split(" ")
                      .slice(0, 15)
                      .join(" "),
                  }}
                  className={styles.product__aboutTheProduct_wrap}
                />
              )}
            </div>

            <button
              onClick={openItemModalDescription}
              className={styles.product__aboutTheProduct_button}
            >
              Все характеристики
            </button>
          </div>
          <div className={styles.product_info__delivery}>
            <Image
              className={styles.product_info__ddos_icon}
              src={`${url}images/delivery_icon.svg`}
              width={20}
              height={20}
              alt="delivery_icon"
              loading="lazy"
            />
            <div className={styles.product_info__delivery_info}>
              <p className={styles.product_info__ddos_title}>
                Наличие и доставка !
              </p>
              <p className={styles.product_info__ddos_text}>{data.ddos}</p>
            </div>
          </div>
        </div>
      </div>
      {data.video && (
        <div className={styles.wrap_video}>
          <div className="productPageVideo">
            <h3 className="sections__title">Видео</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizedVideoHTML,
              }}
            />
          </div>
        </div>
      )}
      <ProductReview data={data} func={openModal} />
      <SimilarProducts similar={similar} />
    </section>
  );
};

export default ItemPage;
