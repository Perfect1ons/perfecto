"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./style.module.scss";
import cn from "clsx";

const ChangePassword = () => {
  const [changePassword, setChangePassword] = useState({
    newPassword: "",
    repeatPassword: "",
  });

  const [warning, setWarning] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validatePasswordStrength = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (changePassword.newPassword === changePassword.repeatPassword) {
      if (validatePasswordStrength(changePassword.newPassword)) {
        setWarning("");
        console.log("Password change request submitted", changePassword);
        setChangePassword({ newPassword: "", repeatPassword: "" });
      } else {
        setWarning("Новый пароль должен быть не менее 8 символов.");
      }
    } else {
      setWarning("Пароли не совпадают.");
    }
  };

  return (
    <div className={styles.wrap}>
      <p className={styles.wrap__title}>Смена пароля</p>
      <form className={styles.wrap_form} onSubmit={handleSubmit}>
        <div className={styles.wrap_form_inputWrapNew}>
          <p className={styles.wrap_form_inputWrapNew__text}>Изменить пароль</p>
          <input
            type="password"
            name="newPassword"
            className={cn(
              warning
                ? styles.wrap_form_inputWrapNew__input__warning
                : styles.wrap_form_inputWrapNew__input
            )}
            value={changePassword.newPassword}
            onChange={handleChange}
          />
          {warning && (
            <p className={styles.wrap_form_inputWrapNew__warning}>{warning}</p>
          )}
        </div>
        <div className={styles.wrap_form_inputWrapRep}>
          <p className={styles.wrap_form_inputWrapRep__text}>
            Повторите пароль
          </p>
          <input
            type="password"
            name="repeatPassword"
            className={cn(
              warning
                ? styles.wrap_form_inputWrapRep__input__warning
                : styles.wrap_form_inputWrapRep__input
            )}
            value={changePassword.repeatPassword}
            onChange={handleChange}
          />
          {warning && (
            <p className={styles.wrap_form_inputWrapRep__warning}>{warning}</p>
          )}
        </div>
        <button type="submit" className={styles.wrap_form__submit}>
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
