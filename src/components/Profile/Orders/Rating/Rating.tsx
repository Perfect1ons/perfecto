"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

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
}

const Rating = ({
  ratingChange,
  commChange,
  rating,
  postReview,
}: IRatingProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedRating = ratings.find((r) => r.rate === rating);

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
        {selectedRating ? (
          <div className={styles.rating__selected_info}>
            <Image
              src={selectedRating.img}
              width={45}
              height={45}
              alt={selectedRating.name}
            />
            <p>{selectedRating.name}</p>
          </div>
        ) : null}
      </div>
      {!submitted && (
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
      {!submitted && (
        <button onClick={handleOpenModal} className={styles.rating__button}>
          Оставить отзыв
        </button>
      )}
      <ConfirmModal
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
