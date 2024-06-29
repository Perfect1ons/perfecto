import styles from "./style.module.scss";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ItemSkeletonProps {
  array: Array<null>;
}

export default function CategoryItemSkeleton({ array }: ItemSkeletonProps) {
  return (
    <div className={styles.skeleton__container}>
      {array.map((_, index) => (
        <div className={styles.skeleton_items} key={index}>
          <Skeleton className={styles.skeletonImage} />
          <Skeleton className={styles.skeletonImageName} />
        </div>
      ))}
    </div>
  );
}
