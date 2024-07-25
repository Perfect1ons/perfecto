import styles from "./style.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DiscountsSkeleton = () => {
  return (
    <section className="discounts">
      <div className="container">
        <h1 className="sections__title">Скидки</h1>
        <div className={styles.discount__container}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className={styles.discount__card_skeleton} />
          ))}
        </div>
        <div className="showMore__buttons">
          <Skeleton className="showMore__button_skeleton" />
        </div>
      </div>
    </section>
  );
};

export default DiscountsSkeleton;
