import { CheckIcon } from "../../../../public/Icons/Icons";
import styles from "./styles.module.scss";

const ItemCartModal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.wrap}>
        <div className={styles.wrap_info}>
          <span className={styles.wrap_info_check}>
            <CheckIcon />
          </span>
          <span className={styles.wrap_info_title}>
            Товар добавлен в корзину. Перейдите в корзину чтобы оформить заказ.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCartModal;
