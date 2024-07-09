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
  const [isColumnView, setIsColumnView] = useState(false);

  const handleViewChange = (isColumn: boolean) => {
    setIsColumnView(isColumn);
  };

  return (
    <section className="seek">
      <div className="container">
          <h1 className="seek__catalog_title">Найдено в категориях</h1>
          <SeekCatalog catalog={catalog}/>
        <div className="sort__buttons">
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
      <ProductList items={product} isColumnView={isColumnView} />
    </section>
  );
};

export default Seek;

