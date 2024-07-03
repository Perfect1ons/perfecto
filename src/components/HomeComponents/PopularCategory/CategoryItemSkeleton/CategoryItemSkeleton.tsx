"use client"
import useMediaQuery from "@/hooks/useMediaQuery";
import styles from "./style.module.scss";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";



export default function CategoryItemSkeleton() {
  
  const skeletonArray12 = 12;
  const skeletonArray10 = 10;
  const skeletonArray8 = 8;
  const skeletonArray6 = 6;
  const isLaptop = useMediaQuery("(max-width: 1200px)");
  const isTablet = useMediaQuery("(max-width: 992px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const skeletonArray = isMobile
    ? skeletonArray6
    : isTablet
    ? skeletonArray8
    : isLaptop
    ? skeletonArray10
    : skeletonArray12;
  return (
    <div className={styles.skeleton__container}>
      {Array.from({ length: skeletonArray }).map((_, index) => (
        <div className={styles.skeleton_items} key={index}>
          <Skeleton className={styles.skeletonImage} />
          <Skeleton className={styles.skeletonImageName} />
        </div>
      ))}
    </div>
  );
}
