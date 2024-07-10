"use client";
import Image from "next/image";
import { DeliveryIcon, ExPoint } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
const BasketOrder = () => {
  return (
    <div className={styles.wrap}>
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
          className={styles.wrap_phone_input}
          type="text"
        />
      </div>
      <div className={styles.wrap_surname}>
        <input
          placeholder="Фамилия"
          type="text"
          className={styles.wrap_surname_input}
        />
      </div>
      <div className={styles.wrap_surname}>
        <input
          placeholder="Имя"
          type="text"
          className={styles.wrap_surname_input}
        />
      </div>
    </div>
  );
};

export default BasketOrder;
