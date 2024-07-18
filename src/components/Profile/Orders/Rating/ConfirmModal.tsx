"use client";
import Image from "next/image";
import { IRating } from "./Rating";
import styles from "./style.module.scss";
import { Cross } from "../../../../../public/Icons/Icons";
import useMediaQuery from "@/hooks/useMediaQuery";

interface ModalProps {
  ratingChange: (rate: number) => void;
  commChange: (comm: string) => void;
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  postReview: () => void;
  rating: number;
  ratings: IRating[];
}

const ConfirmModal: React.FC<ModalProps> = ({
  ratingChange,
  commChange,
  show,
  onClose,
  onConfirm,
  postReview,
  rating,
  ratings,
}) => {
  const isMobile = useMediaQuery("(max-width: 576px)");
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button
          aria-label="close modal"
          onClick={onClose}
          className={styles.modal_cross}
        >
          <Cross />
        </button>
        <p className={styles.modal_title}>
          Если у Вас есть притензии или пожелания относительно качества товаров
          или услуги, просим оставить отзыв.
          <br />
          Все сообщения буду переданы руководству.
        </p>
        <p className={styles.modal_text}>Общее впечатление</p>
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
                width={isMobile ? 40 : 60}
                height={isMobile ? 40 : 60}
                alt={r.name}
              />
              <p className={styles.rating__name}>{r.name}</p>
            </button>
          ))}
        </div>
        <div className={styles.modal_criterias}>
          <button className={styles.modal_criterias_check}>
            Обслуживание менеджера
          </button>
          <button className={styles.modal_criterias_check}>
            Курьерская служба
          </button>
          <button className={styles.modal_criterias_check}>
            Удобство сайта
          </button>
          <button className={styles.modal_criterias_check}>
            Буду покупать еще
          </button>
        </div>
        <div className={styles.modal_comm}>
          <input
            onChange={(e) => commChange(e.target.value)}
            placeholder="Добавить коментарии*"
            type="text"
            className={styles.modal_comm_input}
          />
        </div>
        <button onClick={postReview} className={styles.modalButtonConfirm}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
