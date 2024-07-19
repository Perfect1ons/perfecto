"use client";
import styles from "./style.module.scss";
import { IOrderById } from "@/types/OrderById/orderbyid";
import { useState } from "react";
import OrderItemsCard from "./OrderItemsCard";

interface IDetailedHistoryOverProps {
  orders: IOrderById;
}

const OrderItems = ({ orders }: IDetailedHistoryOverProps) => {
  const [totalPrice, setTotalPrice] = useState(
    orders.itogo.total.replace(/\.00$/, "")
  );
  const [oplPrice, setOplPrice] = useState(
    orders.itogo.opl.replace(/\.00$/, "")
  );

  return (
    <div className={styles.over}>
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
      {orders.tovary.length > 0 &&
        orders.tovary.map((tovar, index) => {
          return <OrderItemsCard key={tovar.art} tovar={tovar} index={index} />;
        })}

      <div className={styles.over_total}>
        <p className={styles.over_total_priceDiscount}>
          Сумма без скидки...................... {orders.itogo.bez_skidka} c
        </p>
        <p className={styles.over_total_price}>Итого: {totalPrice} c</p>
        <p className={styles.over_total_paid}>
          Оплачено....................{oplPrice} c
        </p>
        <p className={styles.over_total_remainder}>
          Остаток оплаты.............. {orders.itogo.ostatok} c
        </p>
      </div>
    </div>
  );
};

export default OrderItems;
