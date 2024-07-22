"use cliet";
import React, { useState } from "react";
import styles from "./style.module.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { postLoginCode } from "@/api/clientRequest";
import { Country } from "../AuthModal";

interface IAuthRecaptchaProps {
  setView: (view:  "registration" | "confirm" | "captcha") => void;
  phoneNumber: string;
  currentCodeCountry: Country;
}
const AuthRecaptcha = ({
  setView,
  currentCodeCountry,
  phoneNumber,
}: IAuthRecaptchaProps) => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleCaptchaChange = async (token: string | null) => {
    setCaptchaToken(token);
    if (token) {
      setError("");

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
        console.log(
          "Phone number length is incorrect for the selected country."
        );
        return;
      }

      try {
        await postLoginCode(cleanedPhoneNumber);
        setView("confirm");
      } catch (error) {
        console.error("Failed to send login code:", error);
        setError("Failed to send login code. Please try again.");
      }
    } else {
      setError("Пройдите «Капчу».");
    }
  };

  return (
    <div>
      <div className={styles.reCaptcha}>
        <ReCAPTCHA
          sitekey="6LeyWSMUAAAAAHYqeoWK4VqFVJPyo8KetjDl7l6C"
          onChange={handleCaptchaChange}
        />
      </div>
      {error && <p className={styles.reCaptcha_warning}>{error}</p>}
    </div>
  );
};

export default AuthRecaptcha;
