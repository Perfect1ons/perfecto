"use client";
import { useEffect, useState } from "react";
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
import dynamic from "next/dynamic";
import { ICityFront } from "@/types/Basket/cityfrontType";
const AbduModal = dynamic(() => import("./AbduModal/AbduModal"), {
  ssr: false,
});
interface IBasketProps {
  cities: ICityFront;
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
  city?: string;
}

export interface ICityBuyer {
  id_city: {
    name: string;
    id: number | null;
  };
  //region
  id_city2: {
    name: string;
    id: number | null;
  };
  // street
  directory: {
    street: string;
    house: string;
    apartament: string;
  };
}

const Abdu = ({ deliveryMethod, paymentMethod, cities }: IBasketProps) => {
  const [view, setView] = useState<"delivery" | "curier" | "oplata">("curier");
  const [isModalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const openCityModal = () => setCityModalVisible(true);
  const closeCityModal = () => setCityModalVisible(false);
  const [location, setLocation] = useState<ICityBuyer>({
    id_city: {
      name: "",
      id: null,
    },
    id_city2: {
      name: "",
      id: null,
    },
    directory: {
      street: "",
      house: "",
      apartament: "",
    },
  });

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
    city: "",
  });

  //! для выбора способов
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

  //! для сохранения споособов
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
        oplata: variableBuyer.payment.name,
      }));
      closeModal();
    } else {
      console.log("error");
    }
  };

  const saveCity = () => {
    if (location.id_city) {
      setBuyer((prevState) => ({
        ...prevState,
        id_city: location.id_city.id,
        city: location.id_city.name,
      }));
      closeCityModal();
    } else {
      console.log("error");
    }
  };

  //! для выбора города
  const setCity = (newCity: { name: string; id: number }) => {
    setLocation((prevState) => ({
      ...prevState,
      id_city: newCity,
    }));
  };

  useEffect(() => {
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isModalVisible) {
      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
      body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = body.style.top;
      body.style.paddingRight = "";
      body.style.overflow = "auto";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      body.style.top = "";
    }
  }, [isModalVisible]);


  return (
    <div className="container" style={{ height: "100vh" }}>
      <AbduModal
        buyer={buyer}
        saveCity={saveCity}
        location={location}
        setCity={setCity}
        openCityModal={openCityModal}
        closeCityModal={closeCityModal}
        isCityModalVisible={isCityModalVisible}
        cities={cities}
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
          {buyer.vid_dost != 0 ? (
            <div className={styles.delivery__info}>
              <p className={styles.delivery__info_dostavka}>{buyer.dost}</p>
              {buyer.id_city !== null &&
                buyer.vid_dost !== 1 &&
                buyer.vid_dost !== 2 && (
                  <p className={styles.delivery__info_address}>
                    {buyer.city}
                    {location.directory.street &&
                      "," + location.directory.street}
                    {location.directory.house && "," + location.directory.house}
                    {location.directory.apartament &&
                      "," + location.directory.apartament}
                  </p>
                )}
            </div>
          ) : (
            "Выберите способ доставки"
          )}

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
