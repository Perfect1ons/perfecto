"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "../style.module.scss";
import cn from "clsx";
import { СhevronDownIcon } from "../../../../../../public/Icons/Icons";
import { ICityFront } from "@/types/Basket/cityfrontType";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";

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
  variants: IDeliveryMethod;
  selectDelivery: (delivery: { name: string; id: string | number }) => void;
  deliveryCity: ICityFront;
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
    directory: {
      street: string;
      house: string;
      apartament: string;
    };
  };
  cityChange: (newCity: { name: string; id: number }) => void;
  adressChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CourierDeliveryType = ({
  variants,
  selectDelivery,
  variableBuyer,
  deliveryCity,
  authToken,
  location,
  cityChange,
  adressChange,
}: ICourierDeliveryTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
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
                key={city.city_id}
                className={styles.dropdownItem}
                onClick={() => {
                  cityChange({
                    name: city.name,
                    id: city.city_id,
                  });
                }}
              >
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: "15px" }} className="containerInputLabel">
        <div className="mail__label">
          <input
            className="mail__inputField"
            value={location.directory.street}
            name="street"
            type="text"
            onChange={adressChange}
            required
          />
          <label className="mail__inputLabel">Улица</label>
        </div>
      </div>

      <div className={styles.wrap_courier_housing}>
        <div style={{ marginTop: "15px" }} className="containerInputLabel">
          <div className="mail__label">
            <input
              className="mail__inputField"
              value={location.directory.house}
              name="house"
              type="text"
              onChange={adressChange}
              required
            />
            <label className="mail__inputLabel">Дом</label>
          </div>
        </div>

        <div style={{ marginTop: "15px" }} className="containerInputLabel">
          <div className="mail__label">
            <input
              className="mail__inputField"
              value={location.directory.apartament}
              name="apartament"
              type="text"
              onChange={adressChange}
              required
            />
            <label className="mail__inputLabel">Квартира</label>
          </div>
        </div>
      </div>

      {Object.entries(variants)
        .slice(1)
        .map(([key, variant]) => (
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
              <p className={styles.wrap_courier_desc_workdays}>
                {variant.desc}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CourierDeliveryType;
