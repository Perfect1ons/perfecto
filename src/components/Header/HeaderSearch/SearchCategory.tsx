import { ISearchCatalog } from "@/types/Search/search";
import Link from "next/link";
import styles from "./style.module.scss";
import Image from "next/image";
import { ClickIcon, SearchIcon } from "../../../../public/Icons/Icons";

interface ISearchCategoryProps {
  category: ISearchCatalog[];
  closeModal: () => void;
}

const SearchCategory = ({ category, closeModal }: ISearchCategoryProps) => {
  return (
    <ul className={styles.search__category}>
      {category
        .map((categoria, index) => {
          const iconSrc = categoria.icon
            ? !categoria.icon.startsWith("https://")
              ? `https://max.kg/${categoria.icon}`
              : categoria.icon
            : "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";
          return (
            <Link
              className={styles.search__category_link}
              key={index}
              href={`/catalog/${categoria.full_slug}`}
              onClick={closeModal}
              title="Перейти в категорию"
            >
              <Image
                className={styles.search__category_img}
                src={iconSrc}
                width={45}
                height={45}
                alt={categoria.name}
              />
              <li className={styles.search__category_name}>{categoria.name}</li>
              <span className={styles.search__category_icon}>
                <SearchIcon/>
              </span>
            </Link>
          );
        })
        .slice(0, 5)}
    </ul>
  );
};

export default SearchCategory;
