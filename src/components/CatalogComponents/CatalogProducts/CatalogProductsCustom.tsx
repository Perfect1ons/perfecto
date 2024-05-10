"use client";
import { IFiltersBrand } from "@/types/filtersBrand";
import { useState } from "react";
import FiltersProducts from "../FiltersProducts/FiltersProducts";

interface CustomSelectProps {
  filter: IFiltersBrand;
  value: string;
  productId: number;
  options: {
    label: string;
    value: "default" | "cheap" | "expensive" | "rating";
  }[];
  onChange: (value: "default" | "cheap" | "expensive" | "rating") => void;
}
const CatalogProductsCustom = ({
  productId,
  filter,
  onChange,
  options,
  value,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`custom-select ${isOpen ? "open" : ""}`}>
      <div className="select-header">
        <span className="select-header_sort">Сортировка: </span>
        <span
          onClick={toggleOpen}
          className={`select-header_sorted ${isOpen ? "open" : ""}`}
        >
          {options.find((option) => option.value === value)?.label ||
            "По умолчанию"}
          <p className={isOpen ? "open" : ""}>&#10095;</p>
        </span>
        <FiltersProducts filter={filter} productId={productId} />
      </div>
      {isOpen && (
        <div className="options">
          {options.map((option, index) => (
            <div
              key={index}
              className={`option ${value === option.value ? "selected" : ""}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span className="option__cyrcle"></span>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogProductsCustom;
