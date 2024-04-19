import styles from "./style.module.css";

interface BackdropProps {
  isVisible: boolean;
  close: () => void;
}

const Backdrop = ({ isVisible, close }: BackdropProps) => {
  return isVisible ? (
    <div className={styles.backDrop} onClick={close} />
  ) : null;
};

export default Backdrop;
