import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./style.module.scss";

export default function ItemMainSkeleton() {
  const skeletonArray6 = new Array(6).fill(null);
  const skeletonArray3 = new Array(3).fill(null);

  return (
    <main className={styles.fakeMain}>
      <div className={styles.breadcrumbs}>
        {skeletonArray6.map((_, index) => (
          <Skeleton width={100} height={25} key={index} />
        ))}
      </div>

      <div className={styles.content_wrap}>
        <div className={styles.sliders_wrap}>
          <div className={styles.mini_slider}>
            {skeletonArray6.map((_, index) => (
              <span key={index}>
                <Skeleton width={60} height={60} />
              </span>
            ))}
          </div>
          <div className={styles.main_slider}>
            <Skeleton width={500} height={500} />
          </div>
        </div>

        <section className={styles.info_wrap}>
          <div className={styles.headline}>
            <Skeleton className={styles.headline_firstChild} />
            <Skeleton width={150} height={25} />
          </div>
          <div className={styles.info}>
            <div className={styles.info_part}>
              <div className={styles.desc}>
                <Skeleton width={90} height={20} />
                <Skeleton width={400} height={160} />
              </div>
              <Skeleton width={400} height={20} className={styles.copyArt} />
              <div className={styles.chars}>
                <Skeleton width={130} height={20} />
                <Skeleton width={400} height={160} />
              </div>
            </div>

            <div className={styles.price_part}>
              <Skeleton className={styles.priceCard} />
              <div className={styles.priceCard_minies}>
                <Skeleton width={150} height={25} />
                <Skeleton width={150} height={25} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.feedback_wrap}>
        <div className={styles.headline}>
          <Skeleton width={750} height={30} />
          <Skeleton width={120} height={25} />
        </div>
        <div className={styles.stars}>
          <Skeleton width={200} height={30} />
        </div>
        <div className={styles.feedbackBait}>
          <Skeleton width={450} height={20} />
          <Skeleton width={390} height={20} />
        </div>

        <div className={styles.feedbackButton}>
          <Skeleton width={200} height={50} />
        </div>

        <div className={styles.feedbacks_slider}>
          {skeletonArray3.map((_, index) => (
            <Skeleton
              width={460}
              height={272}
              className={styles.slide}
              key={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
