"use client";
import styles from "./style.module.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import cn from "clsx";
import {
  checkUser,
  deleteAllTovars,
  getPersonalDataProfileClient,
  postAuthedTovar,
  postConfirmCode,
  postLoginCode,
} from "@/api/clientRequest";
import { useRouter } from "next/navigation";
import { Country } from "../AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { AuthContext } from "@/context/AuthContext";
interface FormProps {
  setView: (view: "registration" | "confirm" | "captcha") => void;
  close: () => void;
  phoneNumber: string;
  currentCodeCountry: Country;
}

const AuthConfirmCode = ({
  close,
  phoneNumber,
  currentCodeCountry,
}: FormProps) => {
  const dispatch = useDispatch();

  const { cartId } = useContext(AuthContext);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [items, setItems] = useState<any[]>(cart);
  useEffect(() => {
    updateCartItems(cart);
  }, [cart, dispatch]);

  const updateCartItems = (newItems: any[]) => {
    setItems((prevItems) => {
      const itemsMap = new Map<number, any>();

      newItems.forEach((item) => {
        itemsMap.set(item.id_tov, item);
      });

      const updatedItems = Array.from(itemsMap.values());

      return updatedItems;
    });
  };

  const [code, setCode] = useState(["", "", "", ""]);
  const [warning, setWarning] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [invalidCodeMessage, setInvalidCodeMessage] = useState("");
  const [timer, setTimer] = useState(0); // Добавляем состояние для таймера
  const [canResend, setCanResend] = useState(false); // Флаг для кнопки повторной отправки
  const [status, setStatus] = useState<number | null>(null);
  const lastFocusedIndex = useRef<number | null>(null);
  const router = useRouter();
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
      lastFocusedIndex.current = index + 1;
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
        lastFocusedIndex.current = index - 1;
      }
    } else if (!/^\d$/.test(event.key)) {
      // Если нажатая клавиша не цифра, предотвращаем ввод
      event.preventDefault();
    }
  };

  const checkStatus = async (tel: number) => {
    try {
      const fetchStatus = await checkUser(tel);
      if (fetchStatus) {
        setStatus(fetchStatus);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

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
        try {
          checkStatus(parseInt(cleanedPhoneNumber));
          if (status == 0) {
            setStatus(0);
          } else {
            setStatus(1);
          }
        } catch (error) {
          console.log(error);
        }
        if (
          response.ok &&
          response.headers.get("Content-Type")?.includes("application/json")
        ) {
          const data: any = await response.json();
          const userInfo = await getPersonalDataProfileClient(
            data.access_token
          );
          for (const tovar of items) {
            await postAuthedTovar(
              data.access_token,
              tovar.id_tov,
              tovar.quantity
            );
          }

          await new Promise((resolve) => setTimeout(resolve, 30000));
          deleteAllTovars(cartId, cart.map((item) => item.id_tov).join(","));

          if (data.access_token && userInfo.id) {
            const accessToken = data.access_token;
            const userId = userInfo.id;
            await fetch("/api/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ accessToken, userId }),
            });
            setLoading(false);
            close();
            if (status == 0) {
              router.push("/profile/lk");
            } else {
              window.location.reload();
            }
          } else {
            setLoading(false);
            handleInvalidCodeAttempt();
          }
        } else {
          setLoading(false);

          handleInvalidCodeAttempt();
        }
      } catch (error) {
        setLoading(false);
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
  useEffect(() => {
    if (code.every((field) => field !== "")) {
      setLoading(true);
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
  useEffect(() => {
    if (!loading && lastFocusedIndex.current !== null) {
      inputRefs.current[lastFocusedIndex.current]?.focus();
    }
  }, [loading]);
  if (invalidCodeMessage) {
    setTimeout(() => {
      setInvalidCodeMessage("");
    }, 5000);
  }

  return (
    <>
      {loading ? (
        <div className={styles.loader__container}>
          <div className={styles.loader}></div>
        </div>
      ) : (
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
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                autoFocus={index === 0}
              />
            ))}
          </div>
          {invalidCodeMessage && (
            <p style={{ color: "red" }}>{invalidCodeMessage}</p>
          )}
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
                Подтвердить
              </button>
            )}
          </div>
          {isButtonDisabled && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              Вы превысили лимит попыток. Попробуйте снова через {timer}s.
            </p>
          )}

          {warning && <p style={{ color: "red" }}>{warning}</p>}
        </form>
      )}
    </>
  );
};

export default AuthConfirmCode;
