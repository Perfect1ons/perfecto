"use client";
import Image from "next/image";
import {
  ArrowDropdown,
  DeliveryIcon,
  ExPoint,
} from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { useState, ChangeEvent, useCallback, useMemo } from "react";
import cn from "clsx";
import InputMask from "react-input-mask";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface Buyer {
  phone: string;
  surname: string;
  name: string;
}

interface Country {
  code: number;
  img: string;
  name: string;
}

const codesCountry: Record<string, Country> = {
  kg: { code: 996, img: "/img/kgFlag.svg", name: "Кыргызстан" },
  ru: { code: 7, img: "/img/ruFlag.svg", name: "Россия" },
  kz: { code: 7, img: "/img/kzFlag.svg", name: "Казахстан" },
};

type CountryKey = keyof typeof codesCountry;

const BasketOrder = () => {
  const [visible, setVisible] = useState<{ [key: string]: boolean }>({});
  const [nds, setNds] = useState<boolean>(false);
  const [buyer, setBuyer] = useState<Buyer>({
    phone: `+${codesCountry.kg.code}`,
    surname: "",
    name: "",
  });

  const cart = useSelector((state: RootState) => state.cart.cart);

  const { totalQuantity, totalPrice } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        const quantity = item.quantity || 0;
        const price = item.price || 0;
        acc.totalQuantity += quantity;
        acc.totalPrice += quantity * price;
        return acc;
      },
      { totalQuantity: 0, totalPrice: 0 }
    );
  }, [cart]);

  const [currentCodeCountry, setCurrentCodeCountry] = useState<Country>(
    codesCountry.kg
  );

  const getMaskForCountry = (code: number) => {
    switch (code) {
      case 996:
        return "\\+\\9\\96 (999) 99-99-99";
      case 7:
        return "\\+\\7 (999) 999-99-99";
      default:
        return "\\+\\9\\96 (999) 99-99-99";
    }
  };

  const [mask, setMask] = useState(getMaskForCountry(currentCodeCountry.code));

  const visibleHandler = useCallback((key: string) => {
    setVisible((prevVisible) => ({
      ...prevVisible,
      [key]: !prevVisible[key],
    }));
  }, []);
  const ndsHandler = useCallback(() => {
    setNds((prevNds) => !prevNds);
  }, []);

  const handleBuyerChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyer((prevBuyer) => ({
      ...prevBuyer,
      [name]: value,
    }));
  }, []);

  const codeCountryHandler = useCallback((country: CountryKey) => {
    const selectedCountry = codesCountry[country];
    setCurrentCodeCountry(selectedCountry);
    setBuyer((prevBuyer) => ({
      ...prevBuyer,
      phone: `+${selectedCountry.code}`,
    }));
    setMask(getMaskForCountry(selectedCountry.code));
    setVisible({});
  }, []);

  const orderHandler = useCallback(() => {
    // Order processing logic here
  }, []);

  const countryOptions = useMemo(() => {
    return Object.entries(codesCountry).map(([key, country]) => (
      <button
        key={key}
        onClick={() => codeCountryHandler(key as CountryKey)}
        className={styles.wrap_phone_dropdown_button}
      >
        <Image
          className={styles.wrap_phone_dropdown_button_img}
          src={country.img}
          width={30}
          height={30}
          alt={country.name}
        />
        {country.name}
        <span className={styles.wrap_phone_dropdown_button_code}>
          +{country.code}
        </span>
      </button>
    ));
  }, [codeCountryHandler]);

  return (
    <section>
      <h1>Переделывайте тут все</h1>
    </section>
  );
};

export default BasketOrder;
