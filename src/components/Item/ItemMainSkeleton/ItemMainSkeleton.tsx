import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./style.module.scss";

// interface ItemMainSkeletonProps {}

export default function ItemMainSkeleton() {
  const miniSliderArray = new Array(6).fill(null);

  return (
    <main className={styles.fakeMain}>
      <div className={styles.breadcrumbs}>
        {miniSliderArray.map((_, index) => (
          <Skeleton width={100} height={25} key={index} />
        ))}
      </div>

      <div className={styles.sliders_wrap}>
        <div className={styles.mini_slider}>
          {miniSliderArray.map((_, index) => (
            <span key={index}>
              <Skeleton width={60} height={60} />
            </span>
          ))}
        </div>

        <Skeleton width={500} height={500} />

        <section className={styles.info}>
          <div className={styles.headline}>
            <Skeleton width={750} height={30} />
            <Skeleton width={100} />
          </div>
          <div className={styles.info_wrap}>
            <div className={styles.info_part}>
              <div className={styles.desc}>
                Описание:
                <Skeleton />
              </div>
              <div className={styles.chars}>
                Характеристики:
                <Skeleton />
              </div>
            </div>
            <div className={styles.price_part}>
              <div className={styles.priceCard}></div>
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
