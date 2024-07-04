"use client";
import { useEffect } from "react";
import styles from "./style.module.scss";
import cn from "clsx";
import Link from "next/link";
import { Cross } from "../../../../public/Icons/Icons";

interface FavoriteModalProps {
  isVisible: boolean;
  message: string;
  isRedirect: boolean;
  onClose: () => void;
}

const FavoriteModal = ({
  isVisible,
  message,
  isRedirect,
  onClose,
}: FavoriteModalProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Закрыть модалку через 3 секунды
      return () => clearTimeout(timer);
    }
  }, [isVisible, message, onClose]);

  if (isRedirect) {
    return (
      <Link
        href="/favorites"
        className={cn(styles.modal, { [styles.visible]: isVisible })}
      >
        {message}
        <span onClick={() => onClose()} className={styles.modal_cross}>
          {" "}
          <Cross />
        </span>
      </Link>
    );
  }

  return (
    <div className={cn(styles.modal, { [styles.visible]: isVisible })}>
      {message}
      <span onClick={() => onClose()} className={styles.modal_cross}>
        {" "}
        <Cross />
      </span>
    </div>
  );
};

export default FavoriteModal;
