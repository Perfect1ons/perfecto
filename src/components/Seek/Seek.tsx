"use client";
import React, { useState, useEffect } from "react";
import { ISeekCatalog, ISeekItem } from "@/types/Search/seek";
import ProductList from "./ProductList";
import CustomSelect from "./CustomSelect";
import SeekCatalog from "./SeekCatalog";
interface SeekProps {
  catalog: ISeekCatalog[];
  product: ISeekItem[];
}

const Seek: React.FC<SeekProps> = ({ catalog, product }) => {
  const [items, setItems] = useState<ISeekItem[]>(product);
  const [sortOrder, setSortOrder] = useState<
    "default" | "cheap" | "expensive" | "rating" | null
  >(null);
  const [isColumnView, setIsColumnView] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sortParam = queryParams.get("sort");
    if (
      sortParam &&
      (sortParam === "cheap" ||
        sortParam === "expensive" ||
        sortParam === "rating")
    ) {
      setSortOrder(sortParam as "cheap" | "expensive" | "rating");
    } else {
      setSortOrder("default");
    }
  }, []);

  useEffect(() => {
    if (sortOrder !== null && sortOrder !== "default") {
      sortItems(sortOrder);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const sortItems = (order: "cheap" | "expensive" | "rating") => {
    const sortedItems = [...items];
    switch (order) {
      case "cheap":
        sortedItems.sort((a, b) => a.cenaok - b.cenaok);
        break;
      case "expensive":
        sortedItems.sort((a, b) => b.cenaok - a.cenaok);
        break;
      case "rating":
        sortedItems.sort((a, b) => b.ocenka - a.ocenka);
        break;
      default:
        break;
    }
    setItems(sortedItems);
  };

  const handleSort = (order: "default" | "cheap" | "expensive" | "rating") => {
    if (order === "default") {
      setSortOrder(null); // Сброс порядка сортировки
      setItems(product); // Возвращение изначальных данных
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete("sort"); // Удаление параметра sort из URL
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${queryParams.toString()}`
      );
    } else {
      setSortOrder(order);
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("sort", order);
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${queryParams.toString()}`
      );
    }
  };

  const handleViewChange = (isColumn: boolean) => {
    setIsColumnView(isColumn);
  };

  return (
    <section className="seek">
      <div className="container">
          <h1 className="seek__catalog_title">Найдено в категориях</h1>
          <SeekCatalog catalog={catalog}/>
        <div className="sort__buttons">
          <CustomSelect
            value={sortOrder || "default"}
            options={[
              { label: "По умолчанию", value: "default" },
              { label: "Сначала дешевле", value: "cheap" },
              { label: "Сначала дороже", value: "expensive" },
              { label: "По рейтингу", value: "rating" },
            ]}
            onChange={(value) => handleSort(value)}
          />
          <div className="default__sort_style">
            <button
              className="default__sort_icons"
              onClick={() => handleViewChange(false)}
            >
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`default__sort_icon ${
                    !isColumnView ? "sort__button_icons_active" : ""
                  }`}
                ></div>
              ))}
            </button>

            <button
              className="default__sort_icons_column"
              onClick={() => handleViewChange(true)}
            >
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className={`default__sort_icon_column ${
                    isColumnView ? "sort__button_icons_active" : ""
                  }`}
                ></div>
              ))}
            </button>
          </div>
        </div>
      </div>
      <ProductList items={items} isColumnView={isColumnView} />
    </section>
  );
};

export default Seek;

