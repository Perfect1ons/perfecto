"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image"; // Assuming you're using Next.js Image component
import styles from "./style.module.scss";
import { XMark, chevronDownIcon } from "../../../../../public/Icons/Icons";
import { ICardProductItems, Items } from "@/types/CardProduct/cardProduct";
import { url } from "@/components/temporary/data";
import InnerImageZoom from "react-inner-image-zoom";
import clsx from "clsx";
import ItemPriceCard from "../../ItemPriceCard/ItemPriceCard";

interface IReviewModal {
  photos: ICardProductItems; // Accessing the photos property from Items
  isOpen: boolean;
  closeModal: () => void;
  zoom: boolean;
}

const ItemSliderModal = ({
  photos,
  isOpen,
  closeModal,
  zoom,
}: IReviewModal) => {
  const [isAtTop, setIsAtTop] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsAtTop(e.currentTarget.scrollTop === 0);
  };

  const handleSwipeDownClick = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsAtTop(true); // Set isAtTop to true when the modal is opened
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper} onScroll={handleScroll} ref={wrapperRef}>
        {isAtTop && photos.items.photos.length < 1 && (
          <div className={styles.swipe_down} onClick={handleSwipeDownClick}>
            {chevronDownIcon()}
            Листайте вниз, чтобы увидеть больше картинок
          </div>
        )}
        <div className={styles.wrapper_nav}>
          <h1 className={styles.wrapper_nav_title}>Все фотографии</h1>
          <button onClick={closeModal} className={styles.wrapper_nav_cross}>
            <XMark />
          </button>
        </div>

        <div className={styles.priceCard}>
          <ItemPriceCard data={photos} />
        </div>

        {zoom ? (
          <div className={styles.photos}>
            {photos.items.photos.map((photo, index) => {
              return (
                <InnerImageZoom
                  key={index}
                  width={750}
                  height={750}
                  src={
                    photo.url_part.startsWith("https://goods")
                      ? `${photo.url_part}700-nw.jpg`
                      : photo.url_part.startsWith("https://")
                      ? photo.url_part
                      : `${url}nal/img/${photos.items.id_post}/b_${photo.url_part}`
                  }
                  zoomSrc={
                    photo.url_part.startsWith("https://goods")
                      ? `${photo.url_part}700-nw.jpg`
                      : photo.url_part.startsWith("https://")
                      ? photo.url_part
                      : `${url}nal/img/${photos.items.id_post}/b_${photo.url_part}`
                  }
                  zoomType="hover"
                  hideHint={true}
                  zoomScale={2}
                  className={styles.product_img}
                />
              );
            })}
          </div>
        ) : (
          <div className={styles.photos}>
            {photos.items.photos.map((photo, index) => {
              return (
                <Image
                  key={index}
                  width={750}
                  height={750}
                  src={
                    photo.url_part.startsWith("https://goods")
                      ? `${photo.url_part}700-nw.jpg`
                      : photo.url_part.startsWith("https://")
                      ? photo.url_part
                      : `${url}nal/img/${photos.items.id_post}/b_${photo.url_part}`
                  }
                  alt={photos.items.naim}
                  className={styles.photos__img}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemSliderModal;


          // {photos?.items?.photos?.map((photo, index) => (
          //     {zoom ? (
          //      
          //     ) : (
          //       <Image
          //         width={500}
          //         height={500}
          //         src={
          //           photo.url_part.startsWith("https://goods")
          //             ? `${photo.url_part}700-nw.jpg`
          //             : photo.url_part.startsWith("https://")
          //             ? photo.url_part
          //             : `${url}nal/img/${photos.items.id_post}/b_${photo.url_part}`
          //         }
          //         alt={photo.url_part}
          //         className={clsx(styles.photo)}
          //       />
          //     )}
          // ))}