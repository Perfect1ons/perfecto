import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./style.module.scss";

interface SkeletonCards {
  loading?: boolean;
}

const CardSkeleton = (loading: SkeletonCards) => {
  return (
    <div className={loading ? styles.skeletonCard_hide : styles.skeletonCard}>
      <Skeleton height={262} borderRadius={10} />
      <Skeleton
        height={15}
        width={`25%`}
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <Skeleton count={2} height={10} width={`100%`} style={{ marginTop: 5 }} />
      <Skeleton height={15} width={`40%`} style={{ marginTop: 10 }} />
      <Skeleton height={15} width={`100%`} style={{ marginTop: 10 }} />
      <Skeleton width={`100%`} height={44} style={{ marginTop: 10 }} />
    </div>
  );
};

export default CardSkeleton;
