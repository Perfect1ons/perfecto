import { ChangeEvent } from "react";

import styles from "./style.module.scss";
import { SearchIcon, XMark } from "../../../../public/Icons/Icons";
import { DebounceInput } from "react-debounce-input";

interface MobSearchProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchInputRef: React.RefObject<HTMLInputElement>;
  searchValue: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputFocus: () => void;
  handleButtonClick: () => void;
}

export default function MobSearch({
  setIsOpen,
  searchInputRef,
  searchValue,
  handleChange,
  handleSubmit,
  handleInputFocus,
  handleButtonClick,
}: MobSearchProps) {
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
    </>
  );
}
