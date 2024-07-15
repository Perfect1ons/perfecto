import Link from "next/link";
import { XMark } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";

const UserNotification = () => {
  return (
    <Link
      href={"tg://resolve?domain=xldropss"}
      target="_blank"
      className="link"
    >
      <div className={styles.UserNotification}>
        <div className={styles.UserNotification__header}>
          <div>
            <span className={styles.date}>12 Июля 2024 г.</span>
              <p
                className={styles.notification__content}
              >
                Акция на бесплатные задания для сайта Next.Max.KG, <br />
                Нажмите на уведомление чтобы написать Абдульазизу для получение
                данной акции
              </p>
          </div>
          <div className={styles.close__notification}>
            <XMark />
          </div>
        </div>
        <div>
          <button className={styles.notification__button}>
            Хорошо, Спасибо!
          </button>
        </div>
      </div>
    </Link>
  );
};

export default UserNotification;
