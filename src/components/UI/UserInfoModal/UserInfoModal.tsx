"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import cn from "clsx";

interface UserInfoModalProps {
  children: React.ReactNode;
  visible: boolean;
}

const UserInfoModal = ({ children, visible }: UserInfoModalProps) => {
  return (
    <div className={cn(styles.modal, { [styles.open]: visible })}>
      {children}
    </div>
  );
};

export default UserInfoModal;
