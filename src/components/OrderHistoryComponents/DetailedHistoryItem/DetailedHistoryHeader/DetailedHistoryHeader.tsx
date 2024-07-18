"use client";
import { Item } from "@/types/OrdersHistory/OrdersHistory";
import styles from "../style.module.scss";
import cn from "clsx";
import { useEffect, useState } from "react";

interface IDetailedHistoryHeader {
  order: Item;
}

const DetailedHistoryHeader = ({ order }: IDetailedHistoryHeader) => {
  const formatDate = (dateString: string, key?: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    if (key === "seconds") {
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    } else {
      return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }
  };

  const formattedDat1 = formatDate(order.dat1);
  const formattedDatVid = formatDate(order.dat_vid, "seconds");

  return (
    <div className={cn(styles.header, "container")}>
      <div className={styles.header_order}>
        <p className={styles.header_order_title}>
          Заказ №: {order.id} от {formattedDat1}
        </p>
        <div className={styles.header_order_progress}>
          <p
            className={cn(
              styles.header_order_progress_status,
              order.status === 2 && styles.header_order_progress_status_fail,
              order.status === 3 && styles.header_order_progress_status_delivery
            )}
          >
            {order.status == 5
              ? "Выполнен."
              : order.status == 2
              ? "Не выполнен."
              : "В пути."}
          </p>
          <p className={styles.header_order_progress_date}>{formattedDatVid}</p>
          <div className={styles.header_order_progress_bar}>
            <span className={styles.header_order_progress_bar_start}></span>
            <span className={styles.header_order_progress_bar_line}></span>
            <span className={styles.header_order_progress_bar_middle}></span>
            <span className={styles.header_order_progress_bar_line}></span>
            <span className={styles.header_order_progress_bar_middle}></span>
            <span className={styles.header_order_progress_bar_line}></span>
            <span className={styles.header_order_progress_bar_middle}></span>
            <span className={styles.header_order_progress_bar_line}></span>
            <span className={styles.header_order_progress_bar_end}></span>
          </div>
        </div>
      </div>
      <div className={styles.header_manager}>
        {/* <Image
          src=""
          width={60}
          height={60}
          alt="manager stub image"
          className={styles.header_manager_img}
        ></Image> */}
        <div className={styles.header_manager_img}></div>
        <div className={styles.header_manager_info}>
          <h2 className={styles.header_manager_info_name}>
            Ваш менеджер Жамалбек
          </h2>
          <h3 className={styles.header_manager_info_contact}>
            Контакты: +996 553 931 111
          </h3>
          <h3 className={styles.header_manager_info_workTime}>
            Рабочий график: пн-сб 09:00-18:00
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DetailedHistoryHeader;
