"use client";
import React, { useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import InputMask from "react-input-mask";
interface FormProps {
  setView: (view: "login" | "recovery" | "registration") => void;
  close: () => void;
}

const AuthRegistration = ({ setView, close }: FormProps) => {


  const handleSubmit = (event: any) => {
    event.preventDefault();

  };
  return (
    <>
      <p className={styles.modal__text}>
        Введите номер телефона, мы отправим код или позвоним. Отвечать на звонок
        не нужно. Код может прийти на почту или в СМС
      </p>
      <form className={styles.modal__form}>
            <input
              className={styles.modal__input}
              type="text"
              name="phone"
              placeholder="Телефон"
            />
        <button className={cn(styles.modal__button, "button")} aria-label="go to registration" type="submit">
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
