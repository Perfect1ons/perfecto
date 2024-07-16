"use client";
import { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import cn from "clsx";
const UserPersonalData = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    birthDate: "",
    city: "",
    deliveryAddress: "",
    mobileNUmber: "",
    workPlace: "",
    position: "",
    organizationName: "",
    comments: "",
    isOver: false,
  });
  const handleChange = (event: any) => {
    setFormData((formData) => {
      return {
        ...formData,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleCheckboxChange = () => {
    setFormData((prevState) => ({
      ...prevState,
      isOver: !prevState.isOver,
    }));
  };
  return (
    <div className={styles.containerPersonalData}>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          name="lastName"
          onChange={handleChange}
          required
        />
        <label className={styles.inputLabel}>Фамилия</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          name="firstName"
          onChange={handleChange}
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
          name="birthDate"
          onChange={handleChange}
        />
        <label className={styles.inputLabel}>Дата рождения</label>
      </div>
      <div className={styles.inputContainer}>
        <select
          defaultValue=""
          className={styles.cityContainer}
          name="city"
          onChange={handleChange}
        >
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
        <input
          className={styles.inputField}
          name="deliveryAddress"
          onChange={handleChange}
          type="text"
          required
        />
        <label className={styles.inputLabel}>Адрес доставки</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          required
          name="mobileNUmber"
          onChange={handleChange}
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
          name="organizationName"
          onChange={handleChange}
        />
        <label className={styles.inputLabel}>Название организации, ИНН</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          required
          name="comments"
          onChange={handleChange}
        />
        <label className={styles.inputLabel}>Коментарии</label>
      </div>
      <div className={styles.checkBoxContainer} onClick={handleCheckboxChange}>
        <span
          className={cn("showFiltersUlContainer__check", {
            ["showFiltersUlContainer__checkActive"]: formData.isOver,
          })}
        >
          {formData.isOver ? (
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
      <button type="submit" className={styles.buttonSave}>
        Сохранить
      </button>
    </div>
  );
};

export default UserPersonalData;
