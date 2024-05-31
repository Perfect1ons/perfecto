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
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionItem}>
        <div className={styles.accordionHeader} onClick={() => handleToggle(0)}>
          <Image
            className={styles.accordionHeader__icon}
            src="https://max.kg/images/delivery_icon.svg"
            height={34}
            width={34}
            alt="ddos"
          />
          Способы доставки
        </div>
        <div
          className={
            activeIndex === 0
              ? styles.accordionContentActive
              : styles.accordionContent
          }
        >
          Согласовать с менеджером, Бесплатная доставка, Курьером по г. Бишкек
          от 200 сом, Самовывоз, По Кыргызстану – от 300 сом, Габаритный груз от
          600 сом.
        </div>
      </div>
      <div className={styles.accordionItem}>
        <div className={styles.accordionHeader} onClick={() => handleToggle(1)}>
          <Image
            className={styles.accordionHeader__icon}
            src="https://max.kg/images/opl.png"
            height={34}
            width={34}
            alt="wallet"
          />
          Оплата удобным способом
        </div>
        <div
          className={
            activeIndex === 1
              ? styles.accordionContentActive
              : styles.accordionContent
          }
        >
          MBank Online, Наличными в офисе, На электронный кошелек Элсом, Онлайн
          картой Visa, MasterCard, Elcart, Через терминал, Банковский перевод,
          Оплата Balance.kg, Согласовать с менеджером.
        </div>
      </div>
      <div className={styles.accordionItem}>
        <div className={styles.accordionHeader} onClick={() => handleToggle(2)}>
          <Image
            className={styles.accordionHeader__icon}
            src="https://max.kg/images/24xNxgarant.png.pagespeed.ic.Ow9d0Ckbof.webp"
            height={34}
            width={34}
            alt="guarantee"
          />
          Гарантии покупателя
        </div>
        <div
          className={
            activeIndex === 2
              ? styles.accordionContentActive
              : styles.accordionContent
          }
        >
          Гарантии покупателя.
        </div>
      </div>
    </div>
  );
};

export default ItemAccordion;
