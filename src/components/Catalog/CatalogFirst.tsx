"use client";
import { ICatalogFirst } from "@/types/catalogFirst";
import styles from "./style.module.scss";
import Image from "next/image";
import { ICatalogSecond } from "@/types/catalogSecond";
import { useEffect, useState } from "react";
import { getCatalogSecond } from "@/api/requests";

interface ICatalogProps {
  catalog: ICatalogFirst[];
  category: ICatalogSecond;
}
const CatalogFirst = ({ catalog, category }: ICatalogProps) => {
  const [res, setRes] = useState<ICatalogSecond>();
  useEffect(() => {
    setRes(category);
  }, [category]);

  const click = async (id: number) => {
    const data = await getCatalogSecond(id);
    setRes(data);
  };

  return (
    <div className={styles.catalog}>
      <div>
        {catalog.map((item) => {
          return (
            <h1
              key={item.id}
              className={styles.catalog__h1}
              onClick={() => click(item.id)}
            >
              {item.name}
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAX1JREFUSEvt0jFLAzEYBuA3ijU5BK0/oTc7uDo5WFBEXbxFHRy0ToVWsHfjNzYudnZw0KVSsIMgujhYF/+BINzm7iBGRImcpFBRNDlqB+ltB8n78L1fGHr8sR576INdb7xf6ZdKoyia5JzfEdFjmr6dKg3DcAJAC8CtEGImDeoEViqVXcbYTjIZY6zFOZ8loieXSZ3AxImi6EhrvWqQayFEnoiebVFXEEQ0oJQ6BrBskEshxBwRvdigzmASGgTBYC6Xq7dRrfW553lLNmgqsI36vn+itV5M/g26QESvP02aGkxCiYgrpe4BjJuHtF2tVvf+BCwUCkPZbLYJYN4AzTiOg0aj8dZ1sFgsDnuedwogb8LrcRyv/YZ9tGDzsjrPlMtlkclkzgBMtzEp5UqyRpssJ5CIRpRSFwCmTPihlHLdFnOeMAzDfQCbBjuQUm64YGnAUcbYldb6Rkq55Yo5g8mFUqk0VqvVHmz29d0Zpx2mRTrv9cFutPgp4/9X+g50FXQdSAjUjQAAAABJRU5ErkJggg=="
                alt="chevron"
                width={24}
                height={24}
              />
            </h1>
          );
        })}
      </div>
      <div>
        <div>{res?.category.name}</div>
        <h2>{res?.category[1].name}</h2>
        <h2>{res?.category[2].name}</h2>
        <h2>{res?.category[3].name}</h2>
        <h2>{res?.category[4].name}</h2>
        <h2>{res?.category[5].name}</h2>
        <h2>{res?.category[6].name}</h2>
        <h2>{res?.category[7].name}</h2>
        <h2>{res?.category[8].name}</h2>
        <h2>{res?.category[9].name}</h2>
      </div>
    </div>
  );
};

export default CatalogFirst;
