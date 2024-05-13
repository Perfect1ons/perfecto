import cn from "clsx";
import styles from "./style.module.scss";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

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
