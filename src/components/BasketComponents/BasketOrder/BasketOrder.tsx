"use client";
import Image from "next/image";
import {
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

interface Buyer {
  phone: string;
  surname: string;
  name: string;
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

const BasketOrder = () => {
  const [visible, setVisible] = useState<string>("");

  const [nds, setNds] = useState<boolean>(false);
  const [buyer, setBuyer] = useState<Buyer>({
    phone: `+${codesCountry.kg.code}`,
    surname: "",
    name: "",
  });

  const cart = useSelector((state: RootState) => state.cart.cart);

  const { totalQuantity, totalPrice } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        const quantity = item.quantity || 0;
        const price = item.price || 0;
        acc.totalQuantity += quantity;
        acc.totalPrice += quantity * price;
        return acc;
      },
      { totalQuantity: 0, totalPrice: 0 }
    );
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

  const codeCountryHandler = useCallback((country: CountryKey) => {
    const selectedCountry = codesCountry[country];
    setCurrentCodeCountry(selectedCountry);
    setBuyer((prevBuyer) => ({
      ...prevBuyer,
      phone: `+${selectedCountry.code}`,
    }));
    setMask(getMaskForCountry(selectedCountry.code));
    setVisible("");
  }, []);

  const orderHandler = useCallback(() => {
    // Order processing logic here
  }, []);

  const [activeModal, setActiveModal] = useState("");

  const activeModalToggle = (value: string) => {
    setActiveModal(value);
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
      {activeModal === "delivery" && (
        <>
          <ChosingDeliveryModal
            visible={activeModal}
            close={activeModalToggle}
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
          className={styles.wrap_delivery}
        >
          <DeliveryIcon />
          <p className={styles.wrap_delivery_title}>Выберите способ доставки</p>
          <span className={styles.wrap_delivery_expoint}>
            <ExPoint />
          </span>
        </button>
        <button
          onClick={() => activeModalToggle("pay")}
          className={styles.wrap_payment}
        >
          <Image
            src="/img/pay_icon.svg"
            width={20}
            height={20}
            alt="pay icon"
          />
          <p className={styles.wrap_payment_title}>Выберите способ оплаты</p>
          <span className={styles.wrap_payment_expoint}>
            <ExPoint />
          </span>
        </button>
        <div className={styles.wrap_phone}>
          <div className={styles.wrap_phone_control}>
            <button
              onClick={() => visibleHandler("country")}
              className={styles.wrap_phone_control_selectCountry}
            >
              <Image
                className={styles.wrap_phone_control_selectCountry_img}
                src={currentCodeCountry.img}
                width={30}
                height={30}
                alt={currentCodeCountry.name}
              />
              <span
                className={cn(
                  visible === "country"
                    ? styles.wrap_phone_control_selectCountry_arrow__active
                    : styles.wrap_phone_control_selectCountry_arrow
                )}
              >
                <ArrowDropdown />
              </span>
            </button>
            <InputMask
              mask={mask}
              value={buyer.phone}
              onChange={handleBuyerChange}
              className={styles.wrap_phone_control_input}
            >
              {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                <input
                  {...inputProps}
                  name="phone"
                  type="text"
                  placeholder="Телефон"
                />
              )}
            </InputMask>
          </div>
          {visible === "country" && (
            <div className={styles.wrap_phone_dropdown}>{countryOptions}</div>
          )}
        </div>
        <div className={styles.wrap_surname}>
          <input
            name="surname"
            placeholder="Фамилия"
            type="text"
            value={buyer.surname}
            onChange={handleBuyerChange}
            className={styles.wrap_surname_input}
          />
        </div>
        <div className={styles.wrap_surname}>
          <input
            name="name"
            placeholder="Имя"
            type="text"
            value={buyer.name}
            onChange={handleBuyerChange}
            className={styles.wrap_surname_input}
          />
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
            <input
              placeholder="Название организации:"
              className={styles.wrap_organization_dropdown__name}
              type="text"
            />
            <input
              placeholder="ИНН:"
              className={styles.wrap_organization_dropdown__inn}
              type="text"
            />
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
              {totalPrice.toLocaleString("ru-Ru")} c.
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
              {totalPrice.toLocaleString("ru-Ru")} c.
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
      </section>
    </>
  );
};

export default BasketOrder;
