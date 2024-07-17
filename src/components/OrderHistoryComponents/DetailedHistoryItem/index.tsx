"use client";
import DetailedHistoryHeader from "./DetailedHistoryHeader/DetailedHistoryHeader";
import DetailedHistoryMain from "./DetailedHistoryMain/DetailedHistoryMain";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import styles from "./style.module.scss";
import { Item } from "@/types/OrdersHistory/OrdersHistory";
interface IDetailedHistoryItemProps {
  orders: Item[];
}

const DetailedHistoryItem = ({ orders }: IDetailedHistoryItemProps) => {
  return (
    <>
      {orders &&
        orders.map((order) => {
          return (
            <div key={order.id} className={styles.wrapper}>
              <ProfileTabs />
              <DetailedHistoryHeader order={order} />
              <DetailedHistoryMain order={order} />
            </div>
          );
        })}
    </>
  );
};

export default DetailedHistoryItem;
