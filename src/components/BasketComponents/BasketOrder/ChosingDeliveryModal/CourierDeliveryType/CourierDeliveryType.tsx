"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  variableBuyer: {
    payment: {
      name: string;
      id: number | string;
    };
    delivery: {
      name: string;
      id: number | string;
    };
  };
  variants: DeliveryMethod;
  selectDelivery: (delivery: { name: string; id: string | number }) => void;
  deliveryCity: SelectCityType;
  authToken: string | undefined;
  location: {
    id_city: {
      name: string;
      id: number | null;
    };
    id_city2: {
      name: string;
      id: number | null;
    };
    directory: string;
  };
  cityChange: (newCity: { name: string; id: number }) => void;
  regionChange: (newRegion: { name: string; id: number }) => void;
  adressChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  deliveryCity,
  authToken,
  location,
  cityChange,
  regionChange,
  adressChange,
}: ICourierDeliveryTypeProps) => {
  const [openTime, setOpenTime] = useState(false);

  const [openSelect, setOpenSelect] = useState(false);

  const [selectedTime, setSelectedTime] = useState("Не выбрано");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<SelectRegionType>();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    setOpenSelect(false);
  };

  const selectTime = (value: string) => {
    setSelectedTime(value);
    setOpenSelect(false);
  };

  const getRegions = async (id: number) => {
    if (authToken && (id < 10 || id > 99)) {
      const data = await getSelectRegion(authToken, id);
      setRegion(data);
    } else {
      setRegion(region);
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
            {location.id_city.name || "Область/Город"}
            <span
              className={cn(
                "filterNavItemArrowIsActive",
                styles.iconChewronDown
              )}
            >
              <СhevronDownIcon />
            </span>
          </button>
          <ul
            className={cn(styles.dropdownContainer, {
              [styles.dropdownContainerActive]: visibleDropdown === "city",
            })}
          >
            {deliveryCity.map((city) => (
              <li
                key={city.id}
                className={styles.dropdownItem}
                onClick={() => {
                  getRegions(city.id);
                  cityChange({
                    name: city.naim,
                    id: city.id,
                  });
                }}
              >
                {city.naim}
              </li>
            ))}
          </ul>
        </div>
        {region && (
          <div
            className={styles.inputContainer}
            ref={dropdownRef}
            onClick={() => toggleFilter("region")}
          >
            <button className={styles.cityContainer}>
              {location.id_city2.name ||
                (region.length > 0 ? region[0].naim : "Не выбран")}
              <span
                className={cn(
                  "filterNavItemArrowIsActive",
                  styles.iconChewronDown
                )}
              >
                <СhevronDownIcon />
              </span>
            </button>
            <ul
              className={cn(styles.dropdownContainer, {
                [styles.dropdownContainerActive]: visibleDropdown === "region",
              })}
            >
              {region.map((region) => (
                <li
                  key={region.id}
                  className={styles.dropdownItem}
                  onClick={() => {
                    regionChange({
                      name: region.naim,
                      id: region.id,
                    });
                  }}
                >
                  {region.naim}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.wrap_courier_selectAddress}>
        <input
          placeholder="Введите: улица, дом, квартира"
          type="text"
          className={styles.wrap_courier_selectAddress_input}
          value={location.directory}
          name="directory"
          onChange={adressChange}
        />
      </div>

      {Object.entries(variants).map(([key, variant]) => (
        <div key={key}>
          <button
            onClick={() =>
              selectDelivery({
                name: variant.name,
                id: variant.id,
              })
            }
            aria-label="choose delivery point"
            className={cn(
              styles.wrap_courier_point,
              variableBuyer.delivery.id === variant.id &&
                styles.wrap_courier_point_active
            )}
          >
            <span
              className={cn(
                styles.wrap_courier_point_radio,
                variableBuyer.delivery.id === variant.id &&
                  styles.wrap_courier_point_radio_active
              )}
            >
              <span
                className={cn(
                  styles.wrap_courier_point_radio_dot,
                  variableBuyer.delivery.id === variant.id &&
                    styles.wrap_courier_point_radio_dot_active
                )}
              ></span>
            </span>
            {variant.name}
          </button>
          <div
            className={cn(
              styles.wrap_courier_desc,
              variableBuyer.delivery.id === variant.id &&
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
            <ul
              className={cn(styles.dropdownContainer, {
                [styles.dropdownContainerActive]: openSelect,
              })}
            >
              {times.map((time, index) => (
                <li
                  key={index}
                  className={styles.dropdownItem}
                  onClick={() => selectTime(time.value)}
                >
                  {time.value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourierDeliveryType;
