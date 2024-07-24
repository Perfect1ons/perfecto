"use client";
import Image from "next/image";
import {
  ApproveIcon,
  ArrowDropdown,
  DeliveryIcon,
  ExPoint,
} from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { useState, ChangeEvent, useCallback, useMemo } from "react";
import cn from "clsx";
import InputMask from "react-input-mask";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import ChosingDeliveryModal from "./ChosingDeliveryModal/ChosingDeliveryModal";
import ChosingPaymentModal from "./ChosingPaymentModal/ChosingPaymentModal";
import { PaymentMethod } from "@/types/Basket/PaymentMethod";
import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";
import AuthModal from "@/components/AuthModal/AuthModal";
import { SelectCityType } from "@/types/Basket/SelectCity";
import UserGeoModal from "@/components/UI/UserGeoModal/UserGeoModal";

export interface Buyer {
  phone: string;
  surname: string;
  name: string;
  payment: string;
  delivery: string;
}

interface Country {
  code: number;
  img: string;
  name: string;
}

const codesCountry: Record<string, Country> = {
  kg: { code: 996, img: "/img/kgFlag.svg", name: "Кыргызстан" },
  ru: { code: 7, img: "/img/ruFlag.svg", name: "Россия" },
  kz: { code: 7, img: "/img/kzFlag.svg", name: "Казахстан" },
};

type CountryKey = keyof typeof codesCountry;

interface IBasketOrderProps {
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  authToken: string | undefined;
  deliveryCity: SelectCityType;
}

const BasketOrder = ({
  paymentMethod,
  deliveryMethod,
  authToken,
  deliveryCity,
}: IBasketOrderProps) => {
  const [visible, setVisible] = useState<string>("");

  const [regVisible, setRegVisible] = useState(false);

  const regVisibleHandle = () => {
    setRegVisible(false);
  };

  const [variableBuyer, setVariableBuyer] = useState({
    payment: "",
    delivery: "",
  });

  const [nds, setNds] = useState<boolean>(false);
  const [buyer, setBuyer] = useState<Buyer>({
    phone: `${codesCountry.kg.code}`,
    surname: "",
    name: "",
    payment: variableBuyer.payment,
    delivery: variableBuyer.delivery,
  });

  const [paymentWarning, setPaymentWarning] = useState("");
  const [deliveryWarning, setDeliveryWarning] = useState("");
  const [phoneWarning, setPhoneWarning] = useState("");
  const [surnameWarning, setSurnameWarning] = useState("");
  const [nameWarning, setNameWarning] = useState("");

  const cart = useSelector((state: RootState) => state.cart.cart);
  const { totalQuantity, formattedTotalPrice } = useMemo(() => {
    const result = cart.reduce(
      (acc, item) => {
        const quantity = item.quantity || 0;
        const price = item.price || 0;
        acc.totalQuantity += quantity;
        acc.totalPrice += quantity * price;
        return acc;
      },
      { totalQuantity: 0, totalPrice: 0 }
    );

    const formatNumber = (number: number) => {
      if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + " млрд";
      } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + " млн";
      } else {
        return number.toLocaleString("ru-RU");
      }
    };

    return {
      totalQuantity: formatNumber(result.totalQuantity),
      formattedTotalPrice: formatNumber(result.totalPrice),
    };
  }, [cart]);

  const [currentCodeCountry, setCurrentCodeCountry] = useState<Country>(
    codesCountry.kg
  );

  const getMaskForCountry = (code: number) => {
    switch (code) {
      case 996:
        return "\\+\\9\\96 (999) 99-99-99";
      case 7:
        return "\\+\\7 (999) 999-99-99";
      default:
        return "\\+\\9\\96 (999) 99-99-99";
    }
  };

  const [mask, setMask] = useState(getMaskForCountry(currentCodeCountry.code));

  const visibleHandler = useCallback((current: string) => {
    setVisible((prevVisible) => (prevVisible !== current ? current : ""));
  }, []);
  const ndsHandler = useCallback(() => {
    setNds((prevNds) => !prevNds);
  }, []);

  const handleBuyerChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyer((prevBuyer) => ({
      ...prevBuyer,
      [name]: value,
    }));
  }, []);

  const selectPayment = (value: string) => {
    setVariableBuyer((prevVariableBuyer) => ({
      ...prevVariableBuyer,
      payment: value,
    }));
  };

  const selectDelivery = (value: string) => {
    setVariableBuyer((prevVariableBuyer) => ({
      ...prevVariableBuyer,
      delivery: value,
    }));
  };

  const savePayment = () => {
    if (variableBuyer.payment) {
      setBuyer((prevBuyer) => ({
        ...prevBuyer,
        payment: variableBuyer.payment,
      }));
      activeModalToggle("");
      setPaymentWarning("");
    } else setPaymentWarning("Пожалуйста выберите способ оплаты");
  };

  const saveDelivery = () => {
    if (variableBuyer.delivery) {
      setBuyer((prevBuyer) => ({
        ...prevBuyer,
        delivery: variableBuyer.delivery,
      }));
      activeModalToggle("");
      setDeliveryWarning("");
    } else {
      setDeliveryWarning("Пожалуйста выберите способ доставки");
    }
  };

  const codeCountryHandler = useCallback((country: CountryKey) => {
    const selectedCountry = codesCountry[country];
    setCurrentCodeCountry(selectedCountry);
    setBuyer((prevBuyer) => ({
      ...prevBuyer,
      phone: `${selectedCountry.code}`,
    }));
    setMask(getMaskForCountry(selectedCountry.code));
    setVisible("");
  }, []);

  const validateBuyerInfo = (): boolean => {
    let isValid = true;

    // Delivery validation
    if (!buyer.delivery) {
      setDeliveryWarning("Пожалуйста выберите способ доставки");
      isValid = false;
    } else {
      setDeliveryWarning("");
    }

    // Payment validation
    if (!buyer.payment) {
      setPaymentWarning("Пожалуйста выберите способ оплаты");
      isValid = false;
    } else {
      setPaymentWarning("");
    }

    // Phone number validation
    const numericPhoneNumber = buyer.phone.replace(/\D/g, "");
    let expectedLength = 0;
    switch (currentCodeCountry.code) {
      case 996:
        expectedLength = 12;
        break;
      case 7:
        expectedLength = 11;
        break;
      default:
        expectedLength = 12;
        break;
    }

    if (!numericPhoneNumber) {
      setPhoneWarning("Это поле не может быть пустым.");
      isValid = false;
    } else if (numericPhoneNumber.length !== expectedLength) {
      setPhoneWarning("Номер введен не полностью.");
      isValid = false;
    } else {
      setPhoneWarning("");
    }

    // Surname validation
    if (!buyer.surname) {
      setSurnameWarning("Пожалуйста укажите вашу фамилию");
      isValid = false;
    } else {
      setSurnameWarning("");
    }

    // Name validation
    if (!buyer.name) {
      setNameWarning("Пожалуйста укажите ваше имя");
      isValid = false;
    } else {
      setNameWarning("");
    }

    return isValid;
  };

  const orderHandler = () => {
    if (validateBuyerInfo()) {
      if (!authToken) {
        setRegVisible(true);
      } else {
        console.log("Order placed successfully");
      }
    }
  };

  const [activeModal, setActiveModal] = useState("");

  const activeModalToggle = (value: string) => {
    setActiveModal(value);
    // if (authToken) {
    //   setActiveModal(value);
    // } else {
    //   setRegVisible(true);
    // }
  };

  const countryOptions = useMemo(() => {
    return Object.entries(codesCountry).map(([key, country]) => (
      <button
        key={key}
        onClick={() => codeCountryHandler(key as CountryKey)}
        className={styles.wrap_phone_dropdown_button}
      >
        <Image
          className={styles.wrap_phone_dropdown_button_img}
          src={country.img}
          width={30}
          height={30}
          alt={country.name}
        />
        {country.name}
        <span className={styles.wrap_phone_dropdown_button_code}>
          +{country.code}
        </span>
      </button>
    ));
  }, [codeCountryHandler]);

  return (
    <>
      {regVisible && (
        <AuthModal isVisible={regVisible} close={regVisibleHandle} />
      )}
      {activeModal === "delivery" && (
        <>
          <UserGeoModal visible={true} />
          {/* <ChosingDeliveryModal
            authToken={authToken}
            deliveryCity={deliveryCity}
            variableBuyer={variableBuyer}
            visible={activeModal}
            close={activeModalToggle}
            variants={deliveryMethod}
            selectDelivery={selectDelivery}
            saveDelivery={saveDelivery}
            warning={deliveryWarning}
          /> */}
          <div
            onClick={() => activeModalToggle("")}
            className={styles.backdrop}
          ></div>
        </>
      )}
      {activeModal === "payment" && (
        <>
          <ChosingPaymentModal
            variableBuyer={variableBuyer}
            visible={activeModal}
            close={activeModalToggle}
            variants={paymentMethod}
            selectPayment={selectPayment}
            savePayment={savePayment}
            warning={paymentWarning}
          />
          <div
            onClick={() => activeModalToggle("")}
            className={styles.backdrop}
          ></div>
        </>
      )}
      <section className={styles.wrap}>
        <button
          onClick={() => activeModalToggle("delivery")}
          className={cn(
            styles.wrap_delivery,
            buyer.delivery && styles.wrap_delivery_success
          )}
        >
          <DeliveryIcon />
          <p className={styles.wrap_delivery_title}>
            {buyer.delivery.length === 0
              ? "Выберите способ доставки"
              : buyer.delivery}
          </p>
          <span
            className={cn(
              styles.wrap_delivery_expoint,
              buyer.delivery && styles.wrap_delivery_approve
            )}
          >
            {buyer.delivery ? <ApproveIcon /> : <ExPoint />}
          </span>
        </button>
        {deliveryWarning && (
          <p className={styles.wrap_warning}>{deliveryWarning}</p>
        )}
        <button
          onClick={() => activeModalToggle("payment")}
          className={cn(
            styles.wrap_payment,
            buyer.payment && styles.wrap_payment_success
          )}
        >
          <Image
            src="/img/pay_icon.svg"
            width={20}
            height={20}
            alt="pay icon"
          />
          <p className={styles.wrap_payment_title}>
            {buyer.payment.length === 0
              ? "Выберите способ оплаты"
              : buyer.payment}
          </p>
          <span
            className={cn(
              styles.wrap_payment_expoint,
              buyer.payment && styles.wrap_payment_approve
            )}
          >
            {buyer.payment ? <ApproveIcon /> : <ExPoint />}
          </span>
        </button>
        {paymentWarning && (
          <p className={styles.wrap_warning}>{paymentWarning}</p>
        )}
        <div className={styles.wrap_phone}>
          <div className={styles.wrap_phone_control}>
            <InputMask
              mask={mask}
              value={buyer.phone}
              onChange={handleBuyerChange}
              className={styles.auth__input}
            >
              {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                <input
                  autoComplete="off"
                  {...inputProps}
                  name="phone"
                  placeholder="Телефон ( Обязательно )"
                  type="text"
                  required
                />
              )}
            </InputMask>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                visibleHandler("country");
              }}
              className={styles.select__country}
            >
              <span
                className={cn(
                  visible === "country"
                    ? styles.select__country_arrow__active
                    : styles.select__country_arrow
                )}
              >
                <ArrowDropdown />
              </span>
              <Image
                className={styles.select__country_img}
                src={currentCodeCountry.img}
                width={30}
                height={30}
                alt={currentCodeCountry.name}
              />
            </button>
          </div>
          {phoneWarning && (
            <p className={styles.wrap_warning}>{phoneWarning}</p>
          )}
          {visible === "country" && (
            <div className={styles.wrap_phone_dropdown}>{countryOptions}</div>
          )}
        </div>
        <div className={styles.containerInputLabel}>
          <div className={styles.mail__label}>
            <input
              className={styles.mail__inputField}
              value={buyer.surname}
              name="surname"
              type="text"
              onChange={handleBuyerChange}
              required
            />
            <label className={styles.mail__inputLabel}>Фамилия</label>
          </div>
          {surnameWarning && (
            <p className={styles.wrap_warning}>{surnameWarning}</p>
          )}
        </div>

        <div className={styles.containerInputLabel}>
          <div className={styles.mail__label}>
            <input
              className={styles.mail__inputField}
              value={buyer.name}
              name="name"
              type="text"
              onChange={handleBuyerChange}
              required
            />
            <label className={styles.mail__inputLabel}>Имя</label>
          </div>
          {nameWarning && <p className={styles.wrap_warning}>{nameWarning}</p>}
        </div>
        <div className={styles.wrap_organization}>
          <button
            onClick={() => visibleHandler("organization")}
            className={styles.wrap_organization_dropdownToggler}
          >
            <span
              className={cn(
                visible === "organization"
                  ? styles.wrap_organization_dropdownToggler_arrow__active
                  : styles.wrap_organization_dropdownToggler_arrow
              )}
            >
              <ArrowDropdown />
            </span>
            Оформить на организацию
          </button>
          <div
            className={cn(
              visible === "organization"
                ? styles.wrap_organization_dropdown__active
                : styles.wrap_organization_dropdown
            )}
          >
            <div className={styles.mail__label}>
              <input className={styles.mail__inputField} required type="text" />
              <label className={styles.mail__inputLabel}>
                Название организации:
              </label>
            </div>
            <div className={styles.mail__label}>
              <input className={styles.mail__inputField} required type="text" />
              <label className={styles.mail__inputLabel}>ИНН:</label>
            </div>
            <div className={styles.wrap_organization_dropdown_nds}>
              <label className={styles.wrap_organization_dropdown_nds_switch}>
                <input onClick={ndsHandler} type="checkbox" />
                <span
                  className={
                    styles.wrap_organization_dropdown_nds_switch__slider
                  }
                ></span>
              </label>
              <p className={styles.wrap_organization_dropdown_nds_title}>
                Включить НДС
              </p>
            </div>
          </div>
        </div>
        <div className={styles.wrap_price}>
          <div className={styles.wrap_price_good}>
            <p className={styles.wrap_price_good_count}>
              Товары, {totalQuantity} шт.
            </p>
            <p className={styles.wrap_price_good_finalPrice}>
              {formattedTotalPrice} c.
            </p>
          </div>
          {visible === "organization" && nds && (
            <div className={styles.wrap_price_nds}>
              <p className={styles.wrap_price_nds_text}>В т.ч НДС:</p>
              <p className={styles.wrap_price_nds_price}>329.20 c.</p>
            </div>
          )}
          <div className={styles.wrap_price_priceTotal}>
            <p className={styles.wrap_price_priceTotal_totalTitle}>Итого: </p>
            <p className={styles.wrap_price_priceTotal_price}>
              {formattedTotalPrice} c.
            </p>
          </div>
        </div>
        <button
          onClick={orderHandler}
          aria-label="order request"
          className={styles.wrap_orderRequest}
        >
          оформить заказ
        </button>
        <p className={styles.wrap_privacy}>
          Согласен с использованием Правил пользования торговой площадкой и
          правилами возврата
        </p>
      </section>
    </>
  );
};

export default BasketOrder;
