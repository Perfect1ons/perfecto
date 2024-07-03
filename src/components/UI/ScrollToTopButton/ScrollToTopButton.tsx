"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpIcon } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 640) {
      // Показываем кнопку, когда высота скролла больше 640px
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.scrollY > 640) {
        // Проверяем также при изменении размера окна
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    handleResize(); // Проверяем при загрузке компонента

    window.addEventListener("scroll", handleScroll); // Добавляем слушателя события скролла
    window.addEventListener("resize", handleResize); // Добавляем слушателя события изменения размера окна

    return () => {
      window.removeEventListener("scroll", handleScroll); // Убираем слушателя события скролла при размонтировании компонента
      window.removeEventListener("resize", handleResize); // Убираем слушателя события изменения размера окна при размонтировании компонента
    };
  }, []);
  return (
    <>
      {showButton && (
        <button className={styles.scrollToTopButton} onClick={scrollToTop}>
          <ArrowUpIcon />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
