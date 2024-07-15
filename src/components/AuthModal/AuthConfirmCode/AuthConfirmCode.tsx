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

        // Check if the response is OK and if it's JSON
        if (
          response.ok &&
          response.headers.get("Content-Type")?.includes("application/json")
        ) {
          const data: any = await response.json(); // Parse response body as JSON
          if (data.access_token) {
            const accessToken = data.access_token;
            console.log(accessToken);
            // Use accessToken or update state as needed
          } else {
            console.error(
              "Invalid response format - missing access_token:",
              data
            );
            // Handle missing access_token
          }
        } else {
          console.error("Invalid response format:", response);
          // Handle unexpected response format
        }
      } catch (error) {
        console.error("Error confirming code:", error);
        // Handle error, show message, etc.
      }
    }
  };

  return (
    <>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <p>Введите код, который мы отправили вам по SMS:</p>
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
            // type="submit"
          >
            Подвердить
          </button>
        </div>
        {warning && <p style={{ color: "red" }}>{warning}</p>}
      </form>
    </>
  );
};

export default AuthConfirmCode;
