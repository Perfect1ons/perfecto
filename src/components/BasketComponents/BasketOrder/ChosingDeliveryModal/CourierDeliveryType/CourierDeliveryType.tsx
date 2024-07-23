"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../style.module.scss";
import cn from "clsx";
import {
  ArrowDropdown,
  СhevronDownIcon,
} from "../../../../../../public/Icons/Icons";
import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { SelectCityType } from "@/types/Basket/SelectCity";
import { getSelectRegion } from "@/api/clientRequest";
import { SelectRegionType } from "@/types/Basket/SelectRegion";

interface ICourierDeliveryTypeProps {
  variableBuyer: { payment: string; delivery: string };
  variants: DeliveryMethod;
  selectDelivery: (value: string) => void;
  deliveryCity: SelectCityType;
  authToken: string | undefined;
}

const times = [
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
  deliveryCity,
  authToken,
}: ICourierDeliveryTypeProps) => {
  const [openTime, setOpenTime] = useState(false);

  const [openSelect, setOpenSelect] = useState(false);

  const [selectedTime, setSelectedTime] = useState("Не выбрано");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<SelectRegionType>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location, setLocation] = useState({
    city: "",
    region: "",
  });

  // Функция для обновления значения city
  const updateCity = (newCity: string) => {
    setLocation((prevState) => ({
      ...prevState,
      city: newCity,
    }));
  };

  // Функция для обновления значения region
  const updateRegion = (newRegion: string) => {
    setLocation((prevState) => ({
      ...prevState,
      region: newRegion,
    }));
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
  const selectHandler = () => {
    setOpenSelect(!openSelect);
  };

  const openTimeHandler = () => {
    setOpenTime(!openTime);
  };

  const selectTime = (value: string) => {
    setSelectedTime(value);
    setOpenSelect(false);
  };

  const getRegions = async (id: number) => {
    if (authToken) {
      const data = await getSelectRegion(authToken, id);
      setRegion(data);
    }
  };
  const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);

  const toggleFilter = (name: string) => {
    setVisibleDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div className={styles.wrap_courier}>
      <div className={styles.inputsContainerCity}>
        <div
          className={styles.inputContainer}
          ref={dropdownRef}
          onClick={() => toggleFilter("city")}
        >
          <button className={styles.cityContainer}>
            {location.city || "Область/Город"}
            <span
              className={cn(
                "filterNavItemArrowIsActive",
                styles.iconChewronDown
              )}
            >
              <СhevronDownIcon />
            </span>
          </button>
          <div
            className={cn(styles.dropdownContainer, {
              [styles.dropdownContainerActive]: visibleDropdown === "city",
            })}
          >
            {deliveryCity.map((city) => (
              <span
                key={city.id}
                className={styles.dropdownItem}
                onClick={() => {
                  getRegions(city.id);
                  updateCity(city.naim);
                }}
              >
                {city.naim}
              </span>
            ))}
          </div>
        </div>
        {region && (
          <div
            className={styles.inputContainer}
            ref={dropdownRef}
            onClick={() => toggleFilter("region")}
          >
            <button className={styles.cityContainer}>
              {location.region || "Регион"}
              <span
                className={cn(
                  "filterNavItemArrowIsActive",
                  styles.iconChewronDown
                )}
              >
                <СhevronDownIcon />
              </span>
            </button>
            <div
              className={cn(styles.dropdownContainer, {
                [styles.dropdownContainerActive]: visibleDropdown === "region",
              })}
            >
              {region.map((region) => (
                <span
                  key={region.id}
                  className={styles.dropdownItem}
                  onClick={() => {
                    updateRegion(region.naim);
                  }}
                >
                  {region.naim}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.wrap_courier_selectAddress}>
        <input
          placeholder="Введите: улица, дом, квартира"
          type="text"
          className={styles.wrap_courier_selectAddress_input}
        />
      </div>
      <button
        onClick={() => selectDelivery(variants[8]?.name)}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_courier_point,
          variableBuyer.delivery === variants[8]?.name &&
            styles.wrap_courier_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_courier_point_radio,
            variableBuyer.delivery === variants[8]?.name &&
              styles.wrap_courier_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_courier_point_radio_dot,
              variableBuyer.delivery === variants[8]?.name &&
                styles.wrap_courier_point_radio_dot_active
            )}
          ></span>
        </span>
        {variants[8]?.name}
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          variableBuyer.delivery === variants[8]?.name &&
            styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>{variants[8]?.desc}</p>
      </div>

      <button
        onClick={() => selectDelivery(variants[10]?.name)}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_courier_point,
          variableBuyer.delivery === variants[10]?.name &&
            styles.wrap_courier_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_courier_point_radio,
            variableBuyer.delivery === variants[10]?.name &&
              styles.wrap_courier_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_courier_point_radio_dot,
              variableBuyer.delivery === variants[10]?.name &&
                styles.wrap_courier_point_radio_dot_active
            )}
          ></span>
        </span>
        {variants[10]?.name}
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          variableBuyer.delivery === variants[10]?.name &&
            styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>
          {variants[10]?.desc}
        </p>
      </div>

      <button
        onClick={() => selectDelivery(variants[12]?.name)}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_courier_point,
          variableBuyer.delivery === variants[12]?.name &&
            styles.wrap_courier_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_courier_point_radio,
            variableBuyer.delivery === variants[12]?.name &&
              styles.wrap_courier_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_courier_point_radio_dot,
              variableBuyer.delivery === variants[12]?.name &&
                styles.wrap_courier_point_radio_dot_active
            )}
          ></span>
        </span>
        {variants[12]?.name}
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          variableBuyer.delivery === variants[12]?.name &&
            styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>
          {variants[12]?.desc}
        </p>
      </div>

      <button
        onClick={() => selectDelivery(variants[13]?.name)}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_courier_point,
          variableBuyer.delivery === variants[13]?.name &&
            styles.wrap_courier_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_courier_point_radio,
            variableBuyer.delivery === variants[13]?.name &&
              styles.wrap_courier_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_courier_point_radio_dot,
              variableBuyer.delivery === variants[13]?.name &&
                styles.wrap_courier_point_radio_dot_active
            )}
          ></span>
        </span>
        {variants[13]?.name}
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          variableBuyer.delivery === variants[13]?.name &&
            styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>
          {variants[13]?.desc}
        </p>
      </div>
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
