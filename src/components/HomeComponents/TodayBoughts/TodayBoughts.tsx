"use client"
import { useState } from "react";
import { IBoughtItem } from '@/types/lastBoughts';
import styles from './style.module.scss';
import cn from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ITodayBoughtsProps {
    boughts: IBoughtItem[];
}

const TodayBoughts = ({ boughts }: ITodayBoughtsProps) => {
    const imageEmpty = "https://max.kg/images/discount/empty-image.png";
    const startUrl = "https://max.kg/nal/img/";
    const initialVisibleItems = 10;
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems);

    const handleShowMore = () => {
        const newVisibleItems = visibleItems + 10;
        setVisibleItems(Math.min(newVisibleItems, boughts.length));
    };

    const showMoreButton = visibleItems < boughts.length ? (
        <button className={styles.showMoreButton} onClick={handleShowMore}>
            Показать еще
        </button>
    ) : (
        <button className={styles.showMoreButton} onClick={() => setVisibleItems(initialVisibleItems)}>
            Скрыть
        </button>
    );

    return (
        <section className={styles.boughts}>
            <div className={cn(styles.boughtsContainer, "container")}>
                {boughts.slice(0, visibleItems).map((item) => {
                    let imageUrl = imageEmpty;

                    if (item.photos && item.photos.length > 0) {
                        const photoUrl = item.photos[0].url_part.startsWith("https://")
                            ? `https://goods-photos.static1-sima-land.com/items/${item.art}/0/280.jpg`
                            : `${startUrl}${item.images[0].id_post}/l_${item.photos[0].url_part}`;
                        imageUrl = photoUrl;
                    }
                    
                    return (
                        <div key={item.id} className={styles.boughtsItem}>
                            <Image className={styles.boughtsItemImg} src={imageUrl} width={100} height={100} alt={item.naim} />
                            <span className={styles.boughtsItemPrice}>{item.price}</span>
                            <p className={styles.boughtsItemName}>{item.naim}</p>
                            <span>{item.ddos}</span>
                        </div>
                    );
                })}
                {showMoreButton}
            </div>
        </section>
    );
};

export default TodayBoughts;
