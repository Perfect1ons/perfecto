"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import { ISimilarItem } from "@/types/SimilarProduct/similarProduct";
import Link from "next/link";
import ItemSlider from "./ItemSlider/ItemSlider";
import ItemDesc from "./ItemDesc/ItemDesc";
import ItemOcenka from "./ItemOcenka/ItemOcenka";
import ProductReview from "./ProductReview/ProductReview";
import { useState, useEffect } from "react";
import ReviewModal from "../UI/ReviewModal/ReviewModal";
import ItemSpec from "./ItemSpec/ItemSpec";
import SimilarProducts from "../UI/SimilarProducts/SimilarProducts";
import { BackArrow, CopyIcon } from "../../../public/Icons/Icons";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import UserInfoModal from "../UI/UserInfoModal/UserInfoModal";
import ItemAccordion from "./ItemAccordion/ItemAccordion";
import ItemPriceCardWrap from "./ItemPriceCardWrap/ItemPriceCardWrap";
import ItemBanner from "./ItemBanner/ItemBanner";
import ItemDescriptionModal from "./ItemDescriptionModal/ItemDescriptionModal";
import MobileBuyBtn from "./MobileBuyBtn/MobileBuyBtn";
import ItemPriceCard from "./ItemPriceCard/ItemPriceCard";

interface IItemPageProps {
  data: Items;
  similar: ISimilarItem[];
  breadCrumbs: BreadCrumbs[];
}

const ItemPage = ({ data, similar, breadCrumbs }: IItemPageProps) => {
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [itemModalDescription, setItemModalDescription] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const scrollLockBlock = () => {
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
  useEffect(() => {
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpenReview) {
      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
      body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = body.style.top;
      body.style.paddingRight = "";
      body.style.overflow = "auto";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      body.style.top = "";
    }
  }, [isOpenReview]);

  useEffect(() => {
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
      body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = body.style.top;
      body.style.paddingRight = "";
      body.style.overflow = "auto";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      body.style.top = "";
    }
  }, [isOpen]);

  const openModal = () => {
    setIsOpenReview(!isOpenReview);
  };

  const handleCopyCode = (entryCode: string) => {
    navigator.clipboard.writeText(entryCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 5000);
  };

  const closeModalCode = () => {
    setCopiedCode(false);
  };

  const matchingBreadCrumb = breadCrumbs.find(
    (crumb) => crumb.id === data.id_cat
  );
  const openItemModalDescription = () => {
    setItemModalDescription(!itemModalDescription);
    scrollLockBlock();
  };

  return (
    <section className={styles.wrap}>
      <MobileBuyBtn data={data} />
      {isOpenReview && (
        <div className={styles.wrap_modal}>
          <ReviewModal func={openModal} data={data} />
          <div onClick={openModal} className={styles.wrap_backdrop}></div>
        </div>
      )}
      <div className="container">
        <div className="all__directions">
          {breadCrumbs.slice(-1).map((crumbs) => (
            <Link
              className="all__directions_link"
              href={`/catalog/${crumbs.full_slug}`}
              key={crumbs.id}
            >
              <BackArrow />
              Назад
            </Link>
          ))}

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
            <ItemSlider
              photos={data}
              toggleScrollLock={() => setIsOpen(true)}
            />
          </div>
          <div className={styles.item__preview_info}>
            <div className={styles.priceCard_mobile}>
              <ItemPriceCard data={data} />
            </div>

            <h1 className={styles.item__preview_info_title}>{data.naim}</h1>
            <ItemOcenka data={data} />
            <div className={styles.item__preview_info_description}>
              <div className={styles.item__preview_info_description_block}>
                {data.description ? (
                  <ItemDesc
                    openItemModalDescription={openItemModalDescription}
                    data={data}
                  />
                ) : null}
                <div className={styles.product__aboutTheProduct}>
                  <span className={styles.product__aboutTheProduct_codeName}>
                    Код:
                  </span>
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
                  <UserInfoModal visible={copiedCode} onClose={closeModalCode}>
                    Код скопирован!
                  </UserInfoModal>
                </div>
                {data.specification ? (
                  <ItemSpec
                    data={data}
                    openItemModalDescription={openItemModalDescription}
                  />
                ) : null}
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
                <p className={styles.all__goods}>
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
                </p>
                <div className={styles.banner}>
                  <ItemBanner />
                </div>
              </div>
              <ItemPriceCardWrap data={data} />
            </div>
          </div>
        </div>
        <ProductReview data={data} func={openModal} />
        <ItemAccordion />
      </div>
      <ItemDescriptionModal
        data={data}
        func={openItemModalDescription}
        visible={itemModalDescription}
      />
      <SimilarProducts similar={similar} />
    </section>
  );
};

export default ItemPage;
