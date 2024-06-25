"use client";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import cn from "clsx";
import styles from "./style.module.scss";
import { CheckIcon } from "../../../../public/Icons/Icons";

interface FormProps {
  setView: (view: "login" | "recovery" | "registration") => void;
  close: () => void;
}

const AuthForm = ({ setView, close }: FormProps) => {
  const [isAnonim, setIsAnonim] = useState(false);
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const AnonimHandler = () => {
    setIsAnonim(!isAnonim);
  };

  return (
    <div className={styles.modal}>
      <p className={styles.modal__text}>
        Войдите в свой аккаунт или зарегистрируйтесь, чтобы делать покупки,
        отслеживать заказы, получать персональные скидки.
      </p>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
            <input
              className={styles.modal__input}
              type="text"
              name="phone"
              placeholder="Телефон"
            />

        <button type="submit" className={cn(styles.modal__button, "button")}>
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
              [styles.modal__rememberMe_checkActive]: isAnonim,
            })}
          >
            {isAnonim && <CheckIcon />}
          </span>
          <span className={styles.modal__rememberMe_text}>Запомнить</span>
        </button>
      </div>
      <div className={styles.modal__more_buttons}>
        <button
          className={cn(styles.modal__more_button, "button")}
          onClick={() => setView("registration")}
        >
          Регистрация
        </button>
        <button
          className={cn(styles.modal__more_button, "button")}
          onClick={() => setView("recovery")}
        >
          Напомнить пароль
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
