"use client";
import { useCartContext } from "@/components/ContextCart/CartContext";
import styles from "./style.module.scss";
import Image from "next/image";

const Basket = () => {
  const { cart } = useCartContext();
  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <div className={styles.empty}>
          <div className="undefinedPage"></div>
          <div className={styles.empty__yourCart}>
            <h1 className={styles.empty__yourCart__h1}>
              К сожалению, ваша корзина пуста.
            </h1>
            <p className={styles.empty__yourCart__p}>
              Добавляйте понравившиеся товары в корзину или авторизуйтесь, если
              добавляли ранее.
            </p>
          </div>
          <button className={styles.empty__button}>Перейти в каталог</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Basket;
