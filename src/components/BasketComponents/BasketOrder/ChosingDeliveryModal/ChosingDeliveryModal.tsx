"use client";
import { useState } from "react";
import {
  Cross,
  DeliveryCourier,
  SalesmanIcon,
} from "../../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import cn from "clsx";
import CourierDeliveryType from "./CourierDeliveryType/CourierDeliveryType";
import PointDeliveryType from "./PointDeliveryType/PointDeliveryType";

interface IChosingDeliveryModalProps {
  visible: string;
  close: (value: string) => void;
}

const ChosingDeliveryModal = ({
  visible,
  close,
}: IChosingDeliveryModalProps) => {
  const [openPoint, setOpenPoint] = useState("");

  const [openPay, setOpenPay] = useState("");

  const [deliveryType, setDeliveryType] = useState("point");

  const deliveryTypeChanger = (value: string) => {
    switch (value) {
      case "point":
        setDeliveryType("point");
        setOpenPay("");
        break;

      default:
        setDeliveryType("courier");
        setOpenPoint("");
        break;
    }
  };

  return (
    <div className={cn(styles.wrap, visible === "delivery" && styles.show)}>
      <div className={styles.wrap_header}>
        <p className={styles.wrap_header_title}>Способы доставки</p>
        <button
          onClick={() => close("")}
          aria-label="close modal"
          className={styles.wrap_header_cross}
        >
          <Cross />
        </button>
      </div>
      {deliveryType === "point" && (
        <PointDeliveryType openPoint={openPoint} setOpenPoint={setOpenPoint} />
      )}
      {deliveryType === "courier" && (
        <CourierDeliveryType openPay={openPay} setOpenPay={setOpenPay} />
      )}
      <div className={styles.wrap_typeDelivery}>
        <button
          onClick={() => deliveryTypeChanger("point")}
          aria-label="choose type delivery"
          className={cn(
            styles.wrap_typeDelivery_typePoint,
            deliveryType !== "point" &&
              styles.wrap_typeDelivery_typePoint_disactive
          )}
        >
          <SalesmanIcon />
          Пункты выдачи
        </button>
        <button
          onClick={() => deliveryTypeChanger("courier")}
          aria-label="choose type delivery"
          className={cn(
            styles.wrap_typeDelivery_typeCourier,
            deliveryType === "courier" &&
              styles.wrap_typeDelivery_typeCourier_active
          )}
        >
          <DeliveryCourier />
          Курьер
        </button>
      </div>
    </div>
  );
};

export default ChosingDeliveryModal;
