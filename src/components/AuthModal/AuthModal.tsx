"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useMemo,
} from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import { XMark } from "../../../public/Icons/Icons";
import AuthForm from "./Auth/Auth";
import AuthBackdrop from "./AuthBackdrop/AuthBackdrop";
import AuthConfirmCode from "./AuthConfirmCode/AuthConfirmCode";
import Image from "next/image";
import AuthRecaptcha from "./AuthRecaptcha/AuthRecaptcha";

interface ModalProps {
  isVisible: boolean;
  close: () => void;
}
export interface Country {
  code: number;
  img: string;
  name: string;
}
const codesCountry: Record<string, Country> = {
  kg: { code: 996, img: "/img/kgFlag.svg", name: "Кыргызстан" },
  ru: { code: 7, img: "/img/ruFlag.svg", name: "Россия" },
  kz: { code: 7, img: "/img/kzFlag.svg", name: "Казахстан" },
};

export type CountryKey = keyof typeof codesCountry;
const AuthModal = ({ isVisible, close }: ModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visible, setVisible] = useState<string>("");
  const [currentCodeCountry, setCurrentCodeCountry] = useState<Country>(
    codesCountry.kg
  );

  const handleBuyerChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNumber(value);
  }, []);
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

  const [view, setView] = useState<
    "login" | "registration" | "confirm" | "captcha"
  >("login");

  useEffect(() => {
    if (!isVisible) {
      setView("login");
    }
  }, [isVisible]);

  const renderFormContent = () => {
    switch (view) {
      case "login":
        return {
          title: "Войти или создать профиль",
          content: (
            <AuthForm
              visibleHandler={visibleHandler}
              countryOptions={countryOptions}
              currentCodeCountry={currentCodeCountry}
              visible={visible}
              handleBuyerChange={handleBuyerChange}
              mask={mask}
              phoneNumber={phoneNumber}
              setView={setView}
              close={close}
            />
          ),
        };
      case "confirm":
        return {
          title: "Код подтверждения",
          content: (
            <AuthConfirmCode
              currentCodeCountry={currentCodeCountry}
              phoneNumber={phoneNumber}
              setView={setView}
              close={close}
            />
          ),
        };
      case "captcha":
        return {
          title: "Подтвердите что вы не робот",
          content: (
            <AuthRecaptcha
              currentCodeCountry={currentCodeCountry}
              phoneNumber={phoneNumber}
              setView={setView}
            />
          ),
        };
      default:
        return { title: "", content: null };
    }
  };

  const { title, content } = renderFormContent();

  return (
    <>
      <AuthBackdrop isVisible={isVisible} close={close} />

      <div className={cn(styles.modal, isVisible && styles.show)}>
        <div className={styles.modal__intro}>
          <p className={styles.modal__title}>{title}</p>
          <button className={styles.modal__exit} onClick={close}>
            <XMark />
          </button>
        </div>
        {content}
      </div>
    </>
  );
};

export default AuthModal;
