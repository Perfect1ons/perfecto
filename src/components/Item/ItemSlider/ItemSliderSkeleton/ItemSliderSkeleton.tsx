import styles from "./style.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ItemSliderSkeleton = () => {
  const skeletonArray6 = new Array(6).fill(null);

  return (
    <div className={styles.slider__skeleton}>
      <div className={styles.leftPart}>
        {skeletonArray6.map((_, index) => (
          <Skeleton className={styles.leftPart__icon} width={60} height={60} key={index} />
        ))}
      </div>
      <div className={styles.rigthPart}>
        <Skeleton className={styles.rigthPart__icon} width={500} height={500} />
      </div>
    </div>
  );
};

export default ItemSliderSkeleton;
