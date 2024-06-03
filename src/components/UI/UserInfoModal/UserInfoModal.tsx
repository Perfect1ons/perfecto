"use client";
import styles from "./style.module.scss";
import cn from "clsx";
import { Cross } from "../../../../public/Icons/Icons";

interface UserInfoModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}

const UserInfoModal = ({ children, visible, onClose }: UserInfoModalProps) => {
  return (
    <div className={cn(styles.modal, { [styles.open]: visible })}>
      {children}
      <span className={styles.closeModal} onClick={onClose}>
        <Cross />
      </span>
    </div>
  );
};

export default UserInfoModal;
