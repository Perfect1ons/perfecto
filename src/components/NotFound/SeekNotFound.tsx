"use client"
import Image from "next/image";
import PopularGoods from "../HomeComponents/PopularGoods/PopularGoods";
import styles from "./style.module.scss";
import Link from "next/link";
import clsx from "clsx";

export interface IPopularProps {
  goods: any;
  search: string
}

const SeekNotFound = ({ goods, search }: IPopularProps) => {
  const formattedSearch = search.replace("search=", "");


  return (
    <section className="seek__not_founded">
      <div className={clsx(styles.not__found_container, "container")}>
        <div className={styles.not__found_img}>
          <Image
            src={"/img/undefinedPage.png"}
            width={180}
            height={180}
            alt="undefined"
          />
        </div>

        <span className={styles.not__found_error}>Упс...</span>
        <h1 className={styles.not__found_title}>
          По запросу <span>{formattedSearch}</span> ничего не найдено
        </h1>

        <Link className={styles.goToMain} href={"/"}>
          <button className={styles.goToMain__button}>
            Перейти на главную
          </button>
        </Link>
        <div className={styles.popGoods}>
          <PopularGoods goods={goods} />
        </div>
      </div>
    </section>
  );
};

export default SeekNotFound;


