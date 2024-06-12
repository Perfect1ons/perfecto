"use client";
import { useState, ChangeEvent, useRef, useEffect, useMemo } from "react";
import { DebounceInput } from "react-debounce-input";
import styles from "./style.module.scss";
import { ISearch } from "@/types/Search/search";
import SearchCategory from "./SearchCategory";
import SearchItems from "./SearchItems";
import { getFastUserSearch } from "@/api/clientRequest";
import { XMark } from "../../../../public/Icons/Icons";

const HeaderSearch = () => {
  const [value, setValue] = useState<string>("");
  const [inputActive, setInputActive] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
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
    const newValue = event.target.value;
    setValue(newValue);
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
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setValue("");
      setFastValue(undefined);
      setInputActive(false);
    }
  };

  const handleCloseModal = () => {
    setValue("");
    setFastValue(undefined);
    setInputActive(false);
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = `/seek/search=${value}`;
  };

  const catalogLength = useMemo(
    () => fastValue?.catalog?.length ?? 0,
    [fastValue?.catalog?.length]
  );
  const modelTotalCount = useMemo(
    () => fastValue?.model?._meta.totalCount ?? 0,
    [fastValue?.model?._meta.totalCount]
  );

  return (
    <div className={styles.searchWrapper} ref={searchRef}>
      <form className={styles.search} onSubmit={handleSubmit}>
        <DebounceInput
          className={styles.search__input}
          minLength={1}
          debounceTimeout={700}
          onChange={handleChange}
          onFocus={handleInputFocus}
          value={value}
          placeholder="Искать товары и категории"
        />
        {inputActive ? (
          <button
            type="button"
            className={styles.search__input_close}
            onClick={handleCloseModal}
          >
            <XMark/>
          </button>
        ) : null}
        {inputActive &&
          fastValue &&
          (catalogLength > 0 || modelTotalCount > 0) && (
            <div className={styles.searchResults}>
              <h1 className={styles.searchResults__title}>
                Найдено в категориях
              </h1>
              {catalogLength > 0 && (
                <SearchCategory
                  category={fastValue.catalog}
                  closeModal={handleCloseModal}
                />
              )}
              <h2 className={styles.searchResults__title}>Товары</h2>
              {modelTotalCount > 0 && (
                <SearchItems
                  items={fastValue.model.items}
                  closeModal={handleCloseModal}
                />
              )}
            </div>
          )}
      </form>
    </div>
  );
};

export default HeaderSearch;


