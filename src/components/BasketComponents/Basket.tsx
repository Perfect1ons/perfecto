"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Items } from "@/types/CardProduct/cardProduct";

const Basket = () => {
  const data = useSelector((store: RootState) => store.cart);
  return (
    <div className={styles.container}>
      {data.cart.length === 0 ? (
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
        <div>
          <h2>Содержимое корзины:</h2>
          <ul>
            {data.cart.map((product: Items) => (
              <li key={product.id}>
                <div>{product.name}</div>
                <div>{product.price}</div>
                {/* Добавьте другие свойства продукта, которые вы хотите отобразить */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    // <div className={styles.container}>
    //   {cart.length === 0 ? (
    //     <div className={styles.empty}>
    //       <div className="undefinedPage"></div>
    //       <div className={styles.empty__yourCart}>
    //         <h1 className={styles.empty__yourCart__h1}>
    //           К сожалению, ваша корзина пуста.
    //         </h1>
    //         <p className={styles.empty__yourCart__p}>
    //           Добавляйте понравившиеся товары в корзину или авторизуйтесь, если
    //           добавляли ранее.
    //         </p>
    //       </div>
    //       <button className={styles.empty__button}>Перейти в каталог</button>
    //     </div>
    //   ) : (
    //     <div></div>
    //   )}
    // </div>
  );
};

export default Basket;
