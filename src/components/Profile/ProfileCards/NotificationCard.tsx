"use client";
import Image from "next/image";
import styles from "./card.module.scss";
import Link from "next/link";
import { SettingsIcons } from "../../../../public/Icons/Icons";
import clsx from "clsx";

interface INotificationCardProps {
  notif: number;
}

const NotificationCard = ({ notif }: INotificationCardProps) => {
  const getNotificationText = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return "уведомление";
    } else if (
      count % 10 >= 2 &&
      count % 10 <= 4 &&
      (count % 100 < 10 || count % 100 >= 20)
    ) {
      return "уведомления";
    } else {
      return "уведомлений";
    }
  };

  const notificationText = getNotificationText(notif);

  return (
    <Link className="link" href={"/profile/notification"}>
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
              У вас <span className={styles.orders__count}>{notif}</span>{" "}
              {notificationText}
            </p>
          </div>
        </div>
        <div className={styles.profile__userInfo_footer}>
          <span></span>
          <Link
            className={clsx("link", styles.profile__settings)}
            href={"/profile/notification?type=notification"}
          >
            <SettingsIcons />
            <span>Настроить уведомления</span>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
