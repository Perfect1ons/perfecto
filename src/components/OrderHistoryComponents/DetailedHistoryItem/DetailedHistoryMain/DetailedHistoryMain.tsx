import { Item } from "@/types/OrdersHistory/OrdersHistory";
import styles from "../style.module.scss";
import cn from "clsx";
import Image from "next/image";

interface IDetailedHistoryMainProps {
  order: Item;
}

const DetailedHistoryMain = ({ order }: IDetailedHistoryMainProps) => {
  return (
    <div className={cn(styles.main, "container")}>
      <div className={styles.main_buyer}>
        <h3 className={styles.main_buyer_title}>Покупатель</h3>
        <div className={styles.main_buyer_info}>
          <p className={styles.main_buyer_info_name}>
            {order.fio} {order.name}
          </p>
          <p className={styles.main_buyer_info_phone}>{`+${order.tel}`}</p>
          <p className={styles.main_buyer_info_city}>Бишкек</p>
        </div>
      </div>
      <div className={styles.main_delivery}>
        <h3 className={styles.main_delivery_title}>Доставка и оплата</h3>
        <div className={styles.main_delivery_info}>
          <div className={styles.main_delivery_info_del}>
            <Image
              src="/img/delivery_icon.svg"
              width={32}
              height={32}
              alt="delivery icon"
              className={styles.main_delivery_info_del_icon}
            />
            <p className={styles.main_delivery_info_del_text}>
              Согласовать с менеджером
            </p>
          </div>
          <div className={styles.main_delivery_info_date}>
            <Image
              src="/img/calendar_icon.svg"
              width={32}
              height={32}
              alt="calendar icon"
              className={styles.main_delivery_info_date_icon}
            ></Image>
            <p className={styles.main_delivery_info_date_text}>
            Дата доставки: 8 мая
            </p>
          </div>
          <div className={styles.main_delivery_info_pay}>
            <Image
              src="/img/pay_icon.svg"
              width={32}
              height={32}
              alt="pay icon"
              className={styles.main_delivery_info_pay_icon}
            ></Image>
            <p className={styles.main_delivery_info_pay_text}>
              Согласовать с менеджером
            </p>
          </div>
        </div>
      </div>
      <div className={styles.main_documents}>
        <h3 className={styles.main_documents_title}>Документы</h3>
        <div className={styles.main_documents_info}></div>
      </div>
    </div>
  );
};

export default DetailedHistoryMain;
