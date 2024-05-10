"use client"
import React, { useState, useEffect } from "react";

const Lafa: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      alert("Введите название");
      return;
    }
    setItems((prevItems) => {
      const newItems = [...prevItems, inputValue];
      localStorage.setItem("items", JSON.stringify(newItems));
      return newItems;
    });
    setInputValue("");
  };

  const handleDelete = (index: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      localStorage.setItem("items", JSON.stringify(newItems));
      return newItems;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lafa;


