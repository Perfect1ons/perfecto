"use client";
import { useEffect } from "react";
import styles from "./style.module.scss";
import cn from "clsx";
import Link from "next/link";

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
      </Link>
    );
  }

  return (
    <div className={cn(styles.modal, { [styles.visible]: isVisible })}>
      {message}
    </div>
  );
};

export default FavoriteModal;
