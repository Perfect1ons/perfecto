"use client";

import Link from "next/link";
import styles from "./style.module.scss";
import clsx from "clsx";
import { SettingsIcons } from "../../../public/Icons/Icons";
import UserNotification from "./UserNotification/UserNotification";
import Image from "next/image";

const Profile = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "DELETE",
      });
      if (response.ok) {
        window.location.reload();
      } 
    } catch (error) {
      console.log("An error occurred");
    }
  };

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    // ваш код для добавления в избранное
    console.log("Добавлено в избранное");
  };

  return (
    <section className={styles.profile}>
      <Link href="/item">
        <div>
          <div>Image</div>
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam
            voluptatem facere quibusdam tempora expedita libero veniam, ab
            exercitationem, fugit dolorum iusto molestias reiciendis doloreque,
            cumque voluptatibus explicabo nobis suscipit et!
          </div>
          <button className="default__buttons_showMore" onClick={addToFavorite}>Добавить в избранное</button>
        </div>
      </Link>

      <div className="container">
        <div className={styles.profile__cards}>
          <div className={styles.profile__userInfo}>
            <div className={styles.profile__userInfo_header}>
              <div className={styles.profile__userInfo_icon}>
                <Image
                  className={styles.profile__img}
                  src={"/img/userPhoto.png"}
                  width={60}
                  height={60}
                  alt="clipboard"
                  quality={100}
                />
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
              <button onClick={handleLogout} className={styles.profile__exit}>
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
                <Image
                  src={"/img/orderclipboard.svg"}
                  width={45}
                  height={45}
                  alt="clipboard"
                />
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
                <Image
                  src={"/img/orderhistory.svg"}
                  width={45}
                  height={45}
                  alt="clipboard"
                />
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
                <Image
                  src={"/img/ordernotif.svg"}
                  width={45}
                  height={45}
                  alt="clipboard"
                />
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
                <Image
                  src={"/img/orderbag.svg"}
                  width={45}
                  height={45}
                  alt="clipboard"
                />
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
                <Image
                  src={"/img/orderfav.svg"}
                  width={40}
                  height={40}
                  alt="clipboard"
                />
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
};

export default Profile;
