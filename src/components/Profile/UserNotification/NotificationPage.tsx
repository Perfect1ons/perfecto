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
                  У вас нет уведомлений. <br />
                   Настройте уведомления чтобы получать
                  информацию о скидках и <br /> акциях и выгодных предложениях.
                </p>
              </div>
            </div>

            <button
              aria-label="go to catalog"
              className={styles.isEmpty__button}
            >
              Настроить
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Export the NotificationPage component
export default NotificationPage;
