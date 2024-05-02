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
  // блокирует скролл по странице при открытой модалке
  // useEffect(() => {
  //   const mainElement = document.getElementById("main");
  //   if (mainElement) {
  //     mainElement.style.overflow = isVisible ? "hidden" : "unset";
  //     console.log("there is no void ");
  //   }
  //   return (): void => {
  //     if (mainElement) {
  //       mainElement.style.overflow = "unset";
  //       console.log("there is the void");
  //     }
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
