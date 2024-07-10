"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import cn from "clsx";
import BasketProducts from "./BasketProducts/BasketProducts";
import { RootState } from "@/store";
import Link from "next/link";

const Basket = () => {
  const data = useSelector((store: RootState) => store.cart);

  const dispatch = useDispatch();
  return (
    <div className="container">
      {data.cart.length <= 0 ? (
        <section className={cn(styles.section)}>
          <div className={styles.content}>
            <div
              className={cn("mascot_sprite", "mascot_sprite_empty_cart")}
            ></div>
            <div className={styles.content_text}>
              <h3 className={styles.content_text_h3}>
                К сожалению ваша корзина пуста
              </h3>
              <p>
                Добавляйте понравившиеся товары в корзину
                <br />
                или авторизуйтесь, если добавляли ранее
              </p>
            </div>
          </div>
          <Link href="/" className={styles.linkToMain}>
            Перейти на главную
          </Link>
        </section>
      ) : (
        <BasketProducts />
      )}
    </div>
  );
};

export default Basket;
