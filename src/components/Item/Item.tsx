"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import cn from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  CartIcon,
  CopyIcon,
  DeliveryIcon,
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

interface IItemPageProps {
  data: Items;
  similar: ISimilarItem[];
}

const ItemPage = ({ data, similar }: IItemPageProps) => {
  console.log(similar);

  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

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

  useEffect(() => {
    setRating(Math.floor(data.ocenka));
  }, [data.ocenka]);

  useEffect(() => {
    const ratings = similar.map((item) => Math.floor(item.ocenka));
    setRating(rating);
    similar.forEach((item) => {
      const favoriteStatus = localStorage.getItem(item.id.toString());
      setIsFavorite(favoriteStatus === "true");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [similar]);

  const imageUrl = useMemo(() => {
    const urls = similar.map((item) => {
      if (
        item.photos[0]?.url_part &&
        item.photos[0].url_part.startsWith("https://")
      ) {
        return item.photos[0].url_part;
      } else if (item.photos[0]?.url_part) {
        return `${url}nal/img/${item.id_post}/l_${item.photos[0].url_part}`;
      } else {
        return "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";
      }
    });
    return urls.join(", ");
  }, [similar]);

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

  return (
    <section className={cn(styles.wrap, "container")}>
      <div className={styles.product}>
        <div className={styles.product_cards}>
          {data.photos.map((photo) => (
            <div className={styles.product_cards__item} key={data.id}>
              <Image
                className={styles.product_preview}
                src={`https://max.kg/nal/img/${data.id_post}/l_${photo.url_part}`}
                width={48}
                height={48}
                alt={photo.url_part}
                loading="lazy"
              ></Image>
            </div>
          ))}
        </div>
        <div className={styles.product_image}>
          <Image
            src={`https://max.kg/nal/img/${data.id_post}/l_${data.img}`}
            width={500}
            height={500}
            alt={data.img}
            loading="lazy"
            className={styles.product_img}
          />
        </div>
        <div className={styles.product_info}>
          <h1 className={styles.product_info__title}>{data.name}</h1>
          <span
            className={styles.product_info__articul}
          >{`Код: ${data.art}`}</span>
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
            <span
              className={styles.product_info_ocenka__otzivy}
            >{`(${data.otz.length})`}</span>
          </div>
          {data.trademark && (
            <span
              className={styles.product_info__brand}
            >{`Бренд: ${data.trademark}`}</span>
          )}
          <div className={styles.product_info__price}>
            <span className={styles.product_info_price__current_price}>
              {data.price} с.
            </span>
            <span className={styles.product_info_price__old_price}>
              {data.old_price} c.
            </span>
            <ProductInfo price_update={data.price_update} />
          </div>
          <div className={styles.product_info__ddos}>
            <Image
              className={styles.product_info__ddos_icon}
              src={`${url}images/delivery_icon.svg`}
              width={20}
              height={20}
              alt="delivery_icon"
            />
            <div className={styles.product_info__ddos_info}>
              <p className={styles.product_info__ddos_title}>
                Наличие и доставка !
              </p>
              <p className={styles.product_info__ddos_text}>{data.ddos}</p>
            </div>
          </div>
          <div className={styles.product_info__add_to}>
            <button
              title="Добавить в корзину"
              className={styles.product_info__add_to__cart}
              onClick={() => console.log("Добавлено в корзину")}
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
                  data-clipboard-text={window.location.href}
                  id="copyLinkButton"
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
        </div>
      </div>
      <div className={styles.product_desc_container}>
        <div className="productPageDesc">
          <h2 className="sections__title">Описание</h2>
          <div className={styles.product_desc}>{data.description}</div>
          <div className={styles.product_desc_short_desc}>
            {data.short_description.length !== 0 && (
              <p className={styles.product_desc_shortdesc__text}>
                {data.short_description}
              </p>
            )}
          </div>
          <div className={styles.product_desc__client_desc}>
            <p className={styles.product_desc__client_desc__text}>
              Фото, описание, комплектация и характеристики могут отличаться от
              оригинала.
            </p>
            <p className={styles.product_desc__client_desc__text}>
              Страна производства может отличаться в зависимости от партии
              поставки.
            </p>
            <p className={styles.product_desc__client_desc__text}>
              Производитель оставляет за собой право изменять внешний вид,
              комплектацию товара без предупреждения.
            </p>
          </div>
        </div>
      </div>
      {data.specification && (
        <div className={styles.product_specification}>
          <div className="characteristics">
            <h2 className="sections__title">Характеристики</h2>
            <div className={styles.product_characteristics}>
              {data.specification}
            </div>
          </div>
        </div>
      )}
      {data.video && (
        <div className={styles.product_video}>
          <div className="productPageVideo">
            <h3 className="sections__title">Видео</h3>
            {data.video}
          </div>
        </div>
      )}
      <div className="productReview">
        <h4 className="sections__title">Отзывы о товаре «{data.naim}»</h4>
        <div className={styles.product_review}>
          <span className={styles.product_review_grade_title}>
            Оцените товар
          </span>
          <div className={styles.product_review_grade_btns}>
            <div className="ocenka">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < rating ? <YellowStar /> : <GrayStar />}
                </span>
              ))}
            </div>
          </div>
          <p className={styles.product_review_grade_short_desc}>
            Будет здорово, если вы напишете свои впечатления о товаре. Это
            поможет другим покупателям.
          </p>
          <button className="default__buttons_showMore">Написать отзыв</button>
        </div>
        {data.otz.length !== 0 && (
          <div className={styles.product_otz}>
            {data.otz.map((item) => {
              return (
                <div key={item} className={styles.product_otz_item}>
                  <div className={styles.product_otz_item_info}>
                    <div className={styles.product_otz_item_info_sender}>
                      <p className={styles.product_otz_item_info_sender_name}>
                        {item.name}
                      </p>
                      <div className="ocenka">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>
                            {index < rating ? <YellowStar /> : <GrayStar />}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className={styles.product_otz_item_info_date}>
                      {item.dat1}
                    </p>
                  </div>
                  <div className={styles.product_otz_item_comment}>
                    <p className={styles.product_otz_item_comment_title}>
                      Комментарий:
                    </p>
                    <p className={styles.product_otz_item_comment_text}>
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={cn(styles.product_for_client, "forClientContainer")}>
        <div className={styles.product_for_client_card}>
          <div className={styles.product_for_client_card_info}>
            <DeliveryIcon />
            <span className={styles.product_for_client_card_info_title}>
              Способы доставки
            </span>
          </div>
        </div>
        <div className={styles.product_for_client_card}>
          <div className={styles.product_for_client_card_info}>
            <span className={styles.product_for_client_card_info_title}>
              Оплата удобным способом
            </span>
          </div>
        </div>
        <div className={styles.product_for_client_card}>
          <div className={styles.product_for_client_card_info}>
            <span className={styles.product_for_client_card_info_title}>
              Гарантии покупателя
            </span>
          </div>
        </div>
      </div>
      <div className="similarProducts">
        <h5 className="sections__title">Похожие товары</h5>
        <div className="main__news_cards">
          {similar.map((item) => {
            return (
              <div key={item.id} className="default__card">
                <div className="default__card_images">
                  <Image
                    className="default__card_image"
                    src={imageUrl}
                    width={200}
                    height={200}
                    alt={item.naim}
                    quality={100}
                    loading="lazy"
                  />
                </div>
                <div className="default__card_info">
                  <span className="default__card_price">
                    {item.cenaok.toLocaleString("ru-RU")}
                    <span className="default__card_price_custom"> с</span>
                  </span>
                  <h2 className="default__card_name">{item.naim}</h2>
                  <div className="ocenka">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        {index < rating ? <YellowStar /> : <GrayStar />}
                      </span>
                    ))}
                  </div>
                  <div className="ddos">
                    <Image
                      src={`${url}images/delivery_icon.svg`}
                      width={20}
                      height={20}
                      alt="delivery_icon"
                    />
                    <p className="ddos__text">{item.ddos}</p>
                  </div>
                  <div className="add__to">
                    <button
                      title="Добавить в корзину"
                      className="add__to_cart"
                      onClick={() => console.log("Добавлено в корзину")}
                    >
                      <span className="add__to_cart_icon">
                        <CartIcon />
                      </span>
                      В корзину
                    </button>
                    <button
                      title="Добавить в избранное"
                      className={cn("add__to_fav", {
                        ["add__to_fav_active"]: isFavorite,
                      })}
                      onClick={handleFavoriteClick}
                    >
                      <span className="add__to_fav_icon">
                        {isFavorite ? (
                          <VioletFavoritesIcon />
                        ) : (
                          <GrayFavoritesIcon />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ItemPage;
