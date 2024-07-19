"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { ITovaryByID } from "@/types/OrderById/orderbyid";
import { url } from "@/components/temporary/data";
import { useState } from "react";
import { RemoveFromZakazIcon } from "../../../../../../public/Icons/Icons";

interface IOrderItemsCardProps {
  tovar: ITovaryByID;
  index: number;
}

const OrderItemsCard = ({ tovar, index }: IOrderItemsCardProps) => {
  const [price, setPrice] = useState<number>(
    parseFloat(tovar.cenaok.replace(/\.00$/, ""))
  );
  const discountPrice = price - parseFloat(tovar.sum_skid);
  const totalPrice = tovar.price_without_discount * tovar.kol;
  const totalDiscountPrice = discountPrice * tovar.kol;
  const image =
    tovar.img.length > 1
      ? tovar.img.startsWith("https://")
        ? tovar.img
        : `${url}nal/img/${tovar.id_post}/l_${tovar.img}`
      : `${url}/images/empty-photo.png`;

  return (
    <div className={styles.over_good}>
      <p className={styles.over_good_number}>{index + 1}</p>
      <div className={styles.over_good_photo}>
        <Image
          className={styles.over_good_photo_img}
          src={image}
          width={88}
          height={88}
          alt="good img"
        />
      </div>
      <p className={styles.over_good_art}>{tovar.id_tov}</p>
      <p className={styles.over_good_name}>{tovar.naim}</p>
      <p className={styles.over_good_count}>{tovar.kol}</p>
      <p className={styles.over_good_price}>{price}</p>
      <p className={styles.over_good_discount}>{tovar.sum_skid}</p>
      <p className={styles.over_good_priceWithDiscount}>
        {tovar.sum_skid ? discountPrice : ""}
      </p>
      <p className={styles.over_good_total}>
        {tovar.sum_skid ? totalDiscountPrice : totalPrice}
      </p>
      <p className={styles.over_good_delete}>
        <RemoveFromZakazIcon />
      </p>
    </div>
  );
};

export default OrderItemsCard;
