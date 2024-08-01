"use client";
import { useState } from "react";
import AbduModal from "./AbduModal/AbduModal";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";

interface IBasketProps {
  deliveryMethod: IDeliveryMethod;
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
}

const Abdu = ({ deliveryMethod }: IBasketProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
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
  });

  const selectDelivery = (delivery: { name: string; id: string | number }) => {
    setVariableBuyer((prevVariableBuyer) => ({
      ...prevVariableBuyer,
      delivery: delivery,
    }));
  };

  const saveDelivery = () => {
    if (variableBuyer.delivery) {
      setBuyer((prevBuyer) => ({
        ...prevBuyer,
        vid_dost: variableBuyer.delivery.id,
        dost: variableBuyer.delivery.name
      }));
      closeModal();
    } else {
      console.log("error");
    }
  };

  console.log(buyer);

  return (
    <div className="container" style={{ height: "100vh" }}>
      <AbduModal
        variableBuyer={variableBuyer}
        saveDelivery={saveDelivery}
        selectDelivery={selectDelivery}
        deliveryMethod={deliveryMethod}
        isVisible={isModalVisible}
        close={closeModal}
      />
      <button className="showMore__button" onClick={openModal}>
        {buyer.vid_dost != 0 ? buyer.dost : "open modal dostavka v2"}
      </button>
    </div>
  );
};

export default Abdu;
