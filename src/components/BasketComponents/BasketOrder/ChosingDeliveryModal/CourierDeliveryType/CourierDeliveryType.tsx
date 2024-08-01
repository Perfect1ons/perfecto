"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "../style.module.scss";
import cn from "clsx";
import { СhevronDownIcon } from "../../../../../../public/Icons/Icons";
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
    directory: {
      street: string;
      house: string;
      apartament: string;
    };
  };
  cityChange: (newCity: { name: string; id: number }) => void;
  regionChange: (newRegion: { name: string; id: number }) => void;
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
  regionChange,
  adressChange,
}: ICourierDeliveryTypeProps) => {
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
    </div>
  );
};

export default CourierDeliveryType;
