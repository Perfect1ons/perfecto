"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import { ISimilarItem } from "@/types/SimilarProduct/similarProduct";
import Link from "next/link";
import ItemSlider from "./ItemSlider/ItemSlider";
import ItemDesc from "./ItemDesc/ItemDesc";
import ItemOcenka from "./ItemOcenka/ItemOcenka";
import ItemPriceCard from "./ItemPriceCard/ItemPriceCard";
import ProductReview from "./ProductReview/ProductReview";
import { useState } from "react";
import ReviewModal from "../UI/ReviewModal/ReviewModal";
import ItemSpec from "./ItemSpec/ItemSpec";
import SimilarProducts from "../UI/SimilarProducts/SimilarProducts";
import ItemBanner from "./ItemBanner/ItemBanner";
import { CopyIcon } from "../../../public/Icons/Icons";
import SeenProduct from "./SeenProduct/SeenProduct";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import UserInfoModal from "../UI/UserInfoModal/UserInfoModal";
import ItemAccordion from "./ItemAccordion/ItemAccordion";
import OrderModal from "./OrderModal/OrderModal";

interface IItemPageProps {
  data: Items;
  similar: ISimilarItem[];
  breadCrumbs: BreadCrumbs[];
}

const ItemPage = ({ data, similar, breadCrumbs }: IItemPageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isBought, setIsBought] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
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

  const boughtHandler = () => {
    setIsBought(!isBought);
    toggleScrollLock();
  };
  const handleCopyCode = (entryCode: string) => {
    navigator.clipboard.writeText(entryCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 5000); // Скрыть уведомление через 3 секунды
  };

  const matchingBreadCrumb = breadCrumbs.find(
    (crumb) => crumb.id === data.id_cat
  );

  return (
    <section className={styles.wrap}>
      {isOpen && (
        <div className={styles.wrap_modal}>
          <ReviewModal func={openModal} data={data} />
          <div onClick={openModal} className={styles.wrap_backdrop}></div>
        </div>
      )}
      {isBought && (
        <div className={styles.wrap_modal}>
          <OrderModal data={data} func={boughtHandler} />
          <div onClick={boughtHandler} className={styles.wrap_backdrop}></div>
        </div>
      )}
      <div className="container">
        <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          {breadCrumbs.map((crumbs) => (
            <Link
              className="all__directions_link"
              href={`/catalog/${crumbs.full_slug}`}
              key={crumbs.id}
            >
              {crumbs.name}
            </Link>
          ))}
        </div>
        <div className={styles.item__preview}>
          <div className={styles.item__preview_slider}>
            {data ? <ItemSlider photos={data} /> : <h1>hello</h1>}
          </div>
          <div className={styles.item__preview_info}>
            <h1 className={styles.item__preview_info_title}>{data.naim}</h1>
            <ItemOcenka data={data} />
            <div className={styles.item__preview_info_description}>
              <div className={styles.item__preview_info_description_block}>
                {data.description ? <ItemDesc data={data} /> : null}
                <div className={styles.product__aboutTheProduct}>
                  Код:
                  <span className={styles.product__aboutTheProduct_span}></span>
                  <div
                    className={styles.product__aboutTheProduct_div}
                    onClick={() => handleCopyCode(data.art.toString())}
                  >
                    <span>{data.art}</span>
                    <span
                      onClick={() => handleCopyCode(data.art.toString())}
                      className={styles.product__aboutTheProduct_div_copy}
                    >
                      <CopyIcon />
                    </span>
                  </div>
                  <UserInfoModal visible={copiedCode}>
                    Код скопирован!
                  </UserInfoModal>
                </div>
                {data.specification ? <ItemSpec data={data} /> : null}
                {data.trademark ? (
                  <Link
                    className={styles.brand__link}
                    href={`/brands/${data.trademark}-${data.trademark_id}`}
                  >
                    Бренд:{" "}
                    <span className={styles.brand__link_custom}>
                      {data.trademark}
                    </span>
                  </Link>
                ) : null}
                <h3 className={styles.all__goods}>
                  Все товары категории:{" "}
                  {matchingBreadCrumb ? (
                    <Link
                      className={styles.all__goods_link}
                      href={`/catalog/${matchingBreadCrumb.full_slug}`}
                    >
                      {matchingBreadCrumb.name}
                    </Link>
                  ) : (
                    "Категория не найдена"
                  )}
                </h3>
              </div>
              <div className={styles.priceCard_wrap}>
                <ItemPriceCard data={data} func={boughtHandler} />
                <ItemBanner />
              </div>
            </div>
          </div>
        </div>
        <ProductReview data={data} func={openModal} />
        <ItemAccordion />
      </div>
      <SimilarProducts similar={similar} />
      <SeenProduct />
    </section>
  );
};

export default ItemPage;
