import { historyData } from "@/components/temporary/historyOrders";
import OrderHistoryCard from "./OrderHistoryCard";
import styles from "./style.module.scss";
import Image from "next/image";

const OrdersHistory = () => {
  return (
    <section className={styles.OrdersHistory}>
      <div className="container">
        <div>
          {historyData.length > 0 ? (
            historyData.map((order) => {
              return <OrderHistoryCard order={order} key={order.orderNumber} />;
            })
          ) : (
            <div className={styles.isEmpty}>
              <div className={styles.isEmpty__content}>
                <div className={styles.icon}>
                  <Image
                    src={"/img/orderclipboard.svg"}
                    width={60}
                    height={60}
                    alt="clipboard"
                  />
                </div>

                <div className={styles.isEmpty__desc}>
                  <p>
                    Как же так? Вы еще ничего не заказали. Чтобы сделать заказ
                    на нашем сайте просто выберите товар, положите его в корзину
                    и заполните короткую форму.
                  </p>
                </div>
              </div>

              <button
                aria-label="go to catalog"
                className={styles.isEmpty__button}
              >
                Перейти в каталог
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrdersHistory;
