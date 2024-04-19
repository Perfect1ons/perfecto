"use client"
import cn from 'clsx';
import { AuthPersonIcon } from '../../../../public/Icons/Icons';
import styles from './style.module.scss';
import { useRouter } from 'next/navigation';

const Auth = () => {
   const router = useRouter()

  return (
    <section className={styles.auth__section}>
      <div className={cn(styles.auth__container, "container")}>
        <button
          onClick={() => router.push("/auth")}
          className={styles.auth__button}
        >
          <p className={styles.auth__button_icon}>
            <AuthPersonIcon />
          </p>
          Войти или зарегистрироваться
        </button>

        <p className={styles.auth__desc}>
          Войдите или зарегистрируйте свой аккаунт, чтобы получить доступ к
          информации о заказах, избранному, настройке уведомлений, к акциям и
          скидкам.
        </p>
      </div>
    </section>
  );
}

export default Auth