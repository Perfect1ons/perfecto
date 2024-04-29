import cn from "clsx";
import styles from "./style.module.scss";
import React from "react";

interface MobModalProps {
  isVisible: boolean;
  close: () => void;
  children: React.ReactElement;
}

export default function MobileModal({
  close,
  isVisible,
  children,
}: MobModalProps) {
  return (
    <div className={cn(styles.modal, isVisible && styles.modal_active)}>
      {children}
    </div>
  );
}
