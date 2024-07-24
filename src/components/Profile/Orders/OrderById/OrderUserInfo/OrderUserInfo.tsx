import Image from "next/image";
import styles from "./style.module.scss";
import { ChangeValueIcon } from "../../../../../../public/Icons/Icons";

const OrderUserInfo = () => {
  return (
    <div className={styles.main}>
      <div className={styles.main_buyer_info}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>Покупатель:</h3>с{" "}
        </div>
        <h4 className={styles.main_buyer_info_name}>
          {/* {order.fio} {order.name} */}
          Нурдин Улуу Нурболот
        </h4>
        <p className={styles.main_buyer_info_phone}>+996555777777</p>
        <p className={styles.main_buyer_info_city}>Бишкек</p>
        <p className={styles.main_buyer_info_email}>perfectom0999@gmail.com</p>
      </div>

      <div className={styles.main_delivery_info}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>Доставка и оплата:</h3>
        </div>

        <div className={styles.delivery__info}>
          <div className={styles.delivery__info_content}>
            <Image
              src="/img/delivery_icon.svg"
              width={32}
              height={32}
              alt="delivery icon"
            />
            <p className={styles.delivery__title}>Согласовать с менеджером</p>
          </div>
          <div className={styles.delivery__info_content}>
            <Image
              src="/img/calendar_icon.svg"
              width={32}
              height={32}
              alt="calendar icon"
            />
            <p className={styles.delivery__title}>Дата доставки: 8 мая</p>
          </div>
          <div className={styles.delivery__info_content}>
            <Image
              src="/img/pay_icon.svg"
              width={32}
              height={32}
              alt="pay icon"
            />
            <p className={styles.delivery__title}>Согласовать с менеджером</p>
          </div>
        </div>
      </div>

      <div className={styles.main_documents_info}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>Документы:</h3>
        </div>
        <ul className={styles.main_documents_info_list}>
          <li className={styles.main_documents_info_list_item}>
            Распечатать заказ
          </li>
          <li className={styles.main_documents_info_list_item}>
            Распечатать чек
          </li>
          <li className={styles.main_documents_info_list_item}>
            Счет на оплату
          </li>
          <li className={styles.main_documents_info_list_item}>
            Коммерческое предложение
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderUserInfo;
