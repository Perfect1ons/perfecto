import styles from "./style.module.scss";
import UserNotification from "./UserNotification";
import { Notifications } from "@/types/Profile/Notifications/notifications";

interface INotifications {
  notifications: Notifications;
}

const NotificationPage = ({notifications}: INotifications) => {
  const hasNotifications = notifications.length  > 0;

  return (
    <section className={styles.NotificationPage}>
      <div className="container">
        {hasNotifications === false ? (
          <div>
            {notifications.map((notification) => {
              return <UserNotification notification={notification} key={notification.id}/>;
            })}
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
                  Настройте уведомления чтобы получать информацию о скидках и{" "}
                  <br /> акциях и выгодных предложениях.
                </p>
              </div>
            </div>

            <button
              aria-label="go to settings"
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

export default NotificationPage;
