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
    <section className="season">
      <div className="container">
        <h1 className="sections__title">Сезонные Категории</h1>
        <div className={cn(styles.seasonItems, isMobile && styles.hidden)}>
          {seasonItems.map((item) => {
            const imageUrl = item.icon
              ? item.icon.startsWith(startUrl)
                ? item.icon
                : `${image}${item.icon}`
              : imageEmpty;

            return (
              <div
                onClick={() =>
                  router.push(`catalog/${item.full_slug}`)
                }
                key={item.id}
                className="swiper__slide "
              >
                <Image
                  className={styles.seasonItemImg}
                  src={imageUrl}
                  width={94}
                  height={94}
                  alt={item.name}
                  placeholder="blur"
                  loading="lazy"
                  blurDataURL={imageUrl}
                ></Image>
                <h2 className="category__item_title">{item.name}</h2>
              </div>
            );
          })}
        </div>
        <div
          className={cn(styles.seasonItemsSwiper, !isMobile && styles.hidden)}
        >
          <SeasonCategorySwiper seasonItems={seasonItems} />
        </div>
      </div>
    </section>
  );
};

export default SeasonCategory;
