"use client";
import { useCartContext } from "@/components/ContextCart/CartContext";
import styles from "./style.module.scss";
import cn from "clsx";
import Link from "next/link";

const Basket = () => {
  const { cart } = useCartContext();
  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <section className={cn("container", styles.section)}>
          <div className={styles.content}>
            <div
              className={cn("mascot_sprite", "mascot_sprite_empty_cart")}
            ></div>
            <div className={styles.content_text}>
              <h1 className={styles.content_text_h1}>Корзина пуста</h1>
              <p>
                Добавляйте понравившиеся товары в корзину
                <br />
                или авторизуйтесь, если добавляли ранее.
              </p>
            </div>
          </div>
          <Link href="/" className={styles.linkToMain}>
            Перейти на главную
          </Link>
        </section>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Basket;
