"use client";
import DOMPurify from "isomorphic-dompurify";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";
import { Items } from "@/types/CardProduct/cardProduct";
import ItemDescriptionModal from "../ItemDescriptionModal/ItemDescriptionModal";

interface IDescProps {
  data: Items;
}

const ItemDesc = ({ data }: IDescProps) => {
  const [itemModalDescription, setItemModalDescription] = useState(false);
  const [sanitizedDescription, setSanitizedDescription] = useState("");

  useEffect(() => {
    if (data.description) {
      const sanitized = DOMPurify.sanitize(
        data.description.slice(0, 150) + "..."
      );
      setSanitizedDescription(sanitized);
    }
  }, [data.description]);

  const openItemModalDescription = () => {
    setItemModalDescription(!itemModalDescription);
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
    <div className={styles.product__description}>
      <div className={styles.wrap_modal}>
        <ItemDescriptionModal
          data={data}
          func={openItemModalDescription}
          visible={itemModalDescription}
        />
      </div>
      <div className={styles.product__descriptionContainer}>
        <p className={styles.product__descriptionContainer_desc}>Описание</p>
        <div
          onClick={openItemModalDescription}
          className={styles.product__descriptionContainer_text}
          dangerouslySetInnerHTML={{
            __html: sanitizedDescription,
          }}
        />
        <button
          onClick={openItemModalDescription}
          className={styles.product__descriptionContainer_button}
        >
          Читать далее
        </button>
      </div>
    </div>
  );
};

export default ItemDesc;
