import styles from "./style.module.scss";
import { IPropsAllFilters } from "../FiltersProducts/AllFilters";
import { Cross } from "../../../../public/Icons/Icons";
import cn from "clsx";

const AllFiltersMobile = ({
  close,
  filter,
  onBrandToggle,
  selectedBrands,
}: IPropsAllFilters) => {
  const allFilters =
    filter && filter.filter ? Object.values(filter.filter) : [];

  // Определяем количество частей
  const numberOfChunks = 2;

  // Разбиваем массив фильтров на части
  const chunkSize = Math.ceil(allFilters.length / numberOfChunks);
  const filterChunks = Array.from({ length: numberOfChunks }, (_, index) =>
    allFilters.slice(index * chunkSize, (index + 1) * chunkSize)
  );
  return (
    <div className={styles.containerMobileFilters}>
      <div className={styles.containerAllFiltersMobile}>
        <div className={styles.filterHeader}>
          <h3 className={styles.filterHeader__title}>Фильтры</h3>
          <button className={styles.filterHeader__close} onClick={close}>
            <Cross />
          </button>
        </div>
        <div className={styles.filterAll}>
          <div className={styles.filterPrice}>
            <h3 className={styles.filterPrice__value}>Цена, сом</h3>
            <div className={styles.filterPrice__inputs}>
              <input
                className={styles.filterPrice__inputs__enter}
                type="number"
                placeholder="от 0"
              />
              <input
                className={styles.filterPrice__inputs__enter}
                type="number"
                placeholder="до 0"
              />
            </div>
          </div>
          <div className={styles.filterPrice}>
            <h3 className={styles.filterPrice__value}>Бренды</h3>
            <div className={styles.filterPrice__brands}>
              {filter.brand.map((item) => {
                return (
                  <button
                    onClick={() => onBrandToggle("brand", item)}
                    className={cn(styles.filterPrice__brands__btn, {
                      [styles.filterPrice__brands__btnActive]:
                        selectedBrands.brand?.[item],
                    })}
                    key={item}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <div className={styles.filterPrice}>
            <h3 className={styles.filterPrice__value}>Сроки доставки</h3>
            <div className={styles.filterPrice__brands}>
              {filter.variant_day.map((item) => {
                return (
                  <button
                    onClick={() => onBrandToggle("day", item)}
                    className={cn(styles.filterPrice__brands__btn, {
                      [styles.filterPrice__brands__btnActive]:
                        selectedBrands.day?.[item],
                    })}
                    key={item}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.filterFooter}>
          <button className={styles.filterFooter__apply} onClick={close}>
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllFiltersMobile;
