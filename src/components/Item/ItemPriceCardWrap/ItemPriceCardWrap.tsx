import { Items } from "@/types/CardProduct/cardProduct";
import ItemBanner from "../ItemBanner/ItemBanner";
import ItemPriceCard from "../ItemPriceCard/ItemPriceCard";
import styles from "./style.module.scss";
import { BrandsAll } from "@/types/bannerAll";

interface IPriceCardProps {
  data: Items;
  banner: BrandsAll;
}

export default function ItemPriceCardWrap({ data, banner }: IPriceCardProps) {
  return (
    <div className={styles.priceCard_wrap}>
      <ItemPriceCard data={data} />
      <div className={styles.banner}>
        <ItemBanner banner={banner} />
      </div>
    </div>
  );
}
