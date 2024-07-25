import Link from 'next/link';
import styles from './style.module.scss'
import Image from 'next/image';
import { IInfoCard } from '@/types/HomeTypes/InfoCard';
import { url } from '@/utils/url';

interface IInfoCardProps{
    item: IInfoCard
}

const InfoCard = ({item}: IInfoCardProps) => {
  return (
    <div className={styles.card} key={item.naim}>
      <Link
        className={styles.card_link}
        href={`promotions/${item.id}`}
        passHref
      >
        <Image
          className={styles.card_img}
          src={`${url}${item.logo}`}
          width={400}
          height={250}
          alt={item.naim}
        />
      </Link>
    </div>
  );
}

export default InfoCard