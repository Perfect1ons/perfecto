"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
import {
  CheckIcons,
  DeliverExPointIcons,
  DeliveryApproveIcon,
  DeliveryCurierIcon,
  PaymentIcon,
  TrashIcon,
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
import BasketsItems from "./BasketsItems/BasketsItems";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  clearSelectedProducts,
  toggleSelectAllProducts,
} from "@/store/reducers/cart.reducer";
import Image from "next/image";
const AbduModal = dynamic(() => import("./AbduModal/AbduModal"), {
  ssr: false,
});
const CurierCitiesModal = dynamic(
  () => import("./ModalCase/CurierCitiesModal/CurierCitiesModal"),
  {
    ssr: false,
  }
);
interface IBasketProps {
  cities: ICityFront;
  deliveryMethod: IDeliveryMethod;
  paymentMethod: IPaymentMethod;
  items: IBasketItems[];
}

const Abdu = ({
  deliveryMethod,
  paymentMethod,
  cities,
  items,
}: IBasketProps) => {
  //! redux
  const dispatch = useDispatch();
  const data = useSelector((store: RootState) => store.cart);
  const [selectAll, setSelectAll] = useState(false);

  // useEffect(() => {
  //   setSelectAll(data.cart.every((product) => product.selected));
  // }, [data.cart]);

  const handleSelectAllToggle = () => {
    dispatch(toggleSelectAllProducts());
    setSelectAll(!selectAll);
  };

  const handleClearCart = () => {
    dispatch(clearSelectedProducts());
    setSelectAll(false); // Сброс состояния selectAll после очистки выбранных продуктов
    closeModal();
  };

  const [view, setView] = useState<
    "delivery" | "curier" | "oplata" | "confirm"
  >("curier");
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

  //! для адресса
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
        directory: `${location.directory.street} ${location.directory.house} ${location.directory.apartament}`,
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
  const [price, setPrice] = useState<number>(1000);

  const animatePrice = (startValue: number, endValue: number) => {
    const priceElement = document.getElementById("price");
    if (priceElement) {
      const duration = 200; // Длительность анимации в миллисекундах
      const start = performance.now();

      const update = (currentTime: number) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const newValue = Math.round(
          startValue + (endValue - startValue) * progress
        );

        priceElement.textContent = newValue.toString();

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    }
  };

  const handleIncrease = () => {
    setPrice((prevPrice) => {
      const newPrice = prevPrice + 1000;
      if (price >= 0) {
        // Обновляем только если значение больше или равно 0
        animatePrice(price, newPrice); // Запуск анимации с предыдущего значения
      }
      return newPrice;
    });
  };

  const handleDecrease = () => {
    setPrice((prevPrice) => {
      if (prevPrice > 0) {
        const newPrice = Math.max(prevPrice - 1000, 0); // Устанавливаем минимальное значение 0
        animatePrice(price, newPrice); // Запуск анимации с предыдущего значения
        return newPrice;
      }
      return prevPrice; // Возвращаем текущее значение, если меньше или равно 0
    });
  };

  return (
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
        handleClearCart={handleClearCart}
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
      <div className={styles.controlContainer}>
        <h1 className={styles.basketTilte}>Корзина - #160989</h1>
        <div
          className={styles.checkBoxContainer}
          onClick={handleSelectAllToggle}
        >
          <span
            className={clsx("showFiltersUlContainer__check", {
              ["showFiltersUlContainer__checkActive"]: selectAll,
            })}
          >
            {selectAll ? <CheckIcons /> : null}
          </span>
          Выбрать все товары
        </div>
        <button
          onClick={() => {
            setView("confirm");
            openModal();
          }}
          disabled={!data.cart.some((product) => product.selected)}
          className={styles.trashButton}
        >
          <TrashIcon />
        </button>
      </div>

      <div className={styles.basket__container}>
        <BasketsItems cartData={items} />
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
                      Адрес:{" "}
                      {buyer.city}
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
      <div className={styles.price_container}>
        <span id="price" className={styles.price}>
          {price}
        </span>{" "}
        ₽
      </div>
      <button className="showMore__button" onClick={handleIncrease}>
        Увеличить
      </button>
      <button className="showMore__button" onClick={handleDecrease}>
        Уменьшить
      </button>
    </div>
  );
};

export default Abdu;
