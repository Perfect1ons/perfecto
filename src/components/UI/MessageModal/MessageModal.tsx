"use client";
import React, { useEffect } from "react";
import { Cross, XMark } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import cn from "clsx";
import { useModal } from "@/context/ModalContext/ModalContext";

const MessageModal = () => {
  const { modalMessage, isModalVisible, hideModal } = useModal();

  useEffect(() => {
    if (isModalVisible) {
      const timer = setTimeout(() => {
        hideModal();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isModalVisible, modalMessage, hideModal]);

  return (
    <div className={cn(styles.modal, { [styles.visible]: isModalVisible })}>
      <span className={styles.modal__title}>{modalMessage}</span>
      <span className={styles.closeModal} onClick={hideModal}>
        <Cross />
      </span>
    </div>
  );
};

export default MessageModal;
