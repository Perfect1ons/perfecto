import cn from "clsx";
import styles from "./style.module.css";
import Backdrop from "../Backdrop/Backdrop";
import { useEffect } from "react";

interface ModalProps {
  isVisible: boolean;
  close: () => void;
  children: React.ReactNode;
}

const Modal = ({ children, isVisible, close }: ModalProps) => {
  // добавляет выход из модалки через клавишу esc
  useEffect(() => {
    const closeOnEscKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? close() : null;
    document.body.addEventListener("keydown", closeOnEscKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscKey);
    };
  }, [close]);

  // блокирует скролл по странице при открытой модалке
  // useEffect(() => {
  //   isVisible
  //     ? (document.body.style.overflow = "hidden")
  //     : (document.body.style.overflow = "unset");
  //   return (): void => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, [isVisible]);

  return (
    <div className={styles.wrap}>
      <Backdrop isVisible={isVisible} close={close} />
      <div className={cn(styles.modal, isVisible && styles.show)}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
