"use client";
import { useState } from "react";
import AbduModal from "./AbduModal/AbduModal";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
import {
  DeliverExPointIcons,
  DeliveryApproveIcon,
  DeliveryCurierIcon,
  PaymentIcon,
} from "../../../public/Icons/Icons";
import styles from "./style.module.scss";
import clsx from "clsx";
import { IPaymentMethod } from "@/types/Basket/PaymentMethod";

interface IBasketProps {
  deliveryMethod: IDeliveryMethod;
  paymentMethod: IPaymentMethod;
}

export interface IVariableBuyer {
  payment: {
    name: string;
    id: number | string;
  };
  delivery: {
    name: string;
    id: number | string;
  };
}

export interface IBuyer {
  tel: number;
  vid_dost: number | string;
  id_vopl: number | string;
  fio: string;
  name: string;
  org?: string;
  org_inn?: string;
  id_city?: number | null;
  id_city2?: number | null;
  directory?: string;
  dost?: string;
  oplata?: string;
}
const Abdu = ({ deliveryMethod, paymentMethod }: IBasketProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [view, setView] = useState<"delivery" | "curier" | "oplata">("curier");
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const [variableBuyer, setVariableBuyer] = useState<IVariableBuyer>({
    payment: {
      name: "",
      id: "",
    },
    delivery: {
      name: "",
      id: "",
    },
  });

  const [buyer, setBuyer] = useState<IBuyer>({
    tel: 0,
    vid_dost: variableBuyer.delivery.id,
    id_vopl: variableBuyer.payment.id,
    fio: "",
    name: "",
    org: "",
    org_inn: "",
    id_city: null,
    id_city2: 0,
    directory: "",
    dost: "",
    oplata: "",
  });

  const selectDelivery = (delivery: { name: string; id: string | number }) => {
    setVariableBuyer((prevVariableBuyer) => ({
      ...prevVariableBuyer,
      delivery: delivery,
    }));
  };
  const selectPayment = (payment: { name: string; id: string | number }) => {
    setVariableBuyer((prevVariableBuyer) => ({
      ...prevVariableBuyer,
      payment: payment,
    }));
  };

  const saveDelivery = () => {
    if (variableBuyer.delivery) {
      setBuyer((prevBuyer) => ({
        ...prevBuyer,
        vid_dost: variableBuyer.delivery.id,
        dost: variableBuyer.delivery.name,
      }));
      closeModal();
    } else {
      console.log("error");
    }
  };

  const savePayment = () => {
    if (variableBuyer.payment) {
      setBuyer((prevBuyer) => ({
        ...prevBuyer,
        id_vopl: variableBuyer.payment.id,
        oplata: variableBuyer.payment.name
      }));
      closeModal()
    } else {
      console.log("error");
    }
  };

  return (
    <div className="container" style={{ height: "100vh" }}>
      <AbduModal
        variableBuyer={variableBuyer}
        saveDelivery={saveDelivery}
        savePayment={savePayment}
        selectDelivery={selectDelivery}
        selectPayment={selectPayment}
        paymentMethod={paymentMethod}
        deliveryMethod={deliveryMethod}
        isVisible={isModalVisible}
        close={closeModal}
        setView={setView}
        view={view}
      />
      <div className={styles.order_box}>
        <button
          className={clsx(
            styles.choose__delivery,
            buyer.vid_dost != 0 && styles.choosed__delivery
          )}
          onClick={() => {
            setView("curier"); // Устанавливаем вид для "curier"
            openModal();
          }}
        >
          <span className={styles.expoint}>
            <DeliveryCurierIcon />
          </span>
          {buyer.vid_dost != 0 ? buyer.dost : "Выберите способ доставки"}

          {buyer.vid_dost != 0 ? (
            <DeliveryApproveIcon />
          ) : (
            <DeliverExPointIcons />
          )}
        </button>
        <button
          className={clsx(
            styles.choose__delivery,
            buyer.id_vopl != 0 && styles.choosed__delivery
          )}
          onClick={() => {
            setView("oplata"); 
            openModal();
          }}
        >
          <span className={styles.expoint}>
            <PaymentIcon />
          </span>
          {buyer.id_vopl != 0 ? buyer.oplata : "Выберите способ оплаты"}
          {buyer.id_vopl != 0 ? (
            <DeliveryApproveIcon />
          ) : (
            <DeliverExPointIcons />
          )}
        </button>
      </div>
    </div>
  );
};

export default Abdu;
