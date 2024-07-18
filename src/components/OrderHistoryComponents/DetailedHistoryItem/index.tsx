"use client";
import DetailedHistoryHeader from "./DetailedHistoryHeader/DetailedHistoryHeader";
import DetailedHistoryMain from "./DetailedHistoryMain/DetailedHistoryMain";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import styles from "./style.module.scss";
import { Item } from "@/types/OrdersHistory/OrdersHistory";
import DetailedHistoryOver from "./DetailedHistoryOver/DetailedHistoryOver";
interface IDetailedHistoryItemProps {
  orders: Item;
}

const DetailedHistoryItem = ({ orders }: IDetailedHistoryItemProps) => {
  return (
    <>
      <div className={styles.wrapper}>
        <ProfileTabs />
        <DetailedHistoryHeader order={orders} />
        <DetailedHistoryMain order={orders} />
        <DetailedHistoryOver order={orders} />
      </div>
    </>
  );
};

export default DetailedHistoryItem;
