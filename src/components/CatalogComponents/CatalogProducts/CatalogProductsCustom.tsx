"use client";
import { IFiltersBrand } from "@/types/filtersBrand";
import { useState } from "react";
import FiltersProducts from "../FiltersProducts/FiltersProducts";
import styles from "../FiltersProducts/style.module.scss";

interface CustomSelectProps {
  filter: IFiltersBrand;
  value: string;
  productId: number;
  options: {
    label: string;
    value: "default" | "cheap" | "expensive" | "rating";
  }[];
  onChange: (value: "default" | "cheap" | "expensive" | "rating") => void;
  onBrandToggle: (mainKey: string, subKey: string) => void;
  selectedBrands: {
    [key: string]: {
      [subKey: string]: boolean;
    };
  };
  onReset: (mainKey: string) => void; // Add this prop
  resetSelectionAll: () => void;
}
const CatalogProductsCustom = ({
  productId,
  filter,
  onChange,
  options,
  value,
  onBrandToggle,
  selectedBrands,
  onReset,
  resetSelectionAll,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`custom-se `}>
      <div className="select-header">
        <span className={styles.select_header_sort}>Сортировка: </span>
        <FiltersProducts
          onChange={onChange}
          value={value}
          filter={filter}
          productId={productId}
          options={options}
          onBrandToggle={onBrandToggle}
          selectedBrands={selectedBrands}
          onReset={onReset}
          resetSelectionAll={resetSelectionAll}
        />
      </div>
    </div>
  );
};

export default CatalogProductsCustom;
