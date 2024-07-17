"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import cn from "clsx";
import {
  getPersonalDataProfile,
  postPesonalDataProfileFio,
  postPesonalDataProfileOrg,
} from "@/api/clientRequest";
import { UserPersonalDataType } from "@/types/Profile/PersonalData";
import { СhevronDownIcon } from "../../../../../public/Icons/Icons";
const UserPersonalData = () => {
  const cities = [
    { id: 1, name: "Бишкек" },
    { id: 2, name: "Ош" },
    { id: 3, name: "Чуйская область" },
    { id: 4, name: "Ошская область" },
    { id: 5, name: "Жалал-Абадская область" },
    { id: 6, name: "Баткенская область" },
    { id: 7, name: "Иссык-Кульская область" },
    { id: 8, name: "Нарынская область" },
    { id: 9, name: "Таласская область" },
    { id: 10, name: "Другое" },
  ];

  const [data, setData] = useState<UserPersonalDataType>();
  const [initialData, setInitialData] = useState<UserPersonalDataType>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  const handleChange = (event: any) => {
    setData((data: any) => {
      return {
        ...data,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleCitySelect = (cityId: string, cityName: string) => {
    setData((data: any) => ({
      ...data,
      id_city: cityName,
    }));
    setSelectedCity(cityName);
    setDropdownOpen(false);
  };
  const handleCheckboxChange = () => {
    setData((prevData: any) => ({
      ...prevData,
      vzros: prevData.vzros === 1 ? 0 : 1,
    }));
  };
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState("");

  const getToken = async () => {
    try {
      const response = await fetch("/api/auth");
      const data = await response.json();
      if (response.ok) {
        setAccessToken(data.accessToken.value);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Failed to fetch access token");
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      getPersonalDataProfile(accessToken)
        .then((data) => {
          setData(data);
          setInitialData(data); // Сохраняем начальные данные
        })
        .catch((error) => setError(error.message));
    }
  }, [accessToken]);
  const isFormChanged = () => {
    if (!data || !initialData) {
      return false; // Если данные не загружены, считаем форму не измененной
    }

    // Проверяем, изменились ли данные относительно начальных значений
    return Object.keys(data).some(
      (key) =>
        data[key as keyof UserPersonalDataType] !==
        initialData[key as keyof UserPersonalDataType]
    );
  };

  const isFormValid = () => {
    // Проверка на валидность формы перед отправкой
    return data?.fio !== "" && data?.name !== "" && data?.adres !== "";
  };
  const postUserData = () => {
    if (!isFormChanged() || !isFormValid()) {
      return; // Ничего не делаем, если форма не изменена или не валидна
    }
    if (
      data?.fio ||
      data?.name ||
      data?.birthday ||
      data?.male ||
      data?.position
    ) {
      postPesonalDataProfileFio(accessToken, data.fio, data.name);
    }
    if (
      data?.ind_pred ||
      data?.org ||
      data?.inn ||
      data?.adres ||
      data?.email ||
      data?.bank ||
      data?.schet ||
      data?.bik
    ) {
      postPesonalDataProfileOrg(
        accessToken,
        data.ind_pred,
        data.org,
        data.inn,
        data.adres,
        data.email,
        data.bank,
        data.schet,
        data.bik
      );
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };
  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);
  return (
    <div className={styles.containerPersonalData}>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          name="fio"
          onChange={handleChange}
          value={data?.fio}
          required
        />
        <label className={styles.inputLabel}>Фамилия</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          name="name"
          onChange={handleChange}
          value={data?.name}
          type="text"
          required
        />
        <label className={styles.inputLabel}>Имя</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          required
          value={data?.birthday}
          name="birthday"
          onChange={handleChange}
        />
        <label className={styles.inputLabel}>Дата рождения</label>
      </div>
      <div
        className={styles.inputContainer}
        ref={dropdownRef}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <button className={styles.cityContainer}>
          {selectedCity || "Область/Город" || data?.id_city}
          <span
            className={cn(
              "filterNavItemArrowIsActive",
              dropdownOpen && "filterNavItemArrow"
            )}
          >
            <СhevronDownIcon />
          </span>
        </button>
        <div
          className={cn(styles.dropdownContainer, {
            [styles.dropdownContainerActive]: dropdownOpen,
          })}
        >
          {cities.map((city) => (
            <span
              key={city.id}
              className={styles.dropdownItem}
              onChange={handleChange}
              onClick={() => handleCitySelect(city.id.toString(), city.name)}
            >
              {city.name}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          name="adres"
          onChange={handleChange}
          type="text"
          required
          value={data?.adres}
        />
        <label className={styles.inputLabel}>Адрес доставки</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          required
          name="tel"
          onChange={handleChange}
          value={data?.tel}
          type="text"
        />
        <label className={styles.inputLabel}>Мобильный номер</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          name="workPlace"
          onChange={handleChange}
          type="text"
          required
        />
        <label className={styles.inputLabel}>Место работы</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          required
          value={data?.position}
          name="position"
          onChange={handleChange}
        />
        <label className={styles.inputLabel}>Должность</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          required
          name="org"
          value={data?.org}
          onChange={handleChange}
        />
        <label className={styles.inputLabel}>Название организации, ИНН</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          required
          name="prim"
          value={data?.prim}
          onChange={handleChange}
        />
        <label className={styles.inputLabel}>Коментарии</label>
      </div>
      <div className={styles.checkBoxContainer} onClick={handleCheckboxChange}>
        <span
          className={cn("showFiltersUlContainer__check", {
            ["showFiltersUlContainer__checkActive"]: data?.vzros === 1,
          })}
        >
          {data?.vzros === 1 ? (
            <Image
              src="/img/checkIconWhite.svg"
              width={15}
              height={15}
              alt="check"
            />
          ) : (
            <Image
              src="/img/checkIconWhite.svg"
              width={15}
              height={15}
              alt="check"
            />
          )}
        </span>
        <label>Мне больше 18</label>
      </div>
      <p>* - поля, обязательные для заполнения.</p>
      <button
        onClick={postUserData}
        type="submit"
        className={cn(styles.buttonSave, {
          [styles.buttonSaveDisabled]: !isFormChanged() || !isFormValid(),
        })}
        disabled={!isFormChanged() || !isFormValid()}
      >
        Сохранить
      </button>
    </div>
  );
};

export default UserPersonalData;
