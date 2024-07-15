"use client"

import Link from 'next/link';
import styles from './style.module.scss'
import clsx from 'clsx';
import { SettingsIcons } from '../../../public/Icons/Icons';
import UserNotification from './UserNotification/UserNotification';


const Profile = () => {

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/jlogin", {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        window.location.reload();
        console.log("Not authenticated");
      } else {
        console.log("Failed to logout");
      }
    } catch (error) {
      console.log("An error occurred");
    }
  };

  return (
    <section className={styles.profile}>
      <div className="container">
        <div className={styles.profile__cards}>
          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <span>icon</span>
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>
                  Нурдин Улуу Нурболот
                </p>
                <p className={styles.phone}>
                  <span>т.</span>
                  <span className={styles.phone__number}>
                    +996 221 33 40 05
                  </span>
                </p>
                <p className={styles.city}>
                  <span>г.</span>
                  <span className={styles.city__name}>
                    Бишкек, ул. Матыева{" "}
                    <span className={styles.city__name_address}>148</span> ОсОО
                    Смарткей
                  </span>
                </p>
              </div>
            </div>

            <div className={styles.profile__userInfo_footer}>
              <button
                onClick={handleLogout}
                className={styles.profile__exit}
              >
                Выйти
              </button>
              <Link
                className={clsx("link", styles.profile__settings)}
                href={"/profile/pd"}
              >
                <SettingsIcons />
                <span>Личные данные</span>
              </Link>
            </div>
          </div>

          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <span>icon</span>
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>Текущие заказы</p>
                <p className={styles.orders}>
                  У вас <span className={styles.orders__count}>3</span> активных
                  заказов
                </p>
              </div>
            </div>
            <div className={styles.orders__images}>
              <div className={styles.orders__images}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className={styles.orders__img}>
                    <span>order</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <span>icon</span>
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>История заказов</p>

                <p className={styles.orders}>
                  Всего <span className={styles.orders__count}> 23</span>{" "}
                  заказов
                </p>
              </div>
            </div>
            <div className={styles.orders__images}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={styles.orders__img}>
                  <span>order</span>
                </div>
              ))}
              <div className={styles.orders__img}>
                <span>Еще 19...</span>
              </div>
            </div>
          </div>

          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <span>icon</span>
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>Уведомления</p>
                <p className={styles.orders}>
                  У вас <span className={styles.orders__count}>1</span>{" "}
                  уведомление
                </p>
              </div>
            </div>
            <div className={styles.profile__userInfo_footer}>
              <span></span>
              <Link
                className={clsx("link", styles.profile__settings)}
                href={"/profile/notification"}
              >
                <SettingsIcons />
                <span>Настроить уведомления</span>
              </Link>
            </div>
          </div>

          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <span>icon</span>
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>Корзина</p>
                <p className={styles.orders}>
                  В корзине <span className={styles.orders__count}>2</span>{" "}
                  товара
                </p>
              </div>
            </div>
            <div className={styles.orders__images}>
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className={styles.orders__img}>
                  <span>order</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <span>icon</span>
              </div>
              <div>
                <p className={styles.profile__userInfo_name}>Избранное</p>
                <p className={styles.orders}>
                  Товаров в избранном нет
                  <br />
                  Добавляйте товары в избранное, <br /> чтобы долго не искать
                </p>
              </div>
            </div>
            <div className={styles.profile__userInfo_footer}>
              <span></span>
              <button className={styles.profile__exit}>
                Перейти в каталог
              </button>
            </div>
          </div>
        </div>
        <UserNotification />
      </div>
    </section>
  );
}

export default Profile