"use client";
import { useState, useEffect } from "react";
import { url } from "@/components/temporary/data";
import {
  CardFavoritesIcon,
  CartIcon,
  GrayStar,
  YellowStar,
} from "../../../../public/Icons/Icons";
import Link from "next/link";
import { truncateText } from "@/utils/utils";
import { ICard } from "@/types/Card/card";
import Image from "next/image";
import styles from './style.module.scss'
interface IcardDataProps {
  cardData: ICard;
}

const Card = ({ cardData }: IcardDataProps) => {

  const imageUrl =
    cardData.photos.length > 0
      ? cardData.photos[0].url_part.startsWith("https://goods-photos")
        ? `${cardData.photos[0].url_part}280.jpg`
        : cardData.photos[0].url_part.startsWith("https://")
        ? cardData.photos[0].url_part
        : `${url}nal/img/${cardData.id_post}/l_${cardData.photos[0].url_part}`
      : "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";

  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(Math.floor(cardData.ocenka));
  }, [cardData.ocenka]);

  const maxLength = 40;
  const maxLengthDdos = 32;
  const truncatedTitle = truncateText(cardData.naim, maxLength);
  const truncatedDdos = truncateText(cardData.ddos, maxLengthDdos);

  return (
    <div className={styles.card}>
      <div className={styles.card__images}>
        <Link
          className="link"
          href={`/item/${cardData.id_tov}/${cardData.url}`}
        >
          <Image
            className={styles.card__image}
            src={imageUrl}
            width={300}
            height={250}
            alt={cardData.naim}
          />
        </Link>
        <span className={styles.card__info_addFavorites}>
          <CardFavoritesIcon />
        </span>
        {cardData.discount_prc > 0 ? (
          <div className={styles.card__info_skidkapercent}>
            {cardData.discount_prc}%
          </div>
        ) : null}
      </div>
      <div className={styles.card__info}>
        {cardData.discount_prc > 0 ? (
          <div className={styles.card__info_price}>
            <div className={styles.card__info_skidkaprice}>
              <span className={styles.card__info_skidkaprice_price}>
                {cardData.cenaok?.toLocaleString("ru-RU")}
              </span>
              <span className={styles.card__info_skidkaprice_price_custom}>
                с
              </span>
            </div>

            <div className={styles.card__info_oldprice}>
              <span className={styles.card__info_oldprice_price}>
                {cardData.old_price.toLocaleString("ru-RU")}c
              </span>
            </div>
          </div>
        ) : (
          <div className={styles.card__info_price}>
            <div className={styles.card__info_currentprice}>
              <span className={styles.card__info_currentprice_price}>
                {cardData.cenaok.toLocaleString("ru-RU")}
              </span>
              <span className={styles.card__info_currentprice_price_custom}>
                с
              </span>
            </div>
          </div>
        )}
        <Link
          className="link"
          href={`/item/${cardData.id_tov}/${cardData.url}`}
        >
          <h1 className={styles.card__info_title}>{truncatedTitle}</h1>
        </Link>

        <div className={styles.card__info_rating}>
          {[...Array(5)].map((_, index) => (
            <span className={styles.card__info_rating_span} key={index}>
              {index < rating ? <YellowStar /> : <GrayStar />}
            </span>
          ))}
        </div>

        <div className={styles.card__info_ddos}>
          <Image
            className={styles.card__info_ddos_icon}
            src={`${url}images/delivery_icon.svg`}
            width={20}
            height={20}
            alt="delivery_icon"
          />
          <p className={styles.card__info_ddos_desc}>{truncatedDdos}</p>
        </div>

        <div className={styles.card__info_button}>
          <button className={styles.card__info_addproduct}>
            <span className={styles.card__info_addproduct_icon}>
              <CartIcon />
            </span>
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
