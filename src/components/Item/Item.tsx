"use client";
import { ICardProductItems } from "@/types/CardProduct/cardProduct";
import dynamic from "next/dynamic";
import styles from "./style.module.scss";
import { ISimilarItem } from "@/types/SimilarProduct/similarProduct";
import Link from "next/link";
import ItemDesc from "./ItemDesc/ItemDesc";
import ItemOcenka from "./ItemOcenka/ItemOcenka";
import ProductReview from "./ProductReview/ProductReview";
import { useState, useEffect } from "react";
import ReviewModal from "../UI/ReviewModal/ReviewModal";
import { BackArrow, CopyIcon } from "../../../public/Icons/Icons";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import ItemPriceCard from "./ItemPriceCard/ItemPriceCard";
import ItemSpec from "./ItemSpec/ItemSpec";
import UserInfoModal from "../UI/UserInfoModal/UserInfoModal";
import ItemPriceCardWrap from "./ItemPriceCardWrap/ItemPriceCardWrap";
import ItemAccordion from "./ItemAccordion/ItemAccordion";
import ItemDescriptionModal from "./ItemDescriptionModal/ItemDescriptionModal";
import ItemSliderSkeleton from "./ItemSlider/ItemSliderSkeleton/ItemSliderSkeleton";

const ItemSlider = dynamic(
  () => import("./ItemSlider/ItemSlider"),
  {
    ssr: false,
    loading: () => <ItemSliderSkeleton/>
  }
);

const SimilarProducts = dynamic(
  () => import("../UI/SimilarProducts/SimilarProducts"),
  {
    ssr: false,
  }
);

interface IItemPageProps {
  data: ICardProductItems;
  similar?: ISimilarItem[];
  breadCrumbs?: BreadCrumbs[];
  authToken: string | undefined;
  id_cart?: string | null | undefined;
}

const ItemPage = ({
  data,
  similar,
  breadCrumbs,
  authToken,
  id_cart,
}: IItemPageProps) => {
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [itemModalDescription, setItemModalDescription] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Общий блок для блокировки скролла
  const scrollLockBlock = (open: boolean) => {
    const body = document.body;
    if (body) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (open) {
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
    }
  };

  // Эффект для Review modal
  useEffect(() => {
    if (isOpenReview) {
      scrollLockBlock(true);
    } else {
      scrollLockBlock(false);
    }
  }, [isOpenReview]);

  // Эффект для SliderModal
  useEffect(() => {
    if (isOpen) {
      scrollLockBlock(true);
    } else {
      scrollLockBlock(false);
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

  const matchingBreadCrumb = breadCrumbs?.find(
    (crumb) => crumb.id === data.items.id_cat
  );

  const openItemModalDescription = () => {
    setItemModalDescription(!itemModalDescription);
    scrollLockBlock(!itemModalDescription);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className={styles.wrap}>
      {isOpenReview && (
        <div className={styles.wrap_modal}>
          <ReviewModal func={openModal} data={data.items} />
          <div onClick={openModal} className={styles.wrap_backdrop}></div>
        </div>
      )}

      <div className="container">
        <div className="all__directions">
          {breadCrumbs?.slice(-1).map((crumbs) => (
            <Link
              className="all__directions_link"
              href={`/catalog/${crumbs.full_slug}`}
              key={crumbs.id}
            >
              <BackArrow />
              Назад
            </Link>
          ))}

          {breadCrumbs?.map((crumbs) => (
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
            {data.items.status !== 6 && (
              <div className={styles.item__preview_slider_disabled}>
                <span className={styles.item__preview_slider_disabled_title}>
                  СНЯТ С ПРОДАЖИ
                </span>
              </div>
            )}

            <ItemSlider
              photos={data}
              toggleScrollLock={() => setIsOpen(true)}
            />
          </div>
          <div className={styles.item__preview_info}>
            {data.items.status !== 6 && (
              <div className={styles.item__preview_slider_disabled}>
                <span className={styles.item__preview_slider_disabled_title}>
                  СНЯТ С ПРОДАЖИ
                </span>
              </div>
            )}
            <div className={styles.priceCard_mobile}>
              <ItemPriceCard data={data} id_cart={id_cart} />
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
                  <span className={styles.product__aboutTheProduct_span}></span>
                  <div
                    className={styles.product__aboutTheProduct_div}
                    onClick={() => handleCopyCode(data.items.id_tov.toString())}
                  >
                    <span>{data.items.id_tov}</span>
                    <span
                      onClick={() => handleCopyCode(data.items.art.toString())}
                      className={styles.product__aboutTheProduct_div_copy}
                    >
                      <CopyIcon />
                    </span>
                  </div>
                  <UserInfoModal visible={copiedCode} onClose={closeModalCode}>
                    Код скопирован!
                  </UserInfoModal>
                </div>
                {data.items.specification ? (
                  <ItemSpec
                    data={data.items}
                    openItemModalDescription={openItemModalDescription}
                  />
                ) : null}
                <p className={styles.all__goods}>
                  Все товары категории:
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
              {data.items.status == 6 && <ItemPriceCardWrap data={data} />}
            </div>
          </div>
        </div>
        <ProductReview
          authToken={authToken}
          data={data.items}
          func={openModal}
        />
        <ItemAccordion />
      </div>
      {isClient && (
        <ItemDescriptionModal
          data={data.items}
          func={openItemModalDescription}
          visible={itemModalDescription}
        />
      )}
      {similar && <SimilarProducts similar={similar} id_cart={id_cart} />}
    </section>
  );
};

export default ItemPage;
