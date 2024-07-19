"use client";
import { useState } from "react";
import {
  Cross,
  DeliveryCourier,
  SalesmanIcon,
} from "../../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import cn from "clsx";

interface IChosingDeliveryModalProps {
  visible: string;
  close: (value: string) => void;
}

const ChosingDeliveryModal = ({
  visible,
  close,
}: IChosingDeliveryModalProps) => {
  const [openPoint, setOpenPoint] = useState("");

  const [openPay, setOpenPay] = useState("");

  const [deliveryType, setDeliveryType] = useState("point");

  return (
    <div className={cn(styles.wrap, visible === "delivery" && styles.show)}>
      <div className={styles.wrap_header}>
        <p className={styles.wrap_header_title}>Способы доставки</p>
        <button
          onClick={() => close("")}
          aria-label="close modal"
          className={styles.wrap_header_cross}
        >
          <Cross />
        </button>
      </div>
      {deliveryType === "point" && (
        <div className={styles.wrap_delivery}>
          <button
            onClick={() => setOpenPoint("mederova")}
            aria-label="choose delivery point"
            className={cn(
              styles.wrap_delivery_point,
              openPoint === "mederova" && styles.wrap_delivery_point_active
            )}
          >
            <span
              className={cn(
                styles.wrap_delivery_point_radio,
                openPoint === "mederova" &&
                  styles.wrap_delivery_point_radio_active
              )}
            >
              <span
                className={cn(
                  styles.wrap_delivery_point_radio_dot,
                  openPoint === "mederova" &&
                    styles.wrap_delivery_point_radio_dot_active
                )}
              ></span>
            </span>
            ПВЗ г. Бишкек, Медерова 8\2
          </button>
          <div
            className={cn(
              styles.wrap_delivery_desc,
              openPoint === "mederova" && styles.wrap_delivery_desc_active
            )}
          >
            <p className={styles.wrap_delivery_desc_schedule}>График работы:</p>
            <p className={styles.wrap_delivery_desc_workdays}>
              В будние дни: с 9:00 до 18:00, без перерыва
            </p>
            <p className={styles.wrap_delivery_desc_workdays}>
              Воскресенье: с 9:00 до 18:00, обеденный перерыв: с 13:00 до 14:00
            </p>
            <p className={styles.wrap_delivery_desc_info}>
              Предварительно свяжитесь с вашим менеджером для <br />
              подвержения о готовности выдачи заказа.
            </p>
          </div>
          <button
            onClick={() => setOpenPoint("matyeva")}
            aria-label="choose delivery point"
            className={cn(
              styles.wrap_delivery_point,
              openPoint === "matyeva" && styles.wrap_delivery_point_active
            )}
          >
            <span
              className={cn(
                styles.wrap_delivery_point_radio,
                openPoint === "matyeva" &&
                  styles.wrap_delivery_point_radio_active
              )}
            >
              <span
                className={cn(
                  styles.wrap_delivery_point_radio_dot,
                  openPoint === "matyeva" &&
                    styles.wrap_delivery_point_radio_dot_active
                )}
              ></span>
            </span>
            ПВЗ г. Бишкек, Матыева 148
          </button>
          <div
            className={cn(
              styles.wrap_delivery_desc,
              openPoint === "matyeva" && styles.wrap_delivery_desc_active
            )}
          >
            <p className={styles.wrap_delivery_desc_schedule}>График работы:</p>
            <p className={styles.wrap_delivery_desc_workdays}>
              В будние дни: с 9:00 до 18:00, без перерыва
            </p>
            <p className={styles.wrap_delivery_desc_workdays}>
              Воскресенье: Выходной
            </p>
            <p className={styles.wrap_delivery_desc_info}>
              Предварительно свяжитесь с вашим менеджером для <br />
              подвержения о готовности выдачи заказа.
            </p>
          </div>
        </div>
      )}
      {deliveryType === "courier" && (
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
              размер до 40-40-40 см. Стоимость доставки заказов более 5 кг.
              сообщит менеджер после оформления.
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
              Доставка в пределах красной черты 200 сом. За пределы черты
              взимается доплата. Бесплатная доставка осуществляется в течении
              рабочего дня или на следующий день.
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
              {
                "(Габаритным товаром считается размер более 50 см × 50 см × 50 см)"
              }
            </p>
          </div>
        </div>
      )}
      <div className={styles.wrap_typeDelivery}>
        <button
          onClick={() => setDeliveryType("point")}
          aria-label="choose type delivery"
          className={cn(
            styles.wrap_typeDelivery_typePoint,
            deliveryType !== "point" &&
              styles.wrap_typeDelivery_typePoint_disactive
          )}
        >
          <SalesmanIcon />
          Пункты выдачи
        </button>
        <button
          onClick={() => setDeliveryType("courier")}
          aria-label="choose type delivery"
          className={cn(
            styles.wrap_typeDelivery_typeCourier,
            deliveryType === "courier" &&
              styles.wrap_typeDelivery_typeCourier_active
          )}
        >
          <DeliveryCourier />
          Курьер
        </button>
      </div>
    </div>
  );
};

export default ChosingDeliveryModal;
