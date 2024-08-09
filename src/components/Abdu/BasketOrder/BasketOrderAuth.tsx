"use client";
import { useState, useCallback, useEffect } from "react";
import styles from "./styles.module.scss";

interface IBasketOrderAuthProps {
  totalQuantity: number;
  totalPrice: number;
}

const BasketOrderAuth = ({
  totalQuantity,
  totalPrice,
}: IBasketOrderAuthProps) => {
  const [animatedPrice, setAnimatedPrice] = useState<number>(totalPrice);

  const animatePrice = useCallback((startValue: number, endValue: number) => {
    const duration = 300; // Duration of animation in milliseconds
    const start = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const newValue = Math.round(
        startValue + (endValue - startValue) * progress
      );

      setAnimatedPrice(newValue);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setAnimatedPrice(endValue); // Ensure final value is set precisely
      }
    };

    requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    animatePrice(animatedPrice, totalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPrice, animatePrice]);

  return (
    <div className={styles.order_box}>
      <p className={styles.order_box_title}>Ваша корзина</p>
      <div className={styles.order_box_counts}>
        <p className={styles.tovars_count}>Товары, {totalQuantity} шт.</p>
        <p className={styles.tovars_price}>
          {animatedPrice.toLocaleString("RU")}
          <span className={styles.som}>с</span>
        </p>
      </div>
      <div className={styles.order_box_total}>
        <p className={styles.total}>Итого:</p>
        <p className={styles.total__price}>
          {animatedPrice.toLocaleString("RU")}
          <span className={styles.total__som}>с</span>
        </p>
      </div>
    </div>
  );
};

export default BasketOrderAuth;
