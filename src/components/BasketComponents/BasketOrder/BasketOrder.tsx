"use client";
import Image from "next/image";
import {
  ArrowDropdown,
  DeliveryIcon,
  ExPoint,
} from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { useState } from "react";
import cn from "clsx";

interface Buyer {
  phone: number | null;
  surname: string;
  name: string;
}

const BasketOrder = () => {
  const [visible, setVisible] = useState("");

  const [nds, setNds] = useState(false);

  const [buyer, setBuyer] = useState<Buyer>({
    phone: null,
    surname: "",
    name: "",
  });
  console.log(buyer);

  const visibleHandler = (current: string) => {
    if (visible !== current) {
      setVisible(current);
    } else {
      setVisible("");
    }
  };

  const ndsHandler = () => {
    setNds(!nds);
  };

  const handleBuyerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyer((prevBuyer) => ({
      ...prevBuyer,
      [name]: name === "phone" ? (value ? parseInt(value) : null) : value,
    }));
  };

  const orderHandler = () => {};

  return (
    <section className={styles.wrap}>
      <button className={styles.wrap_button}>
        <DeliveryIcon />
        <p className={styles.wrap_button_title}>Выберите способ доставки</p>
        <span className={styles.wrap_button_expoint}>
          <ExPoint />
        </span>
      </button>
      <button className={styles.wrap_button}>
        <Image
          src="/img/pay_icon.svg"
          width={20}
          height={20}
          alt="pay icon"
        ></Image>
        <p className={styles.wrap_button_title}>Выберите способ оплаты</p>
        <span className={styles.wrap_button_expoint}>
          <ExPoint />
        </span>
      </button>
      <div className={styles.wrap_phone}>
        {/* <ul className={styles.wrap_phone_dropdown}>
          <li className={styles.wrap_phone_dropdown_item}>+996</li>
          <li className={styles.wrap_phone_dropdown_item}>+7</li>
          <li className={styles.wrap_phone_dropdown_item}>+7</li>
        </ul> */}
        <input
          placeholder="Телефон"
          onChange={handleBuyerChange}
          className={styles.wrap_phone_input}
          type="text"
        />
      </div>
      <div className={styles.wrap_surname}>
        <input
          onChange={handleBuyerChange}
          placeholder="Фамилия"
          type="text"
          className={styles.wrap_surname_input}
        />
      </div>
      <div className={styles.wrap_surname}>
        <input
          onChange={handleBuyerChange}
          placeholder="Имя"
          type="text"
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
                className={styles.wrap_organization_dropdown_nds_switch__slider}
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
          <p className={styles.wrap_price_good_count}>Товары, 1 шт.</p>
          <p className={styles.wrap_price_good_finalPrice}>3000 c.</p>
        </div>
        {visible === "organization" && nds && (
          <div className={styles.wrap_price_nds}>
            <p className={styles.wrap_price_nds_text}>В т.ч НДС:</p>
            <p className={styles.wrap_price_nds_price}>329.20 c.</p>
          </div>
        )}
        <div className={styles.wrap_price_priceTotal}>
          <p className={styles.wrap_price_priceTotal_totalTitle}>Итого: </p>
          <p className={styles.wrap_price_priceTotal_price}>3000 c.</p>
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
  );
};

export default BasketOrder;
