import styles from "./style.module.scss";

const PopularCatalogSkeleton = () => {
  return (
    <div className={styles.popcat__skeleton}>
      {Array.from({ length: 12 }).map((_, index) => (
        <div className={styles.popcat__skeleton_card} key={index}>
          <div className={styles.popcat__skeleton_card_img}></div>
          <div className={styles.popcat__skeleton_card_title}></div>
        </div>
      ))}
    </div>
  );
};

export default PopularCatalogSkeleton;
