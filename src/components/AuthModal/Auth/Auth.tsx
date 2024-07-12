"use client";
import React, { useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import { CheckIcon } from "../../../../public/Icons/Icons";
import { useRouter } from "next/navigation";

interface FormProps {
  setAuthStatus?: (isAuthed: boolean) => void;
  setView: (view: "login" | "recovery" | "registration") => void;
  close: () => void;
}

const AuthForm = ({ setAuthStatus, setView, close }: FormProps) => {
  const [isAnonim, setIsAnonim] = useState(false);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const AnonimHandler = () => {
    setIsAnonim(!isAnonim);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/jlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/profile");
        if (setAuthStatus) {
          setAuthStatus(true);
        }
        close();
      }
    } catch (error) {
      console.log("An error occurred");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className={styles.modal}>
      <p className={styles.modal__text}>
        Войдите в свой аккаунт или зарегистрируйтесь, чтобы делать покупки,
        отслеживать заказы, добавлять в избранное и получать персональные
        скидки.
      </p>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <input
          className={styles.modal__input}
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          name="phone"
          placeholder="Телефон"
        />
        <button
          aria-label="go to enter "
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
          aria-label="go to registration"
        >
          Регистрация
        </button>
        <button
          className={cn(styles.modal__more_button, "button")}
          onClick={() => setView("recovery")}
          aria-label="remind me of the password"
        >
          Напомнить пароль
        </button>
      </div>
    </div>
  );
};

export default AuthForm;