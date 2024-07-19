import { IOrderById } from "@/types/OrderById/orderbyid";
import styles from "./style.module.scss";
import OrderItems from "./OrderItemsCard/OrderItems";
import OrderUserInfo from "./OrderUserInfo/OrderUserInfo";
import Image from "next/image";

interface IOrderByIdProps {
  order: IOrderById;
}

const OrderById = ({ order }: IOrderByIdProps) => {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles.order}>

          <div className={styles.order__header}>
            <p className={styles.order__title}>
              Заказ №: 65432 от 17-07-2024 16:41:19
            </p>
            <div className={styles.order__progress}>
              <p>Отменен.</p>
              <p className={styles.order__progress_date}>
                17 июля 2024 г. 17:21
              </p>
              <div className={styles.order__progress_bar}>
                <span className={styles.order__progress_bar_start}></span>
                <span className={styles.order__progress_bar_line}></span>
                <span
                  className={styles.order__progress_bar_middle}
                ></span>
                <span className={styles.order__progress_bar_line}></span>
                <span
                  className={styles.order__progress_bar_middle}
                ></span>
                <span className={styles.order__progress_bar_line}></span>
                <span
                  className={styles.order__progress_bar_middle}
                ></span>
                <span className={styles.order__progress_bar_line}></span>
                <span className={styles.order__progress_bar_end}></span>
              </div>
            </div>
          </div>

          <div className={styles.order__manager}>
              <Image
                className={styles.order__manager_img}
                src={"/img/manager.svg"}
                quality={100}
                width={110}
                height={110}
                alt="manager"
              />
            <div className={styles.order__manager_info}>
              <h2 className={styles.order__manager_info_name}>
                Ваш менеджер Жамалбек
              </h2>
              <h3 className={styles.order__manager_info_contact}>
                Контакты: +996 553 931 111
              </h3>
              <h3 className={styles.order__manager_info_workTime}>
                Рабочий график: пн-сб 09:00-18:00
              </h3>
            </div>
          </div>


        </div>

        <OrderUserInfo />
        <OrderItems orders={order} />
      </div>
    </section>
  );
};

export default OrderById;
