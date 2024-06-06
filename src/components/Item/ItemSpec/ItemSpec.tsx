"use client";

import { Items } from "@/types/CardProduct/cardProduct";
import DOMPurify from "isomorphic-dompurify";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";

export interface IItemsProps {
  data: Items;
  openItemModalDescription: () => void;
}

const ItemSpec = ({ data, openItemModalDescription }: IItemsProps) => {
  const [sanitizedSpec, setSanitizedSpec] = useState("");

  useEffect(() => {
    setSanitizedSpec(
      DOMPurify.sanitize(data.specification).split(" ").slice(0, 70).join(" ")
    );
  }, [data.specification]);

  return (
    <div className="topten">
      {sanitizedSpec && (
        <h2 className={styles.product__aboutTheProduct_desc}>Характеристики</h2>
      )}
      {sanitizedSpec && (
        <div
          onClick={openItemModalDescription}
          dangerouslySetInnerHTML={{
            __html: sanitizedSpec,
          }}
          className={
            styles.product__aboutTheProduct_wrap + " " + styles.fadeEffect
          }
        />
      )}
      {sanitizedSpec && (
        <button
          onClick={openItemModalDescription}
          className={styles.product__aboutTheProduct_button}
        >
          Все характеристики
        </button>
      )}
    </div>
  );
};

export default ItemSpec;
