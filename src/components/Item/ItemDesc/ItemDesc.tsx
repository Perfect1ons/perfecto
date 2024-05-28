"use client"
import DOMPurify from 'isomorphic-dompurify';
import styles from './style.module.scss'
import { useState } from 'react';
import { Items } from '@/types/CardProduct/cardProduct';
import ItemDescriptionModal from '@/components/UI/ItemDescriptionModal/ItemDescriptionModal';

interface IDescProps{
  data: Items
}

const ItemDesc = ({data}: IDescProps) => {
  const [itemModalDescription, setiItemModalDescription] = useState(false);

  const openItemModalDescription = () => {
    setiItemModalDescription(!itemModalDescription);
    toggleScrollLock();
  };

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

  return (
    <div>
      <div className={styles.wrap_modal}>
        <ItemDescriptionModal
          data={data}
          func={openItemModalDescription}
          visible={itemModalDescription}
        />
      </div>
      <div className={styles.product__descriptionContainer}>
        <h2 className={styles.product__descriptionContainer_h2}>Описание</h2>
        <p
          className={styles.product__descriptionContainer_p}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.description.slice(0, 152) + "..."),
          }}
        ></p>
        <button
          onClick={openItemModalDescription}
          className={styles.product__descriptionContainer_button}
        >
          Читать далее
        </button>
      </div>
    </div>
  );
}

export default ItemDesc