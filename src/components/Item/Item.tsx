"use client";
import { ICardProductItems } from "@/types/CardProduct/cardProduct";
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
import ItemDescriptionModal from "./ItemDescriptionModal/ItemDescriptionModal";
import ItemPriceCard from "./ItemPriceCard/ItemPriceCard";

import ItemMainSkeleton from "./ItemMainSkeleton/ItemMainSkeleton";

interface IItemPageProps {
  data: ICardProductItems;
  similar: ISimilarItem[];
  breadCrumbs: BreadCrumbs[];
}

const ItemPage = ({ data, similar, breadCrumbs }: IItemPageProps) => {
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [itemModalDescription, setItemModalDescription] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // блокировка скролла
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
  // для Review modal
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

  // для SliderModal
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
    (crumb) => crumb.id === data.items.id_cat
  );
  const openItemModalDescription = () => {
    setItemModalDescription(!itemModalDescription);
    scrollLockBlock();
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <section className={styles.wrap}>
      {isOpenReview && (
        <div className={styles.wrap_modal}>
          <ReviewModal func={openModal} data={data.items} />
          <div onClick={openModal} className={styles.wrap_backdrop}></div>
        </div>
      )}
      {isLoading ? (
        <ItemMainSkeleton />
      ) : (
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

              <h1 className={styles.item__preview_info_title}>
                {data.items.naim}
              </h1>
              <ItemOcenka data={data.items} />
              <div className={styles.item__preview_info_description}>
                <div className={styles.item__preview_info_description_block}>
                  {data.items.description ? (
                    <ItemDesc
                      openItemModalDescription={openItemModalDescription}
                      data={data.items}
                    />
                  ) : null}
                  <div className={styles.product__aboutTheProduct}>
                    <span className={styles.product__aboutTheProduct_codeName}>
                      Код:
                    </span>
                    <span
                      className={styles.product__aboutTheProduct_span}
                    ></span>
                    <div
                      className={styles.product__aboutTheProduct_div}
                      onClick={() => handleCopyCode(data.items.art.toString())}
                    >
                      <span>{data.items.art}</span>
                      <span
                        onClick={() =>
                          handleCopyCode(data.items.art.toString())
                        }
                        className={styles.product__aboutTheProduct_div_copy}
                      >
                        <CopyIcon />
                      </span>
                    </div>
                    <UserInfoModal
                      visible={copiedCode}
                      onClose={closeModalCode}
                    >
                      Код скопирован!
                    </UserInfoModal>
                  </div>
                  {data.items.specification ? (
                    <ItemSpec
                      data={data.items}
                      openItemModalDescription={openItemModalDescription}
                    />
                  ) : null}
                  {data.items.trademark ? (
                    <Link
                      className={styles.brand__link}
                      href={`/brands/${data.items.trademark}-${data.items.trademark_id}`}
                    >
                      Бренд:{" "}
                      <span className={styles.brand__link_custom}>
                        {data.items.trademark}
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
                </div>
                <ItemPriceCardWrap data={data} />
              </div>
            </div>
          </div>
          <ProductReview data={data.items} func={openModal} />
          <ItemAccordion />
        </div>
      )}
      {isClient && (
        <ItemDescriptionModal
          data={data.items}
          func={openItemModalDescription}
          visible={itemModalDescription}
        />
      )}
      <SimilarProducts similar={similar} />
    </section>
  );
};

export default ItemPage;
