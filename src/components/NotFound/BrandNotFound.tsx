import Image from 'next/image';
import styles from './style.module.scss'
import clsx from 'clsx';
import PopularGoods from '../HomeComponents/PopularGoods/PopularGoods';
import { IPopularGood } from '@/types/popularGoods';

interface IBrandNotFoundProps{
  goods: IPopularGood[]
}

const BrandNotFound = ({goods}: IBrandNotFoundProps) => {
  return (
    <section className={styles.brand__notFounded}>
      <div className={clsx("container", styles.brands__notFound_container)}>
        <div className={styles.not__found_img}>
          <Image
            src={"/img/undefinedPage.png"}
            width={180}
            height={180}
            alt="undefined"
            loading="lazy"
          />
        </div>
        <h1 className={styles.brands__notFound_container_title}>
          По вашему бренду ничего не найдено
        </h1>
      </div>
      <PopularGoods goods={goods}/>
    </section>
  );
}

export default BrandNotFound