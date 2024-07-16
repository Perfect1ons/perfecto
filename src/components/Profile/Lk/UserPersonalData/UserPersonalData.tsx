"use client";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { UserPersonalDataType } from "@/types/Profile/PersonalData";
import { getPersonalDataProfile } from "@/api/clientRequest";

const UserPersonalData = () => {
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<UserPersonalDataType>();

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
        .then((data) => setData(data))
        .catch((error) => setError(error.message));
    }
  }, [accessToken]);

  return (
    <div className={styles.containerPersonalData}>
      <div className={styles.inputContainer}>
        <input
          value={data?.fio}
          className={styles.inputField}
          type="text"
          required
        />
        <label className={styles.inputLabel}>Фамилия</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          value={data?.name}
          className={styles.inputField}
          type="text"
          required
        />
        <label className={styles.inputLabel}>Имя</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Дата рождения</label>
      </div>
      <div className={styles.inputContainer}>
        <select defaultValue="" className={styles.cityContainer}>
          <option value="1">Бишкек</option>
          <option value="2">Ош</option>
          <option value="3">Чуйская область</option>
          <option value="4">Ошская область</option>
          <option value="5">Жалал-Абадская область</option>
          <option value="6">Баткенская область</option>
          <option value="7">Иссык-Кульская область</option>
          <option value="8">Нарынская область</option>
          <option value="9">Таласская область</option>
          <option value="10">Другое</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Адрес доставки</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          value={data?.tel}
          className={styles.inputField}
          type="text"
          required
        />
        <label className={styles.inputLabel}>Мобильный номер</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Место работы</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Должность</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Название организации, ИНН</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Коментарии</label>
      </div>
      <div className={styles.checkBoxContainer}>
        <input type="checkbox" className={styles.checkBoxContainer__check} />
        <label>Мне больше 18</label>
      </div>
      <p>* - поля, обязательные для заполнения.</p>
      <button type="submit" className={styles.buttonSave}>
        Сохранить
      </button>
    </div>
  );
};

export default UserPersonalData;
