"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { CurrentOrdersType } from "@/types/Profile/CurrentOrders";
import OrdersCurrentCard from "./OrdersCurrentCard/OrdersCurrentCard";
import { StatusDetailsType } from "@/types/Profile/statusDetails";

interface ICurrentOrdersProps {
  currentOrders: CurrentOrdersType;
  details: StatusDetailsType;
  isAuthed: string;
}

const Orders = ({ currentOrders, details, isAuthed }: ICurrentOrdersProps) => {
  return (
    <section className={styles.orders}>
      <div className="container">
        {currentOrders.items.length > 0 ? (
          <OrdersCurrentCard
            isAuthed={isAuthed}
            details={details}
            currentOrders={currentOrders}
          />
        ) : (
          <div className={styles.isEmpty}>
            <div className={styles.isEmpty__content}>
              <div className={styles.icon}>
                <Image
                  src={"/img/orderclipboard.svg"}
                  width={70}
                  height={70}
                  alt="clipboard"
                />
              </div>

              <div className={styles.isEmpty__desc}>
                <p>
                  Как же так? Вы еще ничего не заказали. Чтобы сделать заказ на
                  нашем сайте просто выберите товар, положите его в корзину и
                  заполните короткую форму.
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
    </section>
  );
};

export default Orders;
