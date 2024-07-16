"use client";
import styles from "./style.module.scss";
import React, { useRef, useState } from "react";
import cn from "clsx";
import { postConfirmCode } from "@/api/clientRequest";
import { Country } from "../AuthRegistration/AuthRegistration";
interface FormProps {
  setView: (view: "login" | "recovery" | "registration" | "confirm") => void;
  close: () => void;
  phoneNumber: string;
  currentCodeCountry: Country;
}

const AuthConfirmCode = ({
  close,
  setView,
  phoneNumber,
  currentCodeCountry,
}: FormProps) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [warning, setWarning] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [invalidCodeMessage, setInvalidCodeMessage] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([
    null,
    null,
    null,
    null,
  ]); // Ref для хранения ссылок на инпуты

  const handleChange = (index: number, value: string) => {
    if (value.length > 1 || !/^\d$/.test(value)) return; // Не даем ввести больше одной цифры в инпут и только цифры

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      // Если введена цифра и это не последний инпут, переводим фокус на следующий инпут
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      if (code[index]) {
        // Если в инпуте есть значение, удаляем его
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // Если инпут пустой, удаляем значение из предыдущего инпута и переводим фокус на него
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (!/^\d$/.test(event.key)) {
      // Если нажатая клавиша не цифра, предотвращаем ввод
      event.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code.some((field) => field === "")) {
      setWarning("Пожалуйста, заполните все поля кода.");
    } else {
      setWarning("");
      const confirmationCode = code.join("");
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
      // const token = postConfirmCode(cleanedPhoneNumber, confirmationCode);
      // console.log(token);
      try {
        const response = await postConfirmCode(
          cleanedPhoneNumber,
          confirmationCode
        );
        if (
          response.ok &&
          response.headers.get("Content-Type")?.includes("application/json")
        ) {
          const data: any = await response.json(); // Parse response body as JSON
          if (data.access_token) {
            const accessToken = data.access_token;
            await fetch("/api/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ accessToken: accessToken }), // Отправляем токен как accessToken
            });
            close();
            window.location.reload();
          } else {
            console.error(
              "Invalid response format - missing access_token:",
              data
            );
          }
        } else {
          console.error("Invalid response format:", response);
          handleInvalidCodeAttempt();
        }
      } catch (error) {
        console.error("Error confirming code:", error);
        handleInvalidCodeAttempt();
        // Handle error, show message, etc.
      }
    }
  };
  const handleInvalidCodeAttempt = () => {
    setAttemptCount((prevCount) => prevCount + 1);

    if (attemptCount >= 2) {
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
        setAttemptCount(0);
      }, 300000); // 5 minutes in milliseconds
    }

    setInvalidCodeMessage("Неправильный код. Попробуйте снова.");
  };

  return (
    <>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <p>Введите код, который мы отправили вам в SMS:</p>
        <div className={styles.containerConfirm}>
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              className={styles.inputConfirm}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              autoFocus={index === 0}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
            />
          ))}
        </div>
        <div className={styles.modalButtons}>
          <button
            className={cn(styles.modalButton, "button")}
            aria-label="confirm the confirmation code"
            disabled={isButtonDisabled}
            // type="submit"
          >
            Подвердить
          </button>
        </div>
        {warning && <p style={{ color: "red" }}>{warning}</p>}
        {invalidCodeMessage && (
          <p style={{ color: "red" }}>{invalidCodeMessage}</p>
        )}
      </form>
    </>
  );
};

export default AuthConfirmCode;
