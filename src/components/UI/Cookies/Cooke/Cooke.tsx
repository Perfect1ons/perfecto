"use client";

import { useState } from "react";

const ClientSearchHistory = ({
  searchHistory,
}: {
  searchHistory: string[];
}) => {
  const [history, setHistory] = useState(searchHistory);

  const handleDelete = async (queryToDelete: string) => {
    const response = await fetch("/api/search-history", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery: queryToDelete }), // Передаем запрос для удаления
    });

    const result = await response.json();
    if (result.success) {
      console.log("Запрос удален из истории поиска");
      setHistory(history.filter((query) => query !== queryToDelete));
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
      body: JSON.stringify({}), // Пустой объект для удаления всех запросов
    });

    const result = await response.json();
    if (result.success) {
      console.log("Все запросы удалены из истории поиска");
      setHistory([]);
    } else {
      console.error("Не удалось удалить все запросы из истории поиска");
    }
  };

  return (
    <div>
      <ul>
        {history.map((search: string, index: number) => (
          <li key={index}>
            id: {index} - value: {search}
            <button onClick={() => handleDelete(search)}>Удалить</button>
          </li>
        ))}
      </ul>
      <button onClick={handleDeleteAll}>Удалить все</button>
    </div>
  );
};

export default ClientSearchHistory;
