"use client";
import { useState } from "react";
import styles from "../style.module.scss";
import cn from "clsx";
import { ArrowDropdown } from "../../../../../../public/Icons/Icons";
import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";

interface ICourierDeliveryTypeProps {
  openPay: string;
  setOpenPay: React.Dispatch<React.SetStateAction<string>>;
  variants: DeliveryMethod;
}

const CourierDeliveryType = ({
  openPay,
  setOpenPay,
  variants,
}: ICourierDeliveryTypeProps) => {
  const [openTime, setOpenTime] = useState(false);

  const openTimeHandler = () => {
    setOpenTime(!openTime);
  };

  return (
    <div className={styles.wrap_courier}>
      <div className={styles.wrap_selectAddress}>
        <button className={styles.wrap_selectAddress_dropdown}>Бишкек</button>
        <input type="text" className={styles.wrap_selectAddres_input} />
      </div>
      <button
        onClick={() => setOpenPay("1")}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_courier_point,
          openPay === "1" && styles.wrap_courier_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_courier_point_radio,
            openPay === "1" && styles.wrap_courier_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_courier_point_radio_dot,
              openPay === "1" && styles.wrap_courier_point_radio_dot_active
            )}
          ></span>
        </span>
        {variants[8].name}
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          openPay === "1" && styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>{variants[8].desc}</p>
      </div>
      <button
        onClick={() => setOpenPay("2")}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_courier_point,
          openPay === "2" && styles.wrap_courier_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_courier_point_radio,
            openPay === "2" && styles.wrap_courier_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_courier_point_radio_dot,
              openPay === "2" && styles.wrap_courier_point_radio_dot_active
            )}
          ></span>
        </span>
        {variants[10].name}
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          openPay === "2" && styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>{variants[10].desc}</p>
      </div>
      <button
        onClick={() => setOpenPay("3")}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_courier_point,
          openPay === "3" && styles.wrap_courier_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_courier_point_radio,
            openPay === "3" && styles.wrap_courier_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_courier_point_radio_dot,
              openPay === "3" && styles.wrap_courier_point_radio_dot_active
            )}
          ></span>
        </span>
        {variants[12].name}
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          openPay === "3" && styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>{variants[12].desc}</p>
      </div>
      <button
        onClick={() => setOpenPay("4")}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_courier_point,
          openPay === "4" && styles.wrap_courier_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_courier_point_radio,
            openPay === "4" && styles.wrap_courier_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_courier_point_radio_dot,
              openPay === "4" && styles.wrap_courier_point_radio_dot_active
            )}
          ></span>
        </span>
        {variants[13].name}
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          openPay === "4" && styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>{variants[13].desc}</p>
      </div>
      <div className={styles.wrap_courier_selectTime}>
        <button
          onClick={openTimeHandler}
          className={styles.wrap_courier_selectTime_button}
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
        ></div>
      </div>
    </div>
  );
};

export default CourierDeliveryType;
