"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Item {
  id: number;
  name: string;
}

const CookieArrayComponent = () => {
  const [arrayData, setArrayData] = useState<Item[]>([]);

  // Функция для загрузки данных из cookie
  const loadDataFromCookies = () => {
    const storedArray = JSON.parse(Cookies.get("myArray") || "[]");
    setArrayData(storedArray);
  };

  // useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    // Загрузка данных из cookie при первом заходе на страницу
    loadDataFromCookies();
  }, []);

  // Функция для сохранения данных в cookie и в состояние компонента
  const saveArrayToCookies = (newArray: Item[]) => {
    Cookies.set("myArray", JSON.stringify(newArray));
    setArrayData(newArray);
  };

  // Функция для удаления элемента из данных в cookie
  const removeItemById = (id: number) => {
    const updatedArray = arrayData.filter((item) => item.id !== id);
    saveArrayToCookies(updatedArray);
  };

  // Функция для добавления элемента в данные в cookie
  const addItemToCookies = (item: Item) => {
    const updatedArray = [...arrayData, item];
    saveArrayToCookies(updatedArray);
  };

  // Функция для проверки наличия элемента в данных в cookie
  const isItemInCookies = (id: number) => {
    return arrayData.some((item) => item.id === id);
  };

  return (
    <div>
      <h1>Items</h1>
      <div>
        {Array.from({ length: 10 }, (_, index) => {
          const item = { id: index + 1, name: `Item ${index + 1}` };
          return (
            <div key={index} style={{ marginBottom: "10px" }}>
              <span>{item.name}</span>
              {!isItemInCookies(item.id) && (
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => addItemToCookies(item)}
                >
                  Add to Cookies
                </button>
              )}
            </div>
          );
        })}
      </div>
      <h2>Array of Objects in Cookies</h2>
      <ul>
        {arrayData.map((item) => (
          <li key={item.id}>
            {item.name}{" "}
            <button onClick={() => removeItemById(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CookieArrayComponent;


