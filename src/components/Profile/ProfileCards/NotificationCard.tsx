"use client"
import Image from 'next/image';
import styles from './card.module.scss'
import Link from 'next/link';
import { SettingsIcons } from '../../../../public/Icons/Icons';
import clsx from 'clsx';

const NotificationCard = () => {
  return (
    
    <Link className='link' href={'/profile/notification'}>
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
                У вас <span className={styles.orders__count}>1</span> уведомление
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
}

export default NotificationCard