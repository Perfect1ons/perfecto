import styles from "./style.module.scss";
import cn from "clsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BrandsSkeleton = () => {
  return (
    <section className="brands">
      <div className={cn(styles.brands__container, "container")}>
        <h1 className="sections__title">Бренды</h1>
        <div className={styles.brandsContainer}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton className={styles.skeleton} key={index} />
          ))}
        </div>
        <div className="showMore__buttons">
          <Skeleton className="showMore__button_skeleton" />
        </div>
      </div>
    </section>
  );
};

export default BrandsSkeleton;
