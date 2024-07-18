"use client";
import { useMemo } from "react";
import Image from "next/image";
import styles from "./card.module.scss";
import { Item } from "@/types/OrdersHistory/OrdersHistory";
import Link from "next/link";

interface IOrdersHistoryCardProps {
  history: Item[];
}

const OrderHistoryCard = ({ history }: IOrdersHistoryCardProps) => {
  const historyLength = history.length;

  const orderWord = useMemo(() => {
    if (historyLength % 10 === 1 && historyLength % 100 !== 11) return "заказ";
    if (
      historyLength % 10 >= 2 &&
      historyLength % 10 <= 4 &&
      !(historyLength % 100 >= 12 && historyLength % 100 <= 14)
    )
      return "заказа";
    return "заказов";
  }, [historyLength]);

  return (
    <Link className="link" href={"/profile/orders/history"}>
      <div className={styles.profile__userInfo}>
        <div className={styles.profile__userInfo_header}>
          <div className={styles.profile__userInfo_icon}>
            <Image
              src={"/img/orderhistory.svg"}
              width={45}
              height={45}
              alt="clipboard"
            />
          </div>
          <div>
            <p className={styles.profile__userInfo_name}>История заказов</p>
            <p className={styles.orders}>
              Всего{" "}
              <span className={styles.orders__count}>{historyLength}</span>{" "}
              {orderWord}
            </p>
          </div>
        </div>
        <div className={styles.orders__images}>
          {history.slice(0, 4).map((item, index) => (
            <Link
              title={`Перейти на заказ №${item.id}`}
              href={`/profile/history/${item.id}`}
              key={item.id}
              className={styles.orders__img}
            >
              Заказ №{item.id}
            </Link>
          ))}
          {historyLength > 3 && (
            <div className={styles.orders__img}>
              <span>Еще {historyLength - 3}...</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default OrderHistoryCard;
