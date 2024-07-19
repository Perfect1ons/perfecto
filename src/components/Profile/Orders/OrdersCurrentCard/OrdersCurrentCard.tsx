"use client";
import { CurrentOrdersType } from "@/types/Profile/CurrentOrders";
import styles from "./style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import Link from "next/link";
import { DollarIcon, XMark } from "../../../../../public/Icons/Icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import cn from "clsx";
import { StatusDetailsType } from "@/types/Profile/statusDetails";
import { postСancellationOrder } from "@/api/clientRequest";

interface ICurrentOrdersProps {
  currentOrders: CurrentOrdersType;
  details: StatusDetailsType;
  isAuthed: string;
}
const OrdersCurrentCard = ({
  currentOrders,
  details,
  isAuthed,
}: ICurrentOrdersProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string, key?: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    if (key === "seconds") {
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    } else {
      return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }
  };
  const formatDeliveryDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const month = months[date.getMonth()];
    return `Доставка ожидается ${day} ${month}`;
  };
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const getCurrentDateTime = () => {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    };

    setCurrentDateTime(getCurrentDateTime());
  }, []);

  const router = useRouter();
  const visibleDetails = () => {
    setIsVisible(!isVisible);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    if (isVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible]);
  const sortedOrders = [...currentOrders.items].sort(
    (a, b) => a.status - b.status
  );
  return (
    <div className={styles.myOrdersContainer}>
      {currentOrders.items.map((item) => {
        const formattedDate1 = formatDate(item.dat1);
        const formattedDeliveryDate = formatDeliveryDate(item.dat_dos2);

        return (
          <div key={item.id} className={styles.myOrders}>
            <div className={styles.myOrdersHeader}>
              <div className={styles.myNumberOder}>
                <h3
                  onClick={() => router.push(`/profile/orders/${item.id}`)}
                  className={styles.myNumberOder__title}
                >
                  Заказ №: {item.id} от {formattedDate1}
                </h3>
                <div className={styles.myNumberOder__time}>
                  <Image
                    src={`${url}images/delivery_icon.svg`}
                    width={20}
                    height={20}
                    alt="delivery_icon"
                  />
                  <p>{formattedDeliveryDate}</p>
                </div>
                <Link
                  className={styles.myNumberOder__link}
                  href={`/profile/orders/${item.id}`}
                >
                  Подробнее
                </Link>
              </div>
              <div className={styles.myDostOder}>
                <h4 className={styles.myDostOder__title}>
                  {details.find((detail) => detail.id === item.status)
                    ?.sinonim || "Неизвестный статус"}
                </h4>

                <p className={styles.status__date}>{currentDateTime}</p>
                <span
                  onClick={visibleDetails}
                  className={styles.myDostOder__link}
                >
                  Детализация
                </span>
                <div
                  ref={dropdownRef}
                  className={cn(styles.containerDetails, {
                    [styles.containerDetailsVisible]: isVisible,
                  })}
                >
                  <div className={styles.containerDetails__header}>
                    <h4 className={styles.containerDetails__header__status}>
                      Детализация статуса заказа
                    </h4>
                    <span
                      className={styles.containerDetails__header__icon}
                      onClick={visibleDetails}
                    >
                      <XMark />
                    </span>
                  </div>
                  <ul className={styles.ulDetailsContainer}>
                    {details.map((data, index) => (
                      <li
                        className={styles.ulDetailsContainer__text}
                        key={index}
                      >
                        {data.naim === "К отгрузке." ? (
                          <span
                            className={cn(
                              styles.ulDetailsContainer__text__ring
                            )}
                          ></span>
                        ) : (
                          <div className={styles.containerIsCompleted}>
                            <span
                              className={cn(
                                styles.ulDetailsContainer__text__circle,
                                {
                                  [styles.ulDetailsContainer__text__circleActive]:
                                    item.status > index,
                                }
                              )}
                            ></span>
                            <span
                              className={cn(
                                styles.ulDetailsContainer__text__stick,
                                {
                                  [styles.ulDetailsContainer__text__stickActive]:
                                    item.status > index,
                                }
                              )}
                            ></span>
                          </div>
                        )}
                        {data.sinonim}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.mySummaOder}>
                <span className={styles.mySummaOder__icon}>
                  <DollarIcon />
                </span>
                <div className={styles.mySummaOder__itogo}>
                  <p className={styles.mySummaOder__itogo__summa}>
                    К оплате: {item.temp_itogo.toLocaleString("ru-RU")}
                    <span className={styles.priceCustom}> с</span>
                  </p>
                  <p className={styles.mySummaOder__itogo__summa}>
                    Оплачено: {item.temp_opl.toLocaleString("ru-RU")}
                    <span className={styles.priceCustom}> с</span>
                  </p>
                  <p className={styles.mySummaOder__itogo__summa}>
                    Остаток: {item.temp_ost.toLocaleString("ru-RU")}
                    <span className={styles.priceCustom}> с</span>
                  </p>
                </div>
              </div>
              <div className={styles.myActionOder}>
                <p className={styles.myActionOder__way}>
                  Способ оплаты: Наличными в офисе
                </p>
                <button
                  onClick={() => postСancellationOrder(isAuthed, item.id)}
                  className={styles.myActionOder__button}
                >
                  Отменить
                </button>
              </div>
            </div>
            <div className={styles.myOrdersFooter}>
              {item.img.map((image, index) => {
                return (
                  <div key={index} className={styles.imageContainer}>
                    <Image
                      className={styles.imageContainer__image}
                      width={90}
                      height={90}
                      alt="sds"
                      src={image}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersCurrentCard;
