import { profileLinks } from "@/components/temporary/profileLinks";
import styles from "./style.module.scss";
import UserNotification from "./UserNotification";

const NotificationPage = () => {
  const notificationLink = profileLinks.find((link) => link.id === 5);

  const hasNotifications = (notificationLink?.count ?? 0) > 0;

  return (
    <section className={styles.NotificationPage}>
      <div className="container">
        {hasNotifications ? (
          <div>
            <UserNotification />
            <UserNotification />
            <UserNotification />
          </div>
        ) : (
          <div className={styles.isEmpty}>
            <div className={styles.isEmpty__content}>
              <div className={styles.icon}>
                <span>icon</span>
              </div>

              <div className={styles.isEmpty__desc}>
                <p>
                  Как же так? Вы еще ничего не заказали. Чтобы сделать заказ на
                  нашем сайте просто выберите товар, положите его в корзину и
                  заполните короткую форму.
                </p>
              </div>
            </div>

            <button
              aria-label="go to catalog"
              className={styles.isEmpty__button}
            >
              Перейти в каталог
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Export the NotificationPage component
export default NotificationPage;
