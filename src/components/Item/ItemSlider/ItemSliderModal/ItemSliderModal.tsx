"use client";
import { useEffect } from "react";
import Image from "next/image"; // Assuming you're using Next.js Image component
import styles from "./style.module.scss";
import { XMark } from "../../../../../public/Icons/Icons";
import { Items } from "@/types/CardProduct/cardProduct";
import { url } from "@/components/temporary/data";

interface IReviewModal {
  photos: Items; // Accessing the photos property from Items
  isOpen: boolean;
  closeModal: () => void;
}

const ItemSliderModal = ({ photos, isOpen, closeModal }: IReviewModal) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_nav}>
          <h1 className={styles.wrapper_nav_title}>Все фотографии</h1>
          <button onClick={closeModal} className={styles.wrapper_nav_cross}>
            <XMark />
          </button>
        </div>

        <ul className={styles.ul}>
          {photos.photos.map((photo, index) => (
            <li key={index}>
              <Image
                src={
                  photo.url_part.startsWith("https://goods")
                    ? `${photo.url_part}280.jpg`
                    : photo.url_part.startsWith("https://")
                    ? photo.url_part
                    : `${url}nal/img/${photos.id_post}/b_${photo.url_part}`
                }
                alt={`Photo ${index + 1}`}
                width={500} // Adjust width as needed
                height={500} // Adjust height as needed
                className={styles.photo} // Add your own styling if needed
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemSliderModal;
