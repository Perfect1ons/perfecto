import { ISearchItem } from "@/types/Search/search";
import Link from "next/link";
import styles from "./style.module.scss";
import Image from "next/image";

interface ISearchItemsProps {
  items: ISearchItem[];
  closeModal: () => void;
}

const SearchItems = ({ items, closeModal }: ISearchItemsProps) => {
  return (
    <ul className={styles.search__items}>
      {items
        .map((item, index) => {
          return (
            <Link
              className={styles.search__items_link}
              key={index}
              href={`/item/${item.id_tov}/${item.url}`}
              onClick={closeModal}
            >
              <Image
                src="https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg"
                className={styles.search__items_img}
                width={45}
                height={45}
                alt={item.naim}
              />
              <li className={styles.search__items_name}>{item.naim}</li>
              <span className={styles.search__items_cenaok}>
                {item.cenaok}{" "}
                <span className={styles.search__items_cenaok_currency}>c</span>
              </span>
            </Link>
          );
        })
        .slice(0, 10)}
    </ul>
  );
};

export default SearchItems;
