"use client";

import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Image from "next/image";

const ItemAccordion = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggle = (index: any) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionItem}>
        <div
          className={`${styles.accordionHeader} ${
            !isMobile ? styles.disabled : ""
          }`}
          onClick={() => handleToggle(0)}
        >
          <div className={styles.accordionHeader__title}>
            <Image
              className={styles.accordionHeader__icon}
              src="/img/delivery_icon.svg"
              height={isMobile ? 24 : 34}
              width={isMobile ? 24 : 34}
              alt="ddos"
            />
            <h3 className={styles.accordionHeader__title_name}>
              Способы доставки
            </h3>
          </div>
          {isMobile && (
            <span
              className={
                activeIndex === 0 ? styles.arrowDown : styles.arrowRight
              }
            ></span>
          )}
        </div>
        <h4
          className={
            activeIndex === 0
              ? styles.accordionContentActive
              : styles.accordionContent
          }
        >
          Согласовать с менеджером, Бесплатная доставка, Курьером по г. Бишкек
          от 200 сом, Самовывоз, По Кыргызстану – от 300 сом, Габаритный груз от
          600 сом.
        </h4>
      </div>
      <div className={styles.accordionItem}>
        <div
          className={`${styles.accordionHeader} ${
            !isMobile ? styles.disabled : ""
          }`}
          onClick={() => handleToggle(1)}
        >
          <div className={styles.accordionHeader__title}>
            <Image
              className={styles.accordionHeader__icon}
              src="/img/wallet_icon.svg"
              height={isMobile ? 24 : 34}
              width={isMobile ? 24 : 34}
              alt="wallet"
            />
            <h3 className={styles.accordionHeader__title_name}>
              Оплата удобным способом
            </h3>
          </div>
          {isMobile && (
            <span
              className={
                activeIndex === 1 ? styles.arrowDown : styles.arrowRight
              }
            ></span>
          )}
        </div>
        <h4
          className={
            activeIndex === 1
              ? styles.accordionContentActive
              : styles.accordionContent
          }
        >
          MBank Online, Наличными в офисе, На электронный кошелек Элсом, Онлайн
          картой Visa, MasterCard, Elcart, Через терминал, Банковский перевод,
          Оплата Balance.kg, Согласовать с менеджером.
        </h4>
      </div>
      <div className={styles.accordionItem}>
        <div
          className={`${styles.accordionHeader} ${
            !isMobile ? styles.disabled : ""
          }`}
          onClick={() => handleToggle(2)}
        >
          <div className={styles.accordionHeader__title}>
            <Image
              className={styles.accordionHeader__icon}
              src="/img/shield_icon.svg"
              height={isMobile ? 24 : 34}
              width={isMobile ? 24 : 34}
              alt="guarantee"
            />
            <h3 className={styles.accordionHeader__title_name}>
              Гарантии покупателя
            </h3>
          </div>
          {isMobile && (
            <span
              className={
                activeIndex === 2 ? styles.arrowDown : styles.arrowRight
              }
            ></span>
          )}
        </div>
        <h4
          className={
            activeIndex === 2
              ? styles.accordionContentActive
              : styles.accordionContent
          }
        >
          Гарантии покупателя.
        </h4>
      </div>
    </div>
  );
};

export default ItemAccordion;
