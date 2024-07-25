import styles from "./style.module.scss";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ICategoryProps {
  title: string;
}

const CategorySkeleton = ({ title }: ICategoryProps) => {
  return (
    <section className="popular__category">
      <div className="container">
        <h1 className="sections__title">{title}</h1>
        <div className={styles.skeleton__container}>
          {Array.from({ length: 12 }).map((_, index) => (
            <div className={styles.skeleton_items} key={index}>
              <Skeleton className={styles.skeletonImage} />
              <Skeleton className={styles.skeletonImageName} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySkeleton;
