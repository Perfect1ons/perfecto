import styles from './style.module.scss'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BasketCardSkeleton = () => {
  return (
    <div className={styles.cards__skeleton}>
      {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className={styles.card_skeleton} />
      ))}
    </div>
  );
}

export default BasketCardSkeleton