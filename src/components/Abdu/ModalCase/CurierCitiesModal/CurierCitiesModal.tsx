"use client";
import React, { useState } from "react";
import { ICityFront } from "@/types/Basket/cityfrontType";
import { XMark } from "../../../../../public/Icons/Icons";
import clsx from "clsx";
import styles from "./style.module.scss";
import { IBuyer, ICityBuyer } from "../../Abdu";

interface ICurierCitiesModalProps {
  buyer: IBuyer;
  location: ICityBuyer;
  setCity: (newCity: { name: string; id: number }) => void;
  cities: ICityFront;
  isVisible: boolean;
  close: () => void;
  saveCity: () => void;
}

const CurierCitiesModal = ({
  buyer,
  location,
  setCity,
  close,
  cities,
  isVisible,
  saveCity,
}: ICurierCitiesModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onClose = () => {
    close();
    setSearchTerm("");
  }

  const onSave = () => {
    saveCity();
    setSearchTerm("");

  }

  const normalizeString = (str: any) => {
    return str.toLowerCase().replace(/[^a-zа-яё0-9]/gi, "");
  };

  const getSimilarCities = (term: string) => {
    const normalizedTerm = normalizeString(term);
    return cities.filter((city) =>
      normalizeString(city.name).includes(normalizedTerm)
    );
  };

  const filteredCities = getSimilarCities(searchTerm);
  const hasResults = filteredCities.length > 0;

  return (
    <div className={clsx(styles.modal, isVisible && styles.show)}>
      <div className={styles.modal__intro}>
        <p className={styles.modal__title}>Выберите город</p>
        <button className={styles.modal__exit} onClick={onClose}>
          <XMark />
        </button>
      </div>

      <div className="containerInputLabel">
        <div style={{ cursor: "pointer" }} className="mail__label">
          <input
            className="mail__inputField"
            autoFocus={false}
            autoComplete="off"
            name="street"
            style={{ cursor: "pointer" }}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            required
          />
          <label className="mail__inputLabel">Поиск города...</label>
        </div>
      </div>


      <div className={styles.modal__content}>
        {hasResults ? (
          filteredCities.map((city) => (
            <>
              <button
                onClick={() =>
                  setCity({
                    name: city.name,
                    id: city.city_id,
                  })
                }
                aria-label="choose delivery point"
                className={clsx(
                  styles.wrap_courier_point,
                  location.id_city.id === city.city_id &&
                    styles.wrap_courier_point_active
                )}
              >
                <span
                  className={clsx(
                    styles.wrap_courier_point_radio,
                    location.id_city.id === city.city_id &&
                      styles.wrap_courier_point_radio_active
                  )}
                >
                  <span
                    className={clsx(
                      styles.wrap_courier_point_radio_dot,
                      location.id_city.id === city.city_id &&
                        styles.wrap_courier_point_radio_dot_active
                    )}
                  ></span>
                </span>
                {city.name}
              </button>
            </>
          ))
        ) : (
          <span>Такого города нет</span>
        )}
      </div>

      <button onClick={onSave} aria-label="save" className={styles.button}>
        Выбрать
      </button>
    </div>
  );
};

export default CurierCitiesModal;
