import cn from "clsx";
import styles from "./style.module.scss";
import Link from "next/link";

const BasketEmpty = () => {
  return (
    <div  className={cn("container", styles.empty__container)}>
      <div className={styles.empty}>
        <div className={styles.content}>
          <div
            className={cn("mascot_sprite", "mascot_sprite_empty_cart")}
          ></div>
          <div className={styles.content_text}>
            <h3 className={styles.content__title}>
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
      </div>
    </div>
  );
};

export default BasketEmpty;
