"use client";
import React, { useState } from "react";
import AbduBackdrop from "../AbduBackdrop/AbduBackdrop";
import { XMark } from "../../../../public/Icons/Icons";
import styles from "./styles.module.scss";
import cn from "clsx";
import DeliveryModal from "../DeliveryCase/DeliveryModal";
import CurierModal from "../DeliveryCase/CurierModal";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { IVariableBuyer } from "../Abdu";

interface ModalProps {
  variableBuyer: IVariableBuyer
  isVisible: boolean;
  close: () => void;
  selectDelivery: (delivery: { name: string; id: string | number }) => void;
  deliveryMethod: IDeliveryMethod;
  saveDelivery: () => void;
}

const AbduModal = ({
  variableBuyer,
  saveDelivery,
  deliveryMethod,
  isVisible,
  selectDelivery,
  close,
}: ModalProps) => {
  const [view, setView] = useState<"delivery" | "curier">("curier");
  const renderFormContent = () => {
    switch (view) {
      case "curier":
        return {
          title: "Способы доставки",
          content: <CurierModal close={close} setView={setView} view={view} />,
        };
      case "delivery":
        return {
          title: "Способы доставки",
          content: (
            <DeliveryModal
              variableBuyer={variableBuyer}
              saveDelivery={saveDelivery}
              selectDelivery={selectDelivery}
              deliveryMethod={deliveryMethod}
              close={close}
              setView={setView}
              view={view}
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
            saveDelivery();
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
