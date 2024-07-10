"use client";
import { Clock, Cross } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import SearchCategory from "@/components/Header/HeaderSearch/SearchCategory";
import SearchItems from "@/components/Header/HeaderSearch/SearchItems";
interface IMobileSearchProps {
  searchWrapperRef: React.RefObject<HTMLDivElement>;
  shouldShowHistory: any;
  shouldShowFastValue: any;
  handleHistoryItemClick: (query: string) => void;
  handleDeleteAll: () => void;
  handleDelete: (queryToDelete: string) => void;
  fastValue: any;
  searchHistory: any;
  handleCloseModal: () => void;
}
const MobileSearch = ({
  searchWrapperRef,
  shouldShowFastValue,
  shouldShowHistory,
  handleDelete,
  handleDeleteAll,
  handleHistoryItemClick,
  fastValue,
  searchHistory,
  handleCloseModal,
}: IMobileSearchProps) => {
  return (
    <div className={styles.searchWrapper} ref={searchWrapperRef}>
      {(shouldShowHistory || shouldShowFastValue) && (
        <div className={styles.searchResults}>
          {shouldShowHistory && (
            <div className={styles.searchResults__head}>
              <div className={styles.searchResults__head__between}>
                <h4 className={styles.searchResults__head__between__title}>
                  История поиска
                </h4>
                <button
                  className={styles.searchResults__head__between__deleteAll}
                  onClick={handleDeleteAll}
                >
                  Очистить все
                </button>
              </div>
              <ul className={styles.searchResults__head__list}>
                {searchHistory.map((search: string, index: number) => (
                  <div
                    className={styles.searchResults__head__list_item}
                    key={index}
                  >
                    <li
                      className={styles.searchResults__head__list_item_value}
                      onClick={() => handleHistoryItemClick(search)}
                    >
                      <span>
                        <Clock />
                      </span>{" "}
                      {search}
                    </li>
                    <button
                      className={styles.searchResults__head__list_item_delete}
                      onClick={() => handleDelete(search)}
                    >
                      <Cross />
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          )}
          {shouldShowFastValue && (
            <>
              {fastValue?.catalog && fastValue.catalog.length > 0 && (
                <>
                  <h4 className={styles.searchResults__title}>
                    Найдено в категориях
                  </h4>
                  <SearchCategory
                    category={fastValue.catalog}
                    closeModal={handleCloseModal}
                  />
                </>
              )}
              {fastValue?.model && fastValue.model._meta.totalCount > 0 && (
                <>
                  <h4 className={styles.searchResults__title}>Товары</h4>
                  <SearchItems
                    items={fastValue.model.items}
                    closeModal={handleCloseModal}
                  />
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileSearch;
