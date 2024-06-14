"use client";
import React, {
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { DebounceInput } from "react-debounce-input";
import styles from "./style.module.scss";
import { ISearch } from "@/types/Search/search";
import SearchCategory from "./SearchCategory";
import SearchItems from "./SearchItems";
import { ExitIcon } from "../../../../public/Icons/Icons";
import { getFastUserSearch } from "@/api/clientRequest";

interface HeaderSearchProps {
  searchInputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({
  searchInputRef,
  onInputChange,
  searchValue,
}) => {
  const [inputActive, setInputActive] = useState<boolean>(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [fastValue, setFastValue] = useState<ISearch | undefined>(undefined);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchData = async (query: string) => {
    if (!query) {
      setFastValue(undefined);
      return;
    }
    try {
      setIsFetching(true);
      const response: ISearch = await getFastUserSearch(query);
      setFastValue(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event);
    const newValue = event.target.value;
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue.trim() !== "") {
      window.location.href = `/seek/search=${searchValue}`;
    }
  };

  const hasResults = useMemo(
    () =>
      fastValue &&
      ((fastValue.catalog && fastValue.catalog.length > 0) ||
        (fastValue.model && fastValue.model._meta.totalCount > 0)),
    [fastValue]
  );

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
        {inputActive ? (
          <button
            type="button"
            className="search__input_close"
            onClick={handleCloseModal}
          >
            <ExitIcon />
          </button>
        ) : null}
        {inputActive && hasResults && (
          <div className={styles.searchResults}>
            {fastValue?.catalog && fastValue.catalog.length > 0 && (
              <>
                <h1 className={styles.searchResults__title}>
                  Найдено в категориях
                </h1>
                <SearchCategory
                  category={fastValue.catalog}
                  closeModal={handleCloseModal}
                />
              </>
            )}
            {fastValue?.model && fastValue.model._meta.totalCount > 0 && (
              <>
                <h2 className={styles.searchResults__title}>Товары</h2>
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
