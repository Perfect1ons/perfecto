"use client";
import { ISeasonCategoryItem } from "@/types/seasonCategory";
import styles from "./style.module.scss";
import cn from "clsx";
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useRouter } from "next/navigation";
import SeasonCategorySwiper from "./SeasonCategorySwiper/SeasonCategorySwiper";

interface ISeasonCategoryProps {
  seasonItems: ISeasonCategoryItem[];
}

const SeasonCategory = ({ seasonItems }: ISeasonCategoryProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1200px)");
  const startUrl = "https://";
  const image = "https://max.kg/";
  const imageEmpty = "https://max.kg/images/discount/empty-image.png";
  return (
    <>
      <section className={cn(styles.season, "container")}>
        <h4 className={styles.seasonTitle}>Сезонные Категории</h4>
        <div className={cn(styles.seasonItems, isMobile && styles.hidden)}>
          {seasonItems.map((item) => {
            const imageUrl = item.icon
              ? item.icon.startsWith(startUrl)
                ? item.icon
                : `${image}${item.icon}`
              : imageEmpty;

            return (
              <div onClick={() =>
                router.push(`https://max.kg/catalog/${item.full_slug}`)
              } key={item.id} className={styles.seasonItem}>
                <Image
                  className={styles.seasonItemImg}
                  src={imageUrl}
                  width={94}
                  height={94}
                  alt={item.name}
                ></Image>
                <p className={styles.seasonItemTitle}>{item.name}</p>
              </div>
            );
          })}
        </div>
        <div
          className={cn(styles.seasonItemsSwiper, !isMobile && styles.hidden)}
        >
          <SeasonCategorySwiper seasonItems={seasonItems}/>
        </div>
      </section>
    </>
  );
};

export default SeasonCategory;
