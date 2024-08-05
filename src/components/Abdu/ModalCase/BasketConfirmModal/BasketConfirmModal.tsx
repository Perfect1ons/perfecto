import styles from "./styles.module.scss";



const BasketConfirmModal = () => {
  return (
    <p className={styles.confirm}>
      Вы точно хотите удалить выбранные товары?
      <br />
      Отменить данное действие будет невозможно.
    </p>
  );
};

export default BasketConfirmModal;
