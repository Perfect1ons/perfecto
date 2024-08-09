import { IBasketItems } from "@/interfaces/baskets/basket";
import BasketsCard from "./BasketsCard";
import { url } from "@/utils/url";
import styles from './style.module.scss'
import { useState } from "react";

interface IBasketItemsProps {
  token?: any;
  cartData: any[];
  removeFromCart: (id_tov: number) => void; 
  selectedIds: string;
  onCheckboxChange: (id_tov: number, isChecked: boolean) => void;
}

const BasketsItems = ({
  token,
  cartData,
  removeFromCart,
  selectedIds,
  onCheckboxChange,
}: IBasketItemsProps) => {
  const [shouldFocusInput, setShouldFocusInput] = useState(false);

  return (
    <div className={styles.cards}>
      {cartData.map((item) => {
        const isChecked = selectedIds.includes(item.id_tov);
        const imageUrl =
          item.photos.length > 0
            ? item.photos[0]?.url_part.startsWith("https://goods")
              ? `${item.photos[0]?.url_part}280.jpg`
              : item.photos[0]?.url_part.startsWith("https://")
              ? item.photos[0]?.url_part
              : `${url}nal/img/${item.id_post}/l_${item.photos[0]?.url_part}`
            : "/img/noPhoto.svg";
        return (
          <BasketsCard
            token={token}
            setShouldFocusInput={() => setShouldFocusInput(false)}
            shouldFocusInput={shouldFocusInput}
            removeFromCart={removeFromCart}
            isChecked={isChecked}
            onCheckboxChange={onCheckboxChange}
            key={item.id}
            item={item}
            imageUrl={imageUrl}
            rating={Math.floor(item.ocenka)}
          />
        );
      })}
    </div>
  );
};

export default BasketsItems;
