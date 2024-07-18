"use client"
import Image from 'next/image';
import styles from './style.module.scss'
import { ITovaryByID } from '@/types/OrderById/orderbyid';
import { url } from '@/components/temporary/data';
import { useState } from 'react';

interface IOrderItemsCardProps{
    tovar: ITovaryByID;
    index: number;
}

const OrderItemsCard = ({tovar, index}: IOrderItemsCardProps) => {
        const [price, setPrice] = useState(
          tovar.cenaok.replace(/\.00$/, "")
        ); 
    const image =
      tovar.img.length > 1
        ? `${url}nal/img/${tovar.id_post}/l_${tovar.img}`
        : `${url}/images/empty-photo.png`;
  return (
    <div className={styles.over_good}>
      <p className={styles.over_good_number}>{index + 1}</p>
      <div className={styles.over_good_photo}>
        <Image
          className={styles.over_goods_photo_img}
          src={image}
          width={100}
          height={100}
          alt="good img"
        />
      </div>
      <p className={styles.over_good_art}>{tovar.id_tov}</p>
      <p className={styles.over_good_name}>
        {tovar.naim}
      </p>
      <p className={styles.over_good_count}>{tovar.kol}</p>
      <p className={styles.over_good_price}>{price}</p>
      <p className={styles.over_good_discount}>{tovar.sum_skid}</p>
      <p className={styles.over_good_priceWithDiscount}>1670</p>
      <p className={styles.over_good_total}>1 670</p>
      <p className={styles.over_good_delete}></p>
    </div>
  );
}

export default OrderItemsCard