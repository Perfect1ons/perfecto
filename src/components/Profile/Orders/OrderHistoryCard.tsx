"use client";
import clsx from "clsx";
import styles from "./style.module.scss";
import Rating from "./Rating/Rating";
import { Item } from "@/types/OrdersHistory/OrdersHistory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getOrderHistoryOrderRating,
  postOrderReview,
} from "@/api/clientRequest";
import { IRatingOrderHistoryCard } from "@/types/OrdersHistory/RatingOrderHistoryCard";

interface IOrder {
  order: Item;
  isAuthed: string | undefined;
}

const OrderHistoryCard = ({ order, isAuthed }: IOrder) => {
  const formatDate = (dateString: string, key?: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    if (key === "seconds") {
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    } else {
      return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }
  };

  const router = useRouter();

  const formattedDate1 = formatDate(order.dat1);
  const formattedDateVid = formatDate(order.dat_vid, "seconds");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [ratingFromApi, setRatingFromApi] = useState<
    IRatingOrderHistoryCard | undefined
  >(undefined);

  const ratingChanger = (rate: number) => {
    if (rate) {
      setRating(rate);
    }
  };

  const commentChanger = (comm: string) => {
    if (comm && comm.length <= 15) {
      setComment(comm);
    }
  };

  const getOrderReview = async () => {
    if (isAuthed) {
      try {
        const ratingData = await getOrderHistoryOrderRating(isAuthed, order.id);
        setRatingFromApi(ratingData);
      } catch (error) {
        console.error("Failed to fetch order rating:", error);
        // Handle error appropriately
      }
    }
  };

  useEffect(() => {
    getOrderReview();
  });

  const postReview = () => {
    if (rating > 0 && isAuthed) {
      postOrderReview(order.id, rating, isAuthed);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <p
          className={styles.card__info_title}
          onClick={() => router.push(`/profile/orders/${order.id}`)}
        >
          Заказ №: {order.id} от {formattedDate1}
        </p>

        <div className={styles.status__info}>
          <p
            className={clsx(
              styles.status,
              order.status == 2 && styles.status__fail,
              order.status == 3 && styles.status__delivery
            )}
          >
            {order.status == 5
              ? "Выполнен."
              : order.status == 2
              ? "Не выполнен."
              : "В пути."}
          </p>
          <p className={styles.status__date}>{formattedDateVid}</p>
        </div>
      </div>

      <div className={styles.rating}>
        <Rating
          ratingFromApi={ratingFromApi}
          rating={rating}
          ratingChange={ratingChanger}
          commChange={commentChanger}
          postReview={postReview}
        />
      </div>
    </div>
  );
};

export default OrderHistoryCard;
