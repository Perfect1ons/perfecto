"use client";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import {
  ArrowDropdown,
  CheckIcon,
  WarningIcon,
} from "../../../../public/Icons/Icons";
import Image from "next/image";
import InputMask from "react-input-mask";

interface FormProps {
  setView: (view: "login" | "registration" | "confirm" | "captcha") => void;
  close: () => void;
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

const AuthForm = ({ setView, close }: FormProps) => {
  const [isRemember, setIsRemember] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [warning, setWarning] = useState("");

  const [visible, setVisible] = useState("");

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
    setVisible((prevVisible) => (prevVisible === current ? "" : current));
  }, []);

  const handleBuyerChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNumber(value);
  }, []);

  const AnonimHandler = () => {
    setIsRemember(!isRemember);
  };


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Remove non-numeric characters from phone number
    const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

    // Check for empty field or incomplete phone number
    if (!numericPhoneNumber) {
      setWarning("Это поле не может быть пустым.");
      return;
    } else if (numericPhoneNumber.length < 11) {
      setWarning("Номер введен не полностью.");
      return;
    }

    setWarning("");
  };

  const codeCountryHandler = useCallback((country: CountryKey) => {
    const selectedCountry = codesCountry[country];
    setCurrentCodeCountry(selectedCountry);
    setPhoneNumber(`+${selectedCountry.code}`);
    setMask(getMaskForCountry(selectedCountry.code));
    setVisible("");
  }, []);

  const countryOptions = useMemo(() => {
    return Object.entries(codesCountry).map(([key, country]) => (
      <button
        key={key}
        onClick={() => codeCountryHandler(key as CountryKey)}
        className={styles.modal__form_phone_dropdown_button}
      >
        <Image
          className={styles.modal__form_phone_dropdown_button_img}
          src={country.img}
          width={30}
          height={30}
          alt={country.name}
        />
        {country.name}
        <span className={styles.modal__form_phone_dropdown_button_code}>
          +{country.code}
        </span>
      </button>
    ));
  }, [codeCountryHandler]);

  return (
    <div className={styles.modal}>
      <p className={styles.modal__text}>
        Войдите в свой аккаунт или зарегистрируйтесь, чтобы делать покупки,
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
                  type="text"
                  placeholder="Телефон"
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

        <button
          // onClick={() => setView("captcha")}
          // disabled={!warning}
          aria-label="go to enter"
          type="submit"
          className={cn(styles.modal__button, "button")}
        >
          Войти
        </button>
      </form>

      <div className={styles.modal__rememberMe}>
        <button
          className={styles.modal__rememberMe_btn}
          onClick={AnonimHandler}
        >
          <span
            className={cn(styles.modal__rememberMe_check, {
              [styles.modal__rememberMe_checkActive]: isRemember,
            })}
          >
            {isRemember && <CheckIcon />}
          </span>
          <span className={styles.modal__rememberMe_text}>Запомнить</span>
        </button>
      </div>

      <button
        className={cn(styles.modal__more_button, "button")}
        onClick={() => setView("registration")}
        aria-label="go to registration"
      >
        Регистрация
      </button>
    </div>
  );
};

export default AuthForm;
