import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { Cross } from "../../../../public/Icons/Icons";
import cn from "clsx";
interface InformationModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}

const InformationModal = ({
  children,
  onClose,
  visible,
}: InformationModalProps) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Закрыть модалку через 3 секунды
      return () => clearTimeout(timer);
    }
  }, [visible, children, onClose]);

  return (
    <div className={cn(styles.modal, { [styles.visible]: visible })}>
      <span className={styles.modal__title}>{children}</span>
      <span className={styles.closeModal} onClick={onClose}>
        <Cross />
      </span>
    </div>
  );
};

export default InformationModal;
