import cn from "clsx";
import styles from "./style.module.scss";

interface ModalProps {
  isVisible: boolean;
  children: React.ReactNode;
  close: () => void;
}

const Modal = ({ children, isVisible }: ModalProps) => {
  return (
    <div className={styles.wrap}>
      <div className={cn(styles.modal, isVisible && styles.show)}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
