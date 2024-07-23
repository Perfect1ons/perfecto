"use client";
import { useState } from "react";
import styles from "../style.module.scss";
import cn from "clsx";
import { ArrowDropdown } from "../../../../../../public/Icons/Icons";
import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";

interface ICourierDeliveryTypeProps {
  variableBuyer: { payment: string; delivery: string };
  variants: DeliveryMethod;
  selectDelivery: (value: string) => void;
}

const times = [
  {
    value: "Не выбрано",
  },
  {
    value: "с 9.00 до 10.00",
  },
  {
    value: "с 10.00 до 11.00",
  },
  {
    value: "с 11.00 до 12.00",
  },
  {
    value: "с 12.00 до 13.00",
  },
  {
    value: "с 14.00 до 15.00",
  },
  {
    value: "с 15.00 до 16.00",
  },
  {
    value: "с 16.00 до 17.00",
  },
  {
    value: "с 17.00 до 18.00",
  },
  {
    value: "с 18.00 до 19.00",
  },
  {
    value: "с 19.00 до 20.00",
  },
];

const CourierDeliveryType = ({
  variants,
  selectDelivery,
  variableBuyer,
}: ICourierDeliveryTypeProps) => {
  const [openTime, setOpenTime] = useState(false);

  const [openSelect, setOpenSelect] = useState(false);

  const [selectedTime, setSelectedTime] = useState("Не выбрано");

  const selectHandler = () => {
    setOpenSelect(!openSelect);
  };

  const openTimeHandler = () => {
    setOpenTime(!openTime);
    setOpenSelect(false);
  };

  const selectTime = (value: string) => {
    setSelectedTime(value);
    setOpenSelect(false);
  };

  return (
    <div className={styles.wrap_courier}>
      <div className={styles.wrap_courier_selectAddress}>
        <button
          title="Выберите ваш город или область"
          aria-label="choose city"
          className={styles.wrap_courier_selectAddress_dropdown}
        >
          Бишкек
          <span className={styles.wrap_courier_selectAddress_dropdown_arrow}>
            <ArrowDropdown />
          </span>
        </button>
        <input
          placeholder="Введите: улица, дом, квартира"
          type="text"
          className={styles.wrap_courier_selectAddress_input}
        />
      </div>

      {Object.entries(variants).map(([key, variant]) => (
        <div key={key}>
          <button
            onClick={() => selectDelivery(variant.name)}
            aria-label="choose delivery point"
            className={cn(
              styles.wrap_courier_point,
              variableBuyer.delivery === variant.name &&
                styles.wrap_courier_point_active
            )}
          >
            <span
              className={cn(
                styles.wrap_courier_point_radio,
                variableBuyer.delivery === variant.name &&
                  styles.wrap_courier_point_radio_active
              )}
            >
              <span
                className={cn(
                  styles.wrap_courier_point_radio_dot,
                  variableBuyer.delivery === variant.name &&
                    styles.wrap_courier_point_radio_dot_active
                )}
              ></span>
            </span>
            {variant.name}
          </button>
          <div
            className={cn(
              styles.wrap_courier_desc,
              variableBuyer.delivery === variant.name &&
                styles.wrap_courier_desc_active
            )}
          >
            <p className={styles.wrap_courier_desc_workdays}>{variant.desc}</p>
          </div>
        </div>
      ))}
      <div className={styles.wrap_courier_selectTime}>
        <button
          onClick={openTimeHandler}
          className={cn(
            styles.wrap_courier_selectTime_button,
            openTime && styles.wrap_courier_selectTime_button_active
          )}
        >
          Указать время{" "}
          <span
            className={cn(
              styles.wrap_courier_selectTime_button_arrow,
              openTime && styles.wrap_courier_selectTime_button_arrow_active
            )}
          >
            <ArrowDropdown />
          </span>
        </button>
        <div
          className={cn(
            styles.wrap_courier_selectTime_dropdown,
            openTime && styles.wrap_courier_selectTime_dropdown_active
          )}
        >
          <button
            onClick={selectHandler}
            className={cn(
              styles.wrap_courier_selectTime_dropdown_toggler,
              openSelect &&
                styles.wrap_courier_selectTime_dropdown_toggler_active
            )}
          >
            {selectedTime}
            <span
              className={cn(
                styles.wrap_courier_selectTime_dropdown_toggler_arrow,
                openSelect &&
                  styles.wrap_courier_selectTime_dropdown_toggler_arrow_active
              )}
            >
              <ArrowDropdown />
            </span>
          </button>
          {openSelect && (
            <ul className={cn(styles.wrap_courier_selectTime_dropdown_time)}>
              {times.map((time, index) => {
                return (
                  <li
                    onClick={() => selectTime(time.value)}
                    key={index}
                    className={
                      styles.wrap_courier_selectTime_dropdown_time_item
                    }
                  >
                    {time.value}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourierDeliveryType;
