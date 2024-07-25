import Link from "next/link";
import styles from "./card.module.scss";
import Image from "next/image";
import { CurrentOrdersType } from "@/types/Profile/CurrentOrders";

interface IOrderCardProps {
  orders: CurrentOrdersType;
}

const OrderCard = ({ orders }: IOrderCardProps) => {
  return (
    <Link className="link" href={"/profile/orders"}>
      <div className={styles.profile__userInfo}>
        <div className={styles.profile__userInfo_header}>
          <div className={styles.profile__userInfo_icon}>
            <Image
              src={"/img/orderclipboard.svg"}
              width={45}
              height={45}
              alt="clipboard"
            />
          </div>
          <div>
            <p className={styles.profile__userInfo_name}>Текущие заказы</p>
            <p className={styles.orders}>
              У вас{" "}
              <span className={styles.orders__count}>
                {orders.items.length}
              </span>{" "}
              активных заказов
            </p>
          </div>
        </div>
        {orders.items.length > 0 && (
          <div className={styles.orders__images}>
            {orders.items.slice(0, 4).map((item, index) => (
              <Link
                title={`Перейти на заказ №${item.id}`}
                href={`/profile/orders/${item.id}`}
                key={item.id}
                className={styles.orders__img}
              >
                <Image
                  className={styles.orders__img_item}
                  src={item.img[0]}
                  width={60}
                  height={60}
                  alt="order item"
                ></Image>
              </Link>
            ))}
            {orders.items.length > 3 && (
              <div className={styles.orders__img}>
                <span>Еще {orders.items.length - 3}...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default OrderCard;
