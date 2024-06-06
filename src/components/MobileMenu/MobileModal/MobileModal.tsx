import cn from "clsx";
import styles from "./style.module.scss";
import { useEffect } from "react";

interface MobModalProps {
  isVisible: boolean;
  children: React.ReactElement;
}

export default function MobileModal({ isVisible, children }: MobModalProps) {
  useEffect(() => {
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isVisible) {
      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
      body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = body.style.top;
      body.style.paddingRight = "";
      body.style.overflow = "auto";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      body.style.top = "";
    }
  }, [isVisible]);

  return (
    <div className={cn(styles.modal, isVisible && styles.modal_active)}>
      {children}
    </div>
  );
}
