"use client"
import { IDiscounts } from '@/types/discounts';
import styles from './style.module.scss'
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface IDiscountsProps{
    discounts: IDiscounts[]
}

const Discounts = ({discounts}: IDiscountsProps) => {
  const [itemsToShow, setItemsToShow] = useState<number>(8);
  const totalItems = discounts.length;
  const router = useRouter();
  const newsRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = () => {
    setItemsToShow((prevItems) => prevItems + 8);
  };

 const handleHide = () => {
   setItemsToShow(8);
   if (newsRef.current) {
     newsRef.current.scrollIntoView({ behavior: "auto" });
   }};

  const handleShowAll = () => {
    router.push("/all-discounts");
  };
  return (
    <section className="discounts" ref={newsRef}>
      <div className="container">
        <h1 className="sections__title">Скидки</h1>
        <div className={styles.discount__container}>
          {discounts.slice(0, itemsToShow).map((item) => (
            <div
              onClick={() =>
                router.push(`https://max.kg/discount/${item.promotion_id}`)
              }
              className={styles.discount__card}
              key={item.name}
            >
              <div className={styles.discount__card_images}>
                <Image
                  className={styles.discount__card_img}
                  src={`https://max.kg/${item.image}`}
                  width={400}
                  height={250}
                  alt={item.name}
                />
              </div>

              <div className={styles.discount__card_content}>
                <div className={styles.discount__data}>
                  <h3 className={styles.discount__item_title}>{item.name}</h3>
                  <span className={styles.discount__item_days}>
                    {item.word} {item.days} {item.word_day}
                  </span>
                  <span className={styles.discount__item_fromTo}>
                    {item.message}
                  </span>
                </div>
                <div className={styles.discount__by}>
                  <span className={styles.discount__by_percent}>
                    Скидка
                    <span className={styles.discount__by_percent_custom}>
                      {item.bonuses[1].discount_value} %
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="news__buttons">
          <div className="showMore">
            {itemsToShow < totalItems && (
              <button
                className="news__buttons_showMore"
                onClick={handleLoadMore}
              >
                Показать ещё
              </button>
            )}
          </div>
          <div className="hideMore">
            {itemsToShow >= totalItems && itemsToShow > 8 && (
              <button className="news__buttons_showMore" onClick={handleHide}>
                Скрыть все
              </button>
            )}
          </div>
          <button
            className="news__buttons_showMore showAll_button"
            onClick={handleShowAll}
          >
            Показать все
          </button>
        </div>
      </div>
    </section>
  );
}

export default Discounts