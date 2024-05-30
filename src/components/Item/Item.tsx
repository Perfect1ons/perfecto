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
import ItemVideo from "./ItemVideo/ItemVideo";
import ProductReview from "./ProductReview/ProductReview";
import { useEffect, useState } from "react";
import ReviewModal from "../UI/ReviewModal/ReviewModal";
import ItemSpec from "./ItemSpec/ItemSpec";
import SimilarProducts from "../UI/SimilarProducts/SimilarProducts";
import ItemBanner from "./ItemBanner/ItemBanner";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";


interface IItemPageProps {
  data: Items;
  similar: ISimilarItem[];
  breadCrumbs: BreadCrumbs[];
}

const ItemPage = ({ data, similar, breadCrumbs }: IItemPageProps) => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleScrollLock = () => {
     const body = document.body;
     if (body) {
       const scrollBarWidth =
         window.innerWidth - document.documentElement.clientWidth;
       if (body.style.overflow === "hidden") {
         body.style.paddingRight = "";
         body.style.overflow = "auto";
         window.scrollTo(0, parseInt(body.style.top || "0", 10) * -1);
         body.style.top = "";
       } else {
         body.style.paddingRight = `${scrollBarWidth}px`;
         body.style.overflow = "hidden";
         body.style.top = `-${window.scrollY}px`;
       }
     }
   };

   const openModal = () => {
     setIsOpen(!isOpen);
     toggleScrollLock();
   };

  return (
    <section className={styles.wrap}>
      {isOpen && (
        <div className={styles.wrap_modal}>
          <ReviewModal func={openModal} data={data} />
          <div onClick={openModal} className={styles.wrap_backdrop}></div>
        </div>
      )}
      <div className="container">
        <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          {breadCrumbs.map((crumbs) => {
            return (
              <Link className="all__directions_link" href={`/catalog/${crumbs.full_slug}`} key={crumbs.id}>
                {crumbs.name}
              </Link>
            )
          })}
        </div>
        <div className={styles.item__preview}>
          <div className={styles.item__preview_slider}>
            {data ?  <ItemSlider photos={data} /> : <h1>hello</h1> }
           
          </div>
          <div className={styles.item__preview_info}>
            <h1 className={styles.item__preview_info_title}>{data.naim}</h1>
            <ItemOcenka data={data} />
            <div className={styles.item__preview_info_description}>
              <div className={styles.item__preview_info_description_block}>
                <ItemDesc data={data} />
                <ItemSpec data={data} />
              </div>
              <div>
                <ItemPriceCard data={data} />
                <ItemBanner />
              </div>
            </div>
          </div>
        </div>
        {data.video && <ItemVideo video={data.video} />}
        <ProductReview data={data} func={openModal} />
      </div>
      <SimilarProducts similar={similar} />
    </section>
  );
};

export default ItemPage;
