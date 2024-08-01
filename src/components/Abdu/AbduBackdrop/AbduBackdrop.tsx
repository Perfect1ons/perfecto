import styles from "./style.module.scss";

interface BackdropProps {
  isVisible: boolean;
  close: () => void;
}

const AbduBackdrop = ({ isVisible, close }: BackdropProps) => {
  return isVisible ? <div className={styles.backDrop} onClick={close} /> : null;
};

export default AbduBackdrop;
