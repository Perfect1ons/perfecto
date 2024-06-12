"use client";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { IFiltersBrand } from "@/types/filtersBrand";
import DostFilter from "./DostFilter/DostFilter";
import PriceMinaMaxFilter from "./PriceMinMaxFilter/PriceMinaMaxFilter";
import BrandFilter from "./BrandFilter/BrandFilter";
import { useEffect, useState } from "react";
import AdditionalFilters from "./AdditionalFilters/AdditionalFilters";
import DefaultFilter from "./DefaultFilter/DefaultFilter";
import { getCatalogProductFilter } from "@/api/clientRequest";

interface ICatalogFiltresProps {
  filter: IFiltersBrand;
  catalog: ICatalogsProducts;
  options: {
    label: string;
    value: "default" | "cheap" | "expensive" | "rating";
  }[];
  value: string;
  onChange: (value: "default" | "cheap" | "expensive" | "rating") => void;
  selectedFilters: ISelectedFilterProps;
  handleFilterChange: (name: string, value: any) => void;
}

export interface ISelectedFilterProps {
  brand: string[];
  dost: string[];
  additional_filter: string[];
}
const CatalogFiltres = ({
  filter,
  catalog,
  onChange,
  options,
  value,
  selectedFilters,
  handleFilterChange,
}: ICatalogFiltresProps) => {
  const [price, setPrice] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });

  const [visibleFilter, setVisibleFilter] = useState<string | null>(null); // State to manage which filter is visible
  const toggleFilter = (filterName: string) => {
    setVisibleFilter((prev) => (prev === filterName ? null : filterName));
  };

  return (
    <div className="filtresContainer">
      <DefaultFilter
        toggleFilter={toggleFilter}
        visibleFilter={visibleFilter}
        onChange={onChange}
        options={options}
        value={value}
      />
      <DostFilter
        toggleFilter={toggleFilter}
        visibleFilter={visibleFilter}
        filter={filter}
        changeSelect={(value: string[]) => handleFilterChange("dost", value)}
        selectedFilters={selectedFilters.dost}
      />
      <PriceMinaMaxFilter
        selectedFilters={price}
        changeSelect={(value: { min: number; max: number }) =>
          handleFilterChange("price", value)
        }
        toggleFilter={toggleFilter}
        visibleFilter={visibleFilter}
        filter={filter}
      />
      <BrandFilter
        selectedFilters={selectedFilters.brand}
        changeSelect={(value: string[]) => handleFilterChange("brand", value)}
        toggleFilter={toggleFilter}
        visibleFilter={visibleFilter}
        filter={filter}
      />
      <AdditionalFilters
        selectedFilters={selectedFilters.additional_filter}
        changeSelect={(value: string[]) =>
          handleFilterChange("additional_filter", value)
        }
        toggleFilter={toggleFilter}
        visibleFilter={visibleFilter}
        filter={filter}
      />
    </div>
  );
};

export default CatalogFiltres;
