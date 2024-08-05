import { XMark } from "../../../../public/Icons/Icons";
import styles from "./styles.module.scss";
import cn from "clsx";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
import CurierModal from "../ModalCase/CurierModal";
import DeliveryModal from "../ModalCase/DeliveryModal";
import PaymentModal from "../ModalCase/PaymentModal";
import { IPaymentMethod } from "@/types/Basket/PaymentMethod";
import { ICityFront } from "@/types/Basket/cityfrontType";
import DeliveryToggler from "../ModalCase/DeliveryToggler";
import { ChangeEvent } from "react";
import {
  IBuyer,
  ICityBuyer,
  IVariableBuyer,
} from "@/interfaces/baskets/basketModal";
import BasketBackdrop from "../BasketBackdrop/AbduBackdrop";
import BasketConfirmModal from "../ModalCase/BasketConfirmModal/BasketConfirmModal";

interface ModalProps {
  handleClearCart: () => void;

  buyer: IBuyer;
  location: ICityBuyer;
  setCity: (newCity: { name: string; id: number }) => void;
  variableBuyer: IVariableBuyer;
  isVisible: boolean;
  paymentMethod: IPaymentMethod;
  close: () => void;
  selectDelivery: (delivery: { name: string; id: string | number }) => void;
  deliveryMethod: IDeliveryMethod;
  saveDelivery: () => void;
  setView: React.Dispatch<
    React.SetStateAction<"delivery" | "curier" | "oplata" | "confirm">
  >;
  view: string;
  selectPayment: (payment: { name: string; id: string | number }) => void;
  savePayment: () => void;
  cities: ICityFront;
  isCityModalVisible: boolean;
  closeCityModal: () => void;
  openCityModal: () => void;
  saveCity: () => void;
  changeAdress: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AbduModal = ({
  handleClearCart,
  changeAdress,
  buyer,
  saveCity,
  location,
  setCity,
  openCityModal,
  closeCityModal,
  isCityModalVisible,
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
  cities,
}: ModalProps) => {
  const renderFormContent = () => {
    switch (view) {
      case "curier":
        return {
          title: "Способы доставки",
          content: (
            <CurierModal
              changeAdress={changeAdress}
              buyer={buyer}
              saveCity={saveCity}
              location={location}
              setCity={setCity}
              openCityModal={openCityModal}
              closeCityModal={closeCityModal}
              isCityModalVisible={isCityModalVisible}
              cities={cities}
              variableBuyer={variableBuyer}
              deliveryMethod={deliveryMethod}
              selectDelivery={selectDelivery}
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
      case "confirm":
        return {
          title: "Удалить товары",
          content: (
            <BasketConfirmModal
            />
          ),
        };

      default:
        return { title: "", content: null };
    }
  };

  const { title, content } = renderFormContent();

  const closeModals = () => {
    close();
    closeCityModal();
  };

  return (
    <>
      <BasketBackdrop isVisible={isVisible} close={closeModals} />

      <div
        className={cn(
          styles.modal,
          isVisible && styles.show,
          isCityModalVisible && styles.modal__hidden
        )}
      >
        <div className={styles.modal__intro}>
          <p className={styles.modal__title}>{title}</p>
          <button className={styles.modal__exit} onClick={close}>
            <XMark />
          </button>
        </div>
        {view == "delivery" ||
          (view == "curier" && (
            <DeliveryToggler
              close={closeCityModal}
              setView={setView}
              view={view}
            />
          ))}

        {content}
        {view == "confirm" ? (
          <button
            onClick={handleClearCart}
            aria-label="remove from cart"
            className={styles.button}
          >
            Удалить
          </button>
        ) : (
          <button
            onClick={() => {
              if (view == "delivery" || view == "curier") {
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
        )}
      </div>
    </>
  );
};

export default AbduModal;
