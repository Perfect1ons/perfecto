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
import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";

interface IChosingDeliveryModalProps {
  variableBuyer: { payment: string; delivery: string };
  visible: string;
  close: (value: string) => void;
  variants: DeliveryMethod;
  selectDelivery: (value: string) => void;
  saveDelivery: () => void;
  warning: string;
}

const ChosingDeliveryModal = ({
  visible,
  close,
  variants,
  selectDelivery,
  saveDelivery,
  variableBuyer,
  warning,
}: IChosingDeliveryModalProps) => {
  const [deliveryType, setDeliveryType] = useState("point");

  const deliveryTypeChanger = (value: string) => {
    switch (value) {
      case "point":
        setDeliveryType("point");
        break;
      default:
        setDeliveryType("courier");
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
      {warning.length > 0 && <p className={styles.wrap_warning}>{warning}</p>}
      {deliveryType === "point" && (
        <PointDeliveryType
          variableBuyer={variableBuyer}
          variants={variants}
          selectDelivery={selectDelivery}
        />
      )}
      {deliveryType === "courier" && (
        <CourierDeliveryType
          variableBuyer={variableBuyer}
          variants={variants}
          selectDelivery={selectDelivery}
        />
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
      <button
        onClick={() => {
          saveDelivery();
        }}
        aria-label="save"
        className={styles.wrap_save}
      >
        Сохранить
      </button>
    </div>
  );
};

export default ChosingDeliveryModal;
