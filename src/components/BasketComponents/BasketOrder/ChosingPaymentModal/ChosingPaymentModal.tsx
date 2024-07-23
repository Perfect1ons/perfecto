"use client";
import { Cross } from "../../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import cn from "clsx";
import { PaymentMethod } from "@/types/Basket/PaymentMethod";

interface IChosingPayModalProps {
  visible: string;
  close: (value: string) => void;
  variants: PaymentMethod;
  selectPayment: (value: string) => void;
  savePayment: () => void;
  variableBuyer: { payment: string; delivery: string };
  warning: string;
}

const ChosingPaymentModal = ({
  visible,
  close,
  variants,
  selectPayment,
  savePayment,
  variableBuyer,
  warning,
}: IChosingPayModalProps) => {
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
      {warning.length >= 0 && <p className={styles.wrap_warning}>{warning}</p>}
      <div className={styles.wrap_payment}>
        <button
          onClick={() => selectPayment(variants[1]?.name)}
          aria-label="choose payment method"
          className={cn(
            styles.wrap_payment_point,
            variableBuyer.payment === variants[1]?.name &&
              styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              variableBuyer.payment === variants[1]?.name &&
                styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                variableBuyer.payment === variants[1]?.name &&
                  styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1]?.name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            variableBuyer.payment === variants[1]?.name &&
              styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1]?.desc}
          </p>
        </div>

        <button
          onClick={() => selectPayment(variants[2]?.name)}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            variableBuyer.payment === variants[2]?.name &&
              styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              variableBuyer.payment === variants[2]?.name &&
                styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                variableBuyer.payment === variants[2]?.name &&
                  styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[2]?.name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            variableBuyer.payment === variants[2]?.name &&
              styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[2]?.desc}
          </p>
        </div>

        <button
          onClick={() => selectPayment(variants[4]?.name)}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            variableBuyer.payment === variants[4]?.name &&
              styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              variableBuyer.payment === variants[4]?.name &&
                styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                variableBuyer.payment === variants[4]?.name &&
                  styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[4]?.name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            variableBuyer.payment === variants[4]?.name &&
              styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[4]?.desc}
          </p>
        </div>

        <button
          onClick={() => selectPayment(variants[1111]?.name)}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            variableBuyer.payment === variants[1111]?.name &&
              styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              variableBuyer.payment === variants[1111]?.name &&
                styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                variableBuyer.payment === variants[1111]?.name &&
                  styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1111]?.name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            variableBuyer.payment === variants[1111]?.name &&
              styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1111]?.desc}
          </p>
        </div>

        <button
          onClick={() => selectPayment(variants[1113]?.name)}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            variableBuyer.payment === variants[1113]?.name &&
              styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              variableBuyer.payment === variants[1113]?.name &&
                styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                variableBuyer.payment === variants[1113]?.name &&
                  styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1113]?.name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            variableBuyer.payment === variants[1113]?.name &&
              styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1113]?.desc}
          </p>
        </div>

        <button
          onClick={() => selectPayment(variants[1114]?.name)}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            variableBuyer.payment === variants[1114]?.name &&
              styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              variableBuyer.payment === variants[1114]?.name &&
                styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                variableBuyer.payment === variants[1114]?.name &&
                  styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1114]?.name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            variableBuyer.payment === variants[1114]?.name &&
              styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1114]?.desc}
          </p>
        </div>

        <button
          onClick={() => selectPayment(variants[1116]?.name)}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            variableBuyer.payment === variants[1116]?.name &&
              styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              variableBuyer.payment === variants[1116]?.name &&
                styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                variableBuyer.payment === variants[1116]?.name &&
                  styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1116]?.name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            variableBuyer.payment === variants[1116]?.name &&
              styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1116]?.desc}
          </p>
        </div>

        <button
          onClick={() => selectPayment(variants[1121]?.name)}
          aria-label="choose delivery point"
          className={cn(
            styles.wrap_payment_point,
            variableBuyer.payment === variants[1121]?.name &&
              styles.wrap_payment_point_active
          )}
        >
          <span
            className={cn(
              styles.wrap_payment_point_radio,
              variableBuyer.payment === variants[1121]?.name &&
                styles.wrap_payment_point_radio_active
            )}
          >
            <span
              className={cn(
                styles.wrap_payment_point_radio_dot,
                variableBuyer.payment === variants[1121]?.name &&
                  styles.wrap_payment_point_radio_dot_active
              )}
            ></span>
          </span>
          {variants[1121]?.name}
        </button>
        <div
          className={cn(
            styles.wrap_payment_desc,
            variableBuyer.payment === variants[1121]?.name &&
              styles.wrap_payment_desc_active
          )}
        >
          <p className={styles.wrap_payment_desc_workdays}>
            {variants[1121]?.desc}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          savePayment();
        }}
        aria-label="save"
        className={styles.wrap_save}
      >
        Сохранить
      </button>
    </div>
  );
};

export default ChosingPaymentModal;
