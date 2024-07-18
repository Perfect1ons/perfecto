"use client";
import { Item } from "@/types/OrdersHistory/OrdersHistory";
import styles from "../style.module.scss";
import cn from "clsx";
import Image from "next/image";

interface IDetailedHistoryOverProps {
  order: Item;
}

const DetailedHistoryOver = ({ order }: IDetailedHistoryOverProps) => {
  return (
    <div className={cn(styles.over, "container")}>
      <div className={styles.over_tab}>
        <p className={styles.over_tab_number}>№:</p>
        <p className={styles.over_tab_photo}>Фото</p>
        <p className={styles.over_tab_art}>Артикул</p>
        <p className={styles.over_tab_name}>Наименование</p>
        <p className={styles.over_tab_count}>Кол-во</p>
        <p className={styles.over_tab_price}>Цена сом</p>
        <p className={styles.over_tab_discount}>Скидка сом</p>
        <p className={styles.over_tab_priceWithDiscount}>Цена со скидкой</p>
        <p className={styles.over_tab_total}>Итого</p>
        <p className={styles.over_tab_delete}>Удалить</p>
      </div>
      <div className={styles.over_goods}>
        <p className={styles.over_goods_number}>1</p>
        <div className={styles.over_goods_photo}>
          <Image
            className={styles.over_goods_photo_img}
            src="/img/userPhoto.png"
            width={100}
            height={100}
            alt="good img"
          ></Image>
        </div>
        <p className={styles.over_goods_art}>11406368</p>
        <p className={styles.over_goods_name}>
          Рюкзак для ноутбука RivaCase 8065 KOMODO Backpack Dark Blue 15.6
        </p>
        <p className={styles.over_goods_count}>1</p>
        <p className={styles.over_goods_price}>1 670</p>
        <p className={styles.over_goods_discount}>0.00</p>
        <p className={styles.over_goods_priceWithDiscount}>1670</p>
        <p className={styles.over_goods_total}>1 670</p>
        <p className={styles.over_goods_delete}></p>
      </div>
      <div className={styles.over_total}>
        <p className={styles.over_total_priceDiscount}>
          Сумма без скидки...................... 1 670 c
        </p>
        <p className={styles.over_total_price}>Итого: 1 670 c</p>
        <p className={styles.over_total_paid}>
          Оплачено....................1 670.00 c
        </p>
        <p className={styles.over_total_remainder}>
          Остаток оплаты.............. 0.00 c
        </p>
      </div>
    </div>
  );
};

export default DetailedHistoryOver;
