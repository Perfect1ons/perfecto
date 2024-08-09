import OrderHistoryCard from "./OrderHistoryCard";
import styles from "./style.module.scss";
import Image from "next/image";
import { Item } from "@/types/OrdersHistory/OrdersHistory";
import { cookies } from "next/headers";
import { StatusDetailsType } from "@/types/Profile/statusDetails";
import { IRatingOrderHistoryCard } from "@/types/OrdersHistory/RatingOrderHistoryCard";

interface IOrdersHistoryProps {
  orders: Item[];
  details: StatusDetailsType;
  ratingsData: IRatingOrderHistoryCard[];
}

const OrdersHistory = ({
  orders,
  details,
  ratingsData,
}: IOrdersHistoryProps) => {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("identify")?.value;
  const getRatingForOrder = (orderId: number) => {
    const rating = ratingsData.find((rating) => rating.id_zakaz === orderId);
    return rating?.ocenka;
  };

  return (
    <section className={styles.OrdersHistory}>
      <div className="container">
        <div>
          {orders.length > 0 ? (
            orders.map((order) => {
              const orderOcenka = getRatingForOrder(order.id);
              return (
                <OrderHistoryCard
                  ratingsData={orderOcenka}
                  details={details}
                  order={order}
                  key={order.id}
                  isAuthed={isAuthed}
                />
              );
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
