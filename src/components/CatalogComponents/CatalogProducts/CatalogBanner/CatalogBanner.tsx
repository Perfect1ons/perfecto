import { url } from '@/components/temporary/data';
import { IIntroBannerDekstop } from '@/types/Home/banner';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../style.module.scss'

interface IBannerProps{
    isMobile: boolean;
    banner: IIntroBannerDekstop
}


const CatalogBanner = ({isMobile, banner}: IBannerProps) => {
  return (
    <div className="container">
      <Link href={"/page/partneram/prodavcam"}>
        <Image
          src={
            isMobile
              ? `${url}bimages/baner/mobile/baner_${banner.baner[0].id}.jpg`
              : `${url}bimages/baner/baner_${banner.baner[0].id}.jpg`
          }
          width={1440}
          height={300}
          priority={true}
          alt={banner.baner[0].naim}
          className={styles.category__image}
        />
      </Link>
    </div>
  );
}

export default CatalogBanner