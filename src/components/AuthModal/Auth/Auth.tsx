"use client";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import { ArrowDropdown, WarningIcon } from "../../../../public/Icons/Icons";
import Image from "next/image";
import InputMask from "react-input-mask";
import { postLoginCode } from "@/api/clientRequest";

interface FormProps {
  setView: (view: "login" | "registration" | "confirm" | "captcha") => void;
  close: () => void;
  phoneNumber: string;
  handleBuyerChange: (e: ChangeEvent<HTMLInputElement>) => void;
  countryOptions: any;
  mask: any;
  currentCodeCountry: Country;
  visible: string;
  visibleHandler: (current: string) => void;
}

interface Country {
  code: number;
  img: string;
  name: string;
}
const AuthForm = ({
  setView,
  close,
  handleBuyerChange,
  countryOptions,
  currentCodeCountry,
  mask,
  phoneNumber,
  visible,
  visibleHandler,
}: FormProps) => {
  const [warning, setWarning] = useState("");
  // const [warning, setWarning] = useState("");
  // const checkStatus = async (tel: number) => {
  //   try {
  //     const fetchStatus = await checkUser(tel);
  //     if (fetchStatus) {
  //       setStatus(fetchStatus);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //   }
  // };

  const handleSubmitCode = (event: any) => {
    event.preventDefault();
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

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

    if (cleanedPhoneNumber.length !== expectedLength) {
      console.log("Phone number length is incorrect for the selected country.");
      setWarning("Пожалуйста, заполните поле.");

      return;
    }
    postLoginCode(cleanedPhoneNumber);
    // setView("confirm");
    setWarning("");
    // try {
    //   checkStatus(parseInt(cleanedPhoneNumber));
    //   if (status == 0) {
    //     postLoginCode(cleanedPhoneNumber);
    //     setView("confirm");
    //     setWarning("");
    //   } else {
    //     setWarning("Такой пользователь уже сущетсвует");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Remove non-numeric characters from phone number
    const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

    // Check for empty field or incomplete phone number
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

    if (numericPhoneNumber.length !== expectedLength) {
      setWarning("Номер введен не полностью.");
      return;
    } else if (!numericPhoneNumber) {
      setWarning("Это поле не может быть пустым.");
      return;
    }
    setView("captcha");
    setWarning("");
  };

  return (
    <div className={styles.modal}>
      <p className={styles.modal__text}>
        Войдите в свой аккаунт или создайте профиль, чтобы делать покупки,
        отслеживать заказы, добавлять в избранное и получать персональные
        скидки.
      </p>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <div className={styles.modal__form_phone}>
          <div className={styles.modal__form_phone_control}>
            <InputMask
              mask={mask}
              value={phoneNumber}
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

            {warning && (
              <span className={styles.warning__icon}>
                <WarningIcon />
              </span>
            )}
          </div>

          {visible === "country" && (
            <div className={styles.modal__form_phone_dropdown}>
              {countryOptions}
            </div>
          )}
        </div>
        {warning && <span className={styles.warning}>{warning}</span>}
        <div className={styles.mail__label}>
          <input className={styles.mail__inputField} type="text" />
          <label className={styles.mail__inputLabel}>Почта</label>
        </div>

        <button
          onClick={handleSubmitCode}
          // onClick={() => setView("captcha")}
          // disabled={!warning}
          aria-label="go to enter"
          type="submit"
          className={cn(styles.modal__button, "button")}
        >
          Получить код
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
