"use client";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./style.module.scss";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  containerId: string;
}

export default function Modal({ children, open, containerId }: ModalProps) {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(containerId);
  }, [containerId]);

  return !open && ref.current
    ? createPortal(
        <>
          <div className={styles.overlay}></div>
          <div className={styles.child_wrap}>{children}</div>
        </>,
        ref.current
      )
    : null;
}
