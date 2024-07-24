"use client";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./style.module.scss";
import cn from "clsx";
import { DeliveryCourier, SalesmanIcon } from "../../../../public/Icons/Icons";

interface IUserGeoModalProps {
  visible: boolean;
}

interface UserGeo {
  street: string;
  house: string;
  apartament: string;
  city: string;
}

const UserGeoModal = ({ visible }: IUserGeoModalProps) => {
  const [isCourier, setIsCourier] = useState(true);

  //   useEffect(() => {
  //     fetch("http://ip-api.com/json/")
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`Ошибка HTTP: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         const ip = data.query;

  //         const city = data.city;
  //         const region = data.regionName;
  //         const country = data.country;
  //         const loc = `${data.lat},${data.lon}`;
  //         const org = data.org;
  //         const timezone = data.timezone;

  //         console.log("IP-адрес:", ip);

  //         console.log("Город:", city);

  //         console.log("Регион:", region);

  //         console.log("Страна:", country);

  //         console.log("Координаты:", loc);

  //         console.log("Организация:", org);

  //         console.log("Часовой пояс:", timezone);
  //       })
  //       .catch((error) => {
  //         console.error("Ошибка получения данных:", error);
  //       });
  //   }, []);

  const [point, setPoint] = useState("");

  const [pointWarning, setPointWarning] = useState("");

  const [userGeo, setUserGeo] = useState<UserGeo>({
    street: "",
    house: "",
    apartament: "",
    city: "",
  });

  const [userWarning, setUserWarning] = useState<UserGeo>({
    street: "",
    house: "",
    apartament: "",
    city: "",
  });

  const deliveryTypeChanger = (value: boolean) => {
    if (value === true) {
      setIsCourier(value);
    } else {
      setIsCourier(value);
    }
  };

  const userGeoChanger = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserGeo((prevUserGeo) => ({
      ...prevUserGeo,
      [name]: value,
    }));
    setPoint("");
  };

  const pointChanger = (value: string) => {
    setPoint(value);
    setUserGeo((prevUserGeo) => ({
      ...prevUserGeo,
      street: "",
      house: "",
      apartament: "",
      city: "",
    }));
  };

  const validateUserGeo = (): boolean => {
    let isValid = true;

    //if isCourier === true
    if (isCourier) {
      // street validation
      if (!userGeo.street) {
        setUserWarning((prevWarning) => ({
          ...prevWarning,
          street: "Пожалуйста укажите название вашей улицы",
        }));
        isValid = false;
      } else {
        setUserWarning((prevWarning) => ({
          ...prevWarning,
          street: "",
        }));
      }

      // house validation
      if (!userGeo.house) {
        setUserWarning((prevWarning) => ({
          ...prevWarning,
          house: "Пожалуйста укажите номер вашего дома",
        }));
        isValid = false;
      } else {
        setUserWarning((prevWarning) => ({
          ...prevWarning,
          house: "",
        }));
      }

      // apartament validation
      if (!userGeo.apartament) {
        setUserWarning((prevWarning) => ({
          ...prevWarning,
          apartament: "Пожалуйста укажите номер вашей квартиры",
        }));
        isValid = false;
      } else {
        setUserWarning((prevWarning) => ({
          ...prevWarning,
          apartament: "",
        }));
      }

      // city validation
      if (!userGeo.city) {
        setUserWarning((prevWarning) => ({
          ...prevWarning,
          city: "Пожалуйста укажите название вашего города",
        }));
        isValid = false;
      } else {
        setUserWarning((prevWarning) => ({
          ...prevWarning,
          city: "",
        }));
      }
    }
    //else isCourier === false
    else {
      if (!point) {
        setPointWarning("Пожалуйста выберите пункт доставки");
        isValid = false;
      } else {
        setPointWarning("");
      }
    }

    return isValid;
  };

  const saveUserGeo = () => {
    if (validateUserGeo()) {
      console.log("success");
    } else {
      console.log("error");
    }
  };

  return (
    <div className={cn(styles.wrap, visible && styles.show)}>
      <p className={styles.wrap__title}>
        {isCourier
          ? "Пожалуйста укажите ваш адрес"
          : "Пожалуйста укажите пункт выдачи"}
      </p>
      {isCourier && (
        <div className={styles.location}>
          <div className="mail__label">
            <input
              value={userGeo.street}
              onChange={userGeoChanger}
              className="mail__inputField"
              name="street"
              type="text"
              required
            />
            <label className="mail__inputLabel">Улица</label>
          </div>
          {userWarning.street.length > 0 && (
            <p className={styles.wrap__warning}>{userWarning.street}</p>
          )}
          <div className={styles.location__home}>
            <div className="mail__label">
              <input
                onChange={userGeoChanger}
                value={userGeo.house}
                className="mail__inputField"
                name="house"
                type="text"
                required
              />
              <label className="mail__inputLabel">Частный дом</label>
              {userWarning.house.length > 0 && (
                <p className={styles.wrap__warning}>{userWarning.house}</p>
              )}
            </div>

            <div className="mail__label">
              <input
                onChange={userGeoChanger}
                value={userGeo.apartament}
                className="mail__inputField"
                name="apartament"
                type="text"
                required
              />
              <label className="mail__inputLabel">Квартира</label>
              {userWarning.apartament.length > 0 && (
                <p className={styles.wrap__warning}>{userWarning.apartament}</p>
              )}
            </div>
          </div>
        </div>
      )}
      {!isCourier && (
        <div className={styles.pickUp}>
          {pointWarning.length > 0 && (
            <p className={styles.wrap__warning}>{pointWarning}</p>
          )}
          <button
            onClick={() => pointChanger("1")}
            aria-label="choose delivery point"
            className={cn(
              styles.pickUp__point,
              point === "1" && styles.pickUp__point_active
            )}
          >
            <span
              className={cn(
                styles.pickUp__point_radio,
                point === "1" && styles.pickUp__point_radio__active
              )}
            >
              <span
                className={cn(
                  styles.pickUp__point_radio_dot,
                  point === "1" && styles.pickUp__point_radio_dot__active
                )}
              ></span>
            </span>
            Медерова 8/2
          </button>
          <div
            className={cn(
              styles.pickUp__desc,
              point === "1" && styles.pickUp__desc_active
            )}
          >
            <p className={styles.pickUp__desc_workdays}>
              График работы: В будние дни: с 9:00 до 18:00, без перерыва
              Воскресенье: с 9:00 до 18:00, обеденный перерыв: с 13:00 до 14:00
              Предварительно свяжитесь с вашим менеджером для подвержения о
              готовности выдачи заказа.
            </p>
          </div>
          <button
            onClick={() => pointChanger("2")}
            aria-label="choose delivery point"
            className={cn(
              styles.pickUp__point,
              point === "2" && styles.pickUp__point_active
            )}
          >
            <span
              className={cn(
                styles.pickUp__point_radio,
                point === "2" && styles.pickUp__point_radio__active
              )}
            >
              <span
                className={cn(
                  styles.pickUp__point_radio_dot,
                  point === "2" && styles.pickUp__point_radio_dot__active
                )}
              ></span>
            </span>
            Матыева 148
          </button>
          <div
            className={cn(
              styles.pickUp__desc,
              point === "2" && styles.pickUp__desc_active
            )}
          >
            <p className={styles.pickUp__desc_workdays}>
              График работы: В будние дни: с 9:00 до 18:00, без перерыва
              Воскресенье: Выходной Предварительно свяжитесь с вашим менеджером
              для подвержения о готовности выдачи заказа.
            </p>
          </div>
        </div>
      )}
      <div className={styles.delivery}>
        <p className={styles.delivery__title}>Способ доставки</p>
        <div className={styles.delivery__type}>
          <button
            onClick={() => deliveryTypeChanger(true)}
            className={cn(
              styles.delivery__type_courier,
              isCourier && styles.delivery__type_courier_active
            )}
          >
            <DeliveryCourier />
            Курьер
          </button>
          <button
            onClick={() => deliveryTypeChanger(false)}
            className={cn(
              styles.delivery__type_point,
              isCourier && styles.delivery__type_point_disactive
            )}
          >
            <SalesmanIcon />
            Пункты выдачи
          </button>
        </div>
      </div>
      {isCourier && (
        <>
          <div className={styles.city}>
            <p className={styles.city__title}>Пожалуйста укажите ваш город</p>
            <div className={styles.city__location}>г. Джалал-Абад</div>
          </div>
          {userWarning.city.length > 0 && (
            <p className={styles.wrap__warning}>{userWarning.city}</p>
          )}
        </>
      )}
      <button
        onClick={saveUserGeo}
        aria-label="save geo"
        className={styles.wrap__save}
      >
        Сохранить
      </button>
    </div>
  );
};

export default UserGeoModal;
