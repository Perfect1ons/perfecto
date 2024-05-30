"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import cn from "clsx";

interface UserInfoModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const UserInfoModal = ({ children, isOpen }: UserInfoModalProps) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    }
  }, [isOpen]);

  return (
    <div className={cn(styles.modal, { [styles.open]: visible })}>
      {children}
    </div>
  );
};

export default UserInfoModal;
