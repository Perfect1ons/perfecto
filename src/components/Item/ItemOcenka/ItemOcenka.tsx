"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import { GrayStar, YellowStar } from "../../../../public/Icons/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IOcenkaProps {
  data: Items;
}

const ItemOcenka = ({ data }: IOcenkaProps) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(Math.floor(data.ocenka));
  }, [data.ocenka]);

  return (
    <div className={styles.product_info__ocenka}>
      <span className={styles.product_info_ocenka__count}>{data.ocenka}</span>
      <div className="ocenku">
        {[...Array(5)].map((_, index) => (
          <span key={index}>
            {index < rating ? <YellowStar /> : <GrayStar />}
          </span>
        ))}
      </div>
      <Link
        href={data?.otz?.length !== 0 ? "#otz" : ""}
        className={styles.product_info_ocenka__otzivy}
      >{`(${data?.otz?.length})`}</Link>
    </div>
  );
};

export default ItemOcenka;
