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
  variableBuyer: { payment: string | number; delivery: string | number };
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
        {Object.entries(variants).map(([key, variant]) => (
          <div key={key}>
            <button
              onClick={() => selectPayment(variant.id)}
              aria-label="choose payment method"
              className={cn(
                styles.wrap_payment_point,
                variableBuyer.payment === variant.id &&
                  styles.wrap_payment_point_active
              )}
            >
              <span
                className={cn(
                  styles.wrap_payment_point_radio,
                  variableBuyer.payment === variant.id &&
                    styles.wrap_payment_point_radio_active
                )}
              >
                <span
                  className={cn(
                    styles.wrap_payment_point_radio_dot,
                    variableBuyer.payment === variant.id &&
                      styles.wrap_payment_point_radio_dot_active
                  )}
                ></span>
              </span>
              {variant.name}
            </button>
            <div
              className={cn(
                styles.wrap_payment_desc,
                variableBuyer.payment === variant.id &&
                  styles.wrap_payment_desc_active
              )}
            >
              <p className={styles.wrap_payment_desc_workdays}>
                {variant.desc}
              </p>
            </div>
          </div>
        ))}
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
