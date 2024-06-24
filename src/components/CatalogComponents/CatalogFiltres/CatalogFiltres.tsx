"use client";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { Filter2, IFiltersBrand } from "@/types/filtersBrand";
import DostFilter from "./DostFilter/DostFilter";
import PriceMinaMaxFilter from "./PriceMinMaxFilter/PriceMinMaxFilter";
import BrandFilter from "./BrandFilter/BrandFilter";
import { useState } from "react";
import AdditionalFilters from "./AdditionalFilters/AdditionalFilters";
import DefaultFilter from "./DefaultFilter/DefaultFilter";
import EveryFilters from "./EveryFilters.tsx/EveryFilters";

interface ICatalogFiltresProps {
  clearFilter: (name: string) => void;
  price: { min: number; max: number };
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
  handlePriceRangeChange: (min: number, max: number) => void;
  applyPrice: () => void;
  clearFilterCena: () => void;
  clearFilterByID: (filters: Filter2, selectedFilters: string[]) => void;
}

export interface ISelectedFilterProps {
  id: number;
  page: number;
  brand: string[];
  dost: string[];
  additional_filter: any;
  priceMin: number;
  priceMax: number;
}
const CatalogFiltres = ({
  filter,
  catalog,
  onChange,
  options,
  value,
  selectedFilters,
  handleFilterChange,
  handlePriceRangeChange,
  clearFilter,
  price,
  applyPrice,
  clearFilterCena,
  clearFilterByID,
}: ICatalogFiltresProps) => {
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
        clearFilter={clearFilter}
        toggleFilter={toggleFilter}
        visibleFilter={visibleFilter}
        filter={filter}
        changeSelect={(value: string[]) => handleFilterChange("dost", value)}
        selectedFilters={selectedFilters.dost}
      />
      <PriceMinaMaxFilter
        clearFilterCena={clearFilterCena}
        applyPrice={applyPrice}
        handlePriceRangeChange={handlePriceRangeChange}
        price={selectedFilters}
        changeSelect={(value: { min: number; max: number }) =>
          handleFilterChange("price", value)
        }
        toggleFilter={toggleFilter}
        visibleFilter={visibleFilter}
      />
      <BrandFilter
        clearFilter={clearFilter}
        selectedFilters={selectedFilters.brand}
        changeSelect={(value: string[]) => handleFilterChange("brand", value)}
        toggleFilter={toggleFilter}
        visibleFilter={visibleFilter}
        filter={filter}
      />
      <AdditionalFilters
        clearFilterByID={clearFilterByID}
        selectedFilters={selectedFilters.additional_filter}
        changeSelect={(value: string[]) =>
          handleFilterChange("additional_filter", value)
        }
        toggleFilter={toggleFilter}
        visibleFilter={visibleFilter}
        filter={filter}
      />
      {filter.filter[11] && (
        <EveryFilters
          clearFilter={clearFilter}
          selectedFilters={selectedFilters.additional_filter}
          toggleFilter={toggleFilter}
          visibleFilter={visibleFilter}
          changeSelect={(value: string[]) =>
            handleFilterChange("additional_filter", value)
          }
          filter={filter}
        />
      )}
    </div>
  );
};

export default CatalogFiltres;
