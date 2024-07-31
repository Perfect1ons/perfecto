"use client";
import { useState } from "react";
import { Cross, SalesmanIcon } from "../../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import cn from "clsx";
import CourierDeliveryType from "./CourierDeliveryType/CourierDeliveryType";
import PointDeliveryType from "./PointDeliveryType/PointDeliveryType";
import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { SelectCityType } from "@/types/Basket/SelectCity";
import Image from "next/image";

interface IChosingDeliveryModalProps {
  variableBuyer: { payment: string | number; delivery: string | number };
  visible: string;
  close: (value: string) => void;
  variants: DeliveryMethod;
  selectDelivery: (value: string | number) => void;
  saveDelivery: () => void;
  warning: string;
  deliveryCity: SelectCityType;
  authToken: string | undefined;
}

const ChosingDeliveryModal = ({
  visible,
  close,
  variants,
  selectDelivery,
  saveDelivery,
  variableBuyer,
  warning,
  deliveryCity,
  authToken,
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
          authToken={authToken}
          deliveryCity={deliveryCity}
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
          <Image
            src={
              deliveryType === "courier"
                ? "/img/delivery_icon_dark.svg"
                : "/img/delivery_icon.svg"
            }
            width={22}
            height={22}
            alt="delivery icon"
          ></Image>
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
