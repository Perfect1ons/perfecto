import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import styles from "./style.module.scss";
import { ISearch } from "@/types/Search/search";
import SearchCategory from "./SearchCategory";
import SearchItems from "./SearchItems";
import { ExitIcon, TrashIcon } from "../../../../public/Icons/Icons";
import { getFastUserSearch } from "@/api/clientRequest";

interface HeaderSearchProps {
  history: string[];
  searchInputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({
  history,
  searchInputRef,
  onInputChange,
  searchValue,
}) => {
  const [inputActive, setInputActive] = useState<boolean>(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [fastValue, setFastValue] = useState<ISearch | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState(history);

  const fetchData = async (query: string) => {
    if (!query) {
      setFastValue(undefined);
      return;
    }
    try {
      const response: ISearch = await getFastUserSearch(query);
      setFastValue(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event);
    const newValue = event.target.value;
    setSearchQuery(newValue);
    if (newValue.length < 2) {
      setFastValue(undefined);
      return;
    }
    fetchData(decodeURIComponent(newValue));
    setInputActive(true);
  };

  const handleInputFocus = () => {
    setInputActive(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchWrapperRef.current &&
      !searchWrapperRef.current.contains(event.target as Node)
    ) {
      setFastValue(undefined);
      setInputActive(false);
    }
  };

  const handleCloseModal = () => {
    onInputChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
    setFastValue(undefined);
    setInputActive(false);
  };

  const handleSearch = async (query: string) => {
    const response = await fetch("/api/search-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery: query }),
    });

    const result = await response.json();
    if (result.success) {
      setSearchHistory((prevHistory) => {
        // Проверяем, есть ли уже такой элемент в истории поиска
        if (prevHistory.includes(query)) {
          return prevHistory; // Не обновляем историю, если значение уже есть
        }

        // Ограничиваем количество элементов до 10
        const updatedHistory = [...prevHistory, query].slice(-10);
        return updatedHistory;
      });
      console.log("История поиска обновлена");
    } else {
      console.error("Не удалось обновить историю поиска");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue.trim() !== "") {
      await handleSearch(searchValue);
      window.location.href = `/seek?search=${encodeURIComponent(
        searchValue
      )}&page=1`;
    }
  };

  const handleDelete = async (queryToDelete: string) => {
    const response = await fetch("/api/search-history", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery: queryToDelete }),
    });

    const result = await response.json();
    if (result.success) {
      console.log("Запрос удален из истории поиска");
      setSearchHistory((prevHistory) =>
        prevHistory.filter((query) => query !== queryToDelete)
      );
    } else {
      console.error("Не удалось удалить запрос из истории поиска");
    }
  };

  const handleDeleteAll = async () => {
    const response = await fetch("/api/search-history", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();
    if (result.success) {
      console.log("Все запросы удалены из истории поиска");
      setSearchHistory([]);
    } else {
      console.error("Не удалось удалить все запросы из истории поиска");
    }
  };

  const handleHistoryItemClick = async (query: string) => {
    await handleSearch(query);
    window.location.href = `/seek?search=${encodeURIComponent(query)}&page=1`;
  };

  const shouldShowModal = inputActive && (history.length > 0 || fastValue);

  return (
    <div className={styles.searchWrapper} ref={searchWrapperRef}>
      <form className={styles.search} onSubmit={handleSubmit}>
        <DebounceInput
          inputRef={searchInputRef}
          className="search__input"
          minLength={2}
          debounceTimeout={300}
          onChange={handleChange}
          onFocus={handleInputFocus}
          value={searchValue}
          placeholder="Искать товары и категории"
        />
        {inputActive && (
          <button
            type="button"
            className="search__input_close"
            aria-label="close modal"
            onClick={handleCloseModal}
          >
            <ExitIcon />
          </button>
        )}
        {shouldShowModal && searchHistory.length > 0 && (
          <div className={styles.searchResults}>
            {searchHistory.length > 0 && (
              <div>
                <h4 className={styles.searchResults__title}>История поиска</h4>
                {searchHistory.length > 0 && (
                  <button
                    className={styles.searchResults__deleteAll}
                    onClick={handleDeleteAll}
                  >
                    Удалить все
                  </button>
                )}
                <ul className={styles.searchResults__list}>
                  {searchHistory.map((search: string, index: number) => (
                    <div
                      className={styles.searchResults__list_item}
                      key={index}
                    >
                      <li
                        className={styles.searchResults__list_item_value}
                        onClick={() => handleHistoryItemClick(search)}
                      >
                        {search}
                      </li>
                      <button
                        className={styles.searchResults__list_item_delete}
                        onClick={() => handleDelete(search)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                </ul>
              </div>
            )}
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
          </div>
        )}
      </form>
    </div>
  );
};

export default HeaderSearch;
