"use client";
import { IItemItems } from "@/types/CardProduct/cardProduct";
import DOMPurify from "isomorphic-dompurify";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";

export interface IItemsProps {
  data: IItemItems;
  openItemModalDescription: () => void;
}

const ItemSpec = ({ data, openItemModalDescription }: IItemsProps) => {
  const [sanitizedSpec, setSanitizedSpec] = useState<string | undefined>("");

  useEffect(() => {
    if (data.specification) {
      const sanitized = DOMPurify.sanitize(data.specification);
      setSanitizedSpec(sanitized.split(" ").slice(0, 70).join(" "));
    } else {
      setSanitizedSpec("");
    }
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
