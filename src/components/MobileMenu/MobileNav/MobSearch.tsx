import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./style.module.scss";
import { SearchIcon } from "../../../../public/Icons/Icons";

interface MobSearchProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobSearch({ isOpen, setIsOpen }: MobSearchProps) {
  // для поиска
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения значения поиска
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/seek/search=${searchTerm}`); // Переход на страницу поиска с параметрами
    setIsOpen(false); // Закрыть модальное окно при отправке формы
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Проверяет если inputRef.current не null перед тем, как обработать его
    }
  };
  return (
    <>
      <form onSubmit={handleSearchSubmit} className={styles.search_bar}>
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          autoComplete="off"
          placeholder="Поиск товаров"
          type="text"
          id="searchInputMob"
          className={styles.search__input}
        />
        <button className={styles.search__icon} onClick={handleButtonClick}>
          <SearchIcon />
        </button>
      </form>
    </>
  );
}
