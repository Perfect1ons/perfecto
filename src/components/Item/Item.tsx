"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import { ISimilarItem } from "@/types/SimilarProduct/similarProduct";
import Link from "next/link";
import cn from "clsx";
import ItemSlider from "./ItemSlider/ItemSlider";
import ItemDesc from "./ItemDesc/ItemDesc";
import ItemOcenka from "./ItemOcenka/ItemOcenka";
import ItemPriceCard from "./ItemPriceCard/ItemPriceCard";


interface IItemPageProps {
  data: Items;
  similar: ISimilarItem[];
}

const ItemPage = ({ data, similar }: IItemPageProps) => {


  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          <Link
            href={`/item/${data.art}/${data.url}`}
            className={cn("all__directions_link", "all__directions_linkActive")}
          >
            {data.name.split(" ").slice(0, 6).join(" ")}
          </Link>
        </div>
        <div className={styles.item__preview}>
          <div className={styles.item__preview_slider}>
            <ItemSlider photos={data}/>
          </div>
          <div className={styles.item__preview_info}>
            <h1 className={styles.item__preview_info_title}>{data.naim}</h1>
            <ItemOcenka data={data}/>
            <div className={styles.item__preview_info_description}>
              <ItemDesc data={data}/>
              <ItemPriceCard data={data}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemPage;
