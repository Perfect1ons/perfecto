import { ISearchItem } from "@/types/Search/search";
import Link from "next/link";
import styles from "./style.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ISearchItemsProps {
  items: ISearchItem[];
  closeModal: () => void;
}

const SearchItems = ({ items, closeModal }: ISearchItemsProps) => {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  useEffect(() => {
    const loadImageSrcs = async () => {
      const srcs = await Promise.all(
        items.map(async (item) => await fetchImage(item))
      );
      setImageSrcs(srcs);
    };

    loadImageSrcs();
  }, [items]);

  const fetchImage = async (item: ISearchItem) => {
    try {
      let imageUrl = "";

      if (item.photos.length > 0) {
        const url = item.photos[0].url_part;

        if (url.startsWith("https://")) {
          imageUrl = `${url}280.jpg`;
        } else {
          imageUrl = `https://max.kg/nal/img/${item.id_post}/l_${url}`;
        }
      } else {
        imageUrl = `https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg`;
      }

      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Image loading error");
      }

      return imageUrl;
    } catch (error) {
      console.error("Error loading image:", error);
      return `https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg`;
    }
  };

  return (
    <ul className={styles.search__items}>
      {items.slice(0, 15).map((item, index) => {
        const imageSrc =
          imageSrcs[index] ||
          `https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg`;

        return (
          <Link
            className={styles.search__items_link}
            key={index}
            href={`/item/${item.id_tov}/${item.url}`}
            onClick={closeModal}
          >
            <Image
              src={imageSrc}
              className={styles.search__items_img}
              width={45}
              height={45}
              alt={item.naim}
              onError={(e: any) => {
                e.target.src = `https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg`;
              }}
            />
            <li className={styles.search__items_name}>{item.naim}</li>
            <span className={styles.search__items_cenaok}>
              {item.cenaok}{" "}
              <span className={styles.search__items_cenaok_currency}>c</span>
            </span>
          </Link>
        );
      })}
    </ul>
  );
};

export default SearchItems;
