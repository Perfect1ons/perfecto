import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./style.module.scss";
import {
  Clock,
  Cross,
  SearchIcon,
  XMark,
} from "../../../../public/Icons/Icons";
import { ISearch } from "@/types/Search/search";
import { DebounceInput } from "react-debounce-input";
import { getFastUserSearch } from "@/api/clientRequest";
import SearchCategory from "@/components/Header/HeaderSearch/SearchCategory";
import SearchItems from "@/components/Header/HeaderSearch/SearchItems";

interface MobSearchProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  history: string[];
  searchInputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

export default function MobSearch({
  isOpen,
  setIsOpen,
  history,
  onInputChange,
  searchInputRef,
  searchValue,
}: MobSearchProps) {
  // для поиска
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения значения поиска
  const router = useRouter();
  const [inputActive, setInputActive] = useState<boolean>(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [fastValue, setFastValue] = useState<ISearch | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState(history);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };
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
        if (prevHistory.some((item) => item === query)) {
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

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Проверяет если inputRef.current не null перед тем, как обработать его
    }
  };
  const handleInputFocus = () => {
    setInputActive(true);
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
  const shouldShowFastValue =
    inputActive &&
    fastValue &&
    (fastValue.catalog.length > 0 || fastValue.model._meta.totalCount > 0);
  const handleCloseModal = () => {
    onInputChange({
      target: { value: "" },
    } as ChangeEvent<HTMLInputElement>);
    setFastValue(undefined);
    setInputActive(false);
  };

  return (
    <>
      <section className={styles.search_bar}>
        <button className={styles.xmark} onClick={() => setIsOpen(false)}>
          <XMark />
        </button>
        <form onSubmit={handleSubmit} className={styles.search_form}>
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
          <button className={styles.search__icon} onClick={handleButtonClick}>
            <SearchIcon />
          </button>
        </form>
      </section>
      <ul className={styles.searchResults__head__list}>
        {searchHistory.map((search: string, index: number) => (
          <div className={styles.searchResults__head__list_item} key={index}>
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
    </>
  );
}
