"use client";

import { useState } from "react";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    const response = await fetch("/api/search-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery }), // Передаем только текущий запрос
    });

    const result = await response.json();
    if (result.success) {
      console.log("История поиска обновлена");
      window.location.reload(); // Перезагрузка страницы для обновления списка
    } else {
      console.error("Не удалось обновить историю поиска");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default SearchComponent;
