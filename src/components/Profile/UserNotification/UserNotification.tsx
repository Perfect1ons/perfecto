"use client";
import { deleteNotification } from "@/api/clientRequest";
import { XMark } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { Notification } from "@/types/Profile/Notifications/notifications";

interface UserNotificationProps {
  notification: Notification;
  onDelete: (id: number) => void;
}

const UserNotification = ({
  notification,
  onDelete,
}: UserNotificationProps) => {
  const date = notification.date ? new Date(notification.date * 1000) : null;

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("ru-RU", options);

    return (
      formattedDate.charAt(0) +
      formattedDate
        .slice(1)
        .replace(
          /(\s)([а-я])/i,
          (_, space, char) => `${space}${char.toUpperCase()}`
        )
    );
  };

  const closeNotif = async (id: number) => {
    try {
      await deleteNotification(id);
      onDelete(id); // Trigger deletion in parent component
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.UserNotification}>
      <div className={styles.UserNotification__header}>
        <div>
          <span className={styles.date}>
            {date ? formatDate(date) : "Дата недоступна"}
          </span>
          <p className={styles.notification__content}>{notification.text}</p>
        </div>
        <div
          onClick={() => closeNotif(notification.id)}
          className={styles.close__notification}
        >
          <XMark />
        </div>
      </div>
      <div>
        <button
          onClick={() => closeNotif(notification.id)}
          className={styles.notification__button}
        >
          Хорошо, Спасибо!
        </button>
      </div>
    </div>
  );
};

export default UserNotification;
