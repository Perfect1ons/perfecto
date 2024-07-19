"use client";
import styles from "./style.module.scss";
import React, { useEffect, useRef, useState } from "react";
import cn from "clsx";
import {
  getPersonalDataProfileClient,
  postConfirmCode,
  postLoginCode,
} from "@/api/clientRequest";
import { Country } from "../AuthRegistration/AuthRegistration";
interface FormProps {
  setView: (view: "login" |  "registration" | "confirm") => void;
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
  const [timer, setTimer] = useState(0); // Добавляем состояние для таймера
  const [canResend, setCanResend] = useState(false); // Флаг для кнопки повторной отправки
  const inputRefs = useRef<Array<HTMLInputElement | null>>([
    null,
    null,
    null,
    null,
  ]);
  useEffect(() => {
    if (isButtonDisabled) {
      setCanResend(false);
      setTimer(60); // Устанавливаем таймер на 60 секунд

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true); // Разрешаем повторную отправку после завершения таймера
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isButtonDisabled]);
  const handleResendCode = async () => {
    setCanResend(false);
    setIsButtonDisabled(false);
    // Тут можно добавить запрос на повторную отправку кода, например:
    // await sendVerificationCode(phoneNumber);
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    let expectedLength = 0;
    switch (currentCodeCountry.code) {
      case 996:
        expectedLength = 12;
        break;
      case 7:
        expectedLength = 11;
        break;
      default:
        expectedLength = 12;
        break;
    }

    if (cleanedPhoneNumber.length !== expectedLength) {
      console.log("Phone number length is incorrect for the selected country.");
      setWarning("Пожалуйста, заполните поле.");

      return;
    }
    setWarning("");
    postLoginCode(cleanedPhoneNumber);
  };

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
      try {
        const response = await postConfirmCode(
          cleanedPhoneNumber,
          confirmationCode
        );
        if (
          response.ok &&
          response.headers.get("Content-Type")?.includes("application/json")
        ) {
          const data: any = await response.json();
          const userInfo = await getPersonalDataProfileClient(
            data.access_token
          );

          if (data.access_token && userInfo.id) {
            const accessToken = data.access_token;
            const userId = userInfo.id; // Get userId from response
            await fetch("/api/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ accessToken, userId }), // Send both accessToken and userId
            });
            close();
            window.location.reload();
          } else {
            handleInvalidCodeAttempt();
          }
        } else {
          handleInvalidCodeAttempt();
        }
      } catch (error) {
        handleInvalidCodeAttempt();
      }
    }
  };

  const handleInvalidCodeAttempt = () => {
    setAttemptCount((prevCount) => prevCount + 1);

    if (attemptCount === 3) {
      setIsButtonDisabled(true);
      setCode(["", "", "", ""]);
      setTimeout(() => {
        setIsButtonDisabled(false);
        setAttemptCount(0);
      }, 300000); // 5 minutes in milliseconds
    }

    setInvalidCodeMessage("Неправильный код. Попробуйте снова.");
  };
  if (invalidCodeMessage) {
    setTimeout(() => {
      setInvalidCodeMessage("");
    }, 5000);
  }

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
          {canResend ? (
            <button
              className={cn(styles.modalButton, "button")}
              onClick={handleResendCode}
              aria-label="resend verification code"
            >
              Отправить код повторно
            </button>
          ) : (
            <button
              className={cn(styles.modalButton, "button")}
              aria-label="confirm the confirmation code"
              disabled={isButtonDisabled}
              // type="submit"
            >
              Подвердить
            </button>
          )}
        </div>
        {isButtonDisabled && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            Вы превысили лимит попыток. Попробуйте снова через {timer}s.
          </p>
        )}

        {warning && <p style={{ color: "red" }}>{warning}</p>}
        {invalidCodeMessage && (
          <p style={{ color: "red" }}>{invalidCodeMessage}</p>
        )}
      </form>
    </>
  );
};

export default AuthConfirmCode;
