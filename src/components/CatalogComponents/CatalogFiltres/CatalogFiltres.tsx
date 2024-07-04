"use client";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { Filter2, IFiltersBrand } from "@/types/filtersBrand";
import DostFilter from "./DostFilter/DostFilter";
import BrandFilter from "./BrandFilter/BrandFilter";
import { useState, useEffect, useRef } from "react";
import AdditionalFilters from "./AdditionalFilters/AdditionalFilters";
import EveryFilters from "./EveryFilters.tsx/EveryFilters";
import PriceMinMaxFilter from "./PriceMinMaxFilter/PriceMinMaxFilter";
import DefaultFilter from "./DefaultFilter/DefaultFilter";

interface ICatalogFiltresProps {
  intialAdditional: string[];
  clearFilter: (name: string) => void;
  filter: IFiltersBrand;
  catalog: ICatalogsProducts;
  selectedFilters: ISelectedFilterProps;
  handleFilterChange: (name: string, value: any) => void;
  handlePriceRangeChange: (min: number, max: number) => void;
  clearFilterPrice: () => void;
  applyFilterPrice: () => void;
  tempPrice: {
    tempMin: number;
    tempMax: number;
  };
  resetCategoryFilters: (categoryFilters: Filter2) => void;
  clearAllCrumbs: () => void;
  selectedSort: { sortName: string; sortTitle: string };
  setSelectedSort: React.Dispatch<
    React.SetStateAction<{ sortName: string; sortTitle: string }>
  >;
  handleSortChange: (option: { sortName: string; sortTitle: string }) => void;
}

export interface ISelectedFilterProps {
  id: number;
  page: number;
  brand: string[];
  dost: string[];
  additional_filter: any;
  priceMin: number;
  priceMax: number;
  sortName: string; // Добавляем свойство sortName
}

const CatalogFiltres = ({
  filter,
  selectedFilters,
  handleFilterChange,
  handlePriceRangeChange,
  clearFilter,
  clearFilterPrice,
  applyFilterPrice,
  tempPrice,
  intialAdditional,
  resetCategoryFilters,
  clearAllCrumbs,
  selectedSort,
  setSelectedSort,
  handleSortChange,
}: ICatalogFiltresProps) => {
  const [visibleFilter, setVisibleFilter] = useState<string | null>(null); // State to manage which filter is visible

  const toggleFilter = (filterName: string) => {
    setVisibleFilter((prev) => (prev === filterName ? null : filterName));
  };

  const containerRef = useRef<HTMLDivElement>(null);
  // hook on the outside to close the active filter modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setVisibleFilter(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Обновление состояния или вызов других функций при изменении selectedFilters
    // Например, вызов функции, которая обновляет фильтры или другие данные
  }, [selectedFilters]);

  return (
    <div ref={containerRef} className="filtresContainer">
      <DefaultFilter
        handleSortChange={handleSortChange}
        filter={filter}
        visibleFilter={visibleFilter}
        toggleFilter={toggleFilter}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      <DostFilter
        clearFilter={clearFilter}
        toggleFilter={toggleFilter}
        visibleFilter={visibleFilter}
        filter={filter}
        changeSelect={(value: string[]) => handleFilterChange("dost", value)}
        selectedFilters={selectedFilters.dost}
      />
      <PriceMinMaxFilter
        tempPrice={tempPrice}
        clearFilterPrice={clearFilterPrice}
        applyFilterPrice={applyFilterPrice}
        handlePriceRangeChange={handlePriceRangeChange}
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
        resetCategoryFilters={resetCategoryFilters}
        selectedFilters={selectedFilters.additional_filter}
        initialAdditional={intialAdditional}
        changeSelect={(value: string[]) =>
          handleFilterChange("additional_filter", value)
        }
        toggleFilter={toggleFilter}
        visibleFilter={visibleFilter}
        filter={filter}
      />
      {filter.filter[11] && (
        <EveryFilters
          resetCategoryFilters={resetCategoryFilters}
          clearAllCrumbs={clearAllCrumbs}
          tempPrice={tempPrice}
          clearFilterPrice={clearFilterPrice}
          applyFilterPrice={applyFilterPrice}
          handlePriceRangeChange={handlePriceRangeChange}
          clearFilter={clearFilter}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
          visibleFilter={visibleFilter}
          changeSelect={handleFilterChange}
          filter={filter}
        />
      )}
    </div>
  );
};

export default CatalogFiltres;
