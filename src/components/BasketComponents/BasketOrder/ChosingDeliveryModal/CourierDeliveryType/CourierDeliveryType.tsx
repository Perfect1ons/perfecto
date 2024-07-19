"use client";
import { useState } from "react";
import styles from "../style.module.scss";
import cn from "clsx";
import { ArrowDropdown } from "../../../../../../public/Icons/Icons";

interface ICourierDeliveryTypeProps {
  openPay: string;
  setOpenPay: React.Dispatch<React.SetStateAction<string>>;
}

const CourierDeliveryType = ({
  openPay,
  setOpenPay,
}: ICourierDeliveryTypeProps) => {
  const [openTime, setOpenTime] = useState(false);

  const openTimeHandler = () => {
    setOpenTime(!openTime);
  };

  return (
    <div className={styles.wrap_courier}>
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
        По Кыргызстану - от 300 сом
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          openPay === "1" && styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>
          Стоимость доставки по Кыргызстану 300 сом - заказ весом до 5 кг,
          размер до 40-40-40 см. Стоимость доставки заказов более 5 кг. сообщит
          менеджер после оформления.
        </p>
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
        Курьером по г. Бишкек от 200 сом
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          openPay === "2" && styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>
          Доставка в пределах красной черты 200 сом. За пределы черты взимается
          доплата. Бесплатная доставка осуществляется в течении рабочего дня или
          на следующий день.
        </p>
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
        Согласовать с менеджером
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          openPay === "3" && styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>
          Менеджер свяжется с вами для согласования стоимости и условий
          доставки.
        </p>
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
        Габаритный груз от 600 сом
      </button>
      <div
        className={cn(
          styles.wrap_courier_desc,
          openPay === "4" && styles.wrap_courier_desc_active
        )}
      >
        <p className={styles.wrap_courier_desc_workdays}>
          Стоимость доставки габаритных товаров оговаривается отдельно с
          менеджером, стоимость доставки от 600 с.{" "}
          {"(Габаритным товаром считается размер более 50 см × 50 см × 50 см)"}
        </p>
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
