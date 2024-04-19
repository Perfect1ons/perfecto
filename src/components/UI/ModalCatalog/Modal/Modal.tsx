import cn from "clsx";
import styles from "./style.module.css";
import Backdrop from "../Backdrop/Backdrop";

interface ModalProps {
  isVisible: boolean;
  close: () => void;
  children: React.ReactNode;
}

const Modal = ({ children, isVisible, close }: ModalProps) => {
  return (
    <>
      <Backdrop isVisible={isVisible} close={close} />
      <div className={cn(styles.modal, isVisible && styles.show)}>
        {children}
      </div>
    </>
  );
};

export default Modal;
