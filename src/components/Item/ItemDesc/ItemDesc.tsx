"use client";

import DOMPurify from "isomorphic-dompurify";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";
import { Items } from "@/types/CardProduct/cardProduct";

interface IDescProps {
  data: Items;
  openItemModalDescription: () => void;
}

const ItemDesc = ({ data, openItemModalDescription }: IDescProps) => {
  const [sanitizedDescription, setSanitizedDescription] = useState("");

  useEffect(() => {
    if (data.description) {
      const sanitized = DOMPurify.sanitize(
        data.description.slice(0, 150) + "..."
      );
      setSanitizedDescription(sanitized);
    }
  }, [data.description]);

  return (
    <div className={styles.product__description}>
      <div className={styles.wrap_modal}></div>
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
