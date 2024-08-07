"use client";
import { ChangeEvent, useState } from "react";
import { Cross, SalesmanIcon } from "../../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import cn from "clsx";
import CourierDeliveryType from "./CourierDeliveryType/CourierDeliveryType";
import PointDeliveryType from "./PointDeliveryType/PointDeliveryType";
import Image from "next/image";
import { ICityFront } from "@/types/Basket/cityfrontType";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";

interface IChosingDeliveryModalProps {
  variableBuyer: {
    payment: {
      name: string;
      id: number | string;
    };
    delivery: {
      name: string;
      id: number | string;
    };
  };
  visible: string;
  close: (value: string) => void;
  variants: IDeliveryMethod;
  selectDelivery: (delivery: { name: string; id: string | number }) => void;
  saveDelivery: () => void;
  warning: string;
  deliveryCity: ICityFront;
  authToken: string | undefined;
  location: {
    id_city: {
      name: string;
      id: number | null;
    };
    id_city2: {
      name: string;
      id: number | null;
    };
    directory: {
      street: string;
      house: string;
      apartament: string;
    };
  };
  cityChange: (newCity: { name: string; id: number }) => void;
  adressChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  location,
  cityChange,
  adressChange,
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
      <div className={styles.wrap_typeDelivery}>
        <button
          onClick={() => deliveryTypeChanger("point")}
          aria-label="choose type delivery"
          className={cn(
            styles.wrap_typeDelivery_typePoint,
            deliveryType !== "point" &&
              styles.wrap_typeDelivery_typePoint_disable
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
            deliveryType !== "courier" &&
              styles.wrap_typeDelivery_typeCourier_disable
          )}
        >
          <Image
            src={
              deliveryType === "courier"
                ? "/img/delivery_icon.svg"
                : "/img/delivery_icon_dark.svg"
            }
            width={22}
            height={22}
            alt="delivery icon"
          ></Image>
          Курьер
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
          location={location}
          cityChange={cityChange}
          adressChange={adressChange}
        />
      )}
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
