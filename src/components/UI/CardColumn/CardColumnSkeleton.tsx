import styles from './style.module.scss'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const CardColumnSkeleton = () => {
  return (
    <Skeleton height={230} width={1440} borderRadius={10} />
  );
}

export default CardColumnSkeleton