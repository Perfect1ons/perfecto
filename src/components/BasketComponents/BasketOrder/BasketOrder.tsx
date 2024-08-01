"use client";
import Image from "next/image";
import {
  ApproveIcon,
  ArrowDropdown,
  DeliveryIcon,
  ExPoint,
} from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { useState, ChangeEvent, useCallback, useMemo, useEffect } from "react";
import cn from "clsx";
import InputMask from "react-input-mask";
import ChosingPaymentModal from "./ChosingPaymentModal/ChosingPaymentModal";
import { PaymentMethod } from "@/types/Basket/PaymentMethod";
import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";
import AuthModal from "@/components/AuthModal/AuthModal";
import { Model } from "@/types/Basket/getBasketProduct";
import ChosingDeliveryModal from "./ChosingDeliveryModal/ChosingDeliveryModal";
import { postBoxOrder } from "@/api/clientRequest";
import { useRouter } from "next/navigation";
import { CityFront } from "@/types/Basket/cityfrontType";

export interface Buyer {
  tel: string;
  vid_dost: number | string;
  id_vopl: number | string;
  fio: string;
  name: string;
  org?: string;
  org_inn?: string;
  id_city?: number | null;
  id_city2?: number | null;
  directory?: string;
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

interface IBasketOrderProps {
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  authToken: string | undefined;
  deliveryCity: CityFront;
  currentItems: Model[];
}

const BasketOrder = ({
  paymentMethod,
  deliveryMethod,
  authToken,
  deliveryCity,
  currentItems,
}: IBasketOrderProps) => {
  const [visible, setVisible] = useState<string>("");

  const [regVisible, setRegVisible] = useState(false);

  const regVisibleHandle = () => {
    setRegVisible(false);
  };

  const [variableBuyer, setVariableBuyer] = useState<{
    payment: {
      name: string;
      id: number | string;
    };
    delivery: {
      name: string;
      id: number | string;
    };
  }>({
    payment: {
      name: "",
      id: "",
    },
    delivery: {
      name: "",
      id: "",
    },
  });

  const [location, setLocation] = useState<{
    id_city: {
      name: string;
      id: number | null;
    };
    id_city2: {
      name: string;
      id: number | null;
    };
    directory: {
      street: string;
      house: string;
      apartament: string;
    };
  }>({
    id_city: {
      name: "",
      id: null,
    },
    id_city2: {
      name: "",
      id: null,
    },
    directory: {
      street: "",
      house: "",
      apartament: "",
    },
  });

  const [nds, setNds] = useState<boolean>(true);
  const [buyer, setBuyer] = useState<Buyer>({
    tel: `${codesCountry.kg.code}`,
    vid_dost: variableBuyer.delivery.id,
    id_vopl: variableBuyer.payment.id,
    fio: "",
    name: "",
    org: "",
    org_inn: "",
    id_city: null,
    id_city2: 0,
    directory: "",
  });

  const router = useRouter();
  const [paymentWarning, setPaymentWarning] = useState("");
  const [deliveryWarning, setDeliveryWarning] = useState("");
  const [phoneWarning, setPhoneWarning] = useState("");
  const [surnameWarning, setSurnameWarning] = useState("");
  const [nameWarning, setNameWarning] = useState("");

  //следит за location и при изменении location обновляет buyer.id_city, id_city2, directory
  useEffect(() => {
    setBuyer((prevBuyer) => ({
      ...prevBuyer,
      id_city: location.id_city.id,
      id_city2: location.id_city2.id,
      directory: `${location.directory.street} ${location.directory.house} ${location.directory.apartament}`,
    }));
  }, [location]);

  // Функция для обновления значения city
  const updateCity = (newCity: { name: string; id: number }) => {
    setLocation((prevState) => ({
      ...prevState,
      id_city: newCity,
    }));
  };

  // Функция для обновления значения region
  const updateRegion = (newRegion: { name: string; id: number }) => {
    setLocation((prevState) => ({
      ...prevState,
      id_city2: newRegion,
    }));
  };

  //location.directory values changer function
  const changeAdress = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      directory: {
        ...prevLocation.directory,
        [name]: value,
      },
    }));
  };

  const { totalQuantity, formattedTotalPrice } = useMemo(() => {
    const result = currentItems.reduce(
      (acc, item) => {
        const quantity = item.kol || 0;
        const price = item.price || 0;
        acc.totalQuantity += quantity;
        acc.totalPrice += quantity * price;
        return acc;
      },
      { totalQuantity: 0, totalPrice: 0 }
    );

    const formatNumber = (number: number) => {
      if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + " млрд";
      } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + " млн";
      } else {
        return number.toLocaleString("ru-RU");
      }
    };

    return {
      totalQuantity: formatNumber(result.totalQuantity),
      formattedTotalPrice: formatNumber(result.totalPrice),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItems]);

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

  const visibleHandler = (current: string) => {
    setVisible((prevVisible) => (prevVisible !== current ? current : ""));
  };
  const ndsHandler = () => {
    setNds((prevNds) => !prevNds);
  };

  const handleBuyerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyer((prevBuyer) => ({
      ...prevBuyer,
      [name]: value,
    }));
  };

  const selectPayment = (payment: { name: string; id: string | number }) => {
    setVariableBuyer((prevVariableBuyer) => ({
      ...prevVariableBuyer,
      payment: payment,
    }));
  };

  const selectDelivery = (delivery: { name: string; id: string | number }) => {
    setVariableBuyer((prevVariableBuyer) => ({
      ...prevVariableBuyer,
      delivery: delivery,
    }));
  };

  const savePayment = () => {
    if (variableBuyer.payment) {
      setBuyer((prevBuyer) => ({
        ...prevBuyer,
        id_vopl: variableBuyer.payment.id,
      }));
      activeModalToggle("");
      setPaymentWarning("");
    } else setPaymentWarning("Пожалуйста выберите способ оплаты");
  };

  const saveDelivery = () => {
    if (variableBuyer.delivery) {
      setBuyer((prevBuyer) => ({
        ...prevBuyer,
        vid_dost: variableBuyer.delivery.id,
      }));
      activeModalToggle("");
      setDeliveryWarning("");
    } else {
      setDeliveryWarning("Пожалуйста выберите способ доставки");
    }
  };

  const codeCountryHandler = useCallback((country: CountryKey) => {
    const selectedCountry = codesCountry[country];
    setCurrentCodeCountry(selectedCountry);
    setBuyer((prevBuyer) => ({
      ...prevBuyer,
      phone: `${selectedCountry.code}`,
    }));
    setMask(getMaskForCountry(selectedCountry.code));
    setVisible("");
  }, []);

  const validateBuyerInfo = (): boolean => {
    let isValid = true;

    // Delivery validation
    if (!buyer.vid_dost) {
      setDeliveryWarning("Пожалуйста выберите способ доставки");
      isValid = false;
    } else {
      setDeliveryWarning("");
    }

    // Payment validation
    if (!buyer.id_vopl) {
      setPaymentWarning("Пожалуйста выберите способ оплаты");
      isValid = false;
    } else {
      setPaymentWarning("");
    }

    // Phone number validation
    const numericPhoneNumber = buyer.tel.replace(/\D/g, "");
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

    if (!authToken) {
      if (!numericPhoneNumber) {
        setPhoneWarning("Это поле не может быть пустым.");
        isValid = false;
      } else if (numericPhoneNumber.length !== expectedLength) {
        setPhoneWarning("Номер введен не полностью.");
        isValid = false;
      } else {
        setPhoneWarning("");
      }
    }

    // Surname validation
    if (!buyer.fio && !authToken) {
      setSurnameWarning("Пожалуйста укажите вашу фамилию");
      isValid = false;
    } else {
      setSurnameWarning("");
    }

    // Name validation
    if (!buyer.name && !authToken) {
      setNameWarning("Пожалуйста укажите ваше имя");
      isValid = false;
    } else {
      setNameWarning("");
    }

    return isValid;
  };

  const orderHandler = async () => {
    if (validateBuyerInfo()) {
      if (!authToken) {
        setRegVisible(true);
      } else {
        try {
          const data = await postBoxOrder(
            authToken,
            buyer.tel.replace(/\D/g, ""),
            buyer.vid_dost,
            buyer.id_vopl,
            buyer.fio,
            buyer.name,
            nds,
            buyer.org,
            buyer.org_inn,
            buyer.id_city?.toString(),
            buyer.directory
          );
          router.push(`/profile/orders/${data.id}`);
        } catch (error) {
          console.error("Не удалось получить данные:", error);
        }
      }
    }
  };

  const [activeModal, setActiveModal] = useState("");

  const activeModalToggle = (value: string) => {
    setActiveModal(value);
  };

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
    <>
      {regVisible && (
        <AuthModal isVisible={regVisible} close={regVisibleHandle} />
      )}
      {activeModal === "delivery" && (
        <>
          <ChosingDeliveryModal
            authToken={authToken}
            deliveryCity={deliveryCity}
            variableBuyer={variableBuyer}
            visible={activeModal}
            close={activeModalToggle}
            variants={deliveryMethod}
            selectDelivery={selectDelivery}
            saveDelivery={saveDelivery}
            warning={deliveryWarning}
            location={location}
            cityChange={updateCity}
            regionChange={updateRegion}
            adressChange={changeAdress}
          />
          <div
            onClick={() => activeModalToggle("")}
            className={styles.backdrop}
          ></div>
        </>
      )}
      {activeModal === "payment" && (
        <>
          <ChosingPaymentModal
            variableBuyer={variableBuyer}
            visible={activeModal}
            close={activeModalToggle}
            variants={paymentMethod}
            selectPayment={selectPayment}
            savePayment={savePayment}
            warning={paymentWarning}
          />
          <div
            onClick={() => activeModalToggle("")}
            className={styles.backdrop}
          ></div>
        </>
      )}
      <section className={styles.wrap}>
        <button
          onClick={() => activeModalToggle("delivery")}
          className={cn(
            styles.wrap_delivery,
            buyer.vid_dost && styles.wrap_delivery_success
          )}
        >
          <DeliveryIcon />
          <p className={styles.wrap_delivery_title}>
            {!buyer.vid_dost
              ? "Выберите способ доставки"
              : variableBuyer.delivery.name}
          </p>
          <span
            className={cn(
              styles.wrap_delivery_expoint,
              buyer.vid_dost && styles.wrap_delivery_approve
            )}
          >
            {buyer.vid_dost ? <ApproveIcon /> : <ExPoint />}
          </span>
        </button>
        {deliveryWarning && (
          <p className={styles.wrap_warning}>{deliveryWarning}</p>
        )}
        <button
          onClick={() => activeModalToggle("payment")}
          className={cn(
            styles.wrap_payment,
            buyer.id_vopl && styles.wrap_payment_success
          )}
        >
          <Image
            src="/img/pay_icon.svg"
            width={20}
            height={20}
            alt="pay icon"
          />
          <p className={styles.wrap_payment_title}>
            {!buyer.id_vopl
              ? "Выберите способ оплаты"
              : variableBuyer.payment.name}
          </p>
          <span
            className={cn(
              styles.wrap_payment_expoint,
              buyer.id_vopl && styles.wrap_payment_approve
            )}
          >
            {buyer.id_vopl ? <ApproveIcon /> : <ExPoint />}
          </span>
        </button>
        {paymentWarning && (
          <p className={styles.wrap_warning}>{paymentWarning}</p>
        )}
        {!authToken && (
          <div className="allContainerInput">
            <div className={styles.wrap_phone}>
              <div className={styles.wrap_phone_control}>
                <InputMask
                  mask={mask}
                  value={buyer.tel}
                  onChange={handleBuyerChange}
                  className={styles.auth__input}
                >
                  {(
                    inputProps: React.InputHTMLAttributes<HTMLInputElement>
                  ) => (
                    <input
                      autoComplete="off"
                      {...inputProps}
                      name="tel"
                      placeholder="Телефон ( Обязательно )"
                      type="text"
                      required
                    />
                  )}
                </InputMask>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    visibleHandler("country");
                  }}
                  className={styles.select__country}
                >
                  <span
                    className={cn(
                      visible === "country"
                        ? styles.select__country_arrow__active
                        : styles.select__country_arrow
                    )}
                  >
                    <ArrowDropdown />
                  </span>
                  <Image
                    className={styles.select__country_img}
                    src={currentCodeCountry.img}
                    width={30}
                    height={30}
                    alt={currentCodeCountry.name}
                  />
                </button>
              </div>
              {phoneWarning && (
                <p className={styles.wrap_warning}>{phoneWarning}</p>
              )}
              {visible === "country" && (
                <div className={styles.wrap_phone_dropdown}>
                  {countryOptions}
                </div>
              )}
            </div>
            <div className="containerInputLabel">
              <div className="mail__label">
                <input
                  className="mail__inputField"
                  value={buyer.fio}
                  name="fio"
                  type="text"
                  onChange={handleBuyerChange}
                  required
                />
                <label className="mail__inputLabel">Фамилия</label>
              </div>
              {surnameWarning && (
                <p className={styles.wrap_warning}>{surnameWarning}</p>
              )}
            </div>
            <div className="containerInputLabel">
              <div className="mail__label">
                <input
                  className="mail__inputField"
                  value={buyer.name}
                  name="name"
                  type="text"
                  onChange={handleBuyerChange}
                  required
                />
                <label className="mail__inputLabel">Имя</label>
              </div>
              {nameWarning && (
                <p className={styles.wrap_warning}>{nameWarning}</p>
              )}
            </div>
          </div>
        )}
        {authToken && (
          <div className={styles.wrap_organization}>
            <button
              onClick={() => visibleHandler("another")}
              className={styles.wrap_organization_dropdownToggler}
            >
              <span
                className={cn(
                  visible === "another"
                    ? styles.wrap_organization_dropdownToggler_arrow__active
                    : styles.wrap_organization_dropdownToggler_arrow
                )}
              >
                <ArrowDropdown />
              </span>
              Другой получатель
            </button>
            <div
              className={cn(
                visible === "another"
                  ? styles.wrap_organization_dropdown__active
                  : styles.wrap_organization_dropdown
              )}
            >
              <div className="allContainerInput">
                <div className={styles.wrap_phone}>
                  <div className={styles.wrap_phone_control}>
                    <InputMask
                      mask={mask}
                      value={buyer.tel}
                      onChange={handleBuyerChange}
                      className={styles.auth__input}
                    >
                      {(
                        inputProps: React.InputHTMLAttributes<HTMLInputElement>
                      ) => (
                        <input
                          autoComplete="off"
                          {...inputProps}
                          name="tel"
                          placeholder="Телефон ( Обязательно )"
                          type="text"
                          required
                        />
                      )}
                    </InputMask>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        visibleHandler("country");
                      }}
                      className={styles.select__country}
                    >
                      <span
                        className={cn(
                          visible === "country"
                            ? styles.select__country_arrow__active
                            : styles.select__country_arrow
                        )}
                      >
                        <ArrowDropdown />
                      </span>
                      <Image
                        className={styles.select__country_img}
                        src={currentCodeCountry.img}
                        width={30}
                        height={30}
                        alt={currentCodeCountry.name}
                      />
                    </button>
                  </div>
                  {phoneWarning && (
                    <p className={styles.wrap_warning}>{phoneWarning}</p>
                  )}
                  {visible === "country" && (
                    <div className={styles.wrap_phone_dropdown}>
                      {countryOptions}
                    </div>
                  )}
                </div>
                <div className="containerInputLabel">
                  <div className="mail__label">
                    <input
                      className="mail__inputField"
                      value={buyer.fio}
                      name="fio"
                      type="text"
                      onChange={handleBuyerChange}
                      required
                    />
                    <label className="mail__inputLabel">Фамилия</label>
                  </div>
                  {surnameWarning && (
                    <p className={styles.wrap_warning}>{surnameWarning}</p>
                  )}
                </div>
                <div className="containerInputLabel">
                  <div className="mail__label">
                    <input
                      className="mail__inputField"
                      value={buyer.name}
                      name="name"
                      type="text"
                      onChange={handleBuyerChange}
                      required
                    />
                    <label className="mail__inputLabel">Имя</label>
                  </div>
                  {nameWarning && (
                    <p className={styles.wrap_warning}>{nameWarning}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={styles.wrap_organization}>
          <button
            onClick={() => visibleHandler("organization")}
            className={styles.wrap_organization_dropdownToggler}
          >
            <span
              className={cn(
                visible === "organization"
                  ? styles.wrap_organization_dropdownToggler_arrow__active
                  : styles.wrap_organization_dropdownToggler_arrow
              )}
            >
              <ArrowDropdown />
            </span>
            Оформить на организацию
          </button>
          <div
            className={cn(
              visible === "organization"
                ? styles.wrap_organization_dropdown__active
                : styles.wrap_organization_dropdown
            )}
          >
            <div className="allContainerInput">
              <div className="mail__label">
                <input
                  value={buyer.org}
                  name="org"
                  className="mail__inputField"
                  required
                  type="text"
                  onChange={handleBuyerChange}
                />
                <label className="mail__inputLabel">
                  Название организации:
                </label>
              </div>
              <div className="mail__label">
                <input
                  value={buyer.org_inn}
                  name="org_inn"
                  className="mail__inputField"
                  required
                  type="text"
                  onChange={handleBuyerChange}
                />
                <label className="mail__inputLabel">ИНН:</label>
              </div>
            </div>
            <div className={styles.wrap_organization_dropdown_nds}>
              <label className={styles.wrap_organization_dropdown_nds_switch}>
                <input onClick={ndsHandler} type="checkbox" />
                <span
                  className={
                    styles.wrap_organization_dropdown_nds_switch__slider
                  }
                ></span>
              </label>
              <p className={styles.wrap_organization_dropdown_nds_title}>
                Включить НДС
              </p>
            </div>
          </div>
        </div>
        <div className={styles.wrap_price}>
          <div className={styles.wrap_price_good}>
            <p className={styles.wrap_price_good_count}>
              Товары, {totalQuantity} шт.
            </p>
            <p className={styles.wrap_price_good_finalPrice}>
              {formattedTotalPrice} c.
            </p>
          </div>
          {visible === "organization" && nds && (
            <div className={styles.wrap_price_nds}>
              <p className={styles.wrap_price_nds_text}>В т.ч НДС:</p>
              <p className={styles.wrap_price_nds_price}>329.20 c.</p>
            </div>
          )}
          <div className={styles.wrap_price_priceTotal}>
            <p className={styles.wrap_price_priceTotal_totalTitle}>Итого: </p>
            <p className={styles.wrap_price_priceTotal_price}>
              {formattedTotalPrice} c.
            </p>
          </div>
        </div>
        <button
          onClick={orderHandler}
          aria-label="order request"
          className={styles.wrap_orderRequest}
        >
          оформить заказ
        </button>
        <p className={styles.wrap_privacy}>
          Согласен с использованием Правил пользования торговой площадкой и
          правилами возврата
        </p>
      </section>
    </>
  );
};

export default BasketOrder;
