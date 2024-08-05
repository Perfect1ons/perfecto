import styles from "./style.module.scss";

interface BackdropProps {
  isVisible: boolean;
  close: () => void;
}

const BasketBackdrop = ({ isVisible, close }: BackdropProps) => {
  return isVisible ? <div className={styles.backDrop} onClick={close} /> : null;
};

export default BasketBackdrop;
