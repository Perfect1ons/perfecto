"use client";
import Image from "next/image";
import { IRating, IReviewType } from "./Rating";
import styles from "./style.module.scss";
import { Cross } from "../../../../../public/Icons/Icons";
import useMediaQuery from "@/hooks/useMediaQuery";
import cn from "clsx";
interface ModalProps {
  ratingChange: (rate: number) => void;
  commChange: (comm: string) => void;
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  postReview: () => void;
  rating: number;
  ratings: IRating[];
  reviews: IReviewType;
  updateReview: (key: keyof IReviewType, value: boolean) => void;
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
  reviews,
  updateReview,
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
          <button
            onClick={() =>
              updateReview("managersService", !reviews.managersService)
            }
            className={styles.modal_criterias_check}
          >
            <span
              className={cn("showFiltersUlContainer__check", {
                ["showFiltersUlContainer__checkActive"]:
                  reviews.managersService,
              })}
            >
              {reviews.managersService ? (
                <Image
                  src="/img/checkIconWhite.svg"
                  width={15}
                  height={15}
                  alt="check"
                />
              ) : (
                <Image
                  src="/img/checkIconWhite.svg"
                  width={15}
                  height={15}
                  alt="check"
                />
              )}
            </span>
            Обслуживание менеджера
          </button>
          <button
            onClick={() =>
              updateReview("courierService", !reviews.courierService)
            }
            className={styles.modal_criterias_check}
          >
            <span
              className={cn("showFiltersUlContainer__check", {
                ["showFiltersUlContainer__checkActive"]: reviews.courierService,
              })}
            >
              {reviews.courierService ? (
                <Image
                  src="/img/checkIconWhite.svg"
                  width={15}
                  height={15}
                  alt="check"
                />
              ) : (
                <Image
                  src="/img/checkIconWhite.svg"
                  width={15}
                  height={15}
                  alt="check"
                />
              )}
            </span>
            Курьерская служба
          </button>
          <button
            onClick={() =>
              updateReview("convenienceSite", !reviews.convenienceSite)
            }
            className={styles.modal_criterias_check}
          >
            <span
              className={cn("showFiltersUlContainer__check", {
                ["showFiltersUlContainer__checkActive"]:
                  reviews.convenienceSite,
              })}
            >
              {reviews.convenienceSite ? (
                <Image
                  src="/img/checkIconWhite.svg"
                  width={15}
                  height={15}
                  alt="check"
                />
              ) : (
                <Image
                  src="/img/checkIconWhite.svg"
                  width={15}
                  height={15}
                  alt="check"
                />
              )}
            </span>
            Удобство сайта
          </button>
          <button
            onClick={() => updateReview("willBuyMore", !reviews.willBuyMore)}
            className={styles.modal_criterias_check}
          >
            <span
              className={cn("showFiltersUlContainer__check", {
                ["showFiltersUlContainer__checkActive"]: reviews.willBuyMore,
              })}
            >
              {reviews.willBuyMore ? (
                <Image
                  src="/img/checkIconWhite.svg"
                  width={15}
                  height={15}
                  alt="check"
                />
              ) : (
                <Image
                  src="/img/checkIconWhite.svg"
                  width={15}
                  height={15}
                  alt="check"
                />
              )}
            </span>
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
        <button className={styles.modalButtonConfirm}>Отправить</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
