"use client"
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";

interface IPriceProps {
  data: Items;
}

const ItemPriceCard = ({ data }: IPriceProps) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.ItemPriceCard}>
      <div className={styles.ItemPriceCard__cost}>
        <h2 className={styles.ItemPriceCard__price}>
          {data.cenaok.toLocaleString("ru-RU")}
          <span className={styles.ItemPriceCard__price_custom}>с</span>
        </h2>
        {data.discount_prc > 0 && (
          <span className={styles.ItemPriceCard__price_discount}>
            -{data.discount_prc}%
          </span>
        )}
        {data.discount_prc > 0 && data.old_price > 0 && (
          <h2 className={styles.ItemPriceCard__old_price}>
            {data.old_price.toLocaleString("ru-RU")}
            <span className={styles.ItemPriceCard__old_price_custom}>с</span>
          </h2>
        )}
      </div>
      <div className={styles.ItemPriceCard__ddos}>
        <div className={styles.ItemPriceCard__ddos_info}>
          <Image
            className={styles.product_info__ddos_icon}
            src={`${url}images/delivery_icon.svg`}
            width={20}
            height={20}
            alt="delivery_icon"
            loading="lazy"
          />
          <p className={styles.ItemPriceCard__ddos_title}>
            Наличие и доставка !
          </p>
        </div>
        <p className={styles.ItemPriceCard__ddos_desc}>{data.ddos}</p>
      </div>
      <div className={styles.ItemPriceCard__buttons}>
        <button
          onClick={() => dispatch(addProductToCart(data))}
          className={styles.ItemPriceCard__buttons_cart}
        >
          В корзину
        </button>
        <button className={styles.ItemPriceCard__buttons_buy}>Купить</button>
      </div>
      <div className={styles.ItemPriceCard__salesman}>
        <h3 className={styles.ItemPriceCard__salesman_title}>
          ИП{" "}
          <span className={styles.ItemPriceCard__salesman_title_custom}>
            Нурдин Улуу Нурболот
          </span>
        </h3>
      </div>
    </div>
  );
};

export default ItemPriceCard;
