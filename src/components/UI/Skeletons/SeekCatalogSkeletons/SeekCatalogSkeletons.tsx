import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from './style.module.scss'

interface ISeekCatalogSkeletonsProps {
  count: number;
}

const SeekCatalogSkeletons = ({ count }: ISeekCatalogSkeletonsProps) => {
  return (
    <div className={styles.cards}>
      {[...Array(count)].map((_, index) => (
        <Skeleton key={index} className={styles.cards__skeleton} borderRadius={5} />
      ))}
    </div>
  );
};

export default SeekCatalogSkeletons;
