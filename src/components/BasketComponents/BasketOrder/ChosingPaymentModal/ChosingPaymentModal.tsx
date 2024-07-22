"use client";
import { useState } from "react";
import { Cross } from "../../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import cn from "clsx";
import { PaymentMethod } from "@/types/Basket/PaymentMethod";

interface IChosingPayModalProps {
  visible: string;
  close: (value: string) => void;
  variants: PaymentMethod;
}

const ChosingPaymentModal = ({
  visible,
  close,
  variants,
}: IChosingPayModalProps) => {
  const [openPoint, setOpenPoint] = useState("");

  return (
    <div className={cn(styles.wrap, visible === "payment" && styles.show)}>
      <div className={styles.wrap_header}>
        <p className={styles.wrap_header_title}>Способы оплаты</p>
        <button
          onClick={() => close("")}
          aria-label="close modal"
          className={styles.wrap_header_cross}
        >
          <Cross />
        </button>
      </div>
      <div className={styles.wrap_payment}>
        <button
          onClick={() => setOpenPoint("1")}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            openPoint === "1" && styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              openPoint === "1" && styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                openPoint === "1" && styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1].name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            openPoint === "1" && styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1].desc}
          </p>
        </div>

        <button
          onClick={() => setOpenPoint("2")}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            openPoint === "2" && styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              openPoint === "2" && styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                openPoint === "2" && styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[2].name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            openPoint === "2" && styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[2].desc}
          </p>
        </div>

        <button
          onClick={() => setOpenPoint("3")}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            openPoint === "3" && styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              openPoint === "3" && styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                openPoint === "3" && styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[4].name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            openPoint === "3" && styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[4].desc}
          </p>
        </div>

        <button
          onClick={() => setOpenPoint("4")}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            openPoint === "4" && styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              openPoint === "4" && styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                openPoint === "4" && styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1111].name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            openPoint === "4" && styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1111].desc}
          </p>
        </div>

        <button
          onClick={() => setOpenPoint("5")}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            openPoint === "5" && styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              openPoint === "5" && styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                openPoint === "5" && styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1113].name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            openPoint === "5" && styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1113].desc}
          </p>
        </div>

        <button
          onClick={() => setOpenPoint("6")}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            openPoint === "6" && styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              openPoint === "6" && styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                openPoint === "6" && styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1114].name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            openPoint === "6" && styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1114].desc}
          </p>
        </div>

        <button
          onClick={() => setOpenPoint("7")}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            openPoint === "7" && styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              openPoint === "7" && styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                openPoint === "7" && styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1116].name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            openPoint === "7" && styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1116].desc}
          </p>
        </div>

        <button
          onClick={() => setOpenPoint("8")}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            openPoint === "8" && styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              openPoint === "8" && styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                openPoint === "8" && styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1121].name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            openPoint === "8" && styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1121].desc}
          </p>
        </div>
      </div>
      <button aria-label="save" className={styles.wrap_save}>
        Сохранить
      </button>
    </div>
  );
};

export default ChosingPaymentModal;
