import styles from './style.module.scss'

const historyData = [
    {
        name: "Ноутбук",
        status: "Выполнено",
        date: "15.07.2024 17:17",
        orderNumber: 48892,
        rating: null,
        img: "img",
    },
]

const OrdersHistory = () => {
  return (
    <section className={styles.OrdersHistory}>
      <div className="container"></div>
    </section>
  );
}

export default OrdersHistory