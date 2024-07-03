import Link from "next/link";
import styles from "./style.module.scss";
import cn from "clsx";

const NotFounded = () => {

  return (
    <section className={styles.not__found}>
        <div className={cn(styles.not__found_container, "container")}>
          <div className={cn("mascot_sprite", "mascot_sprite_not_found")}></div>

          <span className={styles.not__found_error}>Ошибка #404</span>
          <h1 className={styles.not__found_title}>
            К сожалению запрошенная вами страница не существует
          </h1>

          <div className={styles.not__found_reasons}>
            <h2 className={styles.error__reason}>
              Ошибка могла произойти по нескольким причинам:
            </h2>
            <ul className={styles.reason__list}>
              <li className={styles.reason__name}>
                • Вы ввели не правильный адрес.
              </li>
              <li className={styles.reason__name}>
                • Страница на которую вы хотели зайти, устарела или удалена.
              </li>
              <li className={styles.reason__name}>
                • Акция, ранее действовавшая на сайте закончилась.
              </li>
              <li className={styles.reason__name}>
                • На сервере произошла ошибка, если это так, то мы уже ее
                исправляем
              </li>
            </ul>
          </div>

          <Link href={"/"} >
            <button aria-label="go to main page" className={styles.goToMain__button}>
              Перейти на главную
            </button>
          </Link>
        </div>
    </section>
  );
};

export default NotFounded;
