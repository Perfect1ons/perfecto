"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image"; // Assuming you're using Next.js Image component
import styles from "./style.module.scss";
import { XMark, chevronDownIcon } from "../../../../../public/Icons/Icons";
import { Items } from "@/types/CardProduct/cardProduct";
import { url } from "@/components/temporary/data";
import InnerImageZoom from "react-inner-image-zoom";
import ItemPriceCardWrap from "../../ItemPriceCardWrap/ItemPriceCardWrap";

interface IReviewModal {
  photos: Items; // Accessing the photos property from Items
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
        {isAtTop && (
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
          <ItemPriceCardWrap data={photos} />
        </div>

        <ul className={styles.ul}>
          {photos.photos.map((photo, index) => (
            <li className={styles.li} key={index}>
              {zoom ? (
                <InnerImageZoom
                  width={1000}
                  height={500}
                  src={
                    photo.url_part.startsWith("https://goods")
                      ? `${photo.url_part}1080-nw.jpg`
                      : photo.url_part.startsWith("https://")
                      ? photo.url_part
                      : `${url}nal/img/${photos.id_post}/b_${photo.url_part}`
                  }
                  zoomSrc={
                    photo.url_part.startsWith("https://goods")
                      ? `${photo.url_part}1080-nw.jpg`
                      : photo.url_part.startsWith("https://")
                      ? photo.url_part
                      : `${url}nal/img/${photos.id_post}/b_${photo.url_part}`
                  }
                  zoomType="hover"
                  zoomScale={2.7}
                  hideHint={true}
                  className={styles.photo}
                />
              ) : (
                <Image
                  width={500}
                  height={500}
                  src={
                    photo.url_part.startsWith("https://goods")
                      ? `${photo.url_part}1080-nw.jpg`
                      : photo.url_part.startsWith("https://")
                      ? photo.url_part
                      : `${url}nal/img/${photos.id_post}/b_${photo.url_part}`
                  }
                  alt={photo.url_part}
                  className={styles.photo}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemSliderModal;
