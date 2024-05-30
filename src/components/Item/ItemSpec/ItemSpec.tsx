"use client";

import { Items } from "@/types/CardProduct/cardProduct";
import DOMPurify from "isomorphic-dompurify";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";
import ItemDescriptionModal from "../ItemDescriptionModal/ItemDescriptionModal";

export interface IItemsProps {
  data: Items;
}

const ItemSpec = ({ data }: IItemsProps) => {
  const [itemModalDescription, setItemModalDescription] = useState(false);
  const [sanitizedSpec, setSanitizedSpec] = useState("");

  useEffect(() => {
    setSanitizedSpec(
      DOMPurify.sanitize(data.specification).split(" ").slice(0, 70).join(" ")
    );
  }, [data.specification]);

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
    <div className="topten">
      <ItemDescriptionModal
        data={data}
        func={openItemModalDescription}
        visible={itemModalDescription}
      />
      {sanitizedSpec && (
        <h2 className={styles.product__aboutTheProduct_desc}>Характеристики</h2>
      )}
      {sanitizedSpec && (
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizedSpec,
          }}
          className={styles.product__aboutTheProduct_wrap}
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
