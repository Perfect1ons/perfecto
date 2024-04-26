import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./style.module.scss";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  containerId: string;
}

export default function Modal({
  children,
  open,
  setOpen,
  containerId,
}: ModalProps) {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(containerId);
  }, [containerId]);

  const closeModal = () => {
    setOpen(!open);
  };

  return !open && ref.current
    ? createPortal(
        <>
          <div className={styles.overlay} onClick={closeModal}></div>
          <div className={styles.child_wrap}>{children}</div>
        </>,
        ref.current
      )
    : null;
}
