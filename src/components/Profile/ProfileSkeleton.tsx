import styles from './style.module.scss'

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const ProfileSkeleton = () => {
  return (
    <section className={styles.skeletons}>
      <div className="container">
        <div className={styles.skeletons__cards}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              baseColor="white"
              key={index}
              className={styles.skeleton}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileSkeleton