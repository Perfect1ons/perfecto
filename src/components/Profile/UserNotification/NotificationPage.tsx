"use client"
import React, { useState } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import UserNotification from "./UserNotification";
import { INotifications } from "@/types/Profile/Notifications/notifications";

interface INotificationsProps {
  notifications: INotifications;
}

const NotificationPage = ({
  notifications: initialNotifications,
}: INotificationsProps) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const hasNotifications = notifications.length > 0;

  return (
    <section className={styles.NotificationPage}>
      <div className="container">
        {hasNotifications ? (
          <div>
            {notifications.map((notification) => (
              <UserNotification
                key={notification.id}
                notification={notification}
                onDelete={handleDelete}
              />
            ))}
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

            <Link
              href={"/profile/notification?type=notification"}
              className="link"
            >
              <button
                aria-label="go to settings"
                className={styles.isEmpty__button}
              >
                Настроить
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default NotificationPage;
