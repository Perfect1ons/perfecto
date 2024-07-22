"use client";
import cn from "clsx";
import styles from "./style.module.scss";
import { ArrowDropdown } from "../../../../public/Icons/Icons";
import Image from "next/image";
import InputMask from "react-input-mask";
import { ChangeEvent, useState } from "react";
import { checkUser, postLoginCode } from "@/api/clientRequest";
export interface Country {
  code: number;
  img: string;
  name: string;
}

interface FormProps {
  phoneNumber: string;
  handleBuyerChange: (e: ChangeEvent<HTMLInputElement>) => void;
  countryOptions: any;
  mask: any;
  currentCodeCountry: Country;
  visible: string;
  setView: (view: "registration" | "confirm" | "captcha") => void;
  close: () => void;
  visibleHandler: (current: string) => void;
}

const AuthRegistration = ({
  setView,
  phoneNumber,
  handleBuyerChange,
  currentCodeCountry,
  mask,
  visible,
  countryOptions,
  visibleHandler,
}: FormProps) => {
  const [warning, setWarning] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const isValidPhoneNumber = (phoneNumber: string, mask: string): boolean => {
    const phoneRegex = new RegExp(`^${mask}$`);
    return phoneRegex.test(phoneNumber);
  };

  const checkStatus = async (tel: number) => {
    try {
      const fetchStatus = await checkUser(tel);
      if (fetchStatus) {
        setStatus(fetchStatus);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

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
      setWarning("Пожалуйста, заполните поле.");

      return;
    }
    postLoginCode(cleanedPhoneNumber);
    setView("confirm");
    setWarning("");

  };

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
                  autoComplete="off"
                  {...inputProps}
                  name="phone"
                  type="text"
                  placeholder="Телефон"
                />
              )}
            </InputMask>
          </div>
          {warning && <p className={styles.warning}>{warning}</p>}

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
    </>
  );
};

export default AuthRegistration;
