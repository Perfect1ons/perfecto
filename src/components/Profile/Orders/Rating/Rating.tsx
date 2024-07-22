"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { IRatingOrderHistoryCard } from "@/types/OrdersHistory/RatingOrderHistoryCard";

export interface IRating {
  img: string;
  rate: number;
  name: string;
}

const ratings: IRating[] = [
  {
    img: "/img/ratingverybad.svg",
    rate: 1,
    name: "Ужасно",
  },
  {
    img: "/img/ratingbad.svg",
    rate: 2,
    name: "Плохо",
  },
  {
    img: "/img/ratingok.svg",
    rate: 3,
    name: "Среднее",
  },
  {
    img: "/img/good.svg",
    rate: 4,
    name: "Хорошо",
  },
  {
    img: "/img/verygood.svg",
    rate: 5,
    name: "Отлично",
  },
];

interface IRatingProps {
  rating: number;
  ratingChange: (rate: number) => void;
  commChange: (comm: string) => void;
  postReview: () => void;
  ratingFromApi: IRatingOrderHistoryCard | undefined;
}
export interface IReviewType {
  managersService: boolean;
  courierService: boolean;
  convenienceSite: boolean;
  willBuyMore: boolean;
}

const Rating = ({
  ratingChange,
  commChange,
  rating,
  postReview,
  ratingFromApi,
}: IRatingProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<IReviewType>({
    managersService: true,
    courierService: true,
    convenienceSite: false,
    willBuyMore: true,
  });
  const updateReview = (key: keyof IReviewType, value: boolean) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [key]: value,
    }));
  };

  const selectedRating = ratings.find((r) => r.rate === rating);

  const rateApi = ratings.findLast((r) => r.rate === ratingFromApi?.ocenka);

  const handleOpenModal = () => {
    if (rating === 0) {
      alert("Пожалуйста, выберите оценку перед отправкой.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setSubmitted(true);
    handleCloseModal();
  };

  return (
    <div className={styles.rating}>
      <div className={styles.rating__selected}>
        {!ratingFromApi && selectedRating ? (
          <div className={styles.rating__selected_info}>
            <Image
              src={selectedRating.img}
              width={40}
              height={40}
              alt={selectedRating.name}
            />
            <p>{selectedRating.name}</p>
          </div>
        ) : (
          <div className={styles.rating__selected_info}>
            <Image
              src={rateApi?.img || ""}
              width={40}
              height={40}
              alt={rateApi?.name || ""}
            />
            <p>{rateApi?.name}</p>
          </div>
        )}
      </div>
      {!ratingFromApi && !submitted && (
        <div className={styles.choice__rating}>
          {ratings.map((r) => (
            <button
              key={r.rate}
              onClick={() => ratingChange(r.rate)}
              className={rating === r.rate ? styles.active : styles.chosing}
            >
              <Image
                className={styles.chosing__img}
                src={r.img}
                width={40}
                height={40}
                alt={r.name}
              />
              <p className={styles.rating__name}>{r.name}</p>
            </button>
          ))}
        </div>
      )}
      {!ratingFromApi && !submitted && (
        <button onClick={handleOpenModal} className={styles.rating__button}>
          Оставить отзыв
        </button>
      )}
      <ConfirmModal
        reviews={reviews}
        updateReview={updateReview}
        ratingChange={ratingChange}
        commChange={commChange}
        show={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        postReview={postReview}
        rating={rating}
        ratings={ratings}
      />
    </div>
  );
};

export default Rating;
