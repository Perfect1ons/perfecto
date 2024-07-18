import { IOrderById } from '@/types/OrderById/orderbyid'
import styles from './style.module.scss'
import OrderItems from './OrderItems';

interface IOrderByIdProps {
  order: IOrderById;
}


const OrderById = ({order}: IOrderByIdProps) => {
  return (
    <section className={styles.wrapper}>
        <div className="container">

            <OrderItems orders={order} />
        </div>
    </section>
  )
}

export default OrderById