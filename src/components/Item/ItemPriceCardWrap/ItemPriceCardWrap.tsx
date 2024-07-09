import { ICardProductItems } from "@/types/CardProduct/cardProduct";
import ItemPriceCard from "../ItemPriceCard/ItemPriceCard";
import styles from "./style.module.scss";

interface IPriceCardProps {
  data: ICardProductItems;
}

export default function ItemPriceCardWrap({ data }: IPriceCardProps) {
  return (
    <div className={styles.priceCard_wrap}>
      <ItemPriceCard data={data} />
      {/* <ItemBanner /> */}
    </div>
  );
}
