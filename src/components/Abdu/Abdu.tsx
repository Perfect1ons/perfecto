"use client";
import { ChangeEvent, useEffect, useState } from "react";
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
import {
  IBuyer,
  ICityBuyer,
  IVariableBuyer,
} from "@/interfaces/baskets/basketModal";
import { IBasketItems } from "@/interfaces/baskets/basket";
import BasketHeader from "./BasketHeader/BasketHeader";
import {
  deleteAllTovars,
  deleteAuthedTovars,
  deleteTovar,
} from "@/api/clientRequest";
import BasketEmpty from "./BasketEmpty/BasketEmpty";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "@/store/reducers/cart.reducer";
import { RootState } from "@/store";
import BasketsItems from "./BasketsItems/BasketsItems";

const AbduModal = dynamic(() => import("./AbduModal/AbduModal"), {
  ssr: false,
});

const CurierCitiesModal = dynamic(
  () => import("./ModalCase/CurierCitiesModal/CurierCitiesModal"),
  {
    ssr: false,
  }
);

// Интерфейс для корзины
interface IBasketProps {
  cartId: any;
  authToken?: string;
  cities: ICityFront;
  deliveryMethod: IDeliveryMethod;
  paymentMethod: IPaymentMethod;
  items: IBasketItems[];
}

const Abdu = ({
  cartId,
  authToken,
  deliveryMethod,
  paymentMethod,
  cities,
  items: initialItems,
}: IBasketProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [items, setItems] = useState<any[]>(cart);
  useEffect(() => {
    if (cart.length === initialItems.length) {
      setItems(initialItems);
    } else {
      const reversedCart = [...cart].reverse();
      setItems(reversedCart);
    }
  }, [cart, initialItems]);

  const [view, setView] = useState<
    "delivery" | "curier" | "oplata" | "confirm"
  >("curier");
  const [isModalVisible, setModalVisible] = useState(false);
  const [choosed, setChoosed] = useState<number | undefined>();
  const [choosedModal, setChoosedModal] = useState<boolean>(false);

  const closeModal = () => {
    setModalVisible(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const openCityModal = () => setCityModalVisible(true);
  const closeCityModal = () => setCityModalVisible(false);

  const [selectedIds, setSelectedIds] = useState<string>("");
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

  // Функция удаления товара
  const removeFromCart = (id_tov: number) => {
    openModal();
    setView("confirm");
    setChoosedModal(true);
    setChoosed(id_tov);
  };

  // Функция для подтверждения удаления товаров
  const removeTovars = async () => {
    if (choosedModal && choosed) {
      dispatch(removeProductFromCart([choosed]));

      closeModal();

      let response;
      if (authToken) {
        response = await deleteAuthedTovars(authToken, choosed.toString());
      } else {
        response = await deleteTovar(cartId, choosed);
      }

      if (response) {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id_tov !== choosed)
        );
      }
      setChoosed(undefined);
    } else {
      let response;
      if (authToken) {
        response = await deleteAuthedTovars(authToken, selectedIds);
      } else {
        response = await deleteAllTovars(cartId, selectedIds);
      }

      const selectedIdsArray = selectedIds.split(",").map((id) => parseInt(id));
      dispatch(removeProductFromCart(selectedIdsArray));
      setItems((prevItems) =>
        prevItems.filter((item) => !selectedIdsArray.includes(item.id_tov))
      );
      closeModal();
      setSelectedIds("");
    }
  };

  // Обработчик изменений в чекбоксах товаров
  const handleCheckboxChange = (id_tov: number, isChecked: boolean) => {
    setSelectedIds((prevSelectedIds) => {
      const idsArray = prevSelectedIds.split(",").filter(Boolean);
      if (isChecked) {
        return [...idsArray, id_tov.toString()].join(",");
      } else {
        return idsArray.filter((id) => id !== id_tov.toString()).join(",");
      }
    });
  };

  // Функции для выбора/снятия всех товаров
  const handleSelectAll = () => {
    const allIds = items.map((item) => item.id_tov.toString()).join(",");
    setSelectedIds(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedIds("");
  };

  // Функция для изменения адреса
  const changeAdress = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      directory: {
        ...prevLocation.directory,
        [name]: value,
      },
    }));
  };

  // Функции для выбора и сохранения методов доставки и оплаты
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
        directory: `${location.directory.street} ${location.directory.house} ${location.directory.apartament}`,
      }));
      closeModal();
    } else {
      console.log("Ошибка: не выбран способ доставки");
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
      console.log("Ошибка: не выбран способ оплаты");
    }
  };

  // Функции для выбора и сохранения города
  const saveCity = () => {
    if (location.id_city) {
      setBuyer((prevState) => ({
        ...prevState,
        id_city: location.id_city.id,
        city: location.id_city.name,
      }));
      closeCityModal();
    } else {
      console.log("Ошибка: не выбран город");
    }
  };

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

  const isAllSelected =
    selectedIds.split(",").filter(Boolean).length === items.length;
  return (
    <>
      {items.length > 0 ? (
        <div className="container">
          <CurierCitiesModal
            buyer={buyer}
            saveCity={saveCity}
            location={location}
            setCity={setCity}
            close={closeCityModal}
            isVisible={isCityModalVisible}
            cities={cities}
          />
          <AbduModal
            setChoosed={setChoosed}
            setChoosedModal={setChoosedModal}
            removeTovars={removeTovars}
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
          <BasketHeader
            authToken={authToken}
            count={items.length}
            openModal={openModal}
            setView={setView}
            selectAll={handleSelectAll}
            deselectAll={handleDeselectAll}
            isAllSelected={isAllSelected}
            selectedIds={selectedIds}
          />
          <div className={styles.basket__container}>
            <BasketsItems
              token={authToken}
              removeFromCart={removeFromCart}
              selectedIds={selectedIds}
              onCheckboxChange={handleCheckboxChange}
              cartData={items}
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
                    <p className={styles.delivery__info_dostavka}>
                      {buyer.dost}
                    </p>
                    {buyer.id_city !== null &&
                      buyer.vid_dost !== 1 &&
                      buyer.vid_dost !== 2 && (
                        <p className={styles.delivery__info_address}>
                          Адрес: {buyer.city}
                          {location.directory.street &&
                            "," + location.directory.street}
                          {location.directory.house &&
                            "," + location.directory.house}
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
        </div>
      ) : (
        <BasketEmpty />
      )}
    </>
  );
};

export default Abdu;
