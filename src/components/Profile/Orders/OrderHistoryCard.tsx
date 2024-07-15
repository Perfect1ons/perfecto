import clsx from 'clsx';
import styles from './style.module.scss'
import Rating from './Rating/Rating';
import { IHistory } from '@/components/temporary/historyOrders';

interface IOrder{
  order: IHistory
}

const OrderHistoryCard = ({order}: IOrder) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <span>IMG</span>
      </div>

      <div className={styles.card__info}>
        <div>
          <p className={styles.card__info_title}>{order.name}</p>
          <p>
            Заказ №{order.orderNumber} от {order.orderedDate}
          </p>
        </div>

        <div className={styles.status__info}>
          <p
            className={clsx(
              styles.status,
              order.status == 2 && styles.status__fail,
              order.status == 3 && styles.status__delivery
            )}
          >
            {order.status == 1 ? "Выполнен" : order.status == 2 ? "Не выполнен" : "В пути" }
          </p>
            <p className={styles.status__date}>{order.deliveredDate}</p>
        </div>
      </div>


      <div className={styles.rating}>
        <Rating/>
      </div>


    </div>
  );
}

export default OrderHistoryCard