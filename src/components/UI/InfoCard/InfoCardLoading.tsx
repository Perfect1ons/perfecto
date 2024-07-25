import styles from "./style.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IProps {
    title: string;
}

const InfoCardLoading = ({title}: IProps) => {
  return (
    <section className="news">
      <div className="container">
        <h1 className="sections__title">{title}</h1>

        <div className="info__cards">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className={styles.promotion__card} key={index}>
              <Skeleton className={styles.promotion__card_skeleton} />
            </div>
          ))}
        </div>
        <div className="showMore__buttons">
          <Skeleton className="showMore__button_skeleton" />
        </div>
      </div>
    </section>
  );
};

export default InfoCardLoading;
