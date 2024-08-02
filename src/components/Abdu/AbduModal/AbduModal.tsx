import AbduBackdrop from "../AbduBackdrop/AbduBackdrop";
import { XMark } from "../../../../public/Icons/Icons";
import styles from "./styles.module.scss";
import cn from "clsx";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { IBuyer, ICityBuyer, IVariableBuyer } from "../Abdu";
import CurierModal from "../ModalCase/CurierModal";
import DeliveryModal from "../ModalCase/DeliveryModal";
import PaymentModal from "../ModalCase/PaymentModal";
import { IPaymentMethod } from "@/types/Basket/PaymentMethod";
import { ICityFront } from "@/types/Basket/cityfrontType";
import DeliveryToggler from "../ModalCase/DeliveryToggler";

interface ModalProps {
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
    React.SetStateAction<"delivery" | "curier" | "oplata">
  >;
  view: string;
  selectPayment: (payment: { name: string; id: string | number }) => void;
  savePayment: () => void;
  cities: ICityFront;
  isCityModalVisible: boolean;
  closeCityModal: () => void;
  openCityModal: () => void;
  saveCity: () => void;
}

const AbduModal = ({
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
      <AbduBackdrop isVisible={isVisible} close={closeModals} />

      <div className={cn(styles.modal, isVisible && styles.show, isCityModalVisible && styles.modal__hidden )}>
        <div className={styles.modal__intro}>
          <p className={styles.modal__title}>{title}</p>
          <button className={styles.modal__exit} onClick={close}>
            <XMark />
          </button>
        </div>
        {view !== "oplata" && <DeliveryToggler close={closeCityModal} setView={setView} view={view} />}

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
