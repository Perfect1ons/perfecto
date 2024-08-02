"use client";
import React, { useState } from "react";
import AbduBackdrop from "../AbduBackdrop/AbduBackdrop";
import { XMark } from "../../../../public/Icons/Icons";
import styles from "./styles.module.scss";
import cn from "clsx";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { IVariableBuyer } from "../Abdu";
import CurierModal from "../ModalCase/CurierModal";
import DeliveryModal from "../ModalCase/DeliveryModal";
import PaymentModal from "../ModalCase/PaymentModal";
import { IPaymentMethod } from "@/types/Basket/PaymentMethod";

interface ModalProps {
  variableBuyer: IVariableBuyer;
  isVisible: boolean;
  paymentMethod: IPaymentMethod;
  close: () => void;
  selectDelivery: (delivery: { name: string; id: string | number }) => void;
  deliveryMethod: IDeliveryMethod;
  saveDelivery: () => void;
  setView: React.Dispatch<
    React.SetStateAction<"delivery" | "curier" | "oplata">
  >;
  view: string;
  selectPayment: (payment: { name: string; id: string | number }) => void;
  savePayment: () => void;
}

const AbduModal = ({
  variableBuyer,
  saveDelivery,
  savePayment,
  deliveryMethod,
  paymentMethod,
  isVisible,
  selectDelivery,
  close,
  setView,
  view,
  selectPayment,
}: ModalProps) => {
  const renderFormContent = () => {
    switch (view) {
      case "curier":
        return {
          title: "Способы доставки",
          content: (
            <CurierModal
              variableBuyer={variableBuyer}
              deliveryMethod={deliveryMethod}
              selectDelivery={selectDelivery}
              setView={setView}
              view={view}
            />
          ),
        };
      case "delivery":
        return {
          title: "Способы доставки",
          content: (
            <DeliveryModal
              variableBuyer={variableBuyer}
              selectDelivery={selectDelivery}
              close={close}
              setView={setView}
              view={view}
            />
          ),
        };
      case "oplata":
        return {
          title: "Способы оплаты",
          content: (
            <PaymentModal
              variableBuyer={variableBuyer}
              selectPayment={selectPayment}
              paymentMethod={paymentMethod}
            />
          ),
        };

      default:
        return { title: "", content: null };
    }
  };

  const { title, content } = renderFormContent();
  return (
    <>
      <AbduBackdrop isVisible={isVisible} close={close} />

      <div className={cn(styles.modal, isVisible && styles.show)}>
        <div className={styles.modal__intro}>
          <p className={styles.modal__title}>{title}</p>
          <button className={styles.modal__exit} onClick={close}>
            <XMark />
          </button>
        </div>
        {content}
        <button
          onClick={() => {
            if (view !== "oplata") {
              saveDelivery();
            } else {
              savePayment();
            }
          }}
          aria-label="save"
          className={styles.button}
        >
          Сохранить
        </button>
      </div>
    </>
  );
};

export default AbduModal;
