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
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phone: "", password: "" });

  const validate = () => {
    const errors = { phone: "", password: "" };
    const phoneRegex = /^\+\9\96 \(\d{3}\) \d{2}-\d{2}-\d{2}$/;

    if (!phoneRegex.test(phone)) {
      errors.phone = "Необходимо заполнить «Телефон».";
    }
    if (password.length < 6) {
      errors.password = "Необходимо заполнить «Пароль»,не менее 6 символов";
    }
    setErrors(errors);

    return !errors.phone && !errors.password;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (validate()) {
      console.log("Форма отправлена", { phone, password });
    }
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
