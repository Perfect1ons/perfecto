"use client";
import React, { ChangeEvent } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import InputMask from "react-input-mask";
import Image from "next/image";
import { ArrowDropdown } from "../../../../public/Icons/Icons";

interface FormProps {
  setView: (view: "login" | "recovery" | "registration" | "confirm") => void;
  close: () => void;
  handleBuyerChange: (e: ChangeEvent<HTMLInputElement>) => void;
  countryOptions: any;
  mask: any;
  currentCodeCountry: Country;
  visible: string;
  visibleHandler: (current: string) => void;
  phoneNumber: string;
}

interface Country {
  code: number;
  img: string;
  name: string;
}

const AuthRecovery = ({
  setView,
  close,
  countryOptions,
  currentCodeCountry,
  handleBuyerChange,
  mask,
  visible,
  visibleHandler,
  phoneNumber,
}: FormProps) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <p className={styles.modal__text}>
        Введите свой номер телефона. Новый пароль будет отправлен по смс.
      </p>
      <form className={styles.modal__form}>
        <div className={styles.modal__form_phone}>
          <div className={styles.modal__form_phone_control}>
            <button
              onClick={() => visibleHandler("country")}
              className={styles.modal__form_phone_control_selectCountry}
            >
              <Image
                className={styles.modal__form_phone_control_selectCountry_img}
                src={currentCodeCountry.img}
                width={30}
                height={30}
                alt={currentCodeCountry.name}
              />
              <span
                className={cn(
                  visible === "country"
                    ? styles.modal__form_phone_control_selectCountry_arrow__active
                    : styles.modal__form_phone_control_selectCountry_arrow
                )}
              >
                <ArrowDropdown />
              </span>
            </button>
            <InputMask
              mask={mask}
              value={phoneNumber}
              onChange={handleBuyerChange}
              className={styles.modal__form_phone_control_input}
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
            <div className={styles.modal__form_phone_dropdown}>
              {countryOptions}
            </div>
          )}
        </div>

        <button className={cn(styles.modal__button, "button")} type="submit">
          Восстановить
        </button>
      </form>
      <div className={styles.modal__more_buttons}>
        <button
          className={cn(styles.modal__more_button, "button")}
          onClick={() => setView("login")}
        >
          Войти
        </button>
        <button
          className={cn(styles.modal__more_button, "button")}
          onClick={() => setView("registration")}
        >
          Регистрация
        </button>
      </div>
    </>
  );
};

export default AuthRecovery;
