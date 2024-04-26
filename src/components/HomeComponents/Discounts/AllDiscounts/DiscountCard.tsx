import { FC } from "react";
import { url } from "@/components/temporary/data";
import Image from "next/image";
import styles from "../style.module.scss";
import { IDiscounts } from "@/types/discounts";

interface DiscountCardProps {
  item: IDiscounts;
  onClick: () => void;
}

const DiscountCard: FC<DiscountCardProps> = ({ item, onClick }) => (
  <div onClick={onClick} className={styles.discount__card} key={item.name}>
    <div className={styles.discount__card_images}>
      <Image
        className={styles.discount__card_img}
        src={`${url}${item.image}`}
        width={400}
        height={250}
        alt={item.name}
        quality={100}
        title={item.name}
        loading="lazy" 
      />
    </div>

    <div className={styles.discount__card_content}>
      <div className={styles.discount__data}>
        <h3 className={styles.discount__item_title}>{item.name}</h3>
        <span className={styles.discount__item_days}>
          {item.word} {item.days} {item.word_day}
        </span>
        <span className={styles.discount__item_fromTo}>{item.message}</span>
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
);

export default DiscountCard;
