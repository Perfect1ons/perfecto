import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./styles.module.scss";

interface SkeletonCards {
  loading: boolean;
}

const PopularGoodsSkeletonCard = (loading: SkeletonCards) => {
  return (
    <div className={loading ? styles.skeletonCard_hide : styles.skeletonCard}>
      {/* <div className={styles.image} />
      <div className={styles.price} />
      <div className={styles.name}>
        <div className={styles.name_first} />
        <div className={styles.name_second} />
      </div>
      <div className={styles.stars} />
      <div className={styles.adress} />
      <div className={styles.buttons}>
        <div className={styles.buttons_left} />
        <div className={styles.buttons_right} />
      </div> */}

      <Skeleton height={262} borderRadius={10} />
      <Skeleton
        height={15}
        width={`25%`}
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <Skeleton count={2} height={10} width={`100%`} style={{ marginTop: 5 }} />
      <Skeleton height={15} width={`40%`} style={{ marginTop: 10 }} />
      <Skeleton height={15} width={`100%`} style={{ marginTop: 10 }} />
      <div className={styles.buttons}>
        <div className={styles.buttons_left}>
          <Skeleton width={`100%`} height={44} />
        </div>
        <div className={styles.buttons_right}>
          <Skeleton width={`100%`} height={44} />
        </div>
      </div>
    </div>
  );
};

export default PopularGoodsSkeletonCard;
