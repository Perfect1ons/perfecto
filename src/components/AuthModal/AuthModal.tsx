"use client";
import React, { useState, useEffect } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import { XMark } from "../../../public/Icons/Icons";
import AuthForm from "./Auth/Auth";
import AuthRecovery from "./AuthRecovery/AuthRecovery";
import AuthRegistration from "./AuthRegistration/AuthRegistration";
import AuthBackdrop from "./AuthBackdrop/AuthBackdrop";

interface ModalProps {
  isVisible: boolean;
  close: () => void;
}

const AuthModal = ({ isVisible, close }: ModalProps) => {
  const [view, setView] = useState<"login" | "recovery" | "registration">(
    "login"
  );

  useEffect(() => {
    if (!isVisible) {
      setView("login");
    }
  }, [isVisible]);

  const renderFormContent = () => {
    switch (view) {
      case "login":
        return {
          title: "Войти",
          content: <AuthForm setView={setView} close={close} />,
        };
      case "recovery":
        return {
          title: "Восстановление",
          content: <AuthRecovery setView={setView} close={close} />,
        };
      case "registration":
        return {
          title: "Регистрация",
          content: <AuthRegistration setView={setView} close={close} />,
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
