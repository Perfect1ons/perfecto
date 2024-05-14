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
    <div className={`custom-se ${isOpen ? "open" : ""}`}>
      <div className="select-header">
        <span className="select-header_sort">Сортировка: </span>
        <FiltersProducts
          onChange={onChange}
          value={value}
          filter={filter}
          productId={productId}
          options={options}
        />
      </div>
    </div>
  );
};

export default CatalogProductsCustom;
