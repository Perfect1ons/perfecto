"use client";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
// import {
//   DeliverExPointIcons,
//   DeliveryApproveIcon,
//   DeliveryCurierIcon,
//   PaymentIcon,
// } from "../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { IPaymentMethod } from "@/types/Basket/PaymentMethod";
import dynamic from "next/dynamic";
import { ICityFront } from "@/types/Basket/cityfrontType";
import {
  BasketOrdersWarnings,
  IBuyer,
  ICityBuyer,
  IVariableBuyer,
} from "@/interfaces/baskets/basketModal";
import { IBasketItems } from "@/interfaces/baskets/basket";
import BasketHeader from "./BasketHeader/BasketHeader";
import {
  deleteAllTovars,
  deleteAuthedTovars,
  deleteTovar,
  getExitsUser,
  postBoxOrder,
} from "@/api/clientRequest";
import BasketEmpty from "./BasketEmpty/BasketEmpty";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "@/store/reducers/cart.reducer";
import { RootState } from "@/store";
import BasketsItems from "./BasketsItems/BasketsItems";
import BasketOrder from "./BasketOrder/BasketOrder";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AbduModal = dynamic(() => import("./AbduModal/AbduModal"), {
  ssr: false,
});

const CurierCitiesModal = dynamic(
  () => import("./ModalCase/CurierCitiesModal/CurierCitiesModal"),
  {
    ssr: false,
  }
);

// Интерфейс для корзины
interface IBasketProps {
  cartId: any;
  authToken?: string;
  cities: ICityFront;
  deliveryMethod: IDeliveryMethod;
  paymentMethod: IPaymentMethod;
  items: IBasketItems[];
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

const Abdu = ({
  cartId,
  authToken,
  deliveryMethod,
  paymentMethod,
  cities,
  items: initialItems,
}: IBasketProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [items, setItems] = useState<any[]>(cart);
  useEffect(() => {
    updateCartItems(cart);
  }, [cart]);

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

  const [view, setView] = useState<
    "delivery" | "curier" | "oplata" | "confirm"
  >("curier");
  const [isModalVisible, setModalVisible] = useState(false);
  const [choosed, setChoosed] = useState<number | undefined>();
  const [choosedModal, setChoosedModal] = useState<boolean>(false);

  const closeModal = () => {
    setModalVisible(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const openCityModal = () => setCityModalVisible(true);
  const closeCityModal = () => setCityModalVisible(false);
  const [variableBuyer, setVariableBuyer] = useState<IVariableBuyer>({
    payment: {
      name: "",
      id: "",
    },
    delivery: {
      name: "",
      id: "",
    },
  });
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [formattedTotalPrice, setFormattedTotalPrice] = useState<string>("");
  const [anotherRecipient, setAnotherRecipient] = useState({
    tel: `${codesCountry.kg.code}`,
    fio: "",
    name: "",
  });
  const [nds, setNds] = useState<boolean>(true);
  const router = useRouter();
  const ndsHandler = () => {
    setNds((prevNds) => !prevNds);
  };

  const handleAnotherRecipientChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnotherRecipient((prevAnother) => ({
      ...prevAnother,
      [name]: value,
    }));
  };
  const [buyer, setBuyer] = useState<IBuyer>({
    tel: 0,
    vid_dost: variableBuyer.delivery.id,
    id_vopl: variableBuyer.payment.id,
    fio: "",
    name: "",
    org: "",
    org_inn: "",
    id_city: null,
    id_city2: 0,
    directory: "",
    dost: "",
    oplata: "",
    city: "",
  });
  const [anotherStatus, setAnotherStatus] = useState("");
  const handleAnotherRecipientBlur = async () => {
    try {
      const cleanedTel = anotherRecipient.tel.replace(/\D/g, "");
      const response = await getExitsUser(cleanedTel);

      if (response) {
        const data = response;
        // setBuyer((prevBuyer) => ({
        //   ...prevBuyer,
        //   tel: data.tel,
        //   fio: data.fio,
        //   name: data.name,
        // }));

        setAnotherRecipient((prevAnother) => ({
          ...prevAnother,
          tel: data.tel,
          fio: data.fio,
          name: data.name,
        }));

        setAnotherStatus("Пользователь найден");
      } else {
        // setBuyer((prevBuyer) => ({
        //   ...prevBuyer,
        //   tel: user.tel,
        //   fio: user.fio,
        //   name: user.name,
        // }));
        setAnotherRecipient({
          tel: "",
          fio: "",
          name: "",
        });
        setAnotherStatus("Пользователь не найден");
      }
    } catch (error) {
      console.error("Error making request:", error);
      setAnotherStatus("Ошибка при запросе.");
    }
  };
  useEffect(() => {
    const result = items.reduce(
      (acc: any, item: any) => {
        const quantity = parseInt(item.kol) || 0;
        const discount = item.discount || 0;
        const price = authToken
          ? parseInt(item.cenaok)
          : parseInt(item.cena) || 0;
        acc.totalQuantity += quantity;
        acc.totalPrice += quantity * price;
        acc.totalDiscount += quantity * discount;
        return acc;
      },
      { totalQuantity: 0, totalPrice: 0, totalDiscount: 0 }
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
    setTotalDiscount(result.totalDiscount);
    setTotalQuantity(result.totalQuantity);
    setFormattedTotalPrice(formatNumber(result.totalPrice));
  }, [items, authToken]);
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [location, setLocation] = useState<ICityBuyer>({
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
  const [regVisible, setRegVisible] = useState(false);

  const regVisibleHandle = () => {
    setRegVisible(false);
  };

  const [warnings, setWarnings] = useState<BasketOrdersWarnings>({
    delivery: "",
    payment: "",
    phone: "",
    surname: "",
    name: "",
  });

  const validateBuyerInfo = (): boolean => {
    let isValid = true;
    const newWarnings = { ...warnings };

    // Delivery validation
    if (!buyer.vid_dost) {
      newWarnings.delivery = "Пожалуйста выберите способ доставки";
      isValid = false;
    } else {
      newWarnings.delivery = "";
    }

    // Payment validation
    if (!buyer.id_vopl) {
      newWarnings.payment = "Пожалуйста выберите способ оплаты";
      isValid = false;
    } else {
      newWarnings.payment = "";
    }

    // Phone number validation
    const numericPhoneNumber = buyer.tel;
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
        newWarnings.phone = "Это поле не может быть пустым.";
        isValid = false;
      } else if (numericPhoneNumber.length !== expectedLength) {
        newWarnings.phone = "Номер введен не полностью.";
        isValid = false;
      } else {
        newWarnings.phone = "";
      }
    }

    // Surname validation
    if (!buyer.fio && !authToken) {
      newWarnings.surname = "Пожалуйста укажите вашу фамилию";
      isValid = false;
    } else {
      newWarnings.surname = "";
    }

    // Name validation
    if (!buyer.name && !authToken) {
      newWarnings.name = "Пожалуйста укажите ваше имя";
      isValid = false;
    } else {
      newWarnings.name = "";
    }

    setWarnings(newWarnings);
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
            buyer.tel,
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
  const handleBuyerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyer((prevBuyer) => ({
      ...prevBuyer,
      [name]: value,
    }));
  };
  // Функция удаления товара
  const removeFromCart = (id_tov: number) => {
    openModal();
    setView("confirm");
    setChoosedModal(true);
    setChoosed(id_tov);
  };

  // Функция для подтверждения удаления товаров
  const removeTovars = async () => {
    if (choosedModal && choosed) {
      dispatch(removeProductFromCart([choosed]));

      closeModal();

      let response;
      if (authToken) {
        response = await deleteAuthedTovars(authToken, choosed.toString());
      } else {
        response = await deleteTovar(cartId, choosed);
      }

      if (response) {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id_tov !== choosed)
        );
      }
      setChoosed(undefined);
    } else {
      let response;
      if (authToken) {
        response = await deleteAuthedTovars(authToken, selectedIds);
      } else {
        response = await deleteAllTovars(cartId, selectedIds);
      }

      const selectedIdsArray = selectedIds.split(",").map((id) => parseInt(id));
      dispatch(removeProductFromCart(selectedIdsArray));
      setItems((prevItems) =>
        prevItems.filter((item) => !selectedIdsArray.includes(item.id_tov))
      );
      closeModal();
      setSelectedIds("");
    }
  };

  // Обработчик изменений в чекбоксах товаров
  const handleCheckboxChange = (id_tov: number, isChecked: boolean) => {
    setSelectedIds((prevSelectedIds) => {
      const idsArray = prevSelectedIds.split(",").filter(Boolean);
      if (isChecked) {
        return [...idsArray, id_tov.toString()].join(",");
      } else {
        return idsArray.filter((id) => id !== id_tov.toString()).join(",");
      }
    });
  };

  // Функции для выбора/снятия всех товаров
  const handleSelectAll = () => {
    const allIds = items.map((item) => item.id_tov.toString()).join(",");
    setSelectedIds(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedIds("");
  };

  // Функция для изменения адреса
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

  // Функции для выбора и сохранения методов доставки и оплаты
  const selectDelivery = (delivery: { name: string; id: string | number }) => {
    setVariableBuyer((prevVariableBuyer) => ({
      ...prevVariableBuyer,
      delivery: delivery,
    }));
  };

  const selectPayment = (payment: { name: string; id: string | number }) => {
    setVariableBuyer((prevVariableBuyer) => ({
      ...prevVariableBuyer,
      payment: payment,
    }));
  };

  const saveDelivery = () => {
    if (variableBuyer.delivery) {
      setBuyer((prevBuyer) => ({
        ...prevBuyer,
        vid_dost: variableBuyer.delivery.id,
        dost: variableBuyer.delivery.name,
        directory: `${location.directory.street} ${location.directory.house} ${location.directory.apartament}`,
      }));
      closeModal();
    } else {
      console.log("Ошибка: не выбран способ доставки");
    }
  };

  const savePayment = () => {
    if (variableBuyer.payment) {
      setBuyer((prevBuyer) => ({
        ...prevBuyer,
        id_vopl: variableBuyer.payment.id,
        oplata: variableBuyer.payment.name,
      }));
      closeModal();
    } else {
      console.log("Ошибка: не выбран способ оплаты");
    }
  };

  // Функции для выбора и сохранения города
  const saveCity = () => {
    if (location.id_city) {
      setBuyer((prevState) => ({
        ...prevState,
        id_city: location.id_city.id,
        city: location.id_city.name,
      }));
      closeCityModal();
    } else {
      console.log("Ошибка: не выбран город");
    }
  };

  const setCity = (newCity: { name: string; id: number }) => {
    setLocation((prevState) => ({
      ...prevState,
      id_city: newCity,
    }));
  };
  const [visible, setVisible] = useState<string>("");
  const visibleHandler = (current: string) => {
    setVisible((prevVisible) => (prevVisible !== current ? current : ""));
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

  useEffect(() => {
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isModalVisible) {
      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
      body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = body.style.top;
      body.style.paddingRight = "";
      body.style.overflow = "auto";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      body.style.top = "";
    }
  }, [isModalVisible]);

  const isAllSelected =
    selectedIds.split(",").filter(Boolean).length === items.length;
  return (
    <>
      {items.length > 0 ? (
        <div className="container">
          <CurierCitiesModal
            buyer={buyer}
            saveCity={saveCity}
            location={location}
            setCity={setCity}
            close={closeCityModal}
            isVisible={isCityModalVisible}
            cities={cities}
          />
          <AbduModal
            setChoosed={setChoosed}
            setChoosedModal={setChoosedModal}
            removeTovars={removeTovars}
            changeAdress={changeAdress}
            buyer={buyer}
            saveCity={saveCity}
            location={location}
            setCity={setCity}
            openCityModal={openCityModal}
            closeCityModal={closeCityModal}
            isCityModalVisible={isCityModalVisible}
            cities={cities}
            variableBuyer={variableBuyer}
            saveDelivery={saveDelivery}
            savePayment={savePayment}
            selectDelivery={selectDelivery}
            selectPayment={selectPayment}
            paymentMethod={paymentMethod}
            deliveryMethod={deliveryMethod}
            isVisible={isModalVisible}
            close={closeModal}
            setView={setView}
            view={view}
          />
          <BasketHeader
            authToken={authToken}
            count={items.length}
            openModal={openModal}
            setView={setView}
            selectAll={handleSelectAll}
            deselectAll={handleDeselectAll}
            isAllSelected={isAllSelected}
            selectedIds={selectedIds}
          />
          <div className={styles.basket__container}>
            <BasketsItems
              token={authToken}
              removeFromCart={removeFromCart}
              selectedIds={selectedIds}
              onCheckboxChange={handleCheckboxChange}
              cartData={items}
            />
            <BasketOrder
              totalDiscount={totalDiscount}
              nds={nds}
              formattedTotalPrice={formattedTotalPrice}
              warnings={warnings}
              orderHandler={orderHandler}
              ndsHandler={ndsHandler}
              handleAnotherRecipientChange={handleAnotherRecipientChange}
              anotherRecipient={anotherRecipient}
              anotherStatus={anotherStatus}
              handleAnotherRecipientBlur={handleAnotherRecipientBlur}
              totalQuantity={totalQuantity}
              currentCodeCountry={currentCodeCountry}
              countryOptions={countryOptions}
              mask={mask}
              visibleHandler={visibleHandler}
              authToken={authToken}
              buyer={buyer}
              location={location}
              openModal={openModal}
              setView={setView}
              handleBuyerChange={handleBuyerChange}
              visible={visible}
            />
          </div>
        </div>
      ) : (
        <BasketEmpty />
      )}
    </>
  );
};

export default Abdu;
