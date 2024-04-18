import { IPopularCategory } from '@/types/PopularCategory';
import styles from './style.module.scss'
import Image from 'next/image';
import CategorySwiper from './CategorySwiper/CategorySwiper';
import SwiperGridSlider from './CategorySwiper/CategorySwiper';

export interface ICategory {
    category: IPopularCategory[]
}


const PopularCategory = ({category}: ICategory ) => {
  return (
    <section className={styles.popular__category}>
      <div className="container">
        <div className={styles.popular__category_content}>
          <h1 className={styles.popular__category_title}>
            Популярные категории
          </h1>
        </div>
        <div className={styles.popular__category_content}>
          <CategorySwiper category={category} />
        </div>
      </div>
    </section>
  );
}

export default PopularCategory