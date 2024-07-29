import Link from "next/link";
import styles from './style.module.scss'
import cn from "clsx";

const FavoritesIsEmpty = () => {
  return (
    <div className={cn("container", styles.favorites__container)}>
      <div className={styles.section__isEmpty}>
        <div className={styles.content}>
          <div className={cn("mascot_sprite", "mascot_sprite_favorite")}></div>
          <div className={styles.content_text}>
            <h2 className={styles.content_text_h3}>Товаров в Избранном нет.</h2>
            <p>Добавляйте понравившиеся товары в избранное</p>
          </div>
        </div>
        <Link href="/" className={styles.linkToMain}>
          Перейти на главную
        </Link>
      </div>
    </div>
  );
}

export default FavoritesIsEmpty