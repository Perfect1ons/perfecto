"use client";
import React, { useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import InputMask from "react-input-mask";

interface FormProps {
  setView: (view: "login" | "recovery" | "registration") => void;
  close: () => void;
}

const AuthRecovery = ({ setView, close }: FormProps) => {
    const handleSubmit = (event: any) => {
      event.preventDefault();
    };
  return (
    <>
      <p className={styles.modal__text}>
        Введите свой номер телефона. Новый пароль будет отправлен по смс.
      </p>
      <form className={styles.modal__form}>
            <input
              className={styles.modal__input}
              type="text"
              name="phone"
              placeholder="Телефон"
            />

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
