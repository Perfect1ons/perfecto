"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import cn from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  CartIcon,
  DeliveryIcon,
  GrayFavoritesIcon,
  GrayStar,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../public/Icons/Icons";
import { url } from "@/components/temporary/data";
import { ISimilarItem } from "@/types/SimilarProduct/similarProduct";

interface IItemPageProps {
  data: Items;
  similar: ISimilarItem[];
}

const ItemPage = ({ data, similar }: IItemPageProps) => {
  console.log(similar);

  const [rating, setRating] = useState(0);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Проверяем, доступен ли localStorage (только на клиентской стороне)
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;

    // Используем localStorage только если он доступен
    if (isLocalStorageAvailable) {
      const favoriteStatus = localStorage.getItem(data.id.toString());
      setIsFavorite(favoriteStatus === "true");
    }
  }, [data.id]);

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      // Проверяем, доступен ли localStorage (только на клиентской стороне)
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
  }, [similar]);

  const imageUrl = useMemo(() => {
    const urls = similar.map((item) => {
      if (
        item.photos[0]?.url_part &&
        item.photos[0].url_part.startsWith("https://")
      ) {
        return item.photos[0].url_part + "280.jpg";
      } else if (item.photos[0]?.url_part) {
        return `${url}nal/img/${item.id_post}/l_${item.photos[0].url_part}`;
      } else {
        return "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";
      }
    });
    return urls.join(", ");
  }, [similar]);

  return (
    <section className={cn(styles.wrap, "container")}>
      <div className={styles.productContainer}>
        <div className={styles.miniCardsColumn}>
          {data.photos.map((photo) => {
            return (
              <Image
                className={styles.productPreview}
                key={photo.url_part}
                src={`https://max.kg/nal/img/${data.id_post}/l_${photo.url_part}`}
                width={48}
                height={48}
                alt={photo.url_part}
              ></Image>
            );
          })}
        </div>
        <div className={styles.image}></div>
        <div className={styles.productInfo}>
          <div className={styles.productOcenka}>
            <span
              className={styles.otzivy}
            >{`(${data.otz.length} отзывов)`}</span>
            <div className="ocenka">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < rating ? <YellowStar /> : <GrayStar />}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.productName}>
            <h1 className={styles.productInfoTitle}>{data.name}</h1>
            <span>{`код: ${data.art}`}</span>
          </div>
          <span className={styles.brand}>{`Бренд: ${data.trademark}`}</span>
          <hr className={styles.productInfoHr} />
          <div className={styles.productPrice}>
            <span className={styles.price}>{data.price} с.</span>
            <span className={styles.oldPrice}>{data.old_price}</span>
            <span className={styles.priceUpdate}>{data.price_update}</span>
          </div>
          <div className="ddos">
            <Image
              src={`${url}images/delivery_icon.svg`}
              width={20}
              height={20}
              alt="delivery_icon"
            />
            <p className="ddos__text">{data.ddos}</p>
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
                {isFavorite ? <VioletFavoritesIcon /> : <GrayFavoritesIcon />}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="productPageDesc">
        <h1 className="sections__title">Описание</h1>
        <div className={styles.productDesc}>
          {data.description
            .split("<p>")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index} className={styles.productDescriptionParagraph}>
                {paragraph.replace(/<\/?p>/g, "")}
              </p>
            ))}
        </div>
        <div className={styles.productShortDesc}>
          {data.short_description.length !== 0 && (
            <p className={styles.shortDescParagraph}>
              {data.short_description}
            </p>
          )}
        </div>
        <div className={styles.productClientDesc}>
          <p className={styles.clientDescParagraphOne}>
            Фото, описание, комплектация и характеристики могут отличаться от
            оригинала.
          </p>
          <p className={styles.clientDescParagraphTwo}>
            Страна производства может отличаться в зависимости от партии
            поставки.
          </p>
          <p className={styles.clientDescParagraphThree}>
            Производитель оставляет за собой право изменять внешний вид,
            комплектацию товара без предупреждения.
          </p>
        </div>
      </div>
      <hr className={styles.wrapHr} />
      <div className="characteristics">
        <h2 className="sections__title">Характеристики</h2>
        <div className={styles.characteristicsContainer}>
          {data.specification
            .split("<p>")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index} className={styles.productCharacteristicParagraph}>
                {paragraph.replace(/<\/?p>/g, "")}
              </p>
            ))}
        </div>
      </div>
      <hr className={styles.wrapHr} />
      <div className="productReview">
        <h3 className="sections__title">Отзывы о товаре «{data.naim}»</h3>
        <span className={styles.productGradeTitle}>Оцените товар</span>
        <div className={styles.productGradeBtns}></div>
        <div className={styles.productGradeShortDesc}>
          Будет здорово, если вы напишете свои впечатления о товаре. Это поможет
          другим покупателям.
        </div>
        <button className="default__buttons_showMore">Написать отзыв</button>
      </div>
      <div className={cn(styles.forClientContainer, "forClientContainer")}>
        <div className={styles.deliveryCard}>
          <div className={styles.cardInfo}>
            <DeliveryIcon />
            <span className={styles.cardTitle}>Способы доставки</span>
          </div>
        </div>
        <div className={styles.paymentCard}>
          <div className={styles.cardInfo}>
            <span className={styles.cardTitle}>Оплата удобным способом</span>
          </div>
        </div>
        <div className={styles.guaranteeCard}>
          <div className={styles.cardInfo}>
            <span className={styles.cardTitle}>Гарантии покупателя</span>
          </div>
        </div>
      </div>
      <div className="similarProducts">
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
