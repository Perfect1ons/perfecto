"use client"
import Link from 'next/link';
import styles from './style.module.scss'
import AuthModal from '@/components/AuthModal/AuthModal';
import { useState } from 'react';

const FavoriteAuth = () => {
  const [isAuthVisible, setAuthVisible] = useState(false);
  const [isAuthed, setAuthed] = useState(false);
  const openAuthModal = () => setAuthVisible(true);
  const closeAuthModal = () => setAuthVisible(false);

  return (
    <section className={styles.favorites__auth}>
      <AuthModal isVisible={isAuthVisible} close={closeAuthModal} />

      <div className={styles.favorites__auth_card}>
        <h1 className={styles.favorites__auth_card_title}>Войдите в аккаунт</h1>
        <p className={styles.favorites__auth_card_desc}>
          К сожалению только авторизованные пользователи могут взаимодействовать
          с этой страницей
        </p>
        <div className={styles.favorites__auth_buttons}>
          <Link href="/" aria-label='go to main page' className={styles.linkToMain}>
            На главную
          </Link>
          <button title='Войти' aria-label='sign in' onClick={openAuthModal} className={styles.linkToAuth}>
            Войти
          </button>
        </div>
      </div>
    </section>
  );
}

export default FavoriteAuth