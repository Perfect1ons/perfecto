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
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phone: "", password: "" });
  const validate = () => {
    const errors = { phone: "", password: "" };
    const phoneRegex = /^\+\9\96 \(\d{3}\) \d{2}-\d{2}-\d{2}$/;

    if (!phoneRegex.test(phone)) {
      errors.phone = "Необходимо заполнить «Телефон».";
    }
    if (password.length < 4 || password.length != 0) {
            errors.password =
              "Необходимо заполнить «Пароль»,не менее 6 символов";

    }
    setErrors(errors);

    return !errors.phone && !errors.password;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (validate()) {
      console.log("Форма отправлена", { phone, password });
      // Добавить логику для отправки данных на сервер
    }
  };
  return (
    <>
      <p className={styles.modal__text}>
        Введите номер телефона, мы отправим код или позвоним. Отвечать на звонок
        не нужно. Код может прийти на почту или в СМС
      </p>
      <form className={styles.modal__form}>
        <InputMask
          mask="+\9\96 (999) 99-99-99"
          value={phone}
          onChange={(e: any) => setPhone(e.target.value)}
          onBlur={() => validate()}
        >
          {() => (
            <input
              className={cn(styles.modal__input, {
                [styles.inputError]: errors.phone,
              })}
              type="text"
              name="phone"
              placeholder="Телефон"
            />
          )}
        </InputMask>
        {errors.phone && (
          <span className={styles.errorText}>{errors.phone}</span>
        )}
        <button className={cn(styles.modal__button, "button")} type="submit">
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
