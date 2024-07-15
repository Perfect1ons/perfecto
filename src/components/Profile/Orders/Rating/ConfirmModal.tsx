import styles from "./style.module.scss";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>Вы уверены что хотите оставить оценку?</p>
        <div className={styles.modalButtons}>
          <button onClick={onConfirm} className={styles.modalButtonConfirm}>
            Да
          </button>
          <button onClick={onClose} className={styles.modalButtonCancel}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
