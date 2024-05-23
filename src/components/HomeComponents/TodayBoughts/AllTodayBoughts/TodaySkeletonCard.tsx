import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from './styles.module.scss';

const TodaySkeletonCard = () => {
  return (
    <div className={styles.skeletonCard}>
      <Skeleton height={262} borderRadius={10} />
      <Skeleton
        height={15}
        width={`25%`}
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <Skeleton count={2} height={10} width={`100%`} style={{ marginTop: 5 }} />
      <Skeleton height={15} width={`40%`} style={{ marginTop: 10 }} />
      <Skeleton height={15} width={`100%`} style={{ marginTop: 10 }} />
      <Skeleton  height={44} width={`100%`} style={{ marginTop: 10 }} />
    </div>
  );
};

export default TodaySkeletonCard;
