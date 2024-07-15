"use client";
import cn from "clsx";
import styles from "./style.module.scss";
import { ArrowDropdown } from "../../../../public/Icons/Icons";
import Image from "next/image";
import InputMask from "react-input-mask";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { postLoginCode } from "@/api/clientRequest";
interface FormProps {
  setView: (view: "login" | "recovery" | "registration" | "confirm") => void;
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

const AuthRegistration = ({ setView, close }: FormProps) => {
  const [visible, setVisible] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const handleBuyerChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNumber(value);
  }, []);

  const handleSubmit = (event: any) => {
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
      return;
    }

    postLoginCode(cleanedPhoneNumber);
    setView("confirm");
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
    <>
      <p className={styles.modal__text}>
        Введите номер телефона, мы отправим код или позвоним. Отвечать на звонок
        не нужно. Код может прийти на почту или в СМС
      </p>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
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
        <button
          onClick={handleSubmit}
          className={cn(styles.modal__button, "button")}
          aria-label="go to registration"
          type="submit"
        >
          Регистрация
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
          onClick={() => setView("recovery")}
        >
          Напомнить пароль
        </button>
      </div>
    </>
  );
};

export default AuthRegistration;
