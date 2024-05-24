"use client";
import Link from "next/link";
import styles from "./style.module.scss";
import Image from "next/image";
import cn from "clsx";
import { useEffect, useState } from "react";
import Loader from "../UI/Loader/Loader";

const NotFounded = () => {
  const [loading, setLoading] = useState(false); // Установим loading в false по умолчанию

  useEffect(() => {
    setLoading(false); // Установим loading в false после загрузки компонента
  }, []);

  return (
    <section className={styles.not__found}>
      {/* Отображаем лоадер, пока loading === true */}
      {loading ? (
        <Loader />
      ) : (
        <div className={cn(styles.not__found_container, "container")}>
          <div className={cn("mascot_sprite", "mascot_sprite_not_found")}>
            {/* <Image
              src={"/img/undefinedPage.png"}
              width={180}
              height={180}
              alt="undefined"
              loading="lazy" // Добавлен атрибут loading="lazy" для ленивой загрузки изображения
            /> */}
          </div>

          <span className={styles.not__found_error}>Ошибка #404</span>
          <h1 className={styles.not__found_title}>
            К сожалению запрошенная вами страница не существует
          </h1>

          <div className={styles.not__found_reasons}>
            <h4 className={styles.error__reason}>
              Ошибка могла произойти по нескольким причинам:
            </h4>
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

          <Link href={"/"}>
            <button className={styles.goToMain__button}>
              Перейти на главную
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default NotFounded;
