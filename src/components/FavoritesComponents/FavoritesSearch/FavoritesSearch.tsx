"use client";
import { useState } from "react";
import styles from "./style.module.scss";

interface FavoritesSearchProps {
  onSearch: (query: string) => void;
}

const FavoritesSearch = ({ onSearch }: FavoritesSearchProps) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Поиск по избранному..."
        className={styles.searchInput}
      />
    </div>
  );
};

export default FavoritesSearch;
